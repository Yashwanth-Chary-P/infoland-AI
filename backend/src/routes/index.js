import express from 'express';
import propertyRoutes from './property.routes.js';
import ownerRoutes from './owner.routes.js';
import ownershipRoutes from './ownership.routes.js';
import documentRoutes from './document.routes.js';
import { loanRouter, taxRouter, disputeRouter } from './financial.routes.js';
import healthRoutes from './health.routes.js';
import verificationRoutes from './verification.routes.js';

const router = express.Router();

router.use('/properties', propertyRoutes);
router.use('/owners', ownerRoutes);
router.use('/ownership', ownershipRoutes);
router.use('/documents', documentRoutes);
router.use('/loans', loanRouter);
router.use('/tax', taxRouter);
router.use('/disputes', disputeRouter);
router.use('/property-health', healthRoutes);
router.use('/verification', verificationRoutes);

export default router;
