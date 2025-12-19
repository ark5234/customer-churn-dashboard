import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const CustomerSegmentChart = ({ data }) => {
  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        data: data?.values || [],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)', // Indigo
          'rgba(236, 72, 153, 0.8)', // Pink
          'rgba(6, 182, 212, 0.8)',  // Cyan
          'rgba(16, 185, 129, 0.8)', // Emerald
          'rgba(245, 158, 11, 0.8)', // Amber
        ],
        borderColor: [
          '#6366f1',
          '#ec4899',
          '#06b6d4',
          '#10b981',
          '#f59e0b',
        ],
        borderWidth: 1,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
            color: '#94a3b8',
            font: {
                family: "'Inter', sans-serif"
            }
        }
      },
      title: {
        display: true,
        text: 'Customer Segments Distribution',
        color: '#f8fafc',
        font: {
            size: 16,
            family: "'Inter', sans-serif",
            weight: 'normal'
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CustomerSegmentChart; 