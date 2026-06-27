import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import routes from './routes/index.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/404.middleware.js';
import { swaggerSpec } from './config/swagger.js';
// We also need the existing plot routers if they are required to not break anything
// The user prompt said: "Do not rewrite working modules." and "Do not break existing imports."
import plotBasicRouter from './routers/plotBasic.router.js';
import plotDetailedRouter from './routers/plotDetailed.router.js';
import { successResponse } from './utils/apiResponse.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check Endpoint
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: System health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Server is up and running' }
 *                 data: { type: 'object', nullable: true, example: null }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 */
app.get('/api/health', (req, res) => {
  res.json(successResponse('Server is up and running'));
});

// Legacy routes (from server.js)
app.use('/api/plots/basic', plotBasicRouter);
app.use('/api/plots/detailed', plotDetailedRouter);

// Core APIs Phase 1
app.use('/api', routes);

// Handle 404
app.use(notFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
