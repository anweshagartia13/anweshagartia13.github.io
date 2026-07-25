import express from 'express';
import { analyzeWebsite } from '../controllers/analyzerController.js';
import { validateUrlMiddleware } from '../middleware/validateUrl.js';

const router = express.Router();

// POST /api/analyze
router.post('/analyze', validateUrlMiddleware, analyzeWebsite);

export default router;
