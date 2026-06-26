import Owner from '../models/Owner.model.js';
import OwnershipEvent from '../models/OwnershipEvent.model.js';

class OwnerRepository {
  async findCurrentOwnerByPropertyId(propertyId) {
    // Assuming 'status' indicates current owner, or just getting the latest
    // This depends on how the data is structured. Let's return the latest by default.
    return await Owner.findOne({ property_id: propertyId }).sort({ 'createdAt': -1 }).lean();
  }

  async findOwnershipEventsByPropertyId(propertyId) {
    return await OwnershipEvent.find({ property_id: propertyId }).sort({ event_date: -1 }).lean();
  }
}

export default new OwnerRepository();
