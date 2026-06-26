import express from 'express';
import { getLoans, getTaxes, getDisputes } from '../controllers/financial.controller.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { propertyIdParamSchema } from '../validators/property.validator.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const loanRouter = express.Router();
const taxRouter = express.Router();
const disputeRouter = express.Router();

loanRouter.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getLoans));
taxRouter.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getTaxes));
disputeRouter.get('/:propertyId', validateRequest(propertyIdParamSchema), asyncWrapper(getDisputes));

export { loanRouter, taxRouter, disputeRouter };
