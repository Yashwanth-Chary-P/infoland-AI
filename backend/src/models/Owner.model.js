import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
    owner_id: { type: String, required: true },
    property_id: { type: String, required: true },
    owner_type: { type: String },
    full_name: { type: String },
    phone: { type: String },
    email: { type: String },
    source_region: { type: String }
}, { collection: 'owners', timestamps: true, strict: false });

ownerSchema.index({ owner_id: 1 });
ownerSchema.index({ property_id: 1 });

export default mongoose.model('Owner', ownerSchema);
