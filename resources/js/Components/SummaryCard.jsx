import React from 'react';

const SummaryCard = ({ summary }) => {
    if (!summary) {
        return <div>No summary data available</div>; // Fallback UI
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h3 className="text-lg font-semibold">Summary</h3>
            <p>Input Power: {summary.input_power || 0} W</p>
            <p>Output Power: {summary.output_power || 0} W</p>
            <p>Efficiency: {summary.efficiency || 0}%</p>
        </div>
    );
};

export default SummaryCard;
