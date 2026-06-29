import apiClient from '../apiClient';

export const getCourtDisputesByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/disputes/${propertyId}`);
    return res.data || [];
  } catch (error) {
    console.error('Error fetching court disputes:', error);
    return [];
  }
};
