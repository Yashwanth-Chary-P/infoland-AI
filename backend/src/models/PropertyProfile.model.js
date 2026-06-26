import mongoose from 'mongoose';

const propertyProfileSchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    area_segment: { type: String },
    property_class: { type: String },
    future_risk_tier: { type: String },
    sale_status: { type: String },
    verification_workflow: { type: String },
    location_score: { type: Number }
}, { collection: 'property_profiles', timestamps: true, strict: false });

propertyProfileSchema.index({ property_id: 1 });

export default mongoose.model('PropertyProfile', propertyProfileSchema);
