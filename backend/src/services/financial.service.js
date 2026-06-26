import financialRepository from '../repositories/financial.repository.js';
import documentRepository from '../repositories/document.repository.js';

class FinancialService {
  async getLoans(propertyId) {
    return await financialRepository.findLoansByPropertyId(propertyId);
  }

  async getTaxRecords(propertyId) {
    return await financialRepository.findTaxRecordsByPropertyId(propertyId);
  }

  async getDisputes(propertyId) {
    return await financialRepository.findCourtDisputesByPropertyId(propertyId);
  }

  async getPropertyHealth(propertyId) {
    const [documents, loans, taxes, disputes] = await Promise.all([
      documentRepository.findDocumentsByPropertyId(propertyId),
      financialRepository.findLoansByPropertyId(propertyId),
      financialRepository.findTaxRecordsByPropertyId(propertyId),
      financialRepository.findCourtDisputesByPropertyId(propertyId)
    ]);

    const activeLoans = loans.filter(l => l.status === 'Active').length;
    const pendingDisputes = disputes.filter(d => d.status === 'Pending').length;
    const expiredDocs = documents.filter(d => d.status === 'Expired').length;

    let healthScore = 100;
    if (activeLoans > 0) healthScore -= 10;
    if (pendingDisputes > 0) healthScore -= 30;
    if (expiredDocs > 0) healthScore -= 5 * expiredDocs;

    const overallStatus = healthScore > 80 ? 'Good' : healthScore > 50 ? 'Fair' : 'Poor';

    return {
      documentSummary: {
        total: documents.length,
        expired: expiredDocs
      },
      loanSummary: {
        total: loans.length,
        active: activeLoans
      },
      taxSummary: {
        totalRecords: taxes.length,
        latestPayment: taxes.length > 0 ? taxes[0].payment_date : null
      },
      courtSummary: {
        total: disputes.length,
        pending: pendingDisputes
      },
      overallHealthSummary: {
        score: Math.max(0, healthScore),
        status: overallStatus
      }
    };
  }
}

export default new FinancialService();
