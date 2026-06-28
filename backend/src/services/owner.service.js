import ownerRepository from '../repositories/owner.repository.js';

class OwnerService {
  _stripInternalFields(doc) {
    if (!doc) return null;
    const { _id, __v, createdAt, updatedAt, ...cleanDoc } = doc;
    return cleanDoc;
  }

  // ---------------------------------------------------------------------------
  // PHASE 1 COMPATIBILITY METHODS
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // PHASE 2 - MODULE 3 METHODS (OWNERSHIP & REGISTRY ENGINE)
  // ---------------------------------------------------------------------------

  async getCurrentOwner(propertyId) {
    const owner = await ownerRepository.findCurrentOwnerByPropertyId(propertyId);
    if (!owner) {
      const error = new Error('Owner not found for this property');
      error.statusCode = 404;
      throw error;
    }
    return this._stripInternalFields(owner);
  }

  async getOwnershipHistoryV2(propertyId) {
    const events = await ownerRepository.findOwnershipEventsByPropertyId(propertyId);
    return {
      property_id: propertyId,
      events: events.map(e => this._stripInternalFields(e))
    };
  }

  async getOwnershipTimeline(propertyId) {
    const events = await ownerRepository.findOwnershipEventsByPropertyId(propertyId);
    const ownerIds = new Set();
    events.forEach(e => {
      if (e.from_owner_id) ownerIds.add(e.from_owner_id);
      if (e.to_owner_id) ownerIds.add(e.to_owner_id);
    });
    
    const owners = await ownerRepository.findOwnersByIds([...ownerIds]);
    const ownerMap = Object.fromEntries(owners.map(o => [o.owner_id, o.full_name]));

    const normalizedTimeline = events.map(e => ({
      event_date: e.transfer_date,
      event_type: e.transfer_type,
      from_owner: ownerMap[e.from_owner_id] || e.from_owner_id,
      to_owner: ownerMap[e.to_owner_id] || e.to_owner_id,
      document_reference: e.event_id
    }));

    return {
      property_id: propertyId,
      timeline: normalizedTimeline
    };
  }

  async getRegistryInformation(propertyId) {
    const registry = await ownerRepository.findPropertyRegistryById(propertyId);
    if (!registry) {
      const error = new Error('Registry information not found');
      error.statusCode = 404;
      throw error;
    }
    return this._stripInternalFields(registry);
  }

  async getOwnershipValidation(propertyId) {
    const [owner, registry] = await Promise.all([
      ownerRepository.findCurrentOwnerByPropertyId(propertyId),
      ownerRepository.findPropertyRegistryById(propertyId)
    ]);

    if (!owner || !registry) {
      return {
        property_id: propertyId,
        ownership_state: 'pending',
        validation_details: 'Missing owner or registry data'
      };
    }

    const cleanOwner = this._stripInternalFields(owner);
    const cleanRegistry = this._stripInternalFields(registry);
    
    const commonFields = Object.keys(cleanOwner).filter(key => key in cleanRegistry && key !== 'property_id');
    
    let isMatch = true;
    const mismatches = [];

    for (const field of commonFields) {
      if (cleanOwner[field] !== cleanRegistry[field]) {
        isMatch = false;
        mismatches.push(field);
      }
    }

    return {
      property_id: propertyId,
      ownership_state: isMatch ? 'verified' : 'mismatch',
      common_fields_checked: commonFields,
      mismatches: mismatches
    };
  }

  async getOwnershipSummary(propertyId) {
    const [owner, registry, events, validation] = await Promise.all([
      ownerRepository.findCurrentOwnerByPropertyId(propertyId),
      ownerRepository.findPropertyRegistryById(propertyId),
      ownerRepository.findOwnershipEventsByPropertyId(propertyId),
      this.getOwnershipValidation(propertyId)
    ]);

    const ownerIds = new Set();
    if (owner) ownerIds.add(owner.owner_id);
    events.forEach(e => {
      if (e.from_owner_id) ownerIds.add(e.from_owner_id);
      if (e.to_owner_id) ownerIds.add(e.to_owner_id);
    });

    return {
      property_id: propertyId,
      ownership_state: validation.ownership_state,
      registry_status: registry ? (validation.ownership_state === 'verified' ? 'matched' : 'unmatched') : 'missing',
      current_owner: owner ? owner.owner_id : null,
      ownership_transfers: events.length,
      total_owners: ownerIds.size
    };
  }

  async getOwnershipStatistics(propertyId) {
    const [owner, events, validation] = await Promise.all([
      ownerRepository.findCurrentOwnerByPropertyId(propertyId),
      ownerRepository.findOwnershipEventsByPropertyId(propertyId),
      this.getOwnershipValidation(propertyId)
    ]);

    const ownerIds = new Set();
    if (owner) ownerIds.add(owner.owner_id);
    events.forEach(e => {
      if (e.from_owner_id) ownerIds.add(e.from_owner_id);
      if (e.to_owner_id) ownerIds.add(e.to_owner_id);
    });

    return {
      property_id: propertyId,
      current_owner: owner ? owner.owner_id : null,
      total_owners: ownerIds.size,
      ownership_transfers: events.length,
      registry_status: validation.ownership_state === 'verified' ? 'matched' : 'unmatched',
      ownership_validation: validation.ownership_state === 'verified' ? 'valid' : 'invalid'
    };
  }
}

export default new OwnerService();
