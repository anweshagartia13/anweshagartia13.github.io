import { analyzeSeoAndMetadata } from '../backend/services/seoAnalyzerService.js';
import {
  perfectScoreHtml,
  goodScoreHtml,
  moderateScoreHtml,
  lowScoreHtml,
  zeroScoreHtml,
} from './fixtures/htmlFixtures.js';

describe('SEO Score Algorithm & Rules Unit Tests', () => {
  const basePageData = {
    finalUrl: 'https://example.com/',
    statusCode: 200,
    statusText: 'OK',
    responseTime: 150,
    contentType: 'text/html',
    robotsTxtExists: true,
    sitemapExists: true,
  };

  test('Score 100: Perfect HTML fixture achieves max score 100/100', () => {
    const report = analyzeSeoAndMetadata(perfectScoreHtml, basePageData);
    expect(report.seoScore).toBe(100);
  });

  test('Score 85: Good HTML fixture (Missing Twitter & Sitemap) scores 85/100', () => {
    const pageDataNoSitemap = { ...basePageData, sitemapExists: false };
    const report = analyzeSeoAndMetadata(goodScoreHtml, pageDataNoSitemap);
    expect(report.seoScore).toBe(85);
  });

  test('Score 70: Moderate HTML fixture achieves expected 70/100', () => {
    const pageDataNoFiles = { ...basePageData, robotsTxtExists: false, sitemapExists: false };
    const report = analyzeSeoAndMetadata(moderateScoreHtml, pageDataNoFiles);
    expect(report.seoScore).toBe(70);
  });

  test('Score 45: Low score HTML fixture scores 45/100', () => {
    const pageDataNoFiles = { ...basePageData, robotsTxtExists: false, sitemapExists: false };
    const report = analyzeSeoAndMetadata(lowScoreHtml, pageDataNoFiles);
    expect(report.seoScore).toBe(45);
  });

  test('Score 0: Zero score HTML fixture scores 0/100', () => {
    const pageDataHttpNoFiles = {
      finalUrl: 'http://example.com/',
      statusCode: 200,
      statusText: 'OK',
      responseTime: 800,
      contentType: 'text/html',
      robotsTxtExists: false,
      sitemapExists: false,
    };
    const report = analyzeSeoAndMetadata(zeroScoreHtml, pageDataHttpNoFiles);
    expect(report.seoScore).toBe(0);
  });

  describe('Individual Scoring Rule Verification', () => {
    const bareMinimumData = {
      finalUrl: 'http://example.com/',
      statusCode: 200,
      statusText: 'OK',
      responseTime: 100,
      contentType: 'text/html',
      robotsTxtExists: false,
      sitemapExists: false,
    };

    test('Rule 1: Title tag grants +15 points', () => {
      const report = analyzeSeoAndMetadata('<title>Test Title</title>', bareMinimumData);
      expect(report.seoScore).toBe(15);
    });

    test('Rule 2: Meta description grants +15 points', () => {
      const report = analyzeSeoAndMetadata('<meta name="description" content="test description" />', bareMinimumData);
      expect(report.seoScore).toBe(15);
    });

    test('Rule 3: HTTPS protocol grants +10 points', () => {
      const httpsData = { ...bareMinimumData, finalUrl: 'https://example.com/' };
      const report = analyzeSeoAndMetadata('', httpsData);
      expect(report.seoScore).toBe(10);
    });

    test('Rule 4: Viewport meta tag grants +10 points', () => {
      const report = analyzeSeoAndMetadata('<meta name="viewport" content="width=device-width" />', bareMinimumData);
      expect(report.seoScore).toBe(10);
    });

    test('Rule 5: H1 heading tag grants +10 points', () => {
      const report = analyzeSeoAndMetadata('<h1>Primary Heading</h1>', bareMinimumData);
      expect(report.seoScore).toBe(10);
    });

    test('Rule 6: Canonical link tag grants +10 points', () => {
      const report = analyzeSeoAndMetadata('<link rel="canonical" href="https://example.com" />', bareMinimumData);
      expect(report.seoScore).toBe(10);
    });

    test('Rule 7: Word count > 300 words grants +10 points', () => {
      const html300 = `<p>${'word '.repeat(350)}</p>`;
      const report = analyzeSeoAndMetadata(html300, bareMinimumData);
      expect(report.seoScore).toBe(10);
    });

    test('Rule 8: OpenGraph tags grant +10 points', () => {
      const report = analyzeSeoAndMetadata('<meta property="og:title" content="OG Title" />', bareMinimumData);
      expect(report.seoScore).toBe(10);
    });

    test('Rule 9: Twitter card tags grant +5 points', () => {
      const report = analyzeSeoAndMetadata('<meta name="twitter:card" content="summary" />', bareMinimumData);
      expect(report.seoScore).toBe(5);
    });

    test('Rule 10: Robots.txt existence grants +5 points', () => {
      const robotsData = { ...bareMinimumData, robotsTxtExists: true };
      const report = analyzeSeoAndMetadata('', robotsData);
      expect(report.seoScore).toBe(5);
    });

    test('Rule 11: Sitemap.xml existence grants +10 points', () => {
      const sitemapData = { ...bareMinimumData, sitemapExists: true };
      const report = analyzeSeoAndMetadata('', sitemapData);
      expect(report.seoScore).toBe(10);
    });
  });
});
