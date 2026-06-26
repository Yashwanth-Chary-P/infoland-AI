import financialService from '../services/financial.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getPropertyHealth = async (req, res) => {
  const data = await financialService.getPropertyHealth(req.params.propertyId);
  res.json(successResponse('Property health retrieved successfully', data));
};
