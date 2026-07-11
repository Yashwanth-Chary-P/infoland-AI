import locationService from '../services/location.service.js';

class LocationController {
  async getLocationIntelligence(req, res, next) {
    try {
      const { propertyId } = req.params;
      const locationData = await locationService.getLocationIntelligence(propertyId);
      
      res.status(200).json({
        success: true,
        message: 'Location intelligence fetched successfully.',
        data: locationData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LocationController();
