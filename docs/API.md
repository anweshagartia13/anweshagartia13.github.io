# PulseIQ API Documentation 📡

Official REST API documentation for **PulseIQ — Website Health & SEO Analyzer**.

---

## Endpoint Overview

### `POST /api/analyze`

Accepts a target website URL, fetches the webpage HTML, parses metadata via Cheerio, tests for auxiliary files (`robots.txt`, `sitemap.xml`), and returns a 30+ metric JSON audit report.

---

## Request Format

- **HTTP Method**: `POST`
- **Content-Type**: `application/json`

### Request Body Schema

| Field | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `url` | `string` | **Yes** | Target website URL or domain name to audit | `"https://google.com"` |

#### Request Example (cURL)
```bash
curl -X POST https://pulse-iq-frontend.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'
```

---

## Response Specifications

### Success Response (`200 OK`)

```json
{
  "success": true,
  "url": "https://www.google.com/",
  "analyzedAt": "2026-07-25T16:36:19.208Z",
  "statusCode": 200,
  "statusText": "OK",
  "responseTime": 161,
  "contentType": "text/html; charset=UTF-8",
  "pageTitle": "Google",
  "metaDescription": "Search the world's information, including webpages, images, videos and more.",
  "metaKeywords": null,
  "canonicalURL": "https://www.google.com/",
  "favicon": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
  "language": "en",
  "charset": "UTF-8",
  "httpsEnabled": true,
  "h1Count": 1,
  "h2Count": 0,
  "h3Count": 0,
  "paragraphCount": 12,
  "wordCount": 420,
  "estimatedReadingTime": "3 min read",
  "imageCount": 6,
  "imagesMissingAlt": 0,
  "internalLinks": 15,
  "externalLinks": 4,
  "viewportPresent": true,
  "robotsMeta": null,
  "robotsTxtExists": true,
  "sitemapExists": true,
  "openGraphTags": {
    "present": true,
    "title": "Google",
    "description": "Search Engine",
    "image": "https://www.google.com/og_image.png",
    "type": "website",
    "url": "https://www.google.com/",
    "siteName": "Google"
  },
  "twitterCard": {
    "present": true,
    "card": "summary_large_image",
    "title": "Google",
    "description": "Search Engine",
    "image": "https://www.google.com/og_image.png"
  },
  "performanceRating": "Fast",
  "seoScore": 95,
  "warnings": [],
  "recommendations": [
    "Keep page titles under 60 characters for optimal display in SERPs."
  ]
}
```

---

## Response Field Definitions

| Field | Type | Description |
| :--- | :--- | :--- |
| `statusCode` | `number` | Target website HTTP status code (e.g. 200) |
| `statusText` | `string` | Target HTTP status text (e.g. "OK") |
| `responseTime` | `number` | Round-trip latency in milliseconds |
| `contentType` | `string` | Response Content-Type header string |
| `pageTitle` | `string|null` | Content of `<title>` tag |
| `metaDescription` | `string|null` | Content of `<meta name="description">` |
| `canonicalURL` | `string|null` | Resolved absolute canonical URL link |
| `favicon` | `string` | Absolute URL to site favicon |
| `httpsEnabled` | `boolean` | `true` if target uses HTTPS encryption |
| `h1Count` | `number` | Count of `<h1>` heading elements |
| `wordCount` | `number` | Total visible body word count |
| `estimatedReadingTime`| `string` | Estimated reading duration (e.g. "2 min read") |
| `imagesMissingAlt` | `number` | Images lacking `alt` description text |
| `robotsTxtExists` | `boolean` | `true` if `/robots.txt` is accessible at root |
| `sitemapExists` | `boolean` | `true` if `/sitemap.xml` is accessible at root |
| `performanceRating` | `string` | Performance tier: `"Fast"`, `"Average"`, `"Slow"` |
| `seoScore` | `number` | Overall calculated score out of 100 |

---

## Error Status Codes & Responses

### 1. Missing URL Parameter (`400 Bad Request`)
```json
{
  "success": false,
  "error": "URL is required. Please provide a valid target URL in request body, e.g., { \"url\": \"https://google.com\" }",
  "code": "MISSING_URL"
}
```

### 2. Malformed URL Input (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Only HTTP and HTTPS protocols are supported",
  "code": "INVALID_URL"
}
```

### 3. Non-HTML Target (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Target returned non-HTML content type (application/pdf). Only webpage analysis is supported.",
  "code": "NON_HTML_RESPONSE"
}
```

### 4. DNS Resolution Failure (`404 Not Found`)
```json
{
  "success": false,
  "error": "DNS resolution failed. Domain name could not be resolved. Please verify the URL.",
  "code": "DNS_ERROR"
}
```

### 5. Request Timeout (`504 Gateway Timeout`)
```json
{
  "success": false,
  "error": "Connection timed out after 10 seconds. The target website might be slow or blocking automated requests.",
  "code": "ETIMEDOUT"
}
```
