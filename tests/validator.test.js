import { normalizeUrl, resolveAbsoluteUrl, isInternalLink } from '../backend/utils/urlHelper.js';

describe('URL Helper & Validator Unit Tests', () => {
  describe('normalizeUrl()', () => {
    test('Prepends https:// protocol if protocol is omitted', () => {
      expect(normalizeUrl('example.com')).toBe('https://example.com/');
      expect(normalizeUrl('google.com/path')).toBe('https://google.com/path');
    });

    test('Preserves existing http:// or https:// protocol', () => {
      expect(normalizeUrl('http://example.com')).toBe('http://example.com/');
      expect(normalizeUrl('https://example.com')).toBe('https://example.com/');
    });

    test('Throws error for empty or non-string inputs', () => {
      expect(() => normalizeUrl('')).toThrow('Invalid input URL provided');
      expect(() => normalizeUrl(null)).toThrow('Invalid input URL provided');
      expect(() => normalizeUrl(12345)).toThrow('Invalid input URL provided');
    });

    test('Throws error for unsupported protocols like ftp://', () => {
      expect(() => normalizeUrl('ftp://example.com')).toThrow('Only HTTP and HTTPS protocols are supported');
    });

    test('Throws error for malformed domain names', () => {
      expect(() => normalizeUrl('http://invalid_domain_name_without_extension')).toThrow('Invalid domain name provided');
    });
  });

  describe('resolveAbsoluteUrl()', () => {
    const baseUrl = 'https://example.com/blog/article';

    test('Resolves relative paths to absolute URLs', () => {
      expect(resolveAbsoluteUrl('/images/logo.png', baseUrl)).toBe('https://example.com/images/logo.png');
      expect(resolveAbsoluteUrl('sub-page', baseUrl)).toBe('https://example.com/blog/sub-page');
    });

    test('Returns absolute URLs unchanged', () => {
      expect(resolveAbsoluteUrl('https://cdn.example.com/asset.css', baseUrl)).toBe('https://cdn.example.com/asset.css');
    });

    test('Handles null or undefined input gracefully', () => {
      expect(resolveAbsoluteUrl(null, baseUrl)).toBeNull();
      expect(resolveAbsoluteUrl(undefined, baseUrl)).toBeNull();
    });
  });

  describe('isInternalLink()', () => {
    const baseUrl = 'https://example.com';

    test('Identifies internal relative and subdomain links', () => {
      expect(isInternalLink('/contact', baseUrl)).toBe(true);
      expect(isInternalLink('https://example.com/pricing', baseUrl)).toBe(true);
      expect(isInternalLink('https://blog.example.com/post', baseUrl)).toBe(true);
    });

    test('Identifies external domain links', () => {
      expect(isInternalLink('https://google.com', baseUrl)).toBe(false);
      expect(isInternalLink('https://github.com/repository', baseUrl)).toBe(false);
    });
  });
});
