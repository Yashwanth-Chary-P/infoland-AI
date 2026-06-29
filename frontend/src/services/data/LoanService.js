import apiClient from '../apiClient';

export const getLoansByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/financial/${propertyId}/loans`);
    // Financial routes return { data: [ ...loans... ] }
    return res.data || [];
  } catch (error) {
    console.error('Error fetching loans:', error);
    return [];
  }
};
