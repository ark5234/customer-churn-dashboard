import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChurnRateChart = ({ data }) => {
  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: 'Churn Rate',
        data: data?.values || [],
        borderColor: '#6366f1', // Indigo 500
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6366f1',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
            color: '#94a3b8',
            font: { family: "'Inter', sans-serif" }
        }
      },
      title: {
        display: true,
        text: 'Customer Churn Rate Over Time',
        color: '#f8fafc',
        font: { size: 16, family: "'Inter', sans-serif", weight: 'normal' }
      },
      tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: '#f8fafc',
          bodyColor: '#94a3b8',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
            color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
            color: '#94a3b8',
            font: { family: "'Inter', sans-serif" }
        },
        title: {
          display: true,
          text: 'Churn Rate (%)',
          color: '#64748b'
        }
      },
      x: {
        grid: {
            display: false
        },
        ticks: {
            color: '#94a3b8',
            font: { family: "'Inter', sans-serif" }
        },
        title: {
          display: true,
          text: 'Time Period',
          color: '#64748b'
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChurnRateChart; 