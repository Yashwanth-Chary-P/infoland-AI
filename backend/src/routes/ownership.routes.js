import express from 'express';
import { 
  getOwnershipHistory,
  getCurrentOwner,
  getOwnershipHistoryV2,
  getOwnershipTimeline,
  getOwnershipTransfers,
  getRegistryInformation,
  getOwnershipValidation,
  getOwnershipSummary,
  getOwnershipStatistics
} from '../controllers/owner.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

// ---------------------------------------------------------------------------
// PHASE 1 COMPATIBILITY ROUTES
// ---------------------------------------------------------------------------

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
 *                   type: object
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/history/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipHistory));

// ---------------------------------------------------------------------------
// PHASE 2 - MODULE 3 ROUTES (OWNERSHIP & REGISTRY ENGINE)
// ---------------------------------------------------------------------------

/**
 * @swagger
 * /api/ownership/{propertyId}/current:
 *   get:
 *     summary: Get current owner details
 *     tags: [Ownership & Registry]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Current owner retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Current owner retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     owner_id: { type: 'string', example: 'OWN-KOK-000001', description: 'Database Field' }
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Database Field' }
 *                     owner_type: { type: 'string', example: 'individual', description: 'Database Field' }
 *                     full_name: { type: 'string', example: 'Vikram Menon', description: 'Database Field' }
 *                     phone: { type: 'string', example: '+91-9100007919', description: 'Database Field' }
 *                     email: { type: 'string', example: 'vikram.menon.1@infoland.example', description: 'Database Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/current', validateRequest(propertyIdParamSchema), asyncWrapper(getCurrentOwner));

/**
 * @swagger
 * /api/ownership/{propertyId}/history:
 *   get:
 *     summary: Get ownership history (V2)
 *     tags: [Ownership & Registry]
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
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Computed Backend Field' }
 *                     events:
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
router.get('/:propertyId/history', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipHistoryV2));

/**
 * @swagger
 * /api/ownership/{propertyId}/timeline:
 *   get:
 *     summary: Get normalized ownership timeline
 *     tags: [Ownership & Registry]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Ownership timeline retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Ownership timeline retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Computed Backend Field' }
 *                     timeline:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           event_date: { type: 'string', example: '2015-08-09' }
 *                           event_type: { type: 'string', example: 'sale' }
 *                           from_owner: { type: 'string', example: 'Ananya Iyer' }
 *                           to_owner: { type: 'string', example: 'Vikram Menon' }
 *                           document_reference: { type: 'string', example: 'OE-KOK-000001-02' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/timeline', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipTimeline));

/**
 * @swagger
 * /api/ownership/{propertyId}/transfers:
 *   get:
 *     summary: Get continuous chain of ownership transfers
 *     tags: [Ownership & Registry]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Ownership transfers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Ownership transfers retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Computed Backend Field' }
 *                     transfers:
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
router.get('/:propertyId/transfers', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipTransfers));

/**
 * @swagger
 * /api/ownership/{propertyId}/registry:
 *   get:
 *     summary: Get property registry information
 *     tags: [Ownership & Registry]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Registry information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Registry information retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Database Field' }
 *                     owner_id: { type: 'string', example: 'OWN-KOK-000001', description: 'Database Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/registry', validateRequest(propertyIdParamSchema), asyncWrapper(getRegistryInformation));

/**
 * @swagger
 * /api/ownership/{propertyId}/validation:
 *   get:
 *     summary: Validate current owner against registry
 *     tags: [Ownership & Registry]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Ownership validation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Ownership validation retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Computed Backend Field' }
 *                     ownership_state: { type: 'string', example: 'verified', description: 'Computed Backend Field' }
 *                     common_fields_checked:
 *                       type: array
 *                       items: { type: 'string', example: 'owner_id' }
 *                     mismatches:
 *                       type: array
 *                       items: { type: 'string' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/validation', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipValidation));

/**
 * @swagger
 * /api/ownership/{propertyId}/summary:
 *   get:
 *     summary: Get ownership summary
 *     tags: [Ownership & Registry]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Ownership summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Ownership summary retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Computed Backend Field' }
 *                     ownership_state: { type: 'string', example: 'verified', description: 'Computed Backend Field' }
 *                     registry_status: { type: 'string', example: 'matched', description: 'Computed Backend Field' }
 *                     current_owner: { type: 'string', example: 'OWN-KOK-000001', description: 'Computed Backend Field' }
 *                     ownership_transfers: { type: 'integer', example: 2, description: 'Computed Backend Field' }
 *                     total_owners: { type: 'integer', example: 3, description: 'Computed Backend Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/summary', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipSummary));

/**
 * @swagger
 * /api/ownership/{propertyId}/statistics:
 *   get:
 *     summary: Get ownership statistics
 *     tags: [Ownership & Registry]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Ownership statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Ownership statistics retrieved successfully' }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: 'string', example: 'PROP-KOK-000001', description: 'Computed Backend Field' }
 *                     current_owner: { type: 'string', example: 'OWN-KOK-000001', description: 'Computed Backend Field' }
 *                     total_owners: { type: 'integer', example: 3, description: 'Computed Backend Field' }
 *                     ownership_transfers: { type: 'integer', example: 2, description: 'Computed Backend Field' }
 *                     registry_status: { type: 'string', example: 'matched', description: 'Computed Backend Field' }
 *                     ownership_validation: { type: 'string', example: 'valid', description: 'Computed Backend Field' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:propertyId/statistics', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipStatistics));

export default router;
