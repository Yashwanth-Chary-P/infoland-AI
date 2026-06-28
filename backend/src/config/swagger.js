import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InfoLand AI Backend API',
      version: '1.0.0',
      description: 'API documentation for InfoLand AI Phase 1',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 10 },
            total: { type: 'integer', example: 1633 },
            totalPages: { type: 'integer', example: 164 }
          }
        },
        ApiErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Property not found' },
            errors: { type: 'array', items: { type: 'object' }, example: [] },
            timestamp: { type: 'string', format: 'date-time', example: '2026-06-27T10:30:00Z' }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation error' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' }
                }
              },
              example: [{ field: 'propertyId', message: '\"propertyId\" is required' }]
            },
            timestamp: { type: 'string', format: 'date-time', example: '2026-06-27T10:30:00Z' }
          }
        },
        Property: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5894329775f2d27289b4' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            region: { type: 'string', example: 'kokapet' },
            property_class: { type: 'string', example: 'residential_plot' },
            sale_status: { type: 'string', example: 'not_for_sale' },
            createdAt: { type: 'string', format: 'date-time', example: '2026-06-26T10:46:44.205Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2026-06-26T10:46:44.205Z' }
          }
        },
        PropertyProfile: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5896329775f2d2729a61' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            property_type: { type: 'string', example: 'plot' },
            sub_type: { type: 'string', example: 'residential_plot' },
            layout_type: { type: 'string', example: 'hmda_approved' },
            zoning: { type: 'string', example: 'residential' },
            area_sqyd: { type: 'number', example: 171.99 },
            survey_number: { type: 'string', example: 'SY-KOK-0001' },
            plot_number: { type: 'string', example: 'PL-0001' },
            dimensions: {
              type: 'object',
              properties: {
                frontage_ft: { type: 'number', example: 25 },
                depth_ft: { type: 'number', example: 61.92 }
              }
            },
            facing: { type: 'string', example: 'east' },
            road_width_ft: { type: 'number', example: 40 },
            corner_plot: { type: 'boolean', example: false }
          }
        },
        PropertyMetadata: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5896329775f2d2729a62' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            created_at: { type: 'string', format: 'date-time', example: '2021-06-20T05:32:04Z' },
            last_updated: { type: 'string', format: 'date-time', example: '2023-01-20T17:09:59Z' },
            source: { type: 'string', example: 'generated' },
            data_quality_score: { type: 'number', example: 91 },
            verification_status: { type: 'string', example: 'verified' }
          }
        },
        Owner: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5895329775f2d2729023' },
            owner_id: { type: 'string', example: 'OWN-KOK-000001' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            name: { type: 'string', example: 'Vikram Menon' },
            ownership_type: { type: 'string', example: 'individual' },
            acquisition_date: { type: 'string', format: 'date-time', example: '2012-07-26' },
            share_percentage: { type: 'number', example: 100 },
            status: { type: 'string', example: 'active' }
          }
        },
        OwnershipEvent: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5895329775f2d2729024' },
            event_id: { type: 'string', example: 'EVT-KOK-000001' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            event_type: { type: 'string', example: 'sale' },
            event_date: { type: 'string', format: 'date-time', example: '2012-07-26' },
            previous_owner_id: { type: 'string', example: 'OWN-KOK-PREV-000001' },
            new_owner_id: { type: 'string', example: 'OWN-KOK-000001' },
            document_id: { type: 'string', example: 'DOC-SALE-DEED-KOK-000001' },
            transaction_value: { type: 'number', example: 7223580 }
          }
        },
        Document: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5896329775f2d2729d5b' },
            document_id: { type: 'string', example: 'DOC-SALE-DEED-KOK-000001' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            document_type: { type: 'string', example: 'sale_deed' },
            status: { type: 'string', example: 'available' },
            issue_date: { type: 'string', format: 'date-time', example: '2012-07-26' },
            issuing_authority: { type: 'string', example: 'Kokapet Sub-Registrar Office' },
            document_number: { type: 'string', example: 'REG-KOK-000001' },
            registration_date: { type: 'string', format: 'date-time', example: '2012-07-26' },
            transaction_value: { type: 'number', example: 7223580 }
          }
        },
        Loan: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5895329775f2d27297e2' },
            loan_id: { type: 'string', example: 'LOAN-KOK-000001' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            status: { type: 'string', example: 'active' },
            loan_amount: { type: 'number', example: 3500000 },
            lender_name: { type: 'string', example: 'State Bank of India' },
            start_date: { type: 'string', format: 'date-time', example: '2015-06-15' },
            end_date: { type: 'string', format: 'date-time', example: '2030-06-15' }
          }
        },
        TaxRecord: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5895329775f2d27296b4' },
            tax_id: { type: 'string', example: 'TAX-KOK-000001' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            status: { type: 'string', example: 'paid' },
            pending_amount: { type: 'number', example: 0 }
          }
        },
        CourtDispute: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5895329775f2d27298c4' },
            case_id: { type: 'string', example: 'CASE-KOK-000001' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            status: { type: 'string', example: 'active' },
            case_number: { type: 'string', example: 'OS/123/2025' },
            court_name: { type: 'string', example: 'High Court of Telangana' },
            filing_date: { type: 'string', format: 'date-time', example: '2025-08-20' },
            summary: { type: 'string', example: 'Boundary dispute with adjacent plot owner.' }
          }
        },
        LocationScore: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6a3e5896329775f2d2729bb5' },
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            overall_score: { type: 'number', example: 82 },
            accessibility_score: { type: 'number', example: 85 },
            amenities_score: { type: 'number', example: 80 }
          }
        },
        PropertyHealth: {
          type: 'object',
          properties: {
            documentSummary: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 18 },
                available: { type: 'number', example: 12 },
                expired: { type: 'number', example: 1 },
                missing: { type: 'number', example: 5 }
              }
            },
            loanSummary: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 0 },
                active: { type: 'number', example: 0 }
              }
            },
            taxSummary: {
              type: 'object',
              properties: {
                totalRecords: { type: 'number', example: 1 },
                pending: { type: 'number', example: 0 }
              }
            },
            courtSummary: {
              type: 'object',
              properties: {
                total: { type: 'number', example: 0 },
                active: { type: 'number', example: 0 }
              }
            },
            overallHealthSummary: {
              type: 'object',
              properties: {
                score: { type: 'number', example: 80 },
                status: { type: 'string', example: 'Fair' }
              }
            }
          }
        },
        FinancialEncumbrances: {
          type: 'object',
          properties: {
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            has_encumbrance: { type: 'boolean', example: false },
            active_encumbrances: { type: 'number', example: 0 }
          }
        },
        FinancialValidation: {
          type: 'object',
          properties: {
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            financial_state: { type: 'string', example: 'clear' },
            loan_validation: { type: 'string', example: 'valid' },
            tax_validation: { type: 'string', example: 'valid' },
            issues: { type: 'array', items: { type: 'string' }, example: [] }
          }
        },
        FinancialSummary: {
          type: 'object',
          properties: {
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            financial_state: { type: 'string', example: 'clear' },
            active_loans: { type: 'number', example: 0 },
            closed_loans: { type: 'number', example: 1 },
            loan_outstanding: { type: 'number', example: 0 },
            pending_tax: { type: 'number', example: 0 },
            total_due: { type: 'number', example: 0 }
          }
        },
        FinancialStatistics: {
          type: 'object',
          properties: {
            property_id: { type: 'string', example: 'PROP-KOK-000001' },
            active_loans: { type: 'number', example: 0 },
            closed_loans: { type: 'number', example: 1 },
            paid_tax_records: { type: 'number', example: 1 },
            pending_tax_records: { type: 'number', example: 0 },
            financial_health: { type: 'string', example: 'good' }
          }
        }
      },
      parameters: {
        propertyId: {
          in: 'path',
          name: 'propertyId',
          required: true,
          schema: { type: 'string' },
          example: 'PROP000123',
          description: 'Unique identifier for the property'
        }
      },
      responses: {
        BadRequest: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' }
            }
          }
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              example: {
                success: false,
                message: 'Internal server error',
                errors: [],
                timestamp: '2026-06-27T10:30:00Z'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/app.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
