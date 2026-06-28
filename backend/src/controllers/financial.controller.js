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

export const getEncumbrances = async (req, res) => {
  const data = await financialService.getEncumbrances(req.params.propertyId);
  res.json(successResponse('Encumbrances retrieved successfully', data));
};

export const getValidation = async (req, res) => {
  const data = await financialService.getValidation(req.params.propertyId);
  res.json(successResponse('Validation retrieved successfully', data));
};

export const getSummary = async (req, res) => {
  const data = await financialService.getSummary(req.params.propertyId);
  res.json(successResponse('Summary retrieved successfully', data));
};

export const getStatistics = async (req, res) => {
  const data = await financialService.getStatistics(req.params.propertyId);
  res.json(successResponse('Statistics retrieved successfully', data));
};
