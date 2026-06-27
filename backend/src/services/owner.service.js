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

  _resolveOwner(ownerId, ownerMap) {
    return {
      owner_id: ownerId,
      full_name: ownerMap[ownerId]?.full_name || null
    };
  }

  async getOwnershipHistory(propertyId) {
    const [timelineDoc, events] = await Promise.all([
      ownerRepository.findPropertyTimelineById(propertyId),
      ownerRepository.findOwnershipEventsByPropertyId(propertyId)
    ]);

    const ownerIds = new Set();
    events.forEach((event) => {
      if (event.from_owner_id) ownerIds.add(event.from_owner_id);
      if (event.to_owner_id) ownerIds.add(event.to_owner_id);
    });

    const owners = await ownerRepository.findOwnersByIds([...ownerIds]);
    const ownerMap = Object.fromEntries(owners.map((owner) => [owner.owner_id, owner]));

    const transfers = events.map((event) => ({
      ...event,
      from_owner: this._resolveOwner(event.from_owner_id, ownerMap),
      to_owner: this._resolveOwner(event.to_owner_id, ownerMap)
    }));

    const chain = [];
    if (events.length > 0) {
      chain.push(this._resolveOwner(events[0].from_owner_id, ownerMap));
      events.forEach((event) => {
        chain.push(this._resolveOwner(event.to_owner_id, ownerMap));
      });
    }

    return {
      timeline: timelineDoc?.events || [],
      transfers,
      chain
    };
  }
}

export default new OwnerService();
