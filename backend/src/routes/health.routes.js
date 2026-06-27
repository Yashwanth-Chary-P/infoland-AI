import express from 'express';
import { getPropertyHealth } from '../controllers/health.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/property-health/{propertyId}:
 *   get:
 *     summary: Get overall health summary of a property
 *     tags: [Property Health]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Property health summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Property health summary retrieved successfully' }
 *                 data: { $ref: '#/components/schemas/PropertyHealth' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getPropertyHealth));

export default router;
