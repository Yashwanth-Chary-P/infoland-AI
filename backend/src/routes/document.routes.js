import express from 'express';
import { getDocumentsGrouped, getDocument, getMissingDocuments } from '../controllers/document.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/documents/{propertyId}:
 *   get:
 *     summary: Get documents grouped by type for a property
 *     tags: [Documents]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Documents grouped by type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Documents retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     saleDeed:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Document' }
 *                     encumbranceCertificate:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Document' }
 *                     khata:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Document' }
 *                     mutation:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Document' }
 *                     tax:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Document' }
 *                     survey:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Document' }
 *                     layout:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Document' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getDocumentsGrouped));

/**
 * @swagger
 * /api/documents/document/{documentId}:
 *   get:
 *     summary: Get single document details
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         example: DOC000567
 *         description: Unique document ID
 *     responses:
 *       200:
 *         description: Document details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Document retrieved successfully' }
 *                 data: { $ref: '#/components/schemas/Document' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/document/:documentId', asyncWrapper(getDocument));

/**
 * @swagger
 * /api/documents/missing/{propertyId}:
 *   get:
 *     summary: Get missing documents for a property
 *     tags: [Documents]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Missing documents array
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Missing documents retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items: { type: 'string', example: 'sale_deed' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/missing/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getMissingDocuments));

export default router;
