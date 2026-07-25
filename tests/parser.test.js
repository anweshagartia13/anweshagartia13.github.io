import { analyzeSeoAndMetadata } from '../backend/services/seoAnalyzerService.js';
import {
  perfectScoreHtml,
  goodScoreHtml,
  moderateScoreHtml,
  lowScoreHtml,
  zeroScoreHtml,
  brokenHtml,
  largeHtml,
} from './fixtures/htmlFixtures.js';

describe('Cheerio SEO Parser Engine Unit Tests', () => {
  const basePageData = {
    finalUrl: 'https://example.com/',
    statusCode: 200,
    statusText: 'OK',
    responseTime: 150,
    contentType: 'text/html; charset=UTF-8',
    robotsTxtExists: true,
    sitemapExists: true,
  };

  test('Happy Path: Parses perfect HTML fixture and returns complete audit metrics', () => {
    const report = analyzeSeoAndMetadata(perfectScoreHtml, basePageData);

    expect(report.pageTitle).toBe('PulseIQ - Premier Website Audit Engine & SEO Analyzer');
    expect(report.metaDescription).toContain('Discover actionable SEO insights');
    expect(report.canonicalURL).toBe('https://example.com/audit');
    expect(report.h1Count).toBe(1);
    expect(report.h2Count).toBe(1);
    expect(report.wordCount).toBeGreaterThan(300);
    expect(report.estimatedReadingTime).toMatch(/\d+ min read/);
    expect(report.openGraphTags.present).toBe(true);
    expect(report.twitterCard.present).toBe(true);
    expect(report.seoScore).toBe(100);
    expect(report.performanceRating).toBe('Fast');
    expect(report.warnings).toHaveLength(0);
  });

  test('Missing Title: Handles missing <title> tag gracefully', () => {
    const htmlNoTitle = '<html><head><meta name="description" content="test"></head><body><h1>Title Missing</h1></body></html>';
    const report = analyzeSeoAndMetadata(htmlNoTitle, basePageData);

    expect(report.pageTitle).toBeNull();
    expect(report.warnings).toContain('Page title is missing.');
    expect(report.recommendations.some((r) => r.includes('<title>'))).toBe(true);
  });

  test('Missing Meta Description: Flags missing meta description', () => {
    const htmlNoDesc = '<html><head><title>Test Title</title></head><body><h1>Heading</h1></body></html>';
    const report = analyzeSeoAndMetadata(htmlNoDesc, basePageData);

    expect(report.metaDescription).toBeNull();
    expect(report.warnings).toContain('Meta description is missing.');
  });

  test('Missing H1: Identifies 0 H1 headings', () => {
    const htmlNoH1 = '<html><head><title>Test</title></head><body><h2>Subheading Only</h2></body></html>';
    const report = analyzeSeoAndMetadata(htmlNoH1, basePageData);

    expect(report.h1Count).toBe(0);
    expect(report.warnings).toContain('No H1 heading found on the page.');
  });

  test('Multiple H1: Flags multiple H1 headings on a single page', () => {
    const htmlMultiH1 = '<html><body><h1>First H1</h1><h1>Second H1</h1></body></html>';
    const report = analyzeSeoAndMetadata(htmlMultiH1, basePageData);

    expect(report.h1Count).toBe(2);
    expect(report.warnings.some((w) => w.includes('2 H1 headings'))).toBe(true);
  });

  test('Empty HTML: Handles empty string input without crashing', () => {
    const report = analyzeSeoAndMetadata('', basePageData);

    expect(report.pageTitle).toBeNull();
    expect(report.h1Count).toBe(0);
    expect(report.wordCount).toBe(0);
    expect(report.estimatedReadingTime).toBe('0 min read');
  });

  test('Broken HTML: Correctly parses malformed and unclosed tags', () => {
    const report = analyzeSeoAndMetadata(brokenHtml, basePageData);

    expect(report.pageTitle).toBe('Unclosed Tag Site');
    expect(report.h1Count).toBe(1);
  });

  test('Large HTML: Efficiently handles high node volume payloads', () => {
    const startTime = Date.now();
    const report = analyzeSeoAndMetadata(largeHtml, basePageData);
    const duration = Date.now() - startTime;

    expect(report.pageTitle).toBe('Large Data Payload');
    expect(report.wordCount).toBeGreaterThan(5000);
    expect(duration).toBeLessThan(1000); // Must parse in under 1 second
  });

  test('Image Alt Text Audit: Counts missing alt attributes accurately', () => {
    const htmlImages = `
      <html><body>
        <img src="1.png" alt="Valid alt text" />
        <img src="2.png" alt="" />
        <img src="3.png" />
      </body></html>
    `;
    const report = analyzeSeoAndMetadata(htmlImages, basePageData);

    expect(report.imageCount).toBe(3);
    expect(report.imagesMissingAlt).toBe(2);
    expect(report.warnings.some((w) => w.includes('2 of 3 images'))).toBe(true);
  });
});
