import express from 'express';
import { getProperties, getPropertyDetails, searchProperties } from '../controllers/property.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema, propertySearchQuerySchema } from '../validators/property.validator.js';
import { paginationQuerySchema } from '../validators/common.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Properties retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', validateRequest(paginationQuerySchema), asyncWrapper(getProperties));

/**
 * @swagger
 * /api/properties/search:
 *   get:
 *     summary: Search properties by keyword
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           example: kokapet
 *         description: Search keyword
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A paginated list of properties matching the search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Search results retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/search', validateRequest(propertySearchQuerySchema), asyncWrapper(searchProperties));

/**
 * @swagger
 * /api/properties/{propertyId}:
 *   get:
 *     summary: Get complete property details
 *     tags: [Properties]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Detailed property profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Property details retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     master: { $ref: '#/components/schemas/Property' }
 *                     profile: { $ref: '#/components/schemas/PropertyProfile' }
 *                     metadata: { $ref: '#/components/schemas/PropertyMetadata' }
 *                     owner: { $ref: '#/components/schemas/Owner' }
 *                     locationScore: { $ref: '#/components/schemas/LocationScore' }
 *                     healthSummary: { $ref: '#/components/schemas/PropertyHealth' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getPropertyDetails));

export default router;
