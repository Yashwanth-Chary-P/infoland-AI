import axios from 'axios';

const API_URL = 'http://localhost:5000/api/analytics';

class AnalyticsService {
    async getOverview() {
        const response = await axios.get(`${API_URL}/overview`);
        return response.data.data;
    }

    async getRegionalIntelligence() {
        const response = await axios.get(`${API_URL}/regions`);
        return response.data.data;
    }

    async getVerificationAnalytics() {
        const response = await axios.get(`${API_URL}/verification`);
        return response.data.data;
    }

    async getOwnershipAnalytics() {
        const response = await axios.get(`${API_URL}/ownership`);
        return response.data.data;
    }

    async getFinancialAnalytics() {
        const response = await axios.get(`${API_URL}/financial`);
        return response.data.data;
    }

    async getDocumentAnalytics() {
        const response = await axios.get(`${API_URL}/documents`);
        return response.data.data;
    }

    async getRiskAnalytics() {
        const response = await axios.get(`${API_URL}/risk`);
        return response.data.data;
    }

    async getDashboardSummary() {
        const response = await axios.get(`${API_URL}/dashboard/summary`);
        return response.data.data;
    }
}

export default new AnalyticsService();
