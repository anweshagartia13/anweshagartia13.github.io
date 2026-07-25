import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import analyzerRoutes from './routes/analyzerRoutes.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiter: 60 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many analysis requests from this IP address. Please try again after 15 minutes.',
    code: 'TOO_MANY_REQUESTS',
  },
});

app.use('/api', apiLimiter);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'PULSE IQ API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', analyzerRoutes);

// 404 Handler for unknown API endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    code: 'NOT_FOUND',
  });
});

// Global Error Handler Middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`⚡ PULSE IQ Backend Server running on http://localhost:${PORT}`);
});
