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
                borderColor: '#4E79A7', // Blue
                backgroundColor: 'rgba(78, 121, 167, 0.2)', // Light blue fill for better readability
                fill: true,
            },
            {
                label: 'L2 Voltage',
                data: voltage.L2,
                borderColor: '#9966FF', // Purple
                backgroundColor: 'rgba(153, 102, 255, 0.2)', // Light purple fill
                fill: true,
            },
            {
                label: 'L3 Voltage',
                data: voltage.L3,
                borderColor: '#F28E2B', // Changed to a more distinct orange
                backgroundColor: 'rgba(242, 142, 43, 0.2)', // Light orange fill
                fill: true,
            },
            {
                label: 'Voltage Imbalance',
                data: voltage.voltage_imbalance,
                borderColor: '#D62728', // Bright red for emphasis on imbalance
                backgroundColor: 'rgba(214, 39, 40, 0.2)', // Light red fill
                fill: true,
            },
        ],
    };

    return (
        // Your chart component here, using the 'data' object
        <Line data={data} />
    );
};

export default LineChart;
