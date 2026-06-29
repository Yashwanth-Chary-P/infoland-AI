import apiClient from '../apiClient';

export const getOwnerById = async (ownerId) => {
  // If ownerId is known, the backend typically relies on propertyId for current owner: GET /ownership/:propertyId/current
  // But wait, if we only have ownerId, there might be no specific endpoint.
  // In Module 1, fetchPropertyDetails pulls currentOwner directly from the property details payload anyway.
  // So this function might not be used heavily, but we'll try fetching owners if an endpoint exists, 
  // otherwise return null as requested for unavailable endpoints.
  console.warn('getOwnerById not directly supported without propertyId in current backend API.');
  return null;
};

export const getOwnershipEventsByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/ownership/${propertyId}/history`);
    // The history endpoint returns { property_id, events: [...] }
    return res.data?.events || [];
  } catch (error) {
    console.error('Error fetching ownership events:', error);
    return [];
  }
};
