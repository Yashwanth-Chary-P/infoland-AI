import express from 'express';
import { getLoans, getTaxes, getDisputes, getEncumbrances, getValidation, getSummary, getStatistics } from '../controllers/financial.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const loanRouter = express.Router();
const taxRouter = express.Router();
const disputeRouter = express.Router();
const financialRouter = express.Router();

/**
 * @swagger
 * /api/loans/{propertyId}:
 *   get:
 *     summary: Get loans for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Loans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Loans retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Loan' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
loanRouter.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getLoans));

/**
 * @swagger
 * /api/tax/{propertyId}:
 *   get:
 *     summary: Get tax records for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Tax records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Tax records retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/TaxRecord' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
taxRouter.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getTaxes));

/**
 * @swagger
 * /api/disputes/{propertyId}:
 *   get:
 *     summary: Get court disputes for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Court disputes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Disputes retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/CourtDispute' }
 *                 pagination: { type: 'object', nullable: true, example: null }
 *                 timestamp: { type: 'string', example: '2026-06-27T10:30:00Z' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
disputeRouter.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getDisputes));

/**
 * @swagger
 * /api/financial/{propertyId}/loans:
 *   get:
 *     summary: Get loans for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Loans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Loans retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Loan' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
financialRouter.get('/:propertyId/loans', validateRequest(propertyIdParamSchema), asyncWrapper(getLoans));

/**
 * @swagger
 * /api/financial/{propertyId}/taxes:
 *   get:
 *     summary: Get tax records for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Tax records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Tax records retrieved successfully' }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/TaxRecord' }
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
financialRouter.get('/:propertyId/taxes', validateRequest(propertyIdParamSchema), asyncWrapper(getTaxes));

/**
 * @swagger
 * /api/financial/{propertyId}/encumbrances:
 *   get:
 *     summary: Get financial encumbrances for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Encumbrances retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Encumbrances retrieved successfully' }
 *                 data:
 *                   $ref: '#/components/schemas/FinancialEncumbrances'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
financialRouter.get('/:propertyId/encumbrances', validateRequest(propertyIdParamSchema), asyncWrapper(getEncumbrances));

/**
 * @swagger
 * /api/financial/{propertyId}/validation:
 *   get:
 *     summary: Get financial validation for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Financial validation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Validation retrieved successfully' }
 *                 data:
 *                   $ref: '#/components/schemas/FinancialValidation'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
financialRouter.get('/:propertyId/validation', validateRequest(propertyIdParamSchema), asyncWrapper(getValidation));

/**
 * @swagger
 * /api/financial/{propertyId}/summary:
 *   get:
 *     summary: Get financial summary for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Financial summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Summary retrieved successfully' }
 *                 data:
 *                   $ref: '#/components/schemas/FinancialSummary'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
financialRouter.get('/:propertyId/summary', validateRequest(propertyIdParamSchema), asyncWrapper(getSummary));

/**
 * @swagger
 * /api/financial/{propertyId}/statistics:
 *   get:
 *     summary: Get financial statistics for a property
 *     tags: [Financial]
 *     parameters:
 *       - $ref: '#/components/parameters/propertyId'
 *     responses:
 *       200:
 *         description: Financial statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: 'boolean', example: true }
 *                 message: { type: 'string', example: 'Statistics retrieved successfully' }
 *                 data:
 *                   $ref: '#/components/schemas/FinancialStatistics'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
financialRouter.get('/:propertyId/statistics', validateRequest(propertyIdParamSchema), asyncWrapper(getStatistics));

export { loanRouter, taxRouter, disputeRouter, financialRouter };
