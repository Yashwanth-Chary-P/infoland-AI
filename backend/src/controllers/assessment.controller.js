import assessmentService from '../services/assessment.service.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

class AssessmentController {
  async getRiskScore(req, res, next) {
    try {
      const data = await assessmentService.getRiskScore(req.params.propertyId);
      res.json(successResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async getRiskFactors(req, res, next) {
    try {
      const data = await assessmentService.getRiskFactors(req.params.propertyId);
      res.json(successResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async getRecommendation(req, res, next) {
    try {
      const data = await assessmentService.getRecommendation(req.params.propertyId);
      res.json(successResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const data = await assessmentService.getSummary(req.params.propertyId);
      res.json(successResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async getFinalReport(req, res, next) {
    try {
      const data = await assessmentService.getFinalReport(req.params.propertyId);
      res.json(successResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async getDashboard(req, res, next) {
    try {
      const data = await assessmentService.getDashboard(req.params.propertyId);
      res.json(successResponse(data));
    } catch (error) {
      next(error);
    }
  }
}

export default new AssessmentController();
