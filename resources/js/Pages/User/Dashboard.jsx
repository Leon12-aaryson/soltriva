import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import BarChart from '@/Components/BarChart';
import DataTable from '@/Components/DataTable';
import SummaryCard from '@/Components/SummaryCard';
import StatusIndicator from '@/Components/StatusIndicator';
import LineChart from '@/Components/LineChart';

const UserDashboard = ({ devices }) => {
    const [dashboardData, setDashboardData] = useState({
        voltage: {
            L1: [],
            L2: [],
            L3: [],
            voltage_imbalance: [],
        },
        bar_chart: {
            ambient_temp: [],
            mosfet_temp: [],
        },
        status: {
            undervoltage: false,
            overvoltage: false,
        },
        logs: [],
        summary: {
            input_power: 0,
            output_power: 0,
            efficiency: 0,
        },
    });

    useEffect(() => {
        const sampleData = [
            { timestamp: '1/1/2023 0:00', L1: 55.7784395, L2: 54.77000068, L3: 55.27422009, voltage_imbalance: 0.912214422, input_power: 3.08318569, output_power: 0.640463549, ambient_temp: 32.66014707, mosfet_temp: 48.10950842, efficiency: 94.92386674 },
            { timestamp: '1/1/2023 0:01', L1: 55.7784395, L2: 54.77000068, L3: 55.27422009, voltage_imbalance: 0.912214422, input_power: 3.08318569, output_power: 0.640463549, ambient_temp: 32.66014707, mosfet_temp: 48.10950842, efficiency: 94.92386674 },
            { timestamp: '1/1/2023 0:02', L1: 55.5, L2: 54.6, L3: 55.1, voltage_imbalance: 0.9, input_power: 3.0, output_power: 0.65, ambient_temp: 32.5, mosfet_temp: 48.0, efficiency: 95.0 },
            { timestamp: '1/1/2023 0:03', L1: 55.6, L2: 54.7, L3: 55.2, voltage_imbalance: 0.85, input_power: 3.1, output_power: 0.7, ambient_temp: 32.7, mosfet_temp: 48.2, efficiency: 94.5 },
            { timestamp: '1/1/2023 0:04', L1: 55.4, L2: 54.5, L3: 55.0, voltage_imbalance: 0.95, input_power: 3.2, output_power: 0.68, ambient_temp: 32.6, mosfet_temp: 48.1, efficiency: 94.8 },
            { timestamp: '1/1/2023 0:05', L1: 55.7, L2: 54.8, L3: 55.3, voltage_imbalance: 0.88, input_power: 3.1, output_power: 0.66, ambient_temp: 32.8, mosfet_temp: 48.3, efficiency: 95.2 },
        ];

        // Process the sample data
        const processedData = sampleData.map(entry => ({
            timestamp: entry.timestamp,
            data: {
                L1: entry.L1,
                L2: entry.L2,
                L3: entry.L3,
                voltage_imbalance: entry.voltage_imbalance,
                input_power: entry.input_power,
                output_power: entry.output_power,
                ambient_temp: entry.ambient_temp,
                mosfet_temp: entry.mosfet_temp,
            },
        }));

        // Update the dashboard data
        setDashboardData(prevData => ({
            ...prevData,
            logs: processedData,
            bar_chart: {
                ambient_temp: sampleData.map(entry => entry.ambient_temp),
                mosfet_temp: sampleData.map(entry => entry.mosfet_temp),
            },
            summary: {
                input_power: sampleData.reduce((acc, entry) => acc + entry.input_power, 0),
                output_power: sampleData.reduce((acc, entry) => acc + entry.output_power, 0),
                efficiency: (sampleData.reduce((acc, entry) => acc + entry.efficiency, 0) / sampleData.length) || 0,
            },
            voltage: {
                L1: sampleData.map(entry => entry.L1),
                L2: sampleData.map(entry => entry.L2),
                L3: sampleData.map(entry => entry.L3),
                voltage_imbalance: sampleData.map(entry => entry.voltage_imbalance),
            },
        }));
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="User Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold">User Dashboard</h2>
                    <div className="flex space-x-4">
                        <StatusIndicator label="Undervoltage" status={dashboardData.status.undervoltage} />
                        <StatusIndicator label="Overvoltage" status={dashboardData.status.overvoltage} />
                    </div>
                    <BarChart data={dashboardData.bar_chart} />
                    <LineChart voltage={dashboardData.voltage} />
                    <DataTable logs={dashboardData.logs} />
                    <SummaryCard summary={dashboardData.summary} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserDashboard;
