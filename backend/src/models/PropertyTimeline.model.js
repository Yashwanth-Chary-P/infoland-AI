import mongoose from 'mongoose';

const propertyTimelineSchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    events: { type: Array }
}, { collection: 'property_timeline', timestamps: true, strict: false });

propertyTimelineSchema.index({ property_id: 1 });

export default mongoose.model('PropertyTimeline', propertyTimelineSchema);
