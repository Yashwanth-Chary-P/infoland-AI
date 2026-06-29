import apiClient from '../apiClient';

export const getTaxesByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/financial/${propertyId}/taxes`);
    return res.data || [];
  } catch (error) {
    console.error('Error fetching taxes:', error);
    return [];
  }
};
