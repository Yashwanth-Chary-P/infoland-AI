import documentService from '../services/document.service.js';
import { successResponse } from '../utils/apiResponse.js';

// ---------------------------------------------------------------------------
// PHASE 1 COMPATIBILITY CONTROLLERS
// ---------------------------------------------------------------------------

export const getDocumentsGrouped = async (req, res) => {
  const data = await documentService.getDocumentsGroupedByType(req.params.propertyId);
  res.json(successResponse('Documents retrieved successfully', data));
};

export const getDocument = async (req, res) => {
  const data = await documentService.getDocumentById(req.params.documentId);
  res.json(successResponse('Document retrieved successfully', data));
};

export const getMissingDocuments = async (req, res) => {
  const data = await documentService.getMissingDocuments(req.params.propertyId);
  res.json(successResponse('Missing documents retrieved successfully', data));
};

// ---------------------------------------------------------------------------
// PHASE 2 - MODULE 2 CONTROLLERS (DOCUMENT VERIFICATION ENGINE)
// ---------------------------------------------------------------------------

export const getVerificationStatus = async (req, res) => {
  const data = await documentService.getVerificationStatus(req.params.propertyId);
  res.json(successResponse('Document verification status retrieved successfully', data));
};

export const getCompleteness = async (req, res) => {
  const data = await documentService.getCompleteness(req.params.propertyId);
  res.json(successResponse('Document completeness retrieved successfully', data));
};

export const getMandatory = async (req, res) => {
  const data = await documentService.getMandatory(req.params.propertyId);
  res.json(successResponse('Mandatory documents retrieved successfully', data));
};

export const getMissing = async (req, res) => {
  const data = await documentService.getMissing(req.params.propertyId);
  res.json(successResponse('Missing documents retrieved successfully', data));
};

export const getExpired = async (req, res) => {
  const data = await documentService.getExpired(req.params.propertyId);
  res.json(successResponse('Expired documents retrieved successfully', data));
};

export const getSummary = async (req, res) => {
  const data = await documentService.getSummary(req.params.propertyId);
  res.json(successResponse('Document verification summary retrieved successfully', data));
};

export const getDetails = async (req, res) => {
  const data = await documentService.getDetails(req.params.propertyId);
  res.json(successResponse('Document verification details retrieved successfully', data));
};

export const getStatistics = async (req, res) => {
  const data = await documentService.getStatistics(req.params.propertyId);
  res.json(successResponse('Document statistics retrieved successfully', data));
};
