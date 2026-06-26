import express from 'express';
import { getDocumentsGrouped, getDocument, getMissingDocuments } from '../controllers/document.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

router.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getDocumentsGrouped));
router.get('/document/:documentId', asyncWrapper(getDocument));
router.get('/missing/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getMissingDocuments));

export default router;
