import mongoose from 'mongoose';

const masterPropertySchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    source_id: { type: String },
    source_region: { type: String },
    feature_category: { type: String },
    building: { type: String },
    area_sq_m: { type: Number },
    area_sq_yd: { type: Number },
    area_sq_ft: { type: Number },
    perimeter_m: { type: Number },
    centroid_lat: { type: Number },
    centroid_lon: { type: Number },
    bbox: {
        min_lon: Number,
        min_lat: Number,
        max_lon: Number,
        max_lat: Number
    },
    geometry: {
        type: { type: String },
        coordinates: mongoose.Schema.Types.Mixed
    }
}, { collection: 'master_properties', timestamps: true, strict: false });

masterPropertySchema.index({ property_id: 1 });
masterPropertySchema.index({ source_region: 1 });

export default mongoose.model('MasterProperty', masterPropertySchema);
