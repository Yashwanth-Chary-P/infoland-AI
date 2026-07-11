import LocationScore from '../models/LocationScore.model.js';

class LocationRepository {
  async findLocationScoreByPropertyId(propertyId) {
    return await LocationScore.findOne({ property_id: propertyId }).lean();
  }
}

export default new LocationRepository();
