import analyticsService from '../services/analytics.service.js';

export const getOverview = async (req, res) => {
    const data = await analyticsService.getOverview();
    res.json({
        success: true,
        message: 'Analytics overview retrieved successfully',
        data
    });
};

export const getRegionalIntelligence = async (req, res) => {
    const data = await analyticsService.getRegionalIntelligence();
    res.json({
        success: true,
        message: 'Regional intelligence retrieved successfully',
        data
    });
};

export const getVerificationAnalytics = async (req, res) => {
    const data = await analyticsService.getVerificationAnalytics();
    res.json({
        success: true,
        message: 'Verification analytics retrieved successfully',
        data
    });
};

export const getOwnershipAnalytics = async (req, res) => {
    const data = await analyticsService.getOwnershipAnalytics();
    res.json({
        success: true,
        message: 'Ownership analytics retrieved successfully',
        data
    });
};

export const getFinancialAnalytics = async (req, res) => {
    const data = await analyticsService.getFinancialAnalytics();
    res.json({
        success: true,
        message: 'Financial analytics retrieved successfully',
        data
    });
};

export const getDocumentAnalytics = async (req, res) => {
    const data = await analyticsService.getDocumentAnalytics();
    res.json({
        success: true,
        message: 'Document analytics retrieved successfully',
        data
    });
};

export const getRiskAnalytics = async (req, res) => {
    const data = await analyticsService.getRiskAnalytics();
    res.json({
        success: true,
        message: 'Risk analytics retrieved successfully',
        data
    });
};

export const getDashboardSummary = async (req, res) => {
    const data = await analyticsService.getDashboardSummary();
    res.json({
        success: true,
        message: 'Dashboard summary retrieved successfully',
        data
    });
};
