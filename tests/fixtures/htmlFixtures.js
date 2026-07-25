/**
 * HTML Fixtures for testing SEO Scoring Rules
 */

// 1. Perfect HTML Fixture (> 300 words, all metadata)
export const perfectScoreHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PulseIQ - Premier Website Audit Engine & SEO Analyzer</title>
  <meta name="description" content="Discover actionable SEO insights, technical metadata, open graph validation, and performance speed testing with PulseIQ." />
  <link rel="canonical" href="https://example.com/audit" />
  <link rel="icon" href="/favicon.ico" />
  <meta property="og:title" content="PulseIQ SEO Analyzer" />
  <meta property="og:description" content="Instant website health analysis." />
  <meta property="og:image" content="https://example.com/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="PulseIQ" />
</head>
<body>
  <h1>PulseIQ Automated SEO Audit Platform</h1>
  <h2>Enterprise Architectural Analysis</h2>
  <p>${'Comprehensive auditing engine '.repeat(50)}</p>
  <p>${'Search engine optimization analysis '.repeat(50)}</p>
  <img src="https://example.com/logo.png" alt="PulseIQ Logo" />
  <a href="https://example.com/about">About Us</a>
  <a href="https://github.com">GitHub Repository</a>
</body>
</html>
`;

// 2. Good HTML Fixture
export const goodScoreHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>High Quality Web Engineering</title>
  <meta name="description" content="Comprehensive web development standards and SEO optimizations for modern applications." />
  <link rel="canonical" href="https://example.com/engineering" />
  <meta property="og:title" content="Engineering Standards" />
</head>
<body>
  <h1>Modern Full-Stack Web Development</h1>
  <p>${'High performance code quality '.repeat(50)}</p>
</body>
</html>
`;

// 3. Moderate HTML Fixture
export const moderateScoreHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Moderate Site</title>
  <meta name="description" content="A basic content website without open graph metadata or canonical tags." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <h1>Basic Information Portal</h1>
  <p>${'Standard text content sample for analysis '.repeat(50)}</p>
</body>
</html>
`;

// 4. Low Score HTML Fixture
export const lowScoreHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Short Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <h1>Under Construction</h1>
  <p>Coming soon.</p>
</body>
</html>
`;

// 5. Zero Score HTML Fixture
export const zeroScoreHtml = `
<html>
<head></head>
<body>
  <div>Minimal raw text snippet</div>
</body>
</html>
`;

// 6. Broken HTML Fixture
export const brokenHtml = `
<html lang="en"><head><title>Unclosed Tag Site</title><meta name="description" content="test"></head><body><h1>Heading without close tag</h1><p>some text</body></html>
`;

// 7. Large HTML Payload Fixture
export const largeHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Large Data Payload</title>
  <meta name="description" content="Testing parser efficiency under large payload scenarios." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <h1>Big Payload Page</h1>
  ${'<div><p>Repeated paragraph data element for memory stress testing.</p></div>'.repeat(3000)}
</body>
</html>
`;
