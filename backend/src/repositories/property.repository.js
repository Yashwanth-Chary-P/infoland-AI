import MasterProperty from '../models/MasterProperty.model.js';
import PropertyProfile from '../models/PropertyProfile.model.js';
import PropertyMetadata from '../models/PropertyMetadata.model.js';
import PropertyHealthSummary from '../models/PropertyHealthSummary.model.js';
import PropertyTimeline from '../models/PropertyTimeline.model.js';
import PropertyRegistry from '../models/PropertyRegistry.model.js';
import LocationScore from '../models/LocationScore.model.js';
import Owner from '../models/Owner.model.js';

class PropertyRepository {
  async _resolveProfilePropertyIds(profileFilter) {
    if (!profileFilter || Object.keys(profileFilter).length === 0) {
      return null;
    }
    return PropertyProfile.find(profileFilter).distinct('property_id');
  }

  async _applyProfileFilter(masterFilter, profileFilter) {
    const profilePropertyIds = await this._resolveProfilePropertyIds(profileFilter);
    if (!profilePropertyIds) {
      return masterFilter;
    }
    return {
      ...masterFilter,
      property_id: { $in: profilePropertyIds }
    };
  }

  async findProperties(masterFilter, profileFilter, sort, skip, limit) {
    const filter = await this._applyProfileFilter(masterFilter, profileFilter);
    return await MasterProperty.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async countProperties(masterFilter, profileFilter = {}) {
    const filter = await this._applyProfileFilter(masterFilter, profileFilter);
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

  async findPropertyProfileByIds(propertyIds) {
    return await PropertyProfile.find({ property_id: { $in: propertyIds } }).lean();
  }

  async findPropertyHealthSummaryByIds(propertyIds) {
    return await PropertyHealthSummary.find({ property_id: { $in: propertyIds } }).lean();
  }

  async findPropertyTimelineById(propertyId) {
    return await PropertyTimeline.findOne({ property_id: propertyId }).lean();
  }

  async findPropertyRegistryById(propertyId) {
    return await PropertyRegistry.findOne({ property_id: propertyId }).lean();
  }

  async findLocationScoreById(propertyId) {
    return await LocationScore.findOne({ property_id: propertyId }).lean();
  }

  _buildSearchFilter(query, ownerPropertyIds) {
    const regexQuery = { $regex: query, $options: 'i' };
    const orConditions = [
      { property_id: regexQuery },
      { source_region: regexQuery },
      { source_id: regexQuery },
      { building: regexQuery },
      { feature_category: regexQuery }
    ];

    if (ownerPropertyIds.length > 0) {
      orConditions.push({ property_id: { $in: ownerPropertyIds } });
    }

    return { $or: orConditions };
  }

  async _getOwnerMatchedPropertyIds(query) {
    const regexQuery = { $regex: query, $options: 'i' };
    return Owner.find({
      $or: [
        { full_name: regexQuery },
        { source_region: regexQuery },
        { owner_id: regexQuery }
      ]
    }).distinct('property_id');
  }

  async searchProperties(query, skip, limit) {
    const ownerPropertyIds = await this._getOwnerMatchedPropertyIds(query);
    const filter = this._buildSearchFilter(query, ownerPropertyIds);

    return await MasterProperty.find(filter).skip(skip).limit(limit).lean();
  }

  async countSearchProperties(query) {
    const ownerPropertyIds = await this._getOwnerMatchedPropertyIds(query);
    const filter = this._buildSearchFilter(query, ownerPropertyIds);
    return await MasterProperty.countDocuments(filter);
  }
}

export default new PropertyRepository();
