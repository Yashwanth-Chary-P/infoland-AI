import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    document_id: { type: String, required: true },
    property_id: { type: String, required: true },
    document_type: { type: String },
    status: { type: String },
    issue_date: { type: String },
    last_updated: { type: String },
    issuing_authority: { type: String },
    document_number: { type: String },
    remarks: { type: String },
    seller_name: { type: String },
    buyer_name: { type: String },
    registration_number: { type: String },
    registration_date: { type: String },
    market_value: { type: Number }
}, { collection: 'documents_all', timestamps: true, strict: false });

documentSchema.index({ document_id: 1 });
documentSchema.index({ property_id: 1 });
documentSchema.index({ document_type: 1 });

export default mongoose.model('Document', documentSchema);
