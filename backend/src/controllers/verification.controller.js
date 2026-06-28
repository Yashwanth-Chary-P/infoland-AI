import verificationService from '../services/verification.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getVerificationStatus = async (req, res) => {
  const data = await verificationService.getVerificationStatus(req.params.propertyId);
  res.json(successResponse('Verification status retrieved successfully', data));
};

export const getVerificationSummary = async (req, res) => {
  const data = await verificationService.getVerificationSummary(req.params.propertyId);
  res.json(successResponse('Verification summary retrieved successfully', data));
};

export const getVerificationDetails = async (req, res) => {
  const data = await verificationService.getVerificationDetails(req.params.propertyId);
  res.json(successResponse('Verification details retrieved successfully', data));
};

export const getVerificationSignals = async (req, res) => {
  const data = await verificationService.getVerificationSignals(req.params.propertyId);
  res.json(successResponse('Verification signals retrieved successfully', data));
};

export const getVerificationWorkflow = async (req, res) => {
  const data = await verificationService.getVerificationWorkflow(req.params.propertyId);
  res.json(successResponse('Verification workflow retrieved successfully', data));
};
