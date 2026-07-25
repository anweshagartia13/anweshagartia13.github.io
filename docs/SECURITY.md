# PulseIQ Security Posture & Architecture 🔒

This document details the security safeguards, input sanitization policies, rate-limiting limits, and threat mitigations implemented across **PulseIQ — Website Health & SEO Analyzer**.

---

## 1. Input Validation & URL Normalization

All inbound user input is validated before network execution:

- **Strict Protocol Enforcement**: Only `http:` and `https:` schemes are permitted. Malicious or unsupported URI schemes (e.g. `javascript:`, `data:`, `file:`, `ftp:`) are rejected immediately with HTTP 400.
- **Domain Structure Parsing**: Hostnames must follow standard FQDN structures to prevent Server-Side Request Forgery (SSRF) against internal metadata endpoints (`http://169.254.169.254`).

```javascript
// backend/middleware/validateUrl.js
const normalizedUrl = normalizeUrl(url);
if (!['http:', 'https:'].includes(parsed.protocol)) {
  throw new Error('Only HTTP and HTTPS protocols are supported');
}
```

---

## 2. Rate Limiting & DoS Protection

To protect the API against Denial of Service (DoS) attacks and scraper abuse:

- **Express Rate Limiting**: Enforces a strict limit of 60 audit requests per IP address within a 15-minute window (`express-rate-limit`).
- **HTTP 429 Error Handler**: Emits a structured JSON error response when limits are exceeded.

```javascript
// backend/server.js
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60,
  message: {
    success: false,
    error: 'Too many analysis requests from this IP address. Please try again after 15 minutes.',
    code: 'TOO_MANY_REQUESTS'
  }
});
```

---

## 3. Server-Side Request Forgery (SSRF) & Timeout Safeguards

- **Strict Timeout Limits**: All outbound scraping requests are restricted to a maximum 10-second timeout window (`FETCH_TIMEOUT = 10000`) to prevent resource exhaustion from hanging target connections.
- **Maximum Payload Cap**: Outbound HTML downloads are capped at 10 MB (`maxContentLength: 10 * 1024 * 1024`). Requests exceeding 10MB are aborted immediately.
- **Max Redirect Limit**: Axios is configured with `maxRedirects: 5` to prevent infinite HTTP redirect loop exploits.

---

## 4. Cross-Origin Resource Sharing (CORS) & XSS Prevention

- **CORS Headers**: Backend routes explicitly set CORS headers (`Access-Control-Allow-Origin: *`) allowing controlled cross-origin requests.
- **Cheerio HTML Sanitization**: HTML content is loaded strictly into Cheerio's virtual AST memory. Scripts (`<script>`) and iframe elements are stripped prior to text extraction, preventing stored Cross-Site Scripting (XSS).
- **React Escaping**: React automatically escapes all string outputs in JSX, preventing DOM injection attacks.

---

## 5. Error Sanitization & Environment Isolation

- **Production Error Masking**: Detailed stack trace outputs are stripped in `production` mode (`process.env.NODE_ENV === 'production'`). Only high-level sanitized error messages and standard status codes are exposed.
