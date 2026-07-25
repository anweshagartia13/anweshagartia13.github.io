import * as cheerio from 'cheerio';
import { SCORE_WEIGHTS, PERFORMANCE_THRESHOLDS } from '../config/constants.js';
import { resolveAbsoluteUrl, isInternalLink } from '../utils/urlHelper.js';

/**
 * Analyzes HTML content with Cheerio and generates complete JSON report
 */
export const analyzeSeoAndMetadata = (html, pageData) => {
  const {
    finalUrl,
    statusCode,
    statusText,
    responseTime,
    contentType,
    robotsTxtExists,
    sitemapExists,
  } = pageData;

  const $ = cheerio.load(html);

  // 1. Basic Technical Details
  const httpsEnabled = finalUrl.startsWith('https://');
  const language = $('html').attr('lang') || $('html').attr('xml:lang') || 'Not specified';
  const charset =
    $('meta[charset]').attr('charset') ||
    $('meta[http-equiv="Content-Type"]').attr('content')?.match(/charset=([^;]+)/i)?.[1] ||
    'Not specified';

  // 2. Metadata
  const pageTitle = $('title').first().text().trim() || null;
  const metaDescription =
    $('meta[name="description" i]').attr('content')?.trim() ||
    $('meta[property="og:description" i]').attr('content')?.trim() ||
    null;

  const metaKeywords = $('meta[name="keywords" i]').attr('content')?.trim() || null;

  const rawCanonical = $('link[rel="canonical" i]').attr('href')?.trim() || null;
  const canonicalURL = rawCanonical ? resolveAbsoluteUrl(rawCanonical, finalUrl) : null;

  // Favicon detection
  const faviconRaw =
    $('link[rel="icon" i]').attr('href') ||
    $('link[rel="shortcut icon" i]').attr('href') ||
    $('link[rel="apple-touch-icon" i]').attr('href') ||
    '/favicon.ico';
  const favicon = resolveAbsoluteUrl(faviconRaw, finalUrl);

  const robotsMeta = $('meta[name="robots" i]').attr('content')?.trim() || null;
  const viewportPresent = $('meta[name="viewport" i]').length > 0;

  // 3. Headings Structure
  const h1Count = $('h1').length;
  const h2Count = $('h2').length;
  const h3Count = $('h3').length;

  // 4. Content Statistics
  // Extract visible body text (excluding scripts, styles, noscript)
  $('script, style, noscript, svg, iframe, option').remove();
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();

  const words = bodyText.length > 0 ? bodyText.split(/\s+/).filter((w) => w.length > 0) : [];
  const wordCount = words.length;
  const paragraphCount = $('p').length;

  // WPM estimated reading time (approx 200 wpm)
  const minutes = Math.ceil(wordCount / 200);
  const estimatedReadingTime = wordCount === 0 ? '0 min read' : `${minutes} min read`;

  // 5. Image Audit
  const images = $('img');
  const imageCount = images.length;
  let imagesMissingAlt = 0;
  images.each((_, el) => {
    const alt = $(el).attr('alt');
    if (!alt || alt.trim() === '') {
      imagesMissingAlt++;
    }
  });

  // 6. Links Analysis
  const anchorTags = $('a[href]');
  let internalLinks = 0;
  let externalLinks = 0;

  anchorTags.each((_, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
      if (isInternalLink(href, finalUrl)) {
        internalLinks++;
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        externalLinks++;
      }
    }
  });

  // 7. OpenGraph Tags
  const ogTitle = $('meta[property="og:title" i]').attr('content')?.trim();
  const ogDescription = $('meta[property="og:description" i]').attr('content')?.trim();
  const ogImageRaw = $('meta[property="og:image" i]').attr('content')?.trim();
  const ogImage = ogImageRaw ? resolveAbsoluteUrl(ogImageRaw, finalUrl) : null;
  const ogType = $('meta[property="og:type" i]').attr('content')?.trim();
  const ogUrl = $('meta[property="og:url" i]').attr('content')?.trim();
  const ogSiteName = $('meta[property="og:site_name" i]').attr('content')?.trim();

  const ogPresent = !!(ogTitle || ogDescription || ogImage);
  const openGraphTags = {
    present: ogPresent,
    title: ogTitle || null,
    description: ogDescription || null,
    image: ogImage || null,
    type: ogType || null,
    url: ogUrl || null,
    siteName: ogSiteName || null,
  };

  // 8. Twitter Cards
  const twitterCardType = $('meta[name="twitter:card" i]').attr('content')?.trim();
  const twitterTitle = $('meta[name="twitter:title" i]').attr('content')?.trim();
  const twitterDescription = $('meta[name="twitter:description" i]').attr('content')?.trim();
  const twitterImageRaw = $('meta[name="twitter:image" i]').attr('content')?.trim();
  const twitterImage = twitterImageRaw ? resolveAbsoluteUrl(twitterImageRaw, finalUrl) : null;

  const twitterPresent = !!(twitterCardType || twitterTitle || twitterDescription || twitterImage);
  const twitterCard = {
    present: twitterPresent,
    card: twitterCardType || null,
    title: twitterTitle || null,
    description: twitterDescription || null,
    image: twitterImage || null,
  };

  // 9. SEO Score Calculation
  let seoScore = 0;
  if (pageTitle) seoScore += SCORE_WEIGHTS.TITLE;
  if (metaDescription) seoScore += SCORE_WEIGHTS.META_DESCRIPTION;
  if (httpsEnabled) seoScore += SCORE_WEIGHTS.HTTPS;
  if (viewportPresent) seoScore += SCORE_WEIGHTS.VIEWPORT;
  if (h1Count >= 1) seoScore += SCORE_WEIGHTS.H1;
  if (canonicalURL) seoScore += SCORE_WEIGHTS.CANONICAL;
  if (wordCount > 300) seoScore += SCORE_WEIGHTS.WORD_COUNT;
  if (ogPresent) seoScore += SCORE_WEIGHTS.OPEN_GRAPH;
  if (twitterPresent) seoScore += SCORE_WEIGHTS.TWITTER_CARD;
  if (robotsTxtExists) seoScore += SCORE_WEIGHTS.ROBOTS_TXT;
  if (sitemapExists) seoScore += SCORE_WEIGHTS.SITEMAP;

  seoScore = Math.min(100, Math.max(0, seoScore));

  // 10. Performance Rating
  let performanceRating = 'Slow';
  if (responseTime < PERFORMANCE_THRESHOLDS.FAST_MS) {
    performanceRating = 'Fast';
  } else if (responseTime <= PERFORMANCE_THRESHOLDS.AVERAGE_MS) {
    performanceRating = 'Average';
  }

  // 11. Intelligent Warnings & Recommendations
  const { warnings, recommendations } = generateAuditFeedback({
    pageTitle,
    metaDescription,
    httpsEnabled,
    viewportPresent,
    h1Count,
    canonicalURL,
    wordCount,
    imageCount,
    imagesMissingAlt,
    ogPresent,
    twitterPresent,
    robotsTxtExists,
    sitemapExists,
    responseTime,
    statusCode,
  });

  return {
    statusCode,
    statusText,
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
  };
};

