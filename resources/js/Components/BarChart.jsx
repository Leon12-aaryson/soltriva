import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    if (!data || !data.ambient_temp || !data.mosfet_temp) {
        return <div>No data available</div>; // Or any fallback UI
    }

    const chartData = {
        labels: ['0', '1', '2', '3', '4'],
        datasets: [
            {
                label: 'Ambient Temperature',
                data: data.ambient_temp,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'MOSFET Temperature',
                data: data.mosfet_temp,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default BarChart;
