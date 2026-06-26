import MasterProperty from '../models/MasterProperty.model.js';
import PropertyProfile from '../models/PropertyProfile.model.js';
import PropertyMetadata from '../models/PropertyMetadata.model.js';
import PropertyHealthSummary from '../models/PropertyHealthSummary.model.js';
import LocationScore from '../models/LocationScore.model.js';

class PropertyRepository {
  async findProperties(filter, sort, skip, limit) {
    return await MasterProperty.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async countProperties(filter) {
    return await MasterProperty.countDocuments(filter);
  }

  async findMasterPropertyById(propertyId) {
    return await MasterProperty.findOne({ property_id: propertyId }).lean();
  }

  async findPropertyProfileById(propertyId) {
    return await PropertyProfile.findOne({ property_id: propertyId }).lean();
  }

  async findPropertyMetadataById(propertyId) {
    return await PropertyMetadata.findOne({ property_id: propertyId }).lean();
  }

  async findPropertyHealthSummaryById(propertyId) {
    return await PropertyHealthSummary.findOne({ property_id: propertyId }).lean();
  }

  async findLocationScoreById(propertyId) {
    return await LocationScore.findOne({ property_id: propertyId }).lean();
  }

  async searchProperties(query, skip, limit) {
    // Perform case-insensitive search across relevant string fields
    // (Assuming these fields exist or we'll just search by ID if others aren't in MasterProperty)
    const regexQuery = { $regex: query, $options: 'i' };
    const filter = {
      $or: [
        { property_id: regexQuery },
        // other fields like survey number or owner name if they exist in master property
        // for full search we might need to search across collections, but for phase 1 we'll stick to basic implementation
      ]
    };
    
    return await MasterProperty.find(filter).skip(skip).limit(limit).lean();
  }
  
  async countSearchProperties(query) {
    const regexQuery = { $regex: query, $options: 'i' };
    const filter = {
      $or: [
        { property_id: regexQuery }
      ]
    };
    return await MasterProperty.countDocuments(filter);
  }
}

export default new PropertyRepository();
