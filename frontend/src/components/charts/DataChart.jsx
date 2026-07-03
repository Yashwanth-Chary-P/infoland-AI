import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const defaultColors = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
  '#ec4899', // pink-500
  '#64748b'  // slate-500
];

const DataChart = ({ type = 'bar', data = [], xKey = 'name', yKey = 'value', title = '', height = 300, colors = defaultColors }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const labels = data.map(item => item[xKey]);
    const values = data.map(item => item[yKey]);

    const isPieOrDonut = type === 'pie' || type === 'donut';

    return {
      labels,
      datasets: [
        {
          label: title || 'Value',
          data: values,
          backgroundColor: isPieOrDonut ? colors.slice(0, values.length) : colors[0],
          borderColor: isPieOrDonut ? '#ffffff' : colors[0],
          borderWidth: isPieOrDonut ? 2 : 1,
          borderRadius: type === 'bar' ? 4 : 0,
          fill: type === 'area',
          tension: 0.4
        },
      ],
    };
  }, [data, xKey, yKey, title, type, colors]);

  const options = useMemo(() => {
    const isPieOrDonut = type === 'pie' || type === 'donut';

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: isPieOrDonut,
          position: 'right',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: {
              family: "'Inter', sans-serif",
              size: 11
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { family: "'Inter', sans-serif", size: 13 },
          bodyFont: { family: "'Inter', sans-serif", size: 12 },
          padding: 12,
          cornerRadius: 8,
          displayColors: isPieOrDonut
        }
      },
      scales: isPieOrDonut ? undefined : {
        x: {
          grid: { display: false },
          ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: '#64748b' }
        },
        y: {
          border: { display: false },
          grid: { color: '#f1f5f9' },
          ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: '#64748b' },
          beginAtZero: true
        }
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      }
    };
  }, [type]);

  if (!chartData) {
    return (
      <div style={{ height }} className="flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100">
        <p className="text-sm text-slate-400 font-medium">No data available for {title || 'chart'}</p>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }} className="relative">
      {type === 'bar' && <Bar data={chartData} options={options} />}
      {type === 'donut' && <Doughnut data={chartData} options={options} />}
      {type === 'pie' && <Pie data={chartData} options={options} />}
      {(type === 'line' || type === 'area') && <Line data={chartData} options={options} />}
    </div>
  );
};

export default React.memo(DataChart);
