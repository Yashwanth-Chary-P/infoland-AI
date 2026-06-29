import apiClient from '../apiClient';

export const getPropertyProfileById = async (propertyId) => {
  try {
    const res = await apiClient.get(`/properties/${propertyId}`);
    return res.data?.profile || null;
  } catch (error) {
    console.error('Error fetching property profile:', error);
    return null;
  }
};

export const getRegistryByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/ownership/${propertyId}/registry`);
    return res.data || null;
  } catch (error) {
    console.error('Error fetching property registry:', error);
    return null;
  }
};

export const getHealthSummaryByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/properties/${propertyId}`);
    return res.data?.healthSummary || null;
  } catch (error) {
    console.error('Error fetching property health summary:', error);
    return null;
  }
};
