import { SCORE_WEIGHTS, PERFORMANCE_THRESHOLDS } from '../backend/config/constants.js';
import { resolveAbsoluteUrl, isInternalLink } from '../backend/utils/urlHelper.js';

describe('Utility & Configuration Unit Tests', () => {
  test('SCORE_WEIGHTS configuration defines all 11 scoring rule weights', () => {
    const totalWeight = Object.values(SCORE_WEIGHTS).reduce((sum, w) => sum + w, 0);
    expect(totalWeight).toBe(110);
  });

  test('PERFORMANCE_THRESHOLDS defines correct speed boundaries', () => {
    expect(PERFORMANCE_THRESHOLDS.FAST_MS).toBe(200);
    expect(PERFORMANCE_THRESHOLDS.AVERAGE_MS).toBe(600);
  });

  test('resolveAbsoluteUrl resolves relative paths against different base domains', () => {
    expect(resolveAbsoluteUrl('/favicon.ico', 'https://domain.org/page')).toBe('https://domain.org/favicon.ico');
    expect(resolveAbsoluteUrl('../styles.css', 'https://domain.org/app/view')).toBe('https://domain.org/styles.css');
  });

  test('isInternalLink detects root domain matching and subdomains correctly', () => {
    expect(isInternalLink('https://docs.site.com', 'https://site.com')).toBe(true);
    expect(isInternalLink('https://external-domain.com', 'https://site.com')).toBe(false);
  });
});
