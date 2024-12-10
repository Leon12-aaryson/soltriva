import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ voltage }) => {
    const data = {
        labels: ['0', '1', '2', '3', '4'],
        datasets: [
            {
                label: 'L1 Voltage',
                data: voltage.L1,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
            {
                label: 'L2 Voltage',
                data: voltage.L2,
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            },
            {
                label: 'L3 Voltage',
                data: voltage.L3,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
            {
                label: 'Voltage Imbalance',
                data: voltage.voltage_imbalance,
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
};

export default LineChart;
