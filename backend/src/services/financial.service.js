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
  async getEncumbrances(propertyId) {
    const loans = await financialRepository.findLoansByPropertyId(propertyId);
    const activeLoans = loans.filter(l => l.status === 'active');
    return {
      property_id: propertyId,
      has_encumbrance: activeLoans.length > 0,
      active_encumbrances: activeLoans.length
    };
  }

  async getValidation(propertyId) {
    const [loans, taxes] = await Promise.all([
      financialRepository.findLoansByPropertyId(propertyId),
      financialRepository.findTaxRecordsByPropertyId(propertyId)
    ]);
    
    const activeLoans = loans.filter(l => l.status === 'active');
    const pendingTaxes = taxes.filter(t => t.status === 'pending');
    
    let financialState = 'clear';
    if (activeLoans.length > 0) {
      financialState = 'encumbered';
    } else if (pendingTaxes.length > 0) {
      financialState = 'pending';
    }

    const issues = [];
    if (activeLoans.length > 0) issues.push('Active loan exists on the property');
    if (pendingTaxes.length > 0) issues.push('Pending taxes exist on the property');
    
    return {
      property_id: propertyId,
      financial_state: financialState,
      loan_validation: activeLoans.length > 0 ? 'issues_found' : 'valid',
      tax_validation: pendingTaxes.length > 0 ? 'issues_found' : 'valid',
      issues
    };
  }

  async getSummary(propertyId) {
    const [loans, taxes] = await Promise.all([
      financialRepository.findLoansByPropertyId(propertyId),
      financialRepository.findTaxRecordsByPropertyId(propertyId)
    ]);
    
    const activeLoans = loans.filter(l => l.status === 'active');
    const closedLoans = loans.filter(l => l.status === 'closed');
    const pendingTaxes = taxes.filter(t => t.status === 'pending');
    
    const loanOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.outstanding_amount || 0), 0);
    const pendingTaxAmount = pendingTaxes.reduce((sum, tax) => sum + (tax.pending_amount || 0), 0);
    
    let financialState = 'clear';
    if (activeLoans.length > 0) financialState = 'encumbered';
    else if (pendingTaxes.length > 0) financialState = 'pending';
    
    return {
      property_id: propertyId,
      financial_state: financialState,
      active_loans: activeLoans.length,
      closed_loans: closedLoans.length,
      loan_outstanding: loanOutstanding,
      pending_tax: pendingTaxAmount,
      total_due: loanOutstanding + pendingTaxAmount
    };
  }

  async getStatistics(propertyId) {
    const [loans, taxes] = await Promise.all([
      financialRepository.findLoansByPropertyId(propertyId),
      financialRepository.findTaxRecordsByPropertyId(propertyId)
    ]);
    
    const activeLoans = loans.filter(l => l.status === 'active').length;
    const closedLoans = loans.filter(l => l.status === 'closed').length;
    const paidTaxes = taxes.filter(t => t.status === 'paid').length;
    const pendingTaxes = taxes.filter(t => t.status === 'pending').length;
    
    let financialHealth = 'good';
    if (activeLoans > 0 || pendingTaxes > 0) {
      financialHealth = 'needs_attention';
    }
    
    return {
      property_id: propertyId,
      active_loans: activeLoans,
      closed_loans: closedLoans,
      paid_tax_records: paidTaxes,
      pending_tax_records: pendingTaxes,
      financial_health: financialHealth
    };
  }
}
export default new FinancialService();
