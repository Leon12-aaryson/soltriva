import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const UserDashboard = ({ devices, stats, analyticsGroupedByDevice }) => {
    // Destructure stats with default values
    const {
        totalDevices = 0,
        activeDevices = 0,
        offlineDevices = 0,
        maintenanceDue = 0,
    } = stats || {};

    const [selectedDeviceId, setSelectedDeviceId] = useState(devices.length > 0 ? devices[0].id : null);

    const handleDeviceChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };

    const generateChartData = (deviceId, dataType) => {
        const data = analyticsGroupedByDevice[deviceId][dataType];
        const labels = analyticsGroupedByDevice[deviceId]['timestamp'];
        return {
            labels,
            datasets: [
                {
                    label: dataType,
                    data,
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        };
    };

    return (
        <AuthenticatedLayout>
            <Head title="User Dashboard" />
            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
                    
                    {/* Statistics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg">Total Devices</h3>
                            <p className="text-2xl">{totalDevices}</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg">Active Devices</h3>
                            <p className="text-2xl">{activeDevices}</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg">Offline Devices</h3>
                            <p className="text-2xl">{offlineDevices}</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg">Maintenance Due</h3>
                            <p className="text-2xl">{maintenanceDue}</p>
                        </div>
                    </div>
                    {/* Devices Overview */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Devices Overview</h3>
                        <div className="mb-4">
                            <label htmlFor="device-select" className="block text-sm font-medium text-gray-700">Select Device:</label>
                            <select
                                id="device-select"
                                value={selectedDeviceId}
                                onChange={handleDeviceChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                {devices.map(device => (
                                    <option key={device.id} value={device.id}>{device.name}</option>
                                ))}
                            </select>
                        </div>
                        {selectedDeviceId && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="border border-slate-300 rounded-lg p-4 shadow">
                                    <h4 className="text-md font-bold">Voltage</h4>
                                    <Line data={generateChartData(selectedDeviceId, 'voltage')} />
                                </div>
                                <div className="border border-slate-300 rounded-lg p-4 shadow">
                                    <h4 className="text-md font-bold">Current</h4>
                                    <Line data={generateChartData(selectedDeviceId, 'current')} />
                                </div>
                                <div className="border border-slate-300 rounded-lg p-4 shadow">
                                    <h4 className="text-md font-bold">Temperature</h4>
                                    <Line data={generateChartData(selectedDeviceId, 'temperature')} />
                                </div>
                                {/* Add more charts for other data types as needed */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserDashboard;
