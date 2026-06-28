import documentRepository from '../repositories/document.repository.js';

// Derived directly from Dataset Engine release/reports/document_schema_catalog.json
// Documenting Assumption: The Dataset Engine guarantees a fixed set of these 18 document types.
const CANONICAL_DOCUMENT_TYPES = [
  'sale_deed',
  'mother_deed',
  'encumbrance_certificate',
  'property_tax_receipt',
  'mutation_record',
  'survey_map',
  'rtc_record',
  'khata_certificate',
  'khata_extract',
  'building_approval_plan',
  'layout_approval',
  'land_conversion_certificate',
  'occupancy_certificate',
  'completion_certificate',
  'noc',
  'identity_proof',
  'power_of_attorney',
  'court_dispute_record'
];

class DocumentService {
  // ---------------------------------------------------------------------------
  // PHASE 1 COMPATIBILITY METHODS
  // ---------------------------------------------------------------------------

  async getDocumentsGroupedByType(propertyId) {
    const documents = await documentRepository.findDocumentsByPropertyId(propertyId);

    const grouped = documents.reduce((acc, doc) => {
      const type = doc.document_type || 'unknown';
      if (!acc[type]) acc[type] = [];
      acc[type].push(doc);
      return acc;
    }, {});

    return grouped;
  }

  async getDocumentById(documentId) {
    const doc = await documentRepository.findDocumentById(documentId);
    if (!doc) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return doc;
  }

  async getMissingDocuments(propertyId) {
    const documents = await documentRepository.findDocumentsByPropertyId(propertyId);

    const available = documents.filter((d) => d.status === 'available');
    const expired = documents.filter((d) => d.status === 'expired');
    const missing = documents
      .filter((d) => d.status === 'missing')
      .map((d) => d.document_type);

    return {
      availableDocuments: available,
      expiredDocuments: expired,
      missingDocuments: missing,
      counts: {
        total: documents.length,
        available: available.length,
        expired: expired.length,
        missing: missing.length
      }
    };
  }

  // ---------------------------------------------------------------------------
  // PHASE 2 - MODULE 2 METHODS (DOCUMENT VERIFICATION ENGINE)
  // ---------------------------------------------------------------------------

  _stripInternalFields(doc) {
    const { _id, __v, createdAt, updatedAt, ...cleanDoc } = doc;
    return cleanDoc;
  }

  async _getCleanDocuments(propertyId) {
    const documents = await documentRepository.findDocumentsByPropertyId(propertyId);
    if (!documents || documents.length === 0) {
      const error = new Error('Property not found or no documents exist');
      error.statusCode = 404;
      throw error;
    }
    return documents.map(this._stripInternalFields);
  }

  _computeCompleteness(documents) {
    const total = documents.length;
    if (total === 0) return 0;
    const available = documents.filter(d => d.status === 'available').length;
    return parseFloat(((available / total) * 100).toFixed(2));
  }

  _computeVerificationState(documents) {
    const completeness = this._computeCompleteness(documents);
    if (completeness === 100) return 'complete';
    if (completeness === 0) return 'pending';
    return 'incomplete';
  }

  async getVerificationStatus(propertyId) {
    const documents = await this._getCleanDocuments(propertyId);
    return {
      property_id: propertyId,
      verification_state: this._computeVerificationState(documents)
    };
  }

  async getCompleteness(propertyId) {
    const documents = await this._getCleanDocuments(propertyId);
    return {
      property_id: propertyId,
      completeness_percentage: this._computeCompleteness(documents)
    };
  }

  async getMandatory(propertyId) {
    // Determine mandatory documents from the Dataset Engine fixed configuration
    return {
      property_id: propertyId,
      mandatory_documents: CANONICAL_DOCUMENT_TYPES
    };
  }

  async getMissing(propertyId) {
    const documents = await this._getCleanDocuments(propertyId);
    const missing = documents
      .filter(d => d.status === 'missing')
      .map(d => ({
        document_type: d.document_type,
        status: 'missing'
      }));

    return {
      property_id: propertyId,
      missing_documents: missing
    };
  }

  async getExpired(propertyId) {
    const documents = await this._getCleanDocuments(propertyId);
    const expired = documents
      .filter(d => d.status === 'expired')
      .map(d => ({
        document_id: d.document_id,
        document_type: d.document_type,
        status: 'expired',
        issue_date: d.issue_date,
        last_updated: d.last_updated
      }));

    return {
      property_id: propertyId,
      expired_documents: expired
    };
  }

  async getSummary(propertyId) {
    const documents = await this._getCleanDocuments(propertyId);
    return {
      property_id: propertyId,
      verification_state: this._computeVerificationState(documents),
      completeness_percentage: this._computeCompleteness(documents),
      total_documents: documents.length,
      available_documents: documents.filter(d => d.status === 'available').length,
      missing_documents: documents.filter(d => d.status === 'missing').length,
      expired_documents: documents.filter(d => d.status === 'expired').length
    };
  }

  async getDetails(propertyId) {
    const documents = await this._getCleanDocuments(propertyId);
    return {
      property_id: propertyId,
      documents
    };
  }

  async getStatistics(propertyId) {
    const documents = await this._getCleanDocuments(propertyId);
    return {
      property_id: propertyId,
      total_documents: documents.length,
      available_documents: documents.filter(d => d.status === 'available').length,
      missing_documents: documents.filter(d => d.status === 'missing').length,
      expired_documents: documents.filter(d => d.status === 'expired').length,
      completeness_percentage: this._computeCompleteness(documents)
    };
  }
}

export default new DocumentService();
