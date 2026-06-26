import mongoose from 'mongoose';

const ownershipEventSchema = new mongoose.Schema({
    event_id: { type: String, required: true },
    property_id: { type: String, required: true },
    from_owner_id: { type: String },
    to_owner_id: { type: String },
    transfer_type: { type: String },
    transfer_date: { type: String }
}, { collection: 'ownership_events', timestamps: true, strict: false });

ownershipEventSchema.index({ event_id: 1 });
ownershipEventSchema.index({ property_id: 1 });

export default mongoose.model('OwnershipEvent', ownershipEventSchema);
