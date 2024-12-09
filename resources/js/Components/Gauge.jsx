import React from 'react';

const Gauge = ({ label, value }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="mt-2 text-2xl">{value}</p>
        </div>
    );
};

export default Gauge;