/**
 * Generates warning alerts and actionable recommendations
 */
function generateAuditFeedback(metrics) {
  const warnings = [];
  const recommendations = [];

  // Title checks
  if (!metrics.pageTitle) {
    warnings.push('Page title is missing.');
    recommendations.push('Add a concise, unique <title> tag (50-60 characters) to define the page title for search engines.');
  } else if (metrics.pageTitle.length < 10) {
    warnings.push('Page title is very short.');
    recommendations.push('Expand your title tag to describe page context accurately.');
  } else if (metrics.pageTitle.length > 60) {
    warnings.push(`Page title is ${metrics.pageTitle.length} characters long and may be truncated in search results.`);
    recommendations.push('Keep page titles under 60 characters for optimal display in SERPs.');
  }

  // Meta description
  if (!metrics.metaDescription) {
    warnings.push('Meta description is missing.');
    recommendations.push('Add a meta description (120-160 characters) to improve your click-through rate in search results.');
  } else if (metrics.metaDescription.length < 50) {
    warnings.push('Meta description is too short.');
  } else if (metrics.metaDescription.length > 160) {
    warnings.push('Meta description exceeds 160 characters and may get cut off.');
  }

  // HTTPS check
  if (!metrics.httpsEnabled) {
    warnings.push('Website is not using HTTPS encryption.');
    recommendations.push('Enable HTTPS with an SSL certificate to protect user data and boost Google ranking signals.');
  }

  // Viewport
  if (!metrics.viewportPresent) {
    warnings.push('Mobile viewport meta tag is missing.');
    recommendations.push('Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> for mobile responsiveness.');
  }

  // Headings
  if (metrics.h1Count === 0) {
    warnings.push('No H1 heading found on the page.');
    recommendations.push('Include exactly one <h1> tag representing the primary subject of the page.');
  } else if (metrics.h1Count > 1) {
    warnings.push(`Found ${metrics.h1Count} H1 headings.`);
    recommendations.push('Use only one <h1> heading per page for clean structural hierarchy.');
  }

  // Canonical tag
  if (!metrics.canonicalURL) {
    warnings.push('Canonical URL tag is missing.');
    recommendations.push('Add a <link rel="canonical"> tag to prevent duplicate content issues across URL parameters.');
  }

  // Content length
  if (metrics.wordCount < 300) {
    warnings.push(`Low word count (${metrics.wordCount} words). Thin content may rank lower.`);
    recommendations.push('Increase substantive textual content to over 300 words to provide value to visitors.');
  }

  // Image Alt attributes
  if (metrics.imagesMissingAlt > 0) {
    warnings.push(`${metrics.imagesMissingAlt} of ${metrics.imageCount} images are missing alt text.`);
    recommendations.push('Improve image alt text to boost accessibility and allow search engines to index image context.');
  }

  // Open Graph & Social Cards
  if (!metrics.ogPresent) {
    warnings.push('Open Graph social sharing metadata is missing.');
    recommendations.push('Add Open Graph tags (og:title, og:description, og:image) to enhance rich link previews on social platforms.');
  }

  if (!metrics.twitterPresent) {
    warnings.push('Twitter Card meta tags are missing.');
    recommendations.push('Add twitter:card, twitter:title, and twitter:image tags for branded Twitter preview cards.');
  }

  // Robots & Sitemap
  if (!metrics.robotsTxtExists) {
    warnings.push('robots.txt file was not detected at domain root.');
    recommendations.push('Create a robots.txt file to guide search engine web crawlers.');
  }

  if (!metrics.sitemapExists) {
    warnings.push('sitemap.xml was not detected at domain root.');
    recommendations.push('Create and submit an XML sitemap (sitemap.xml) to help search engines discover all pages.');
  }

  // Speed / Response time
  if (metrics.responseTime > 600) {
    warnings.push(`Server response time is slow (${metrics.responseTime} ms).`);
    recommendations.push('Optimize server infrastructure, database queries, and caching to keep response time below 200 ms.');
  }

  return { warnings, recommendations };
}
