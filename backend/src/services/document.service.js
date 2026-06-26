import documentRepository from '../repositories/document.repository.js';

class DocumentService {
  async getDocumentsGroupedByType(propertyId) {
    const documents = await documentRepository.findDocumentsByPropertyId(propertyId);
    
    const grouped = documents.reduce((acc, doc) => {
      const type = doc.document_type || 'Unknown';
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
    
    const available = documents.filter(d => d.status !== 'Expired');
    const expired = documents.filter(d => d.status === 'Expired');
    
    // In a real scenario, this might compare against a required list
    const requiredTypes = ['Sale Deed', 'Encumbrance Certificate', 'Property Tax Receipt'];
    const presentTypes = new Set(documents.map(d => d.document_type));
    const missing = requiredTypes.filter(t => !presentTypes.has(t));

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
}

export default new DocumentService();
