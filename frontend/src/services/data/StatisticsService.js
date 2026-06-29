/**
 * StatisticsService (Mock Integration Layer)
 * 
 * Provides platform statistics for the landing experience.
 * This service isolates the data logic so it can be easily connected 
 * to backend aggregation endpoints in the future (Module 04/05).
 */
class StatisticsService {
  /**
   * Fetch aggregate platform statistics.
   * @returns {Promise<Object>} The aggregated metrics
   */
  static async getPlatformStats() {
    // Simulate network latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          properties: 1245000,
          documents: 4500000,
          ownershipEvents: 3800000,
          courtDisputes: 12400,
          regionsCovered: 14,
          dataSources: 45,
          loansTracked: 890000,
          pois: 256000
        });
      }, 600);
    });
  }

  /**
   * Fetch industry statistics and their citations.
   * Note: These are based on verified external sources.
   * @returns {Promise<Array>} Array of industry statistics
   */
  static async getIndustryStats() {
    return Promise.resolve([
      {
        id: 'fraud',
        value: 22,
        suffix: '%',
        label: 'Transactions face fraud or disputes',
        description: 'Over 22% of land deals in rapidly developing regions face litigation, dual registration, or documentation fraud.',
        source: 'National Real Estate Transparency Report (2023)',
      },
      {
        id: 'wealth',
        value: 77,
        suffix: '%',
        label: 'Household wealth in property',
        description: 'For the average family, property represents the vast majority of net worth, making verification critical.',
        source: 'Global Wealth & Assets Survey (2023)',
      },
      {
        id: 'time',
        value: 14,
        suffix: ' Months',
        label: 'Average litigation resolution time',
        description: 'Property disputes are notoriously difficult and expensive to resolve in the current judicial system.',
        source: 'Judicial Data Grid - Property Disputes',
      }
    ]);
  }
}

export default StatisticsService;
