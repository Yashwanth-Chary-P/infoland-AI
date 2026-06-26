import mongoose from 'mongoose';

const syntheticPoiSchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    poi_id: { type: String },
    poi_name: { type: String },
    poi_type: { type: String },
    distance_m: { type: Number },
    // Other fields can be dynamically added as strict: false is set
}, { collection: 'synthetic_pois', timestamps: true, strict: false });

syntheticPoiSchema.index({ property_id: 1 });

export default mongoose.model('SyntheticPoi', syntheticPoiSchema);
