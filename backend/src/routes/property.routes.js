import express from 'express';
import { getProperties, getPropertyDetails, searchProperties } from '../controllers/property.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema, propertySearchQuerySchema } from '../validators/property.validator.js';
import { paginationQuerySchema } from '../validators/common.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 */
router.get('/', validateRequest(paginationQuerySchema), asyncWrapper(getProperties));

/**
 * @swagger
 * /api/properties/search:
 *   get:
 *     summary: Search properties
 *     tags: [Properties]
 */
router.get('/search', validateRequest(propertySearchQuerySchema), asyncWrapper(searchProperties));

/**
 * @swagger
 * /api/properties/{propertyId}:
 *   get:
 *     summary: Get property details
 *     tags: [Properties]
 */
router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getPropertyDetails));

export default router;
