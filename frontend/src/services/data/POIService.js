import { fetchDataset } from './datasetClient';

export const getPOIs = async () => {
  return await fetchDataset('synthetic_pois.json');
};

export const getPOIsByPropertyId = async (propertyId) => {
  const pois = await getPOIs();
  return pois?.filter(p => p.property_id === propertyId) || [];
};
