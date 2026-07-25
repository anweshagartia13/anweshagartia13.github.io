import { URL } from 'url';

/**
 * Normalizes input URL by adding protocol if missing and validating format
 */
export const normalizeUrl = (inputUrl) => {
  if (!inputUrl || typeof inputUrl !== 'string') {
    throw new Error('Invalid input URL provided');
  }

  let trimmed = inputUrl.trim();

  // Add https:// protocol if omitted
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    
    // Ensure protocol is http or https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Only HTTP and HTTPS protocols are supported');
    }

    // Check host validity
    if (!parsed.hostname || parsed.hostname.includes(' ') || !parsed.hostname.includes('.')) {
      // Could be localhost, but for web analyzer require a valid domain structure
      if (parsed.hostname !== 'localhost' && !parsed.hostname.endsWith('.local')) {
        throw new Error('Invalid domain name provided');
      }
    }

    return parsed.href;
  } catch (err) {
    if (err.message.includes('supported') || err.message.includes('domain')) {
      throw err;
    }
    throw new Error('Invalid URL format. Example format: https://example.com');
  }
};

/**
 * Resolves a relative path to absolute using base URL
 */
export const resolveAbsoluteUrl = (relativeOrAbsolute, baseUrl) => {
  if (!relativeOrAbsolute) return null;
  try {
    return new URL(relativeOrAbsolute, baseUrl).href;
  } catch {
    return relativeOrAbsolute;
  }
};

/**
 * Checks if a link target is internal to base host
 */
export const isInternalLink = (targetUrl, baseUrl) => {
  try {
    const targetObj = new URL(targetUrl, baseUrl);
    const baseObj = new URL(baseUrl);
    return targetObj.hostname === baseObj.hostname || targetObj.hostname.endsWith(`.${baseObj.hostname}`);
  } catch {
    return false;
  }
};
