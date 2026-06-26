import financialService from '../services/financial.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getLoans = async (req, res) => {
  const data = await financialService.getLoans(req.params.propertyId);
  res.json(successResponse('Loans retrieved successfully', data));
};

export const getTaxes = async (req, res) => {
  const data = await financialService.getTaxRecords(req.params.propertyId);
  res.json(successResponse('Tax records retrieved successfully', data));
};

export const getDisputes = async (req, res) => {
  const data = await financialService.getDisputes(req.params.propertyId);
  res.json(successResponse('Disputes retrieved successfully', data));
};
