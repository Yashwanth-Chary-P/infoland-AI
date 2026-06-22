import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, MapPin, Building, Users, Eye } from 'lucide-react';

const CardSelection = () => {
  const plots = useSelector(state => state.plots.plots);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Select a Plot from Cards</h1>
                <p className="text-gray-600 mt-1">Browse all available plots in an organized layout</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {plots.length} plots available
            </div>
          </div>
        </div>
      </div>

      {/* Plot Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plots.map(plot => (
            <div 
              key={plot.plotId} 
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              {/* Plot Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-700">Plot {plot.plotId}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plot.owner === 'Govt' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {plot.owner}
                </span>
              </div>

              {/* Plot Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">Soil: {plot.soilType}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">Area: {plot.area} sq ft</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">Use: {plot.suitability}</span>
                </div>
              </div>

              {/* Recommendations Preview */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Recommended:</p>
                <div className="flex flex-wrap gap-1">
                  {plot.recommendations.slice(0, 2).map((rec, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {rec.type}
                    </span>
                  ))}
                  {plot.recommendations.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{plot.recommendations.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* View Details Button */}
              <Link 
                to={`/plot/${plot.plotId}`}
                className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors group-hover:shadow-md"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSelection;
