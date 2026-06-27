import mongoose from 'mongoose';

const locationScoreSchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    distance_to_nearest_commercial_km: { type: Number },
    distance_to_nearest_hospital_km: { type: Number },
    distance_to_nearest_park_km: { type: Number },
    distance_to_nearest_school_km: { type: Number },
    location_score: { type: Number },
    nearby_commercial_count: { type: Number },
    nearby_hospital_count: { type: Number },
    nearby_park_count: { type: Number },
    nearby_school_count: { type: Number }
}, { collection: 'location_scores', timestamps: true, strict: false });

locationScoreSchema.index({ property_id: 1 });

export default mongoose.model('LocationScore', locationScoreSchema);
