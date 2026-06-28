import ownerService from '../services/owner.service.js';
import { successResponse } from '../utils/apiResponse.js';

// ---------------------------------------------------------------------------
// PHASE 1 COMPATIBILITY CONTROLLERS
// ---------------------------------------------------------------------------

export const getOwnershipHistory = async (req, res) => {
  const data = await ownerService.getOwnershipHistory(req.params.propertyId);
  res.json(successResponse('Ownership history retrieved successfully', data));
};

// ---------------------------------------------------------------------------
// PHASE 2 - MODULE 3 CONTROLLERS (OWNERSHIP & REGISTRY ENGINE)
// ---------------------------------------------------------------------------

export const getCurrentOwner = async (req, res) => {
  const data = await ownerService.getCurrentOwner(req.params.propertyId);
  res.json(successResponse('Current owner retrieved successfully', data));
};

export const getOwnershipHistoryV2 = async (req, res) => {
  const data = await ownerService.getOwnershipHistoryV2(req.params.propertyId);
  res.json(successResponse('Ownership history retrieved successfully', data));
};

export const getOwnershipTimeline = async (req, res) => {
  const data = await ownerService.getOwnershipTimeline(req.params.propertyId);
  res.json(successResponse('Ownership timeline retrieved successfully', data));
};

export const getRegistryInformation = async (req, res) => {
  const data = await ownerService.getRegistryInformation(req.params.propertyId);
  res.json(successResponse('Registry information retrieved successfully', data));
};

export const getOwnershipValidation = async (req, res) => {
  const data = await ownerService.getOwnershipValidation(req.params.propertyId);
  res.json(successResponse('Ownership validation retrieved successfully', data));
};

export const getOwnershipSummary = async (req, res) => {
  const data = await ownerService.getOwnershipSummary(req.params.propertyId);
  res.json(successResponse('Ownership summary retrieved successfully', data));
};

export const getOwnershipStatistics = async (req, res) => {
  const data = await ownerService.getOwnershipStatistics(req.params.propertyId);
  res.json(successResponse('Ownership statistics retrieved successfully', data));
};
