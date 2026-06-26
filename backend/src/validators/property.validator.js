import Joi from 'joi';

export const propertyIdParamSchema = Joi.object({
  propertyId: Joi.string().required()
});

export const propertySearchQuerySchema = Joi.object({
  q: Joi.string().required().min(2),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
});
