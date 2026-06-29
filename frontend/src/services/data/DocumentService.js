import apiClient from '../apiClient';

export const getDocumentsByPropertyId = async (propertyId) => {
  try {
    // We use /details to get an array of documents as the frontend currently expects a flat array
    // Wait, let's verify if the UI expects grouped documents or a flat array.
    // The previous mock 'property_documents.json' was an array of documents.
    // The /details endpoint returns { property_id, documents: [] }
    const res = await apiClient.get(`/documents/${propertyId}/details`);
    return res.data?.documents || [];
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};
