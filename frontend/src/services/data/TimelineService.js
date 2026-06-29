import apiClient from '../apiClient';

export const getTimelineByPropertyId = async (propertyId) => {
  try {
    const res = await apiClient.get(`/ownership/${propertyId}/timeline`);
    return res.data?.timeline || null;
  } catch (error) {
    console.error('Error fetching property timeline:', error);
    return null;
  }
};
