import mongoose from 'mongoose';
import dotenv from 'dotenv';
import financialService from './src/services/financial.service.js';
import Loan from './src/models/Loan.model.js';
import TaxRecord from './src/models/TaxRecord.model.js';

dotenv.config();

async function runVerification() {
  console.log('--- Connecting to MongoDB ---');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB.\n');

  console.log('--- MongoDB Collection Verification ---');
  const totalLoans = await Loan.countDocuments();
  const activeLoans = await Loan.countDocuments({ status: 'active' });
  const closedLoans = await Loan.countDocuments({ status: 'closed' });
  const totalTaxes = await TaxRecord.countDocuments();
  const paidTaxes = await TaxRecord.countDocuments({ status: 'paid' });
  const pendingTaxes = await TaxRecord.countDocuments({ status: 'pending' });

  const loansAgg = await Loan.aggregate([
    { $match: { status: 'active' } },
    { $group: { _id: null, total: { $sum: "$outstanding_amount" } } }
  ]);
  const activeOutstandingTotal = loansAgg[0]?.total || 0;

  const taxAgg = await TaxRecord.aggregate([
    { $match: { status: 'pending' } },
    { $group: { _id: null, total: { $sum: "$pending_amount" } } }
  ]);
  const pendingAmountTotal = taxAgg[0]?.total || 0;

  console.log(`Loans (Total/Active/Closed): ${totalLoans} / ${activeLoans} / ${closedLoans}`);
  console.log(`Taxes (Total/Paid/Pending): ${totalTaxes} / ${paidTaxes} / ${pendingTaxes}`);
  console.log(`Total Outstanding Loans: ${activeOutstandingTotal}`);
  console.log(`Total Pending Tax Amount: ${pendingAmountTotal}\n`);

  console.log('--- Testing Financial Service Dynamic Queries ---');
  const testPropertyId = 'PROP-KOK-000001';
  console.log(`Fetching data for ${testPropertyId}...\n`);

  const summary = await financialService.getSummary(testPropertyId);
  console.log('Summary:', JSON.stringify(summary, null, 2));

  const validation = await financialService.getValidation(testPropertyId);
  console.log('Validation:', JSON.stringify(validation, null, 2));

  const statistics = await financialService.getStatistics(testPropertyId);
  console.log('Statistics:', JSON.stringify(statistics, null, 2));

  const encumbrances = await financialService.getEncumbrances(testPropertyId);
  console.log('Encumbrances:', JSON.stringify(encumbrances, null, 2));

  console.log('\n--- Finished Verification ---');
  await mongoose.disconnect();
}

runVerification().catch(err => {
  console.error(err);
  process.exit(1);
});
