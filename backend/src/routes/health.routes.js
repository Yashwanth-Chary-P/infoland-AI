import express from 'express';
import { getPropertyHealth } from '../controllers/health.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getPropertyHealth));

export default router;
