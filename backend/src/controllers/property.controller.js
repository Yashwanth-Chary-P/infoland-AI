import propertyService from '../services/property.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getProperties = async (req, res) => {
  const result = await propertyService.getProperties(req.query);
  res.json(successResponse('Properties retrieved successfully', result.data, result.pagination));
};

export const getPropertyDetails = async (req, res) => {
  const data = await propertyService.getPropertyDetails(req.params.propertyId);
  res.json(successResponse('Property details retrieved successfully', data));
};

export const searchProperties = async (req, res) => {
  const result = await propertyService.searchProperties(req.query);
  res.json(successResponse('Properties search results', result.data, result.pagination));
};
