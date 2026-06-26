import propertyRepository from '../repositories/property.repository.js';
import ownerRepository from '../repositories/owner.repository.js';
import { getPagination, getPaginationMeta, buildSort } from '../utils/queryHelper.js';

class PropertyService {
  async getProperties(query) {
    const { limit, skip, page } = getPagination(query);
    const sort = buildSort(query);
    
    // Construct filter from query
    const filter = {};
    if (query.region) filter.source_region = query.region;
    if (query.propertyClass) filter.property_class = query.propertyClass;
    if (query.saleStatus) filter.sale_status = query.saleStatus;
    // Note: areaRange and locationScore filters would need specific schema implementation details to map correctly
    
    const [properties, total] = await Promise.all([
      propertyRepository.findProperties(filter, sort, skip, limit),
      propertyRepository.countProperties(filter)
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
      currentOwner
    ] = await Promise.all([
      propertyRepository.findMasterPropertyById(propertyId),
      propertyRepository.findPropertyProfileById(propertyId),
      propertyRepository.findPropertyMetadataById(propertyId),
      propertyRepository.findPropertyHealthSummaryById(propertyId),
      propertyRepository.findLocationScoreById(propertyId),
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
