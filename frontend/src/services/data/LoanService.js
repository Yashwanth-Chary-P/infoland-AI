import { fetchDataset } from './datasetClient';

export const getLoansByPropertyId = async (propertyId) => {
  const loans = await fetchDataset('loans.json');
  return loans?.filter(l => l.property_id === propertyId) || [];
};
