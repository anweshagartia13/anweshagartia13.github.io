# PulseIQ Automated Testing Strategy & Guide 🧪

This document outlines the testing strategy, test suite structure, coverage thresholds, and execution guides for **PulseIQ — Website Health & SEO Analyzer**.

---

## 1. Testing Strategy & Principles

PulseIQ employs a multi-tiered test-driven approach combining unit testing for isolated parser logic and integration testing for HTTP REST routes:

- **Unit Testing**: Tests HTML DOM parsing (`parser.test.js`), URL normalization (`validator.test.js`), SEO score matrix rules (`seoScore.test.js`), and helper utilities (`utils.test.js`).
- **Integration Testing**: Uses `Supertest` to test Express routes (`api.test.js`) without binding to network ports.
- **Fixture Isolation**: Uses static HTML fixtures (`tests/fixtures/htmlFixtures.js`) designed to produce exact score outputs (100, 85, 70, 45, 0).
- **Deterministic Reliability**: Zero external network dependencies for unit test execution.

---

## 2. Test Suite Structure

```
tests/
├── fixtures/
│   └── htmlFixtures.js    # Static HTML benchmarks for scores 100, 85, 70, 45, 0
├── parser.test.js         # Cheerio DOM parser unit tests (10 test cases)
├── api.test.js            # Supertest REST API route tests (5 test cases)
├── validator.test.js      # URL validator & normalizer unit tests (10 test cases)
├── seoScore.test.js       # SEO scoring rules unit tests (16 test cases)
└── utils.test.js          # Helper utilities unit tests (4 test cases)
```

---

## 3. Coverage Goals & Metrics

Configured in `jest.config.cjs`:

| Metric | Target Minimum | Verified Result |
| :--- | :--- | :--- |
| **Statements** | **85%** | **88.54%** |
| **Branches** | **80%** | **81.69%** |
| **Functions** | **95%** | **100.00%** |
| **Lines** | **85%** | **87.95%** |

---

## 4. How to Run Tests

### Run All Test Suites
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Generate HTML Coverage Report
```bash
npm test -- --coverage
```
The coverage report is written to `coverage/index.html`.

---

## 5. Sample Verified Output

```
PASS tests/utils.test.js
PASS tests/validator.test.js
PASS tests/seoScore.test.js
PASS tests/parser.test.js
PASS tests/api.test.js

Test Suites: 5 passed, 5 total
Tests:       44 passed, 44 total
Snapshots:   0 total
Time:        5.268 s
```
