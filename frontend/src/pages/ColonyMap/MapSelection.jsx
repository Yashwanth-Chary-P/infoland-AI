import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PlotGrid from '../../components/PlotGrid.jsx';

const MapSelection = () => {
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
                <h1 className="text-3xl font-bold text-gray-800">Select a Plot from Map</h1>
                <p className="text-gray-600 mt-1">Click on any plot area to view detailed information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="py-8">
        <PlotGrid />
      </div>
    </div>
  );
};

export default MapSelection;
