import Document from '../models/Document.model.js';

class DocumentRepository {
  async findDocumentsByPropertyId(propertyId) {
    return await Document.find({ property_id: propertyId }).lean();
  }

  async findDocumentById(documentId) {
    return await Document.findOne({ document_id: documentId }).lean();
  }
}

export default new DocumentRepository();
