import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AnalyticsService from '../../services/data/AnalyticsService';

export const fetchOverview = createAsyncThunk('analytics/fetchOverview', async () => {
    return await AnalyticsService.getOverview();
});

export const fetchRegionalIntelligence = createAsyncThunk('analytics/fetchRegionalIntelligence', async () => {
    return await AnalyticsService.getRegionalIntelligence();
});

export const fetchVerificationAnalytics = createAsyncThunk('analytics/fetchVerificationAnalytics', async () => {
    return await AnalyticsService.getVerificationAnalytics();
});

export const fetchOwnershipAnalytics = createAsyncThunk('analytics/fetchOwnershipAnalytics', async () => {
    return await AnalyticsService.getOwnershipAnalytics();
});

export const fetchFinancialAnalytics = createAsyncThunk('analytics/fetchFinancialAnalytics', async () => {
    return await AnalyticsService.getFinancialAnalytics();
});

export const fetchDocumentAnalytics = createAsyncThunk('analytics/fetchDocumentAnalytics', async () => {
    return await AnalyticsService.getDocumentAnalytics();
});

export const fetchRiskAnalytics = createAsyncThunk('analytics/fetchRiskAnalytics', async () => {
    return await AnalyticsService.getRiskAnalytics();
});

export const fetchDashboardSummary = createAsyncThunk('analytics/fetchDashboardSummary', async () => {
    return await AnalyticsService.getDashboardSummary();
});

const initialState = {
    overview: null,
    regions: null,
    verification: null,
    ownership: null,
    financial: null,
    documents: null,
    risk: null,
    dashboardSummary: null,
    loading: {
        overview: false,
        regions: false,
        verification: false,
        ownership: false,
        financial: false,
        documents: false,
        risk: false,
        dashboardSummary: false
    },
    error: {
        overview: null,
        regions: null,
        verification: null,
        ownership: null,
        financial: null,
        documents: null,
        risk: null,
        dashboardSummary: null
    }
};

const handleAsyncStatus = (builder, thunk, key) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.loading[key] = true;
            state.error[key] = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state.loading[key] = false;
            state[key] = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
            state.loading[key] = false;
            state.error[key] = action.error.message;
        });
};

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncStatus(builder, fetchOverview, 'overview');
        handleAsyncStatus(builder, fetchRegionalIntelligence, 'regions');
        handleAsyncStatus(builder, fetchVerificationAnalytics, 'verification');
        handleAsyncStatus(builder, fetchOwnershipAnalytics, 'ownership');
        handleAsyncStatus(builder, fetchFinancialAnalytics, 'financial');
        handleAsyncStatus(builder, fetchDocumentAnalytics, 'documents');
        handleAsyncStatus(builder, fetchRiskAnalytics, 'risk');
        handleAsyncStatus(builder, fetchDashboardSummary, 'dashboardSummary');
    }
});

export default analyticsSlice.reducer;
