import { fetchDataset } from './datasetClient';

export const getCourtDisputesByPropertyId = async (propertyId) => {
  const disputes = await fetchDataset('court_disputes.json');
  return disputes?.filter(d => d.property_id === propertyId) || [];
};
