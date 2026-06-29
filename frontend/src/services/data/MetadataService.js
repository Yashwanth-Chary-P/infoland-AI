import apiClient from '../apiClient';

export const getMetadataByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/properties/${propertyId}`);
    return res.data?.metadata || null;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
};
