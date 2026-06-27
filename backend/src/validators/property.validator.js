import Joi from 'joi';

export const propertyIdParamSchema = Joi.object({
  params: Joi.object({
    propertyId: Joi.string().required()
  }).unknown(true)
});

export const propertySearchQuerySchema = Joi.object({
  query: Joi.object({
    q: Joi.string().required().min(2),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
  }).unknown(true)
});
