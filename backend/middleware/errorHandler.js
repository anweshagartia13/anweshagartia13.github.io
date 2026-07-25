export const errorHandlerMiddleware = (err, req, res, _next) => {
  console.error('[PULSE IQ API ERROR]:', err.message || err);

  const statusCode = err.statusCode || res.statusCode || 500;
  const safeStatusCode = statusCode >= 400 && statusCode < 600 ? statusCode : 500;

  return res.status(safeStatusCode).json({
    success: false,
    error: err.message || 'An unexpected error occurred while analyzing the requested website.',
    code: err.code || 'INTERNAL_SERVER_ERROR',
    responseTime: err.responseTime || 0,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
