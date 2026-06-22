import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  MapPin,
  Building,
  Users,
  Calendar,
  CheckCircle,
  FileSearch,
} from "lucide-react";

const PlotDetailsPage = () => {
  const { plotId } = useParams();
  const navigate = useNavigate();
  const plots = useSelector((state) => state.plots.plots);

  const plot = plots.find((p) => p.plotId === parseInt(plotId));

  if (!plot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Plot Not Found</h2>
          <p className="text-gray-600 mb-6">
            The plot you’re looking for doesn’t exist in our database.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Plot #{plot.plotId}
                </h1>
                <p className="text-gray-600 text-sm">
                  Quick summary and recommendations
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/cards")}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                View All Cards
              </button>
              <button
                onClick={() => navigate("/map")}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                View Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plot Info */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Plot Information
                </h2>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    plot.owner === "Govt"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {plot.owner} Property
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Plot Number</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {plot.plotId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {plot.area} sq ft
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Soil Type</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {plot.soilType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-orange-600 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Suitability</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {plot.suitability}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate("/plans")}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
                >
                  <FileSearch className="w-5 h-5" />
                  Background Analysis
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">
                  Recommendations
                </h3>
              </div>

              <div className="space-y-3">
                {plot.recommendations.slice(0, 3).map((rec, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-gray-800">
                        {rec.type}
                      </h4>
                      <span className="text-xs text-gray-500">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 font-medium">
                      {rec.builder}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4">
                📘 Based on soil analysis and locality suitability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotDetailsPage;
