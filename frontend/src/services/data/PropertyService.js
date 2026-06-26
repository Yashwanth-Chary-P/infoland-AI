import { fetchDataset } from './datasetClient';
import { getPropertyProfileById, getHealthSummaryByPropertyId, getRegistryByPropertyId } from './PropertySubService';
import { getOwnerById, getOwnershipEventsByPropertyId } from './OwnerService';
import { getMetadataByPropertyId } from './MetadataService';
import { getTimelineByPropertyId } from './TimelineService';
import { getDocumentsByPropertyId } from './DocumentService';
import { getLoansByPropertyId } from './LoanService';
import { getTaxesByPropertyId } from './TaxService';
import { getCourtDisputesByPropertyId } from './CourtDisputeService';
import { getPOIsByPropertyId } from './POIService';

export const fetchAllProperties = async () => {
  return await fetchDataset('master_properties.json');
};

export const fetchPropertyDetails = async (propertyId) => {
  const master = await fetchAllProperties();
  const property = master?.find(p => p.property_id === propertyId);
  
  if (!property) return null;

  const registry = await getRegistryByPropertyId(propertyId);
  let owner = null;
  if (registry && registry.owner_id) {
      owner = await getOwnerById(registry.owner_id);
  }

  const [
    profile,
    metadata,
    healthSummary,
    ownershipEvents,
    timeline,
    documents,
    loans,
    taxes,
    courtDisputes,
    pois
  ] = await Promise.all([
    getPropertyProfileById(propertyId),
    getMetadataByPropertyId(propertyId),
    getHealthSummaryByPropertyId(propertyId),
    getOwnershipEventsByPropertyId(propertyId),
    getTimelineByPropertyId(propertyId),
    getDocumentsByPropertyId(propertyId),
    getLoansByPropertyId(propertyId),
    getTaxesByPropertyId(propertyId),
    getCourtDisputesByPropertyId(propertyId),
    getPOIsByPropertyId(propertyId)
  ]);

  return {
    ...property,
    profile,
    metadata,
    healthSummary,
    registry,
    owner,
    ownershipEvents,
    timeline,
    documents,
    loans,
    taxes,
    courtDisputes,
    pois
  };
};
