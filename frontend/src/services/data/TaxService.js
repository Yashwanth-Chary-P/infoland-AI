import { fetchDataset } from './datasetClient';

export const getTaxesByPropertyId = async (propertyId) => {
  const taxes = await fetchDataset('tax_records.json');
  return taxes?.filter(t => t.property_id === propertyId) || [];
};
