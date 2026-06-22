const PlotCard = ({ plot }) => {
  if (!plot) return null;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Plot {plot.plotId}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          plot.owner === 'Govt' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {plot.owner}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <dt className="text-sm font-medium text-gray-500">Owner</dt>
          <dd className="text-lg text-gray-900">{plot.owner}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Soil Type</dt>
          <dd className="text-lg text-gray-900">{plot.soilType}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Area</dt>
          <dd className="text-lg text-gray-900">{plot.area} sq ft</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Suitability</dt>
          <dd className="text-lg text-gray-900">{plot.suitability}</dd>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommended Constructions</h3>
        <div className="space-y-2">
          {plot.recommendations.map((rec, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{rec.type}</span>
              <span className="text-sm text-gray-600">{rec.builder}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlotCard;

