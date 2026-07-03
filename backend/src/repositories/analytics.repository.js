import MasterProperty from '../models/MasterProperty.model.js';
import PropertyProfile from '../models/PropertyProfile.model.js';
import PropertyHealthSummary from '../models/PropertyHealthSummary.model.js';
import Owner from '../models/Owner.model.js';

class AnalyticsRepository {
    async getOverview() {
        const totalProperties = await MasterProperty.countDocuments();
        
        const workflowStats = await PropertyProfile.aggregate([
            { $group: { _id: "$verification_workflow", count: { $sum: 1 } } }
        ]);

        let verified = 0;
        let pending = 0;
        let rejected = 0;
        
        workflowStats.forEach(stat => {
            if (stat._id === 'complete_property_verification' || stat._id === 'institutional_property') {
                verified += stat.count;
            } else if (stat._id === 'rejected') {
                rejected += stat.count;
            } else {
                pending += stat.count;
            }
        });

        const classStats = await PropertyProfile.aggregate([
            { $group: { _id: "$property_class", count: { $sum: 1 } } }
        ]);
        
        const propertyClasses = classStats.map(s => ({
            name: s._id || 'Unknown',
            value: s.count
        }));

        const regionStats = await MasterProperty.aggregate([
            { $group: { _id: "$source_region", count: { $sum: 1 } } }
        ]);
        
        const regions = regionStats.map(s => ({
            name: s._id || 'Unknown',
            value: s.count
        }));

        const healthStats = await PropertyHealthSummary.aggregate([
            { 
                $group: { 
                    _id: null, 
                    total_docs: { $sum: "$document_count" },
                    total_missing: { $sum: "$missing_document_count" },
                    total_loans: { $sum: "$active_loan_count" },
                    total_disputes: { $sum: "$court_dispute_count" }
                } 
            }
        ]);
        
        const health = healthStats[0] || { total_docs: 0, total_missing: 0, total_loans: 0, total_disputes: 0 };

        return {
            total_properties: totalProperties,
            verified_properties: verified,
            pending_properties: pending,
            rejected_properties: rejected,
            regions: regions,
            property_classes: propertyClasses,
            total_documents: health.total_docs,
            total_loans: health.total_loans,
            total_disputes: health.total_disputes,
            dataset_health: Math.round((health.total_docs / (health.total_docs + health.total_missing || 1)) * 100)
        };
    }

    async getRegionalIntelligence() {
        return await MasterProperty.aggregate([
            {
                $lookup: {
                    from: "property_profiles",
                    localField: "property_id",
                    foreignField: "property_id",
                    as: "profile"
                }
            },
            { $unwind: { path: "$profile", preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: "$source_region",
                    count: { $sum: 1 },
                    avg_location_score: { $avg: "$profile.location_score" },
                    high_risk_count: {
                        $sum: { $cond: [{ $eq: ["$profile.future_risk_tier", "high"] }, 1, 0] }
                    }
                }
            },
            {
                $project: {
                    region: "$_id",
                    count: 1,
                    avg_location_score: { $round: ["$avg_location_score", 1] },
                    high_risk_count: 1,
                    _id: 0
                }
            },
            { $sort: { count: -1 } }
        ]);
    }

    async getVerificationAnalytics() {
        return await PropertyProfile.aggregate([
            {
                $group: {
                    _id: "$verification_workflow",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    workflow: { $ifNull: ["$_id", "pending"] },
                    count: 1,
                    _id: 0
                }
            }
        ]);
    }

    async getOwnershipAnalytics() {
        return await Owner.aggregate([
            {
                $group: {
                    _id: "$owner_type",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    type: { $ifNull: ["$_id", "Unknown"] },
                    count: 1,
                    _id: 0
                }
            }
        ]);
    }

    async getFinancialAnalytics() {
        return await PropertyHealthSummary.aggregate([
            {
                $group: {
                    _id: null,
                    properties_with_loans: { $sum: { $cond: [{ $gt: ["$active_loan_count", 0] }, 1, 0] } },
                    properties_without_loans: { $sum: { $cond: [{ $eq: ["$active_loan_count", 0] }, 1, 0] } },
                    total_loans_active: { $sum: "$active_loan_count" }
                }
            },
            { $project: { _id: 0 } }
        ]);
    }

    async getDocumentAnalytics() {
        return await PropertyHealthSummary.aggregate([
            {
                $group: {
                    _id: null,
                    total_available: { $sum: "$document_count" },
                    total_missing: { $sum: "$missing_document_count" },
                    perfect_document_properties: { $sum: { $cond: [{ $eq: ["$missing_document_count", 0] }, 1, 0] } }
                }
            },
            { $project: { _id: 0 } }
        ]);
    }

    async getRiskAnalytics() {
        return await PropertyProfile.aggregate([
            {
                $group: {
                    _id: "$future_risk_tier",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    tier: { $ifNull: ["$_id", "unknown"] },
                    count: 1,
                    _id: 0
                }
            }
        ]);
    }

    async getDashboardSummary() {
        const overview = await this.getOverview();
        
        return {
            watched_properties: 0, // Placeholder until auth
            alerts: 0, // Placeholder until auth
            system_verified: overview.verified_properties,
            total_indexed: overview.total_properties,
            dataset_health: overview.dataset_health
        };
    }
}

export default new AnalyticsRepository();
