import PropertyProfile from '../models/PropertyProfile.model.js';
import PropertyMetadata from '../models/PropertyMetadata.model.js';
import PropertyHealthSummary from '../models/PropertyHealthSummary.model.js';
import MasterProperty from '../models/MasterProperty.model.js';

class VerificationRepository {
  async getVerificationData(propertyId) {
    const [profile, metadata, healthSummary, master] = await Promise.all([
      PropertyProfile.findOne({ property_id: propertyId }).lean(),
      PropertyMetadata.findOne({ property_id: propertyId }).lean(),
      PropertyHealthSummary.findOne({ property_id: propertyId }).lean(),
      MasterProperty.findOne({ property_id: propertyId }).lean()
    ]);
    
    return { profile, metadata, healthSummary, master };
  }
}

export default new VerificationRepository();
