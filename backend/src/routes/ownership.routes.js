import express from 'express';
import { getOwnershipHistory } from '../controllers/owner.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/ownership/history/{propertyId}:
 *   get:
 *     summary: Get ownership history of a property
 *     tags: [Ownership]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Ownership history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Ownership history retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OwnershipEvent'
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/history/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipHistory));

export default router;
