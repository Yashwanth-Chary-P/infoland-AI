import mongoose from 'mongoose';

const taxRecordSchema = new mongoose.Schema({
    tax_id: { type: String, required: true },
    property_id: { type: String, required: true },
    status: { type: String },
    pending_amount: { type: Number }
}, { collection: 'tax_records', timestamps: true, strict: false });

taxRecordSchema.index({ tax_id: 1 });
taxRecordSchema.index({ property_id: 1 });

export default mongoose.model('TaxRecord', taxRecordSchema);
