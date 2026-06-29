import apiClient from '../apiClient';
import { getPropertyProfileById, getHealthSummaryByPropertyId, getRegistryByPropertyId } from './PropertySubService';
import { getOwnerById, getOwnershipEventsByPropertyId } from './OwnerService';
import { getMetadataByPropertyId } from './MetadataService';
import { getTimelineByPropertyId } from './TimelineService';
import { getDocumentsByPropertyId } from './DocumentService';
import { getLoansByPropertyId } from './LoanService';
import { getTaxesByPropertyId } from './TaxService';
import { getCourtDisputesByPropertyId } from './CourtDisputeService';
import { getPOIsByPropertyId } from './POIService';

export const fetchAllProperties = async (params = {}) => {
  // Fetch paginated properties
  // The backend limit max is 100
  const queryParams = new URLSearchParams({ limit: 100, ...params }).toString();
  
  if (params.q) {
    const response = await apiClient.get(`/properties/search?${queryParams}`);
    return { data: response.data || [], pagination: response.pagination };
  }
  
  const response = await apiClient.get(`/properties?${queryParams}`);
  return { data: response.data || [], pagination: response.pagination };
};

export const fetchPropertyDetails = async (propertyId) => {
  try {
    // 1. Fetch the unified property details which contains master, profile, metadata, registry, owner, healthSummary
    const propRes = await apiClient.get(`/properties/${propertyId}`);
    const data = propRes.data;

    if (!data || !data.masterProperty) return null;

    // 2. Fetch the remaining specialized sub-modules concurrently
    const [
      ownershipEvents,
      timeline,
      documents,
      loans,
      taxes,
      courtDisputes,
      pois
    ] = await Promise.all([
      getOwnershipEventsByPropertyId(propertyId),
      getTimelineByPropertyId(propertyId),
      getDocumentsByPropertyId(propertyId),
      getLoansByPropertyId(propertyId),
      getTaxesByPropertyId(propertyId),
      getCourtDisputesByPropertyId(propertyId),
      getPOIsByPropertyId(propertyId)
    ]);

    // 3. Assemble and return the expected frontend shape to preserve existing UI components
    return {
      ...data.masterProperty,
      profile: data.profile,
      metadata: data.metadata,
      healthSummary: data.healthSummary,
      registry: data.propertyRegistry,
      owner: data.currentOwner,
      ownershipEvents,
      timeline: timeline || data.propertyTimeline,
      documents,
      loans,
      taxes,
      courtDisputes,
      pois
    };
  } catch (error) {
    console.error(`Failed to fetch property details for ${propertyId}:`, error);
    throw error;
  }
};
