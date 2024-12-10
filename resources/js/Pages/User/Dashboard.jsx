import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import BarChart from '@/Components/BarChart';
import DataTable from '@/Components/DataTable';
import SummaryCard from '@/Components/SummaryCard';
import StatusIndicator from '@/Components/StatusIndicator';

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
            { timestamp: '1/1/2023 0:00', L1: 55.7784395, L2: 54.77000068, L3: 55.27422009, voltage_imbalance: 0.912214422, panel_current: 9.608815105, panel_voltage: 320.8705398, input_power: 3.08318569, current_out: 11.58702101, output_power: 0.640463549, undervoltage: 1, overvoltage: 1, RPM: 77.56862988, ambient_temp: 32.66014707, mosfet_temp: 48.10950842, efficiency: 94.92386674, pump_status: 1 },
            // Add more data points here...
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
                    <DataTable logs={dashboardData.logs} />
                    <SummaryCard summary={dashboardData.summary} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserDashboard;
