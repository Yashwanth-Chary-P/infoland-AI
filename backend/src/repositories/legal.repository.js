import CourtDispute from '../models/CourtDispute.model.js';

class LegalRepository {
  async findCourtDisputesByPropertyId(propertyId) {
    return await CourtDispute.find({ property_id: propertyId }).lean();
  }
}

export default new LegalRepository();
