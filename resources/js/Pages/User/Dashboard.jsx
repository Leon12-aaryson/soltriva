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
    ArcElement,
} from "chart.js";
import { Line, Doughnut } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
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
                    borderColor: 'rgba(22, 40, 159, 1)',
                },
            ],
        };
    };

    const getLatestValue = (deviceId, dataType) => {
        const data = analyticsGroupedByDevice[deviceId][dataType];
        return data.length > 0 ? data[data.length - 1] : 'N/A';
    };

    const generateGaugeData = (value, max) => {
        return {
            datasets: [
                {
                    data: [value, max - value],
                    backgroundColor: ['rgba(22, 40, 159, 1)', 'rgba(200, 200, 200, 0.5)'],
                    borderWidth: 0,
                },
            ],
            labels: ['Value', ''],
        };
    };

    const gaugeOptions = {
        circumference: 180,
        rotation: 270,
        cutout: '65%', // Increase this value to make the gauge thinner
        plugins: {
            tooltip: {
                enabled: false,
            },
            datalabels: {
                display: true,
                formatter: (value, context) => {
                    const index = context.dataIndex;
                    const label = context.chart.data.labels[index];
                    return label === 'Value' ? value : '';
                },
                color: '#000',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
        },
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
                            <div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                                    <div className="p-4 bg-white shadow rounded">
                                        <h4 className="text-md font-bold">L1</h4>
                                        <p className="text-2xl">{getLatestValue(selectedDeviceId, 'voltage')}</p>
                                    </div>
                                    <div className="p-4 bg-white shadow rounded">
                                        <h4 className="text-md font-bold">L2</h4>
                                        <p className="text-2xl">{getLatestValue(selectedDeviceId, 'current')}</p>
                                    </div>
                                    <div className="p-4 bg-white shadow rounded">
                                        <h4 className="text-md font-bold">L3</h4>
                                        <p className="text-2xl">{getLatestValue(selectedDeviceId, 'power_output')}</p>
                                    </div>
                                    <div className="p-4 bg-white shadow rounded">
                                        <h4 className="text-md font-bold">Device Temperature</h4>
                                        <p className="text-2xl">{getLatestValue(selectedDeviceId, 'temperature')}</p>
                                    </div>
                                    <div className="p-4 bg-white shadow rounded">
                                        <h4 className="text-md font-bold">Ambient Temperature</h4>
                                        <p className="text-2xl">{getLatestValue(selectedDeviceId, 'ambient_temperature')}</p>
                                    </div>
                                </div>
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
                                    <div className="border border-slate-300 rounded-lg p-4 shadow">
                                        <h4 className="text-md font-bold">RPM</h4>
                                        <Doughnut data={generateGaugeData(getLatestValue(selectedDeviceId, 'rpm'), 5000)} options={gaugeOptions} />
                                    </div>
                                    <div className="border border-slate-300 rounded-lg p-4 shadow">
                                        <h4 className="text-md font-bold">Efficiency</h4>
                                        <Doughnut data={generateGaugeData(getLatestValue(selectedDeviceId, 'efficiency'), 100)} options={gaugeOptions} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserDashboard;
