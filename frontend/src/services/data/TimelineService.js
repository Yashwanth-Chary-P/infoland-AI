import { fetchDataset } from './datasetClient';

export const getTimelineByPropertyId = async (propertyId) => {
  const timelines = await fetchDataset('property_timeline.json');
  return timelines?.find(t => t.property_id === propertyId) || null;
};
