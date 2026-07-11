import propertyRepository from '../repositories/property.repository.js';
import ownerRepository from '../repositories/owner.repository.js';
import { getPagination, getPaginationMeta, buildSort } from '../utils/queryHelper.js';

class PropertyService {
  async getProperties(query) {
    const { limit, skip, page } = getPagination(query);
    const sort = buildSort(query);

    const masterFilter = {};
    const profileFilter = {};

    if (query.region) masterFilter.source_region = query.region;
    if (query.propertyClass) profileFilter.property_class = query.propertyClass;
    if (query.saleStatus) profileFilter.sale_status = query.saleStatus;

    const [properties, total] = await Promise.all([
      propertyRepository.findProperties(masterFilter, profileFilter, sort, skip, limit),
      propertyRepository.countProperties(masterFilter, profileFilter)
    ]);

    // Fetch related profile and health summary for list view to avoid N+1 queries in frontend
    const propertyIds = properties.map(p => p.property_id);
    const [profiles, healthSummaries] = await Promise.all([
      propertyRepository.findPropertyProfileByIds ? propertyRepository.findPropertyProfileByIds(propertyIds) : Promise.resolve([]),
      propertyRepository.findPropertyHealthSummaryByIds ? propertyRepository.findPropertyHealthSummaryByIds(propertyIds) : Promise.resolve([])
    ]);

    const profileMap = profiles.reduce((acc, p) => ({ ...acc, [p.property_id]: p }), {});
    const healthMap = healthSummaries.reduce((acc, h) => ({ ...acc, [h.property_id]: h }), {});

    const enrichedProperties = properties.map(p => ({
      ...p,
      profile: profileMap[p.property_id] || null,
      healthSummary: healthMap[p.property_id] || null
    }));

    return {
      data: enrichedProperties,
      pagination: getPaginationMeta(total, page, limit)
    };
  }

  async getPropertyDetails(propertyId) {
    const [
      masterProperty,
      profile,
      metadata,
      healthSummary,
      locationScore,
      propertyTimeline,
      propertyRegistry,
      currentOwner
    ] = await Promise.all([
      propertyRepository.findMasterPropertyById(propertyId),
      propertyRepository.findPropertyProfileById(propertyId),
      propertyRepository.findPropertyMetadataById(propertyId),
      propertyRepository.findPropertyHealthSummaryById(propertyId),
      propertyRepository.findLocationScoreById(propertyId),
      propertyRepository.findPropertyTimelineById(propertyId),
      propertyRepository.findPropertyRegistryById(propertyId),
      ownerRepository.findCurrentOwnerByPropertyId(propertyId)
    ]);

    if (healthSummary) {
      let score = 100;
      score -= (healthSummary.missing_document_count || 0) * 5;
      score -= (healthSummary.active_loan_count || 0) * 10;
      score -= (healthSummary.court_dispute_count || 0) * 30;
      score -= (healthSummary.pending_tax_count || 0) * 10;
      healthSummary.overall_score = Math.max(0, score);
    }

    if (!masterProperty) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    return {
      masterProperty,
      profile,
      metadata,
      healthSummary,
      locationScore,
      propertyTimeline,
      propertyRegistry,
      currentOwner
    };
  }

  async searchProperties(query) {
    const { q } = query;
    const { limit, skip, page } = getPagination(query);

    const [properties, total] = await Promise.all([
      propertyRepository.searchProperties(q, skip, limit),
      propertyRepository.countSearchProperties(q)
    ]);

    const propertyIds = properties.map(p => p.property_id);
    const [profiles, healthSummaries] = await Promise.all([
      propertyRepository.findPropertyProfileByIds ? propertyRepository.findPropertyProfileByIds(propertyIds) : Promise.resolve([]),
      propertyRepository.findPropertyHealthSummaryByIds ? propertyRepository.findPropertyHealthSummaryByIds(propertyIds) : Promise.resolve([])
    ]);

    const profileMap = profiles.reduce((acc, p) => ({ ...acc, [p.property_id]: p }), {});
    const healthMap = healthSummaries.reduce((acc, h) => ({ ...acc, [h.property_id]: h }), {});

    const enrichedProperties = properties.map(p => ({
      ...p,
      profile: profileMap[p.property_id] || null,
      healthSummary: healthMap[p.property_id] || null
    }));

    return {
      data: enrichedProperties,
      pagination: getPaginationMeta(total, page, limit)
    };
  }
}

export default new PropertyService();
