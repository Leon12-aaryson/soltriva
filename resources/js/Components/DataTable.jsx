import React from 'react';

const DataTable = ({ logs }) => {
    if (!logs || logs.length === 0) {
        return <div>No logs available</div>; // Fallback UI
    }

    return (
        <table className="min-w-full mt-4 border">
            <thead>
                <tr>
                    <th className="border px-4 py-2">Timestamp</th>
                    <th className="border px-4 py-2">L1</th>
                    <th className="border px-4 py-2">L2</th>
                    <th className="border px-4 py-2">L3</th>
                    <th className="border px-4 py-2">Voltage Imbalance</th>
                    <th className="border px-4 py-2">Input Power</th>
                    <th className="border px-4 py-2">Output Power</th>
                    <th className="border px-4 py-2">Ambient Temp</th>
                    <th className="border px-4 py-2">MOSFET Temp</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((log, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="border px-4 py-2">{log.data.L1 || 'N/A'}</td>
                        <td className="border px-4 py-2">{log.data.L2 || 'N/A'}</td>
                        <td className="border px-4 py-2">{log.data.L3 || 'N/A'}</td>
                        <td className="border px-4 py-2">{log.data.voltage_imbalance || 'N/A'}</td>
                        <td className="border px-4 py-2">{log.data.input_power || 'N/A'}</td>
                        <td className="border px-4 py-2">{log.data.output_power || 'N/A'}</td>
                        <td className="border px-4 py-2">{log.data.ambient_temp || 'N/A'}</td>
                        <td className="border px-4 py-2">{log.data.mosfet_temp || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
