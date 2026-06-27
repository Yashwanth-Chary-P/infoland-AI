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

    return {
      data: properties,
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

    return {
      data: properties,
      pagination: getPaginationMeta(total, page, limit)
    };
  }
}

export default new PropertyService();
