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

    const activeLoans = loans.filter((l) => l.status === 'active').length;
    const activeDisputes = disputes.filter((d) => d.status === 'active').length;
    const expiredDocs = documents.filter((d) => d.status === 'expired').length;
    const missingDocs = documents.filter((d) => d.status === 'missing').length;
    const pendingTaxes = taxes.filter((t) => t.status === 'pending').length;

    let healthScore = 100;
    if (activeLoans > 0) healthScore -= 10;
    if (activeDisputes > 0) healthScore -= 30;
    if (expiredDocs > 0) healthScore -= 5 * expiredDocs;
    if (missingDocs > 0) healthScore -= 3 * missingDocs;
    if (pendingTaxes > 0) healthScore -= 5 * pendingTaxes;

    const overallStatus = healthScore > 80 ? 'Good' : healthScore > 50 ? 'Fair' : 'Poor';

    return {
      documentSummary: {
        total: documents.length,
        available: documents.filter((d) => d.status === 'available').length,
        expired: expiredDocs,
        missing: missingDocs
      },
      loanSummary: {
        total: loans.length,
        active: activeLoans
      },
      taxSummary: {
        totalRecords: taxes.length,
        pending: pendingTaxes
      },
      courtSummary: {
        total: disputes.length,
        active: activeDisputes
      },
      overallHealthSummary: {
        score: Math.max(0, healthScore),
        status: overallStatus
      }
    };
  }
}

export default new FinancialService();
