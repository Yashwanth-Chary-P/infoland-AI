import documentService from '../services/document.service.js';
import { successResponse } from '../utils/apiResponse.js';

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
