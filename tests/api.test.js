import express from 'express';
import request from 'supertest';
import analyzerRoutes from '../backend/routes/analyzerRoutes.js';
import { errorHandlerMiddleware } from '../backend/middleware/errorHandler.js';

const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api', analyzerRoutes);
  app.get('/health', (req, res) => res.status(200).json({ status: 'online' }));
  app.use(errorHandlerMiddleware);
  return app;
};

describe('REST API Integration Tests (POST /api/analyze)', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  test('GET /health: Returns 200 OK health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('online');
  });

  test('POST /api/analyze: Valid URL request returns 200 OK with full JSON schema', async () => {
    const res = await request(app)
      .post('/api/analyze')
      .send({ url: 'https://example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.url).toContain('example.com');
    expect(res.body.statusCode).toBe(200);
    expect(res.body.pageTitle).toBe('Example Domain');
    expect(typeof res.body.responseTime).toBe('number');
    expect(typeof res.body.seoScore).toBe('number');
    expect(Array.isArray(res.body.warnings)).toBe(true);
    expect(Array.isArray(res.body.recommendations)).toBe(true);
  });

  test('POST /api/analyze: Missing URL parameter returns 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/analyze')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('MISSING_URL');
  });

  test('POST /api/analyze: Malformed URL input returns 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/analyze')
      .send({ url: 'ftp://example.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('INVALID_URL');
  });

  test('POST /api/analyze: Non-existent domain returns DNS error JSON', async () => {
    const res = await request(app)
      .post('/api/analyze')
      .send({ url: 'https://non-existent-domain-xyz999.fake' });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('DNS_ERROR');
  });
});
