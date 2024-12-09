import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Gauge from '@/Components/Gauge';
import LineChart from '@/Components/LineChart';

export default function UserDashboard({ devices }) {
    const [metrics, setMetrics] = useState({
        rpm: 0,
        voltageImbalance: 0,
        powerInput: 0,
        powerOutput: 0,
        temperature: 0,
        current: 0,
    });

    const [historicalData, setHistoricalData] = useState({
        voltageImbalance: [],
        current: [],
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            const response = await fetch(route('user.metrics'));
            const data = await response.json();
            setMetrics(data.metrics);
            setHistoricalData(data.historicalData);
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000);

        return () => clearInterval(interval);
    }, []);

    const togglePump = async () => {
        await fetch(route('user.pump.toggle'), { method: 'POST' });
    };

    return (
        <AuthenticatedLayout>
            <Head title="User Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold">Pump Monitoring</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                        <Gauge label="RPM" value={metrics.rpm} />
                        <Gauge label="Voltage Imbalance (%)" value={metrics.voltageImbalance} />
                        <Gauge label="Power Input (W)" value={metrics.powerInput} />
                        <Gauge label="Power Output (W)" value={metrics.powerOutput} />
                        <Gauge label="Temperature (°C)" value={metrics.temperature} />
                        <Gauge label="Current (A)" value={metrics.current} />
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold">Historical Data</h3>
                        <LineChart data={historicalData.voltageImbalance} title="Voltage Imbalance Over Time" />
                        <LineChart data={historicalData.current} title="Current Over Time" />
                    </div>
                    <button onClick={togglePump} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Toggle Pump
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
