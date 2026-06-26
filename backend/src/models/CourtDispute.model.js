import mongoose from 'mongoose';

const courtDisputeSchema = new mongoose.Schema({
    dispute_id: { type: String, required: true },
    property_id: { type: String, required: true },
    case_type: { type: String },
    status: { type: String }
}, { collection: 'court_disputes', timestamps: true, strict: false });

courtDisputeSchema.index({ dispute_id: 1 });
courtDisputeSchema.index({ property_id: 1 });

export default mongoose.model('CourtDispute', courtDisputeSchema);
