import { fetchWebsiteData } from '../services/scraperService.js';
import { analyzeSeoAndMetadata } from '../services/seoAnalyzerService.js';

export const analyzeWebsite = async (req, res, next) => {
  try {
    const targetUrl = req.normalizedUrl;

    // 1. Fetch raw page and auxiliary resources
    const pageData = await fetchWebsiteData(targetUrl);

    // 2. Perform Cheerio analysis and calculate metrics
    const auditResult = analyzeSeoAndMetadata(pageData.html, pageData);

    // 3. Return structured response
    return res.status(200).json({
      success: true,
      url: pageData.finalUrl,
      analyzedAt: new Date().toISOString(),
      ...auditResult,
    });
  } catch (err) {
    next(err);
  }
};
