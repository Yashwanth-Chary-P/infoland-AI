import ownerRepository from '../repositories/owner.repository.js';
import legalRepository from '../repositories/legal.repository.js';

class LegalService {
  /**
   * Generates a unified historical timeline of ownership and legal events.
   */
  async getLegalTimeline(propertyId) {
    const [ownershipEvents, courtDisputes] = await Promise.all([
      ownerRepository.findOwnershipEventsByPropertyId(propertyId),
      legalRepository.findCourtDisputesByPropertyId(propertyId)
    ]);

    const timeline = [];

    // Normalize Ownership Events
    for (const oe of ownershipEvents) {
      timeline.push({
        event_type: oe.transfer_type || 'transfer',
        event_date: oe.transfer_date || oe.createdAt?.toISOString()?.split('T')[0] || null,
        source_collection: 'ownership_events',
        title: `Ownership Transfer: ${oe.transfer_type || 'Unknown'}`,
        description: `Transfer from ${oe.from_owner_id || 'Unknown'} to ${oe.to_owner_id || 'Unknown'}`,
        severity: 'info',
        metadata: {
          event_id: oe.event_id,
          from_owner_id: oe.from_owner_id,
          to_owner_id: oe.to_owner_id
        }
      });
    }

    // Normalize Legal Events
    for (const cd of courtDisputes) {
      const isResolved = cd.status === 'closed' || cd.status === 'resolved';
      timeline.push({
        event_type: cd.case_type || 'legal_dispute',
        // Fallback to createdAt if no explicit date exists in the dataset
        event_date: cd.createdAt ? cd.createdAt.toISOString().split('T')[0] : null,
        source_collection: 'court_disputes',
        title: `Legal Dispute: ${cd.case_type || 'Unknown'}`,
        description: `Dispute status is ${cd.status || 'unknown'}`,
        severity: isResolved ? 'warning' : 'high',
        metadata: {
          dispute_id: cd.dispute_id,
          status: cd.status
        }
      });
    }

    // Sort chronologically (oldest first)
    timeline.sort((a, b) => {
      if (!a.event_date) return -1;
      if (!b.event_date) return 1;
      return new Date(a.event_date) - new Date(b.event_date);
    });

    return {
      property_id: propertyId,
      timeline
    };
  }

  /**
   * Dynamically computes legal status and summary
   */
  async getLegalStatus(propertyId) {
    const courtDisputes = await legalRepository.findCourtDisputesByPropertyId(propertyId);

    let active_dispute_count = 0;
    let resolved_dispute_count = 0;
    const legal_risk_flags = [];

    for (const cd of courtDisputes) {
      if (cd.status === 'closed' || cd.status === 'resolved') {
        resolved_dispute_count++;
      } else {
        active_dispute_count++;
        legal_risk_flags.push(`Active dispute: ${cd.case_type || cd.dispute_id}`);
      }
    }

    let status = 'clear';
    let summary = 'No legal disputes found.';

    if (active_dispute_count > 0) {
      status = 'active_dispute';
      summary = 'Property has active legal disputes.';
    } else if (resolved_dispute_count > 0) {
      status = 'resolved_dispute';
      summary = 'Past disputes were resolved. Property is currently clear.';
    }

    // "pending_review" could be an edge case if status is unknown, but clear/active/resolved covers typical cases.

    return {
      property_id: propertyId,
      status,
      active_dispute_count,
      resolved_dispute_count,
      legal_risk_flags,
      legal_summary: summary
    };
  }

  async getLegalSummary(propertyId) {
    const statusData = await this.getLegalStatus(propertyId);
    return {
      property_id: propertyId,
      status: statusData.status,
      legal_summary: statusData.legal_summary,
      risk_flags: statusData.legal_risk_flags
    };
  }

  async getLegalStatistics(propertyId) {
    const statusData = await this.getLegalStatus(propertyId);
    return {
      property_id: propertyId,
      active_disputes: statusData.active_dispute_count,
      resolved_disputes: statusData.resolved_dispute_count,
      total_disputes: statusData.active_dispute_count + statusData.resolved_dispute_count,
      status: statusData.status
    };
  }

  async getLegalDetails(propertyId) {
    const [ownershipEvents, courtDisputes] = await Promise.all([
      ownerRepository.findOwnershipEventsByPropertyId(propertyId),
      legalRepository.findCourtDisputesByPropertyId(propertyId)
    ]);

    // Compute status data manually to avoid double-querying
    let active_dispute_count = 0;
    let resolved_dispute_count = 0;
    const legal_risk_flags = [];

    for (const cd of courtDisputes) {
      if (cd.status === 'closed' || cd.status === 'resolved') {
        resolved_dispute_count++;
      } else {
        active_dispute_count++;
        legal_risk_flags.push(`Active dispute: ${cd.case_type || cd.dispute_id}`);
      }
    }

    let status = 'clear';
    let legal_summary = 'No legal disputes found.';

    if (active_dispute_count > 0) {
      status = 'active_dispute';
      legal_summary = 'Property has active legal disputes.';
    } else if (resolved_dispute_count > 0) {
      status = 'resolved_dispute';
      legal_summary = 'Past disputes were resolved. Property is currently clear.';
    }

    // Build timeline using the same data
    const timeline = [];

    for (const oe of ownershipEvents) {
      timeline.push({
        event_type: oe.transfer_type || 'transfer',
        event_date: oe.transfer_date || oe.createdAt?.toISOString()?.split('T')[0] || null,
        source_collection: 'ownership_events',
        title: `Ownership Transfer: ${oe.transfer_type || 'Unknown'}`,
        description: `Transfer from ${oe.from_owner_id || 'Unknown'} to ${oe.to_owner_id || 'Unknown'}`,
        severity: 'info',
        metadata: {
          event_id: oe.event_id,
          from_owner_id: oe.from_owner_id,
          to_owner_id: oe.to_owner_id
        }
      });
    }

    for (const cd of courtDisputes) {
      const isResolved = cd.status === 'closed' || cd.status === 'resolved';
      timeline.push({
        event_type: cd.case_type || 'legal_dispute',
        event_date: cd.createdAt ? cd.createdAt.toISOString().split('T')[0] : null,
        source_collection: 'court_disputes',
        title: `Legal Dispute: ${cd.case_type || 'Unknown'}`,
        description: `Dispute status is ${cd.status || 'unknown'}`,
        severity: isResolved ? 'warning' : 'high',
        metadata: {
          dispute_id: cd.dispute_id,
          status: cd.status
        }
      });
    }

    timeline.sort((a, b) => {
      if (!a.event_date) return -1;
      if (!b.event_date) return 1;
      return new Date(a.event_date) - new Date(b.event_date);
    });

    return {
      property_id: propertyId,
      status,
      legal_summary,
      active_dispute_count,
      resolved_dispute_count,
      legal_risk_flags,
      timeline
    };
  }
}

export default new LegalService();
