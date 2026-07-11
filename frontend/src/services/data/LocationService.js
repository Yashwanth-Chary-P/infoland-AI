import apiClient from '../apiClient';

export const getLocationIntelligenceByPropertyId = async (propertyId) => {
  try {
    const response = await apiClient.get(`/location/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch location intelligence for ${propertyId}:`, error);
    throw error;
  }
};
