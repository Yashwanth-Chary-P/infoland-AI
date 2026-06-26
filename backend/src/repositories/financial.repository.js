import Loan from '../models/Loan.model.js';
import TaxRecord from '../models/TaxRecord.model.js';
import CourtDispute from '../models/CourtDispute.model.js';

class FinancialRepository {
  async findLoansByPropertyId(propertyId) {
    return await Loan.find({ property_id: propertyId }).lean();
  }

  async findTaxRecordsByPropertyId(propertyId) {
    return await TaxRecord.find({ property_id: propertyId }).sort({ tax_year: -1 }).lean();
  }

  async findCourtDisputesByPropertyId(propertyId) {
    return await CourtDispute.find({ property_id: propertyId }).lean();
  }
}

export default new FinancialRepository();
