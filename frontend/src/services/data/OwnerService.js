import { fetchDataset } from './datasetClient';

export const getOwnerById = async (ownerId) => {
  const owners = await fetchDataset('owners.json');
  return owners?.find(o => o.owner_id === ownerId) || null;
};

export const getOwnershipEventsByPropertyId = async (propertyId) => {
  const events = await fetchDataset('ownership_events.json');
  return events?.filter(e => e.property_id === propertyId) || [];
};
