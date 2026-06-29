import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { BarChart3 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AnalyticsTab = ({ plot }) => {
  const { documents = [], healthSummary = {} } = plot;

  // Prepare Document Availability Data
  const missingCount = documents.filter(d => d.status?.toLowerCase() === 'missing').length;
  const availableCount = documents.filter(d => d.status?.toLowerCase() === 'available' || d.status?.toLowerCase() === 'verified').length;
  const expiredCount = documents.filter(d => d.status?.toLowerCase() === 'expired').length;

  const docData = {
    labels: ['Available', 'Missing', 'Expired'],
    datasets: [
      {
        data: [availableCount, missingCount, expiredCount],
        backgroundColor: ['#22c55e', '#ef4444', '#eab308'],
        hoverBackgroundColor: ['#16a34a', '#dc2626', '#ca8a04'],
        borderWidth: 0,
      },
    ],
  };

  const hasDocData = documents.length > 0;

  // Prepare Health Metrics Data
  // Using exact fields from PropertyHealthSummary
  const healthMetrics = [
    { label: 'Total Docs', value: healthSummary?.document_count || 0 },
    { label: 'Missing Docs', value: healthSummary?.missing_document_count || 0 },
    { label: 'Active Loans', value: healthSummary?.active_loan_count || 0 },
    { label: 'Court Disputes', value: healthSummary?.court_dispute_count || 0 },
    { label: 'Pending Taxes', value: healthSummary?.pending_tax_count || 0 },
  ];

  const hasHealthData = healthMetrics.some(m => m.value > 0);

  const healthData = {
    labels: healthMetrics.map(m => m.label),
    datasets: [
      {
        label: 'Count',
        data: healthMetrics.map(m => m.value),
        backgroundColor: [
          '#3b82f6', // Total Docs (blue)
          '#f97316', // Missing Docs (orange)
          '#eab308', // Active Loans (yellow)
          '#ef4444', // Court Disputes (red)
          '#a855f7'  // Pending Taxes (purple)
        ],
        borderRadius: 4,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 } // Since these are counts
      }
    },
    plugins: {
      legend: { display: false } // Hide legend for standard bar chart
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center border-b pb-4">
          <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
          Property Analytics
        </h2>
        <p className="text-gray-500 mt-2">Visualizing backend data for this specific property.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Document Status Chart */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col items-center">
          <h3 className="font-semibold text-gray-800 mb-4">Document Availability</h3>
          {hasDocData ? (
            <div className="w-full max-w-xs aspect-square">
              <Pie data={docData} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48">
               <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">No document data available.</p>
            </div>
          )}
        </div>

        {/* Health Metrics Chart */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col items-center h-full">
          <h3 className="font-semibold text-gray-800 mb-4">Health Metrics</h3>
          {hasHealthData ? (
            <div className="w-full h-64">
              <Bar data={healthData} options={barOptions} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48">
               <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">No health metrics available.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AnalyticsTab;
