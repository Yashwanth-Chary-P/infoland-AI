import locationRepository from '../repositories/location.repository.js';

class LocationService {
  async getLocationIntelligence(propertyId) {
    if (!propertyId) {
      const error = new Error('Property ID is required');
      error.statusCode = 400;
      throw error;
    }

    const locationData = await locationRepository.findLocationScoreByPropertyId(propertyId);

    if (!locationData) {
      const error = new Error('Location intelligence not found');
      error.statusCode = 404;
      throw error;
    }

    // Explicitly destructure to ensure only needed fields are returned
    const {
      _id,
      __v,
      createdAt,
      updatedAt,
      ...intelligenceData
    } = locationData;

    return intelligenceData;
  }
}

export default new LocationService();
