import express from 'express';
import { getCurrentOwner, getOwnershipHistory } from '../controllers/owner.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/owners/{propertyId}:
 *   get:
 *     summary: Get current owner of a property
 *     tags: [Owners]
 */
router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getCurrentOwner));

export default router;
