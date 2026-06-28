import express from 'express';
import { 
  getDocumentsGrouped, 
  getDocument, 
  getMissingDocuments,
  getVerificationStatus,
  getCompleteness,
  getMandatory,
  getMissing,
  getExpired,
  getSummary,
  getDetails,
  getStatistics
} from '../controllers/document.controller.js';
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

// ---------------------------------------------------------------------------
// PHASE 2 - MODULE 2 ROUTES (DOCUMENT VERIFICATION ENGINE)
// ---------------------------------------------------------------------------

/**
 * @swagger
 * /api/documents/{propertyId}/status:
 *   get:
 *     summary: Get document verification status
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Document verification status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Document verification status retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     verification_state: { type: 'string', example: 'incomplete', description: 'Computed Backend Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/status', validateRequest(propertyIdParamSchema), asyncWrapper(getVerificationStatus));

/**
 * @swagger
 * /api/documents/{propertyId}/completeness:
 *   get:
 *     summary: Get document completeness percentage
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Document completeness
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Document completeness retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     completeness_percentage: { type: 'number', example: 66.67, description: 'Computed Backend Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/completeness', validateRequest(propertyIdParamSchema), asyncWrapper(getCompleteness));

/**
 * @swagger
 * /api/documents/{propertyId}/mandatory:
 *   get:
 *     summary: Get mandatory document list
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Mandatory documents list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Mandatory documents retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     mandatory_documents:
 *                       type: array
 *                       items: { type: 'string', example: 'sale_deed' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/mandatory', validateRequest(propertyIdParamSchema), asyncWrapper(getMandatory));

/**
 * @swagger
 * /api/documents/{propertyId}/missing:
 *   get:
 *     summary: Get missing documents for verification
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Missing documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Missing documents retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     missing_documents:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           document_type: { type: 'string', example: 'khata_extract' }
 *                           status: { type: 'string', example: 'missing' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/missing', validateRequest(propertyIdParamSchema), asyncWrapper(getMissing));

/**
 * @swagger
 * /api/documents/{propertyId}/expired:
 *   get:
 *     summary: Get expired documents
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Expired documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Expired documents retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     expired_documents:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           document_id: { type: 'string', example: 'DOC-EXPIRED-123' }
 *                           document_type: { type: 'string', example: 'noc' }
 *                           status: { type: 'string', example: 'expired' }
 *                           issue_date: { type: 'string', example: '2010-01-01' }
 *                           last_updated: { type: 'string', example: '2015-01-01' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/expired', validateRequest(propertyIdParamSchema), asyncWrapper(getExpired));

/**
 * @swagger
 * /api/documents/{propertyId}/summary:
 *   get:
 *     summary: Get document verification summary
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Document verification summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Document verification summary retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     verification_state: { type: 'string', example: 'incomplete' }
 *                     completeness_percentage: { type: 'number', example: 66.67 }
 *                     total_documents: { type: 'integer', example: 18 }
 *                     available_documents: { type: 'integer', example: 12 }
 *                     missing_documents: { type: 'integer', example: 5 }
 *                     expired_documents: { type: 'integer', example: 1 }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/summary', validateRequest(propertyIdParamSchema), asyncWrapper(getSummary));

/**
 * @swagger
 * /api/documents/{propertyId}/details:
 *   get:
 *     summary: Get document verification details
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Detailed documents array
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Document verification details retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/details', validateRequest(propertyIdParamSchema), asyncWrapper(getDetails));

/**
 * @swagger
 * /api/documents/{propertyId}/statistics:
 *   get:
 *     summary: Get document statistics
 *     tags: [Documents Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Document statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Document statistics retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     total_documents: { type: 'integer', example: 18 }
 *                     available_documents: { type: 'integer', example: 12 }
 *                     missing_documents: { type: 'integer', example: 5 }
 *                     expired_documents: { type: 'integer', example: 1 }
 *                     completeness_percentage: { type: 'number', example: 66.67 }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/statistics', validateRequest(propertyIdParamSchema), asyncWrapper(getStatistics));

export default router;
