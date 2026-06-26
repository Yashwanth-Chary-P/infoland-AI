import { fetchDataset } from './datasetClient';

export const getMetadataByPropertyId = async (propertyId) => {
  const metadata = await fetchDataset('property_metadata.json');
  return metadata?.find(m => m.property_id === propertyId) || null;
};
