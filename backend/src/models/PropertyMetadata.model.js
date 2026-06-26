import mongoose from 'mongoose';

const propertyMetadataSchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    property_age_years: { type: Number },
    construction_status: { type: String },
    land_use: { type: String },
    zone_type: { type: String },
    development_stage: { type: String }
}, { collection: 'property_metadata', timestamps: true, strict: false });

propertyMetadataSchema.index({ property_id: 1 });

export default mongoose.model('PropertyMetadata', propertyMetadataSchema);
