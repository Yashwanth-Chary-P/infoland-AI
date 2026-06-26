import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
    loan_id: { type: String, required: true },
    property_id: { type: String, required: true },
    status: { type: String },
    loan_type: { type: String },
    outstanding_amount: { type: Number }
}, { collection: 'loans', timestamps: true, strict: false });

loanSchema.index({ loan_id: 1 });
loanSchema.index({ property_id: 1 });

export default mongoose.model('Loan', loanSchema);
