import Owner from '../models/Owner.model.js';
import OwnershipEvent from '../models/OwnershipEvent.model.js';
import PropertyRegistry from '../models/PropertyRegistry.model.js';
import PropertyTimeline from '../models/PropertyTimeline.model.js';

class OwnerRepository {
  async findCurrentOwnerByPropertyId(propertyId) {
    return await Owner.findOne({ property_id: propertyId }).lean();
  }

  async findPropertyRegistryById(propertyId) {
    return await PropertyRegistry.findOne({ property_id: propertyId }).lean();
  }

  async findPropertyTimelineById(propertyId) {
    return await PropertyTimeline.findOne({ property_id: propertyId }).lean();
  }

  async findOwnershipEventsByPropertyId(propertyId) {
    return await OwnershipEvent.find({ property_id: propertyId })
      .sort({ transfer_date: 1 })
      .lean();
  }

  async findOwnersByIds(ownerIds) {
    if (!ownerIds.length) {
      return [];
    }
    return await Owner.find({ owner_id: { $in: ownerIds } }).lean();
  }
}

export default new OwnerRepository();
