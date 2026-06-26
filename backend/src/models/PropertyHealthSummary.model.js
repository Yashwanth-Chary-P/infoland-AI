import mongoose from 'mongoose';

const propertyHealthSummarySchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    document_count: { type: Number },
    missing_document_count: { type: Number },
    active_loan_count: { type: Number },
    court_dispute_count: { type: Number },
    pending_tax_count: { type: Number }
}, { collection: 'property_health_summary', timestamps: true, strict: false });

propertyHealthSummarySchema.index({ property_id: 1 });

export default mongoose.model('PropertyHealthSummary', propertyHealthSummarySchema);
