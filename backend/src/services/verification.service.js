import verificationRepository from '../repositories/verification.repository.js';

class VerificationService {
  /**
   * Derive computed backend fields based on MongoDB data.
   */
  _computeSignals(healthSummary) {
    // Expose verification signals and a foundational verification state only.
    // Future modules (Documents, Ownership, Financial, Legal, Risk) will enrich these values.
    return {
      documents: { status: 'pending' },
      ownership: { status: 'pending' },
      financial: { status: 'pending' },
      legal: { status: 'pending' }
    };
  }

  _computeVerificationState(master, profile, metadata, healthSummary) {
    if (!master) {
      return null;
    }
    
    // Foundational verification state only.
    // If we have a profile, we consider it pending verification by downstream modules.
    const status = profile ? 'pending' : 'unverified';
    
    // Compute progress only if it can be derived from existing MongoDB fields.
    // Otherwise return null and clearly document that the value cannot yet be computed.
    const progress = null; 

    return {
      status,
      progress,
      workflow: profile?.verification_workflow || null
    };
  }

  async getVerificationStatus(propertyId) {
    const data = await verificationRepository.getVerificationData(propertyId);
    if (!data.master) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    const state = this._computeVerificationState(data.master, data.profile, data.metadata, data.healthSummary);
    return {
      property_id: propertyId,
      ...state
    };
  }

  async getVerificationSummary(propertyId) {
    const data = await verificationRepository.getVerificationData(propertyId);
    if (!data.master) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    const state = this._computeVerificationState(data.master, data.profile, data.metadata, data.healthSummary);
    
    return {
      property_id: propertyId,
      state,
      health: data.healthSummary || null
    };
  }

  async getVerificationDetails(propertyId) {
    const data = await verificationRepository.getVerificationData(propertyId);
    if (!data.master) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    const state = this._computeVerificationState(data.master, data.profile, data.metadata, data.healthSummary);
    const signals = this._computeSignals(data.healthSummary);

    return {
      property_id: propertyId,
      state,
      signals,
      profile: data.profile || null,
      metadata: data.metadata || null,
      health: data.healthSummary || null
    };
  }

  async getVerificationSignals(propertyId) {
    const data = await verificationRepository.getVerificationData(propertyId);
    if (!data.master) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    const signals = this._computeSignals(data.healthSummary);

    return {
      property_id: propertyId,
      signals
    };
  }

  async getVerificationWorkflow(propertyId) {
    const data = await verificationRepository.getVerificationData(propertyId);
    if (!data.master) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    const workflow = data.profile?.verification_workflow || null;

    return {
      property_id: propertyId,
      workflow_type: workflow,
      steps: [
        { module: 'documents', status: 'pending' },
        { module: 'ownership', status: 'pending' },
        { module: 'financial', status: 'pending' },
        { module: 'legal', status: 'pending' }
      ]
    };
  }
}

export default new VerificationService();
