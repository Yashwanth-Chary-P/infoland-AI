import express from 'express';
import { getCurrentOwner, getOwnershipHistory } from '../controllers/owner.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/owners/{propertyId}:
 *   get:
 *     summary: Get current owner of a property
 *     tags: [Owners]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Current owner details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Owner retrieved successfully' }
 *                 data: { $ref: '#/components/schemas/Owner' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getCurrentOwner));

export default router;
