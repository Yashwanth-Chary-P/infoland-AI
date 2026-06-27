import documentRepository from '../repositories/document.repository.js';

class DocumentService {
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
}

export default new DocumentService();
