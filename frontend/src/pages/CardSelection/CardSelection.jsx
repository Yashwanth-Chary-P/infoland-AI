import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, MapPin, Building, Users, Eye, Search } from 'lucide-react';
import { fetchPlots } from '../../features/plots/plotsSlice';

const CardSelection = () => {
  const dispatch = useDispatch();
  const { plots, loading, error } = useSelector(state => state.plots);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPlots());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchPlots({ q: searchTerm }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
                <p className="text-gray-600 mt-1">Browse all available properties in an organized layout</p>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="relative w-full md:w-auto flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  dispatch(fetchPlots({ q: e.target.value }));
                }}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && plots.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No properties found matching your criteria.
          </div>
        )}

        {!loading && !error && plots.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plots.map(plot => (
              <div 
                key={plot.property_id || plot._id} 
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                {/* Plot Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-blue-700 font-mono truncate" title={plot.property_id}>
                    {plot.property_id}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plot.source_region?.includes('Govt') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {plot.source_region || 'Private'}
                  </span>
                </div>

                {/* Plot Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm truncate">Loc: {plot.centroid_lat?.toFixed(4)}, {plot.centroid_lon?.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Area: {plot.area_sq_m || '-'} sq m</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm truncate">Type: {plot.feature_category || '-'}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link 
                  to={`/plot/${plot.property_id}`}
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors group-hover:shadow-md mt-auto"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSelection;
