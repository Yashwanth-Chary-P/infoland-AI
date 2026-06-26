import mongoose from 'mongoose';

const propertyRegistrySchema = new mongoose.Schema({
    property_id: { type: String, required: true },
    owner_id: { type: String, required: true }
}, { collection: 'property_registry', timestamps: true, strict: false });

propertyRegistrySchema.index({ property_id: 1 });
propertyRegistrySchema.index({ owner_id: 1 });

export default mongoose.model('PropertyRegistry', propertyRegistrySchema);
