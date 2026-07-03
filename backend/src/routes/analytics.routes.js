import express from 'express';
import asyncWrapper from '../utils/asyncWrapper.js';
import {
    getOverview,
    getRegionalIntelligence,
    getVerificationAnalytics,
    getOwnershipAnalytics,
    getFinancialAnalytics,
    getDocumentAnalytics,
    getRiskAnalytics,
    getDashboardSummary
} from '../controllers/analytics.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Platform-wide dataset analytics and user dashboard insights
 */

/**
 * @swagger
 * /api/analytics/overview:
 *   get:
 *     tags: [Analytics]
 *     summary: Get high-level overview of dataset capabilities
 *     description: Returns total counts, health, and high-level distribution metrics.
 *     responses:
 *       200:
 *         description: Analytics overview retrieved successfully
 */
router.get('/overview', asyncWrapper(getOverview));

/**
 * @swagger
 * /api/analytics/regions:
 *   get:
 *     tags: [Analytics]
 *     summary: Get regional distribution and insights
 *     responses:
 *       200:
 *         description: Regional intelligence retrieved successfully
 */
router.get('/regions', asyncWrapper(getRegionalIntelligence));

/**
 * @swagger
 * /api/analytics/verification:
 *   get:
 *     tags: [Analytics]
 *     summary: Get verification analytics
 *     responses:
 *       200:
 *         description: Verification analytics retrieved successfully
 */
router.get('/verification', asyncWrapper(getVerificationAnalytics));

/**
 * @swagger
 * /api/analytics/ownership:
 *   get:
 *     tags: [Analytics]
 *     summary: Get ownership analytics
 *     responses:
 *       200:
 *         description: Ownership analytics retrieved successfully
 */
router.get('/ownership', asyncWrapper(getOwnershipAnalytics));

/**
 * @swagger
 * /api/analytics/financial:
 *   get:
 *     tags: [Analytics]
 *     summary: Get financial analytics
 *     responses:
 *       200:
 *         description: Financial analytics retrieved successfully
 */
router.get('/financial', asyncWrapper(getFinancialAnalytics));

/**
 * @swagger
 * /api/analytics/documents:
 *   get:
 *     tags: [Analytics]
 *     summary: Get document completeness analytics
 *     responses:
 *       200:
 *         description: Document analytics retrieved successfully
 */
router.get('/documents', asyncWrapper(getDocumentAnalytics));

/**
 * @swagger
 * /api/analytics/risk:
 *   get:
 *     tags: [Analytics]
 *     summary: Get risk tier distribution
 *     responses:
 *       200:
 *         description: Risk analytics retrieved successfully
 */
router.get('/risk', asyncWrapper(getRiskAnalytics));

/**
 * @swagger
 * /api/analytics/dashboard/summary:
 *   get:
 *     tags: [Analytics]
 *     summary: Get user dashboard summary
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 */
router.get('/dashboard/summary', asyncWrapper(getDashboardSummary));

export default router;
