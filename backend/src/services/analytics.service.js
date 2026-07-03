import analyticsRepository from '../repositories/analytics.repository.js';

class AnalyticsService {
    async getOverview() {
        return await analyticsRepository.getOverview();
    }

    async getRegionalIntelligence() {
        return await analyticsRepository.getRegionalIntelligence();
    }

    async getVerificationAnalytics() {
        return await analyticsRepository.getVerificationAnalytics();
    }

    async getOwnershipAnalytics() {
        return await analyticsRepository.getOwnershipAnalytics();
    }

    async getFinancialAnalytics() {
        return await analyticsRepository.getFinancialAnalytics();
    }

    async getDocumentAnalytics() {
        return await analyticsRepository.getDocumentAnalytics();
    }

    async getRiskAnalytics() {
        return await analyticsRepository.getRiskAnalytics();
    }

    async getDashboardSummary() {
        return await analyticsRepository.getDashboardSummary();
    }
}

export default new AnalyticsService();
