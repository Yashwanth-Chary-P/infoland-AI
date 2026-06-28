import express from 'express';
import {
  getVerificationStatus,
  getVerificationSummary,
  getVerificationDetails,
  getVerificationSignals,
  getVerificationWorkflow,
  getLegalVerification,
  getLegalSummary,
  getLegalStatistics,
  getLegalDetails
} from '../controllers/verification.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/verification/{propertyId}/status:
 *   get:
 *     summary: Get high-level verification status
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: PROP-KOK-000001
 *         description: Stable cross-dataset property key
 *     responses:
 *       200:
 *         description: Verification status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Verification status retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     status: { type: 'string', example: 'pending', description: 'Computed Backend Field: Foundational state' }
 *                     progress: { type: 'number', nullable: true, example: null, description: 'Computed Backend Field: Overall verification progress' }
 *                     workflow: { type: 'string', example: 'complete_property_verification' }
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
 * /api/verification/{propertyId}/summary:
 *   get:
 *     summary: Get verification summary including health stats
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: PROP-KOK-000001
 *     responses:
 *       200:
 *         description: Verification summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Verification summary retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     state:
 *                       type: object
 *                       properties:
 *                         status: { type: 'string', example: 'pending' }
 *                         progress: { type: 'number', nullable: true, example: null }
 *                         workflow: { type: 'string', example: 'complete_property_verification' }
 *                     health: { $ref: '#/components/schemas/PropertyHealth' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/summary', validateRequest(propertyIdParamSchema), asyncWrapper(getVerificationSummary));

/**
 * @swagger
 * /api/verification/{propertyId}/details:
 *   get:
 *     summary: Get comprehensive verification details
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: PROP-KOK-000001
 *     responses:
 *       200:
 *         description: Verification details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Verification details retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     state:
 *                       type: object
 *                       properties:
 *                         status: { type: 'string', example: 'pending' }
 *                         progress: { type: 'number', nullable: true, example: null }
 *                         workflow: { type: 'string', example: 'complete_property_verification' }
 *                     signals:
 *                       type: object
 *                       properties:
 *                         documents: { type: 'object', example: { status: 'pending' } }
 *                         ownership: { type: 'object', example: { status: 'pending' } }
 *                         financial: { type: 'object', example: { status: 'pending' } }
 *                         legal: { type: 'object', example: { status: 'pending' } }
 *                     profile: { $ref: '#/components/schemas/PropertyProfile' }
 *                     metadata: { $ref: '#/components/schemas/PropertyMetadata' }
 *                     health: { $ref: '#/components/schemas/PropertyHealth' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/details', validateRequest(propertyIdParamSchema), asyncWrapper(getVerificationDetails));

/**
 * @swagger
 * /api/verification/{propertyId}/signals:
 *   get:
 *     summary: Get domain-specific verification signals
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: PROP-KOK-000001
 *     responses:
 *       200:
 *         description: Verification signals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Verification signals retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     signals:
 *                       type: object
 *                       description: Computed Backend Field
 *                       properties:
 *                         documents: { type: 'object', example: { status: 'pending' } }
 *                         ownership: { type: 'object', example: { status: 'pending' } }
 *                         financial: { type: 'object', example: { status: 'pending' } }
 *                         legal: { type: 'object', example: { status: 'pending' } }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/signals', validateRequest(propertyIdParamSchema), asyncWrapper(getVerificationSignals));

/**
 * @swagger
 * /api/verification/{propertyId}/workflow:
 *   get:
 *     summary: Get verification workflow status
 *     tags: [Verification]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: PROP-KOK-000001
 *     responses:
 *       200:
 *         description: Verification workflow retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Verification workflow retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001' }
 *                     workflow_type: { type: 'string', example: 'complete_property_verification' }
 *                     steps:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           module: { type: 'string', example: 'documents' }
 *                           status: { type: 'string', example: 'pending' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/workflow', validateRequest(propertyIdParamSchema), asyncWrapper(getVerificationWorkflow));

/**
 * @swagger
 * /api/verification/{propertyId}/legal:
 *   get:
 *     summary: Get legal verification status
 *     description: Retrieves the high-level legal verification status of a property, including active and resolved dispute counts.
 *     tags: [Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Legal verification retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Legal verification retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000005', description: 'Database Field' }
 *                     status: { type: 'string', example: 'resolved_dispute', description: 'Computed Backend Field' }
 *                     active_dispute_count: { type: 'integer', example: 0, description: 'Computed Backend Field' }
 *                     resolved_dispute_count: { type: 'integer', example: 1, description: 'Computed Backend Field' }
 *                     legal_risk_flags: { type: 'array', items: { type: 'string' }, example: [], description: 'Computed Backend Field' }
 *                     legal_summary: { type: 'string', example: 'Past disputes were resolved. Property is currently clear.', description: 'Computed Backend Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/legal', validateRequest(propertyIdParamSchema), asyncWrapper(getLegalVerification));

/**
 * @swagger
 * /api/verification/{propertyId}/legal-summary:
 *   get:
 *     summary: Get legal verification summary
 *     description: Retrieves a concise summary of the legal status and associated risk flags.
 *     tags: [Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Legal summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Legal summary retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000005', description: 'Database Field' }
 *                     status: { type: 'string', example: 'resolved_dispute', description: 'Computed Backend Field' }
 *                     legal_summary: { type: 'string', example: 'Past disputes were resolved. Property is currently clear.', description: 'Computed Backend Field' }
 *                     risk_flags: { type: 'array', items: { type: 'string' }, example: [], description: 'Computed Backend Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/legal-summary', validateRequest(propertyIdParamSchema), asyncWrapper(getLegalSummary));

/**
 * @swagger
 * /api/verification/{propertyId}/legal-statistics:
 *   get:
 *     summary: Get legal verification statistics
 *     description: Retrieves statistical data about the legal history of the property.
 *     tags: [Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Legal statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Legal statistics retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000005', description: 'Database Field' }
 *                     active_disputes: { type: 'integer', example: 0, description: 'Computed Backend Field' }
 *                     resolved_disputes: { type: 'integer', example: 1, description: 'Computed Backend Field' }
 *                     total_disputes: { type: 'integer', example: 1, description: 'Computed Backend Field' }
 *                     status: { type: 'string', example: 'resolved_dispute', description: 'Computed Backend Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/legal-statistics', validateRequest(propertyIdParamSchema), asyncWrapper(getLegalStatistics));

/**
 * @swagger
 * /api/verification/{propertyId}/legal-details:
 *   get:
 *     summary: Get comprehensive legal verification details and timeline
 *     description: Retrieves full legal details including a combined timeline of ownership transfers and legal events.
 *     tags: [Verification]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Legal details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Legal details retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000005', description: 'Database Field' }
 *                     status: { type: 'string', example: 'resolved_dispute', description: 'Computed Backend Field' }
 *                     legal_summary: { type: 'string', example: 'Past disputes were resolved. Property is currently clear.', description: 'Computed Backend Field' }
 *                     active_dispute_count: { type: 'integer', example: 0, description: 'Computed Backend Field' }
 *                     resolved_dispute_count: { type: 'integer', example: 1, description: 'Computed Backend Field' }
 *                     legal_risk_flags: { type: 'array', items: { type: 'string' }, example: [], description: 'Computed Backend Field' }
 *                     timeline:
 *                       type: array
 *                       description: 'Computed Backend Field: Unified historical timeline'
 *                       items:
 *                         type: object
 *                         properties:
 *                           event_type: { type: 'string', example: 'sale_agreement_dispute' }
 *                           event_date: { type: 'string', example: '2026-06-26' }
 *                           source_collection: { type: 'string', example: 'court_disputes' }
 *                           title: { type: 'string', example: 'Legal Dispute: sale_agreement_dispute' }
 *                           description: { type: 'string', example: 'Dispute status is closed' }
 *                           severity: { type: 'string', example: 'warning' }
 *                           metadata: { type: 'object', example: { dispute_id: 'DISP-KOK-000005', status: 'closed' } }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/legal-details', validateRequest(propertyIdParamSchema), asyncWrapper(getLegalDetails));

export default router;
