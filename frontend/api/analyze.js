import axios from 'axios';
import * as cheerio from 'cheerio';

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 PulseIQ-Analyzer/1.0';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  const { url } = req.body || {};
  if (!url || typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({
      success: false,
      error: 'URL is required. Please enter a valid URL, e.g. https://google.com',
    });
  }

  let normalizedUrl = url.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  try {
    new URL(normalizedUrl);
  } catch {
    return res.status(400).json({
      success: false,
      error: 'Invalid URL format provided. Please check the URL and try again.',
    });
  }

  const startTime = Date.now();

  try {
    const pageResponse = await axios.get(normalizedUrl, {
      headers: {
        'User-Agent': DEFAULT_USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    });

    const responseTime = Math.max(1, Date.now() - startTime);
    const contentType = pageResponse.headers['content-type'] || 'text/html';
    const finalUrl = pageResponse.request?.res?.responseUrl || normalizedUrl;
    const html = typeof pageResponse.data === 'string' ? pageResponse.data : String(pageResponse.data);

    // Parallel check for robots.txt & sitemap.xml
    const parsedObj = new URL(finalUrl);
    const baseUrl = `${parsedObj.protocol}//${parsedObj.host}`;

    const [robotsTxtExists, sitemapExists] = await Promise.all([
      checkExists(`${baseUrl}/robots.txt`),
      checkExists(`${baseUrl}/sitemap.xml`),
    ]);

    const $ = cheerio.load(html);

    const httpsEnabled = finalUrl.startsWith('https://');
    const language = $('html').attr('lang') || $('html').attr('xml:lang') || 'Not specified';
    const charset =
      $('meta[charset]').attr('charset') ||
      $('meta[http-equiv="Content-Type"]').attr('content')?.match(/charset=([^;]+)/i)?.[1] ||
      'UTF-8';

    const pageTitle = $('title').first().text().trim() || null;
    const metaDescription =
      $('meta[name="description" i]').attr('content')?.trim() ||
      $('meta[property="og:description" i]').attr('content')?.trim() ||
      null;

    const metaKeywords = $('meta[name="keywords" i]').attr('content')?.trim() || null;
    const rawCanonical = $('link[rel="canonical" i]').attr('href')?.trim() || null;
    const canonicalURL = rawCanonical ? resolveUrl(rawCanonical, finalUrl) : null;

    const faviconRaw =
      $('link[rel="icon" i]').attr('href') ||
      $('link[rel="shortcut icon" i]').attr('href') ||
      '/favicon.ico';
    const favicon = resolveUrl(faviconRaw, finalUrl);

    const robotsMeta = $('meta[name="robots" i]').attr('content')?.trim() || null;
    const viewportPresent = $('meta[name="viewport" i]').length > 0;

    const h1Count = $('h1').length;
    const h2Count = $('h2').length;
    const h3Count = $('h3').length;

    $('script, style, noscript, svg, iframe').remove();
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    const words = bodyText.length > 0 ? bodyText.split(/\s+/).filter((w) => w.length > 0) : [];
    const wordCount = words.length;
    const paragraphCount = $('p').length;
    const minutes = Math.ceil(wordCount / 200);
    const estimatedReadingTime = wordCount === 0 ? '0 min read' : `${minutes} min read`;

    const images = $('img');
    const imageCount = images.length;
    let imagesMissingAlt = 0;
    images.each((_, el) => {
      const alt = $(el).attr('alt');
      if (!alt || alt.trim() === '') imagesMissingAlt++;
    });

    const anchors = $('a[href]');
    let internalLinks = 0;
    let externalLinks = 0;
    anchors.each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        try {
          const targetHost = new URL(href, finalUrl).hostname;
          if (targetHost === parsedObj.hostname || targetHost.endsWith(`.${parsedObj.hostname}`)) {
            internalLinks++;
          } else {
            externalLinks++;
          }
        } catch {}
      }
    });

    const ogTitle = $('meta[property="og:title" i]').attr('content')?.trim();
    const ogDescription = $('meta[property="og:description" i]').attr('content')?.trim();
    const ogImageRaw = $('meta[property="og:image" i]').attr('content')?.trim();
    const ogImage = ogImageRaw ? resolveUrl(ogImageRaw, finalUrl) : null;
    const ogPresent = !!(ogTitle || ogDescription || ogImage);

    const openGraphTags = {
      present: ogPresent,
      title: ogTitle || null,
      description: ogDescription || null,
      image: ogImage || null,
      type: $('meta[property="og:type" i]').attr('content')?.trim() || null,
      url: $('meta[property="og:url" i]').attr('content')?.trim() || null,
      siteName: $('meta[property="og:site_name" i]').attr('content')?.trim() || null,
    };

    const twitterCardType = $('meta[name="twitter:card" i]').attr('content')?.trim();
    const twitterTitle = $('meta[name="twitter:title" i]').attr('content')?.trim();
    const twitterDescription = $('meta[name="twitter:description" i]').attr('content')?.trim();
    const twitterImageRaw = $('meta[name="twitter:image" i]').attr('content')?.trim();
    const twitterImage = twitterImageRaw ? resolveUrl(twitterImageRaw, finalUrl) : null;
    const twitterPresent = !!(twitterCardType || twitterTitle || twitterDescription || twitterImage);

    const twitterCard = {
      present: twitterPresent,
      card: twitterCardType || null,
      title: twitterTitle || null,
      description: twitterDescription || null,
      image: twitterImage || null,
    };

    // Calculate SEO score
    let seoScore = 0;
    if (pageTitle) seoScore += 15;
    if (metaDescription) seoScore += 15;
    if (httpsEnabled) seoScore += 10;
    if (viewportPresent) seoScore += 10;
    if (h1Count >= 1) seoScore += 10;
    if (canonicalURL) seoScore += 10;
    if (wordCount > 300) seoScore += 10;
    if (ogPresent) seoScore += 10;
    if (twitterPresent) seoScore += 5;
    if (robotsTxtExists) seoScore += 5;
    if (sitemapExists) seoScore += 10;

    seoScore = Math.min(100, Math.max(0, seoScore));

    let performanceRating = 'Slow';
    if (responseTime < 200) performanceRating = 'Fast';
    else if (responseTime <= 600) performanceRating = 'Average';

    const warnings = [];
    const recommendations = [];

    if (!pageTitle) {
      warnings.push('Page title is missing.');
      recommendations.push('Add a concise <title> tag (50-60 characters) to define the page title.');
    } else if (pageTitle.length > 60) {
      warnings.push(`Page title is long (${pageTitle.length} chars) and may be truncated.`);
      recommendations.push('Keep page titles under 60 characters for optimal SERP display.');
    }

    if (!metaDescription) {
      warnings.push('Meta description is missing.');
      recommendations.push('Add a meta description (120-160 characters) to improve SERP click-through rates.');
    }

    if (!httpsEnabled) {
      warnings.push('Website is not using HTTPS encryption.');
      recommendations.push('Enable HTTPS with an SSL certificate.');
    }

    if (!viewportPresent) {
      warnings.push('Mobile viewport meta tag is missing.');
      recommendations.push('Add <meta name="viewport" content="width=device-width, initial-scale=1.0">.');
    }

    if (h1Count === 0) {
      warnings.push('No H1 heading found on the page.');
      recommendations.push('Include exactly one <h1> heading on the page.');
    } else if (h1Count > 1) {
      warnings.push(`Found ${h1Count} H1 headings.`);
      recommendations.push('Use only one <h1> tag per page for clean structural hierarchy.');
    }

    if (!canonicalURL) {
      warnings.push('Canonical URL tag is missing.');
      recommendations.push('Add a <link rel="canonical"> tag to specify the authoritative URL.');
    }

    if (wordCount < 300) {
      warnings.push(`Low word count (${wordCount} words).`);
      recommendations.push('Increase content to over 300 words for better search indexability.');
    }

    if (imagesMissingAlt > 0) {
      warnings.push(`${imagesMissingAlt} of ${imageCount} images are missing alt text.`);
      recommendations.push('Add alt attributes to all images to improve accessibility and image SEO.');
    }

    if (!ogPresent) {
      warnings.push('Open Graph metadata is missing.');
      recommendations.push('Add Open Graph tags (og:title, og:description, og:image) for link previews.');
    }

    if (!twitterPresent) {
      warnings.push('Twitter Card tags are missing.');
      recommendations.push('Add twitter:card and twitter:title tags.');
    }

    if (!robotsTxtExists) {
      warnings.push('robots.txt file was not detected.');
      recommendations.push('Create a robots.txt file to guide search engine crawlers.');
    }

    if (!sitemapExists) {
      warnings.push('sitemap.xml file was not detected.');
      recommendations.push('Create and submit an XML sitemap.');
    }

    if (responseTime > 600) {
      warnings.push(`Server response time is slow (${responseTime} ms).`);
      recommendations.push('Optimize server hosting, database queries, and static asset caching.');
    }

    return res.status(200).json({
      success: true,
      url: finalUrl,
      analyzedAt: new Date().toISOString(),
      statusCode: pageResponse.status,
      statusText: pageResponse.statusText || 'OK',
      responseTime,
      contentType,
      pageTitle,
      metaDescription,
      metaKeywords,
      canonicalURL,
      favicon,
      language,
      charset,
      httpsEnabled,
      h1Count,
      h2Count,
      h3Count,
      paragraphCount,
      wordCount,
      estimatedReadingTime,
      imageCount,
      imagesMissingAlt,
      internalLinks,
      externalLinks,
      viewportPresent,
      robotsMeta,
      robotsTxtExists,
      sitemapExists,
      openGraphTags,
      twitterCard,
      performanceRating,
      seoScore,
      warnings,
      recommendations,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to establish connection with the target website.',
    });
  }
}

async function checkExists(targetUrl) {
  try {
    const res = await axios.head(targetUrl, {
      headers: { 'User-Agent': DEFAULT_USER_AGENT },
      timeout: 3000,
      validateStatus: (status) => status >= 200 && status < 400,
    });
    return res.status >= 200 && res.status < 400;
  } catch {
    return false;
  }
}

function resolveUrl(relativeOrAbsolute, baseUrl) {
  if (!relativeOrAbsolute) return null;
  try {
    return new URL(relativeOrAbsolute, baseUrl).href;
  } catch {
    return relativeOrAbsolute;
  }
}
