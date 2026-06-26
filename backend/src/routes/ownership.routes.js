import express from 'express';
import { getOwnershipHistory } from '../controllers/owner.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/ownership/history/{propertyId}:
 *   get:
 *     summary: Get ownership history of a property
 *     tags: [Ownership]
 */
router.get('/history/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getOwnershipHistory));

export default router;
