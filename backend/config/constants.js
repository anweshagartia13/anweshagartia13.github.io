export const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 PulseIQ-Analyzer/1.0';

export const FETCH_TIMEOUT = 10000; // 10 seconds
export const MAX_CONTENT_SIZE = 10 * 1024 * 1024; // 10MB limit

export const SCORE_WEIGHTS = {
  TITLE: 15,
  META_DESCRIPTION: 15,
  HTTPS: 10,
  VIEWPORT: 10,
  H1: 10,
  CANONICAL: 10,
  WORD_COUNT: 10, // > 300 words
  OPEN_GRAPH: 10,
  TWITTER_CARD: 5,
  ROBOTS_TXT: 5,
  SITEMAP: 10,
};

export const PERFORMANCE_THRESHOLDS = {
  FAST_MS: 200,
  AVERAGE_MS: 600,
};
