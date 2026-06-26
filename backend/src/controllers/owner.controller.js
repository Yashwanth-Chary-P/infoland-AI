import ownerService from '../services/owner.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getCurrentOwner = async (req, res) => {
  const data = await ownerService.getCurrentOwner(req.params.propertyId);
  res.json(successResponse('Current owner retrieved successfully', data));
};

export const getOwnershipHistory = async (req, res) => {
  const data = await ownerService.getOwnershipHistory(req.params.propertyId);
  res.json(successResponse('Ownership history retrieved successfully', data));
};
