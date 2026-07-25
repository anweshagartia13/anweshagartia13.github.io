import { normalizeUrl } from '../utils/urlHelper.js';

export const validateUrlMiddleware = (req, res, next) => {
  try {
    const { url } = req.body || {};

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({
        success: false,
        error: 'URL is required. Please provide a valid target URL in request body, e.g., { "url": "https://google.com" }',
        code: 'MISSING_URL',
      });
    }

    const normalizedUrl = normalizeUrl(url);
    req.normalizedUrl = normalizedUrl;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message || 'Invalid URL format.',
      code: 'INVALID_URL',
    });
  }
};
