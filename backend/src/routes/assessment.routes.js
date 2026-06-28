import express from 'express';
import assessmentController from '../controllers/assessment.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Risk & Assessment
 *   description: Final verification aggregation engine for property risk and recommendation
 */

/**
 * @swagger
 * /api/assessment/{propertyId}/risk-score:
 *   get:
 *     summary: Get Property Risk Score
 *     description: Computes a dynamic risk score from 0-100 based on all verification modules.
 *     tags: [Risk & Assessment]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: "PROP-KOK-000041"
 *         description: Database Field
 *     responses:
 *       200:
 *         description: Successfully computed risk score
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: string, description: "Database Field", example: "PROP-KOK-000041" }
 *                     risk_score: { type: number, description: "Computed Backend Field", example: 70 }
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.get('/:propertyId/risk-score', assessmentController.getRiskScore);

/**
 * @swagger
 * /api/assessment/{propertyId}/risk-factors:
 *   get:
 *     summary: Get Property Risk Factors
 *     description: Returns a list of all identified risk factors affecting the property.
 *     tags: [Risk & Assessment]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: "PROP-KOK-000041"
 *         description: Database Field
 *     responses:
 *       200:
 *         description: Successfully retrieved risk factors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: string, description: "Database Field", example: "PROP-KOK-000041" }
 *                     risk_factors:
 *                       type: array
 *                       description: "Computed Backend Field"
 *                       items:
 *                         type: object
 *                         properties:
 *                           category: { type: string, example: "Active Legal Disputes" }
 *                           severity: { type: string, example: "critical" }
 *                           reason: { type: string, example: "1 active court disputes found." }
 *                           deduction: { type: number, example: 30 }
 *                           source_module: { type: string, example: "legal" }
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.get('/:propertyId/risk-factors', assessmentController.getRiskFactors);

/**
 * @swagger
 * /api/assessment/{propertyId}/recommendation:
 *   get:
 *     summary: Get Verification Recommendation
 *     description: Computes final recommendation and grade based on risk score.
 *     tags: [Risk & Assessment]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: "PROP-KOK-000041"
 *     responses:
 *       200:
 *         description: Recommendation computed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id: { type: string, description: "Database Field", example: "PROP-KOK-000041" }
 *                     risk_score: { type: number, description: "Computed Backend Field", example: 70 }
 *                     recommendation: { type: string, description: "Computed Backend Field", example: "Needs Manual Verification" }
 *                     verification_grade: { type: string, description: "Computed Backend Field", example: "C" }
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.get('/:propertyId/recommendation', assessmentController.getRecommendation);

/**
 * @swagger
 * /api/assessment/{propertyId}/summary:
 *   get:
 *     summary: Get Overall Assessment Summary
 *     description: Returns aggregated overall status and confidence level.
 *     tags: [Risk & Assessment]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: "PROP-KOK-000041"
 *     responses:
 *       200:
 *         description: Summary computed successfully
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.get('/:propertyId/summary', assessmentController.getSummary);

/**
 * @swagger
 * /api/assessment/{propertyId}/final-report:
 *   get:
 *     summary: Get Full Verification Dossier
 *     description: Generates a complete aggregated final report of Modules 1-6.
 *     tags: [Risk & Assessment]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: "PROP-KOK-000041"
 *     responses:
 *       200:
 *         description: Final report generated successfully
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.get('/:propertyId/final-report', assessmentController.getFinalReport);

/**
 * @swagger
 * /api/assessment/{propertyId}/dashboard:
 *   get:
 *     summary: Get Dashboard Payload
 *     description: The single frontend aggregation endpoint containing all verification data.
 *     tags: [Risk & Assessment]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         example: "PROP-KOK-000041"
 *     responses:
 *       200:
 *         description: Dashboard payload generated successfully
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.get('/:propertyId/dashboard', assessmentController.getDashboard);

export default router;
