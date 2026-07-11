import express from 'express';
import locationController from '../controllers/location.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/location/{propertyId}:
 *   get:
 *     summary: Get aggregated location intelligence for a property
 *     description: Retrieves the location connectivity and proximity analytics for a specific property using aggregated scores.
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the property
 *         example: PROP-KOK-000804
 *     responses:
 *       200:
 *         description: Location intelligence fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Location intelligence fetched successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     property_id:
 *                       type: string
 *                       example: PROP-KOK-000804
 *                     location_score:
 *                       type: number
 *                       example: 83
 *                     distance_to_nearest_school_km:
 *                       type: number
 *                       example: 0.264
 *                     distance_to_nearest_hospital_km:
 *                       type: number
 *                       example: 0.473
 *                     distance_to_nearest_park_km:
 *                       type: number
 *                       example: 0.119
 *                     distance_to_nearest_commercial_km:
 *                       type: number
 *                       example: 0.319
 *                     nearby_school_count:
 *                       type: number
 *                       example: 9
 *                     nearby_hospital_count:
 *                       type: number
 *                       example: 5
 *                     nearby_park_count:
 *                       type: number
 *                       example: 9
 *                     nearby_commercial_count:
 *                       type: number
 *                       example: 10
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Location intelligence not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Location intelligence not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.get('/:propertyId', locationController.getLocationIntelligence);

export default router;
