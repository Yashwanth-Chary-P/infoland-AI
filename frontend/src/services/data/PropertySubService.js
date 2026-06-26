import { fetchDataset } from './datasetClient';

export const getPropertyProfiles = async () => fetchDataset('property_profiles.json');
export const getPropertyProfileById = async (propertyId) => {
  const profiles = await getPropertyProfiles();
  return profiles?.find(p => p.property_id === propertyId) || null;
};

export const getPropertyRegistry = async () => fetchDataset('property_registry.json');
export const getRegistryByPropertyId = async (propertyId) => {
  const registry = await getPropertyRegistry();
  return registry?.find(r => r.property_id === propertyId) || null;
};

export const getPropertyHealthSummary = async () => fetchDataset('property_health_summary.json');
export const getHealthSummaryByPropertyId = async (propertyId) => {
  const summaries = await getPropertyHealthSummary();
  return summaries?.find(s => s.property_id === propertyId) || null;
};
