import axios from 'axios';
import { DEFAULT_USER_AGENT, FETCH_TIMEOUT, MAX_CONTENT_SIZE } from '../config/constants.js';

/**
 * Service to fetch website content and auxiliary files (robots.txt, sitemap.xml)
 */
export const fetchWebsiteData = async (targetUrl) => {
  const startTime = performance.now();

  try {
    // 1. Fetch main page HTML
    const pageResponse = await axios.get(targetUrl, {
      headers: {
        'User-Agent': DEFAULT_USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: FETCH_TIMEOUT,
      maxRedirects: 5,
      maxContentLength: MAX_CONTENT_SIZE,
      validateStatus: (status) => status < 500, // Handle 4xx as valid responses to analyze error pages
    });

    const responseTime = Math.round(performance.now() - startTime);

    const contentType = pageResponse.headers['content-type'] || 'text/html';

    // Verify response is HTML
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
      const error = new Error(`Target returned non-HTML content type (${contentType}). Only webpage analysis is supported.`);
      error.statusCode = 400;
      error.code = 'NON_HTML_RESPONSE';
      throw error;
    }

    const html = typeof pageResponse.data === 'string' ? pageResponse.data : String(pageResponse.data);
    const finalUrl = pageResponse.request?.res?.responseUrl || targetUrl;

    // 2. Parallel check for auxiliary assets (robots.txt and sitemap.xml)
    const parsedUrl = new URL(finalUrl);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;

    const [robotsTxtExists, sitemapExists] = await Promise.all([
      checkResourceExists(`${baseUrl}/robots.txt`),
      checkResourceExists(`${baseUrl}/sitemap.xml`),
    ]);

    return {
      html,
      statusCode: pageResponse.status,
      statusText: pageResponse.statusText || (pageResponse.status === 200 ? 'OK' : 'Notice'),
      responseTime,
      contentType,
      finalUrl,
      robotsTxtExists,
      sitemapExists,
    };
  } catch (err) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
      const timeoutError = new Error(`Connection timed out after ${FETCH_TIMEOUT / 1000} seconds. The target website might be slow or blocking automated requests.`);
      timeoutError.statusCode = 504;
      timeoutError.code = 'ETIMEDOUT';
      timeoutError.responseTime = duration;
      throw timeoutError;
    }

    if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN') {
      const dnsError = new Error('DNS resolution failed. Domain name could not be resolved. Please verify the URL.');
      dnsError.statusCode = 404;
      dnsError.code = 'DNS_ERROR';
      dnsError.responseTime = duration;
      throw dnsError;
    }

    if (err.code === 'ERR_TOO_MANY_REDIRECTS') {
      const redirectError = new Error('Target website produced a redirect loop.');
      redirectError.statusCode = 508;
      redirectError.code = 'REDIRECT_LOOP';
      throw redirectError;
    }

    if (err.statusCode) {
      throw err;
    }

    // Default connection error
    const genericError = new Error(err.message || 'Failed to establish connection with the target server.');
    genericError.statusCode = err.response?.status || 502;
    genericError.code = 'FETCH_FAILED';
    genericError.responseTime = duration;
    throw genericError;
  }
};

/**
 * Helper to probe HEAD/GET request for static resources like robots.txt or sitemap.xml
 */
async function checkResourceExists(resourceUrl) {
  try {
    const res = await axios.head(resourceUrl, {
      headers: { 'User-Agent': DEFAULT_USER_AGENT },
      timeout: 3000,
      validateStatus: (status) => status >= 200 && status < 400,
    });
    return res.status >= 200 && res.status < 400;
  } catch {
    // Retry with GET if HEAD is blocked
    try {
      const res = await axios.get(resourceUrl, {
        headers: { 'User-Agent': DEFAULT_USER_AGENT },
        timeout: 3000,
        maxContentLength: 100000,
        validateStatus: (status) => status >= 200 && status < 400,
      });
      return res.status >= 200 && res.status < 400;
    } catch {
      return false;
    }
  }
}
