import { fetchDataset } from './datasetClient';

export const getDocumentsByPropertyId = async (propertyId) => {
  const documents = await fetchDataset('documents/documents_all.json');
  return documents?.filter(d => d.property_id === propertyId) || [];
};
