import React from 'react';

const StatusIndicator = ({ label, status }) => {
    return (
        <div className={`flex items-center ${status ? 'text-green-500' : 'text-red-500'}`}>
            <span className={`h-4 w-4 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="ml-2">{label}</span>
        </div>
    );
};

export default StatusIndicator;
