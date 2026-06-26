import ownerRepository from '../repositories/owner.repository.js';

class OwnerService {
  async getCurrentOwner(propertyId) {
    const owner = await ownerRepository.findCurrentOwnerByPropertyId(propertyId);
    if (!owner) {
      const error = new Error('Owner not found for this property');
      error.statusCode = 404;
      throw error;
    }
    return owner;
  }

  async getOwnershipHistory(propertyId) {
    const events = await ownerRepository.findOwnershipEventsByPropertyId(propertyId);
    
    // Group or format events if needed
    return {
      timeline: events,
      transfers: events.filter(e => e.event_type === 'Transfer'),
      chain: events.map(e => e.owner_name)
    };
  }
}

export default new OwnerService();
