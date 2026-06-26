import mongoose from 'mongoose';

const locationScoreSchema = new mongoose.Schema({
    property_id: { type: String, required: true }
}, { collection: 'location_scores', timestamps: true, strict: false });

locationScoreSchema.index({ property_id: 1 });

export default mongoose.model('LocationScore', locationScoreSchema);
