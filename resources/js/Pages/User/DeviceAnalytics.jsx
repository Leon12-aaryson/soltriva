import React, { useEffect, useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import { Bar, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
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

const DeviceAnalytics = ({ device, analytics }) => {
    const { id } = useParams();
    const { props } = usePage();
    const user = props.auth.user;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!analytics) {
            setError("No analytics data available");
            setLoading(false);
            return;
        }
        setLoading(false);
    }, [analytics]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Calculate averages
    const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const averageEfficiency = average(analytics.efficiency || []);
    const averageVoltageStability = average(analytics.voltage_stability || []);
    const averageTemperature = average(analytics.temperature);

    // Prepare chart data
    const efficiencyData = {
        labels: analytics.timestamp.map((ts) =>
            new Date(ts).toLocaleDateString()
        ),
        datasets: [
            {
                label: "Average Efficiency",
                data: analytics.efficiency || [],
                backgroundColor: "rgba(75,192,192,0.6)",
            },
        ],
    };

    const voltageStabilityData = {
        labels: analytics.timestamp.map((ts) =>
            new Date(ts).toLocaleDateString()
        ),
        datasets: [
            {
                label: "Average Voltage Stability",
                data: analytics.voltage_stability || [],
                backgroundColor: "rgba(153,102,255,0.6)",
            },
        ],
    };

    const temperatureData = {
        labels: analytics.timestamp.map((ts) =>
            new Date(ts).toLocaleDateString()
        ),
        datasets: [
            {
                label: "Average Temperature (°C)",
                data: analytics.temperature,
                backgroundColor: "rgba(22, 40, 159, 1)",
            },
        ],
    };

    // Prepare voltage against time data
    const voltageTimeData = {
        labels: analytics.timestamp.map((ts) => new Date(ts).toLocaleString()),
        datasets: [
            {
                label: "Voltage vs Time",
                data: analytics.voltage || [],
                backgroundColor: "rgba(153,102,255,0.6)",
                borderColor: "rgba(153,102,255,1)",
                fill: false,
            },
        ],
    };

    // Prepare power and RPM against time data
    const powerRPMData = {
        labels: analytics.timestamp.map((ts) =>
            new Date(ts).toLocaleDateString()
        ),
        datasets: [
            {
                label: "Average Power Output",
                data: analytics.power_output || [],
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                fill: false,
            },
            {
                label: "Average RPM",
                data: analytics.rpm || [],
                borderColor: "rgba(54,162,235,1)",
                backgroundColor: "rgba(54,162,235,0.2)",
                fill: false,
            },
        ],
    };

    return (
        <>
            <div className="p-4 analytics">
                <Head title={`Analytics for ${device.name}`} />
                <h2 className="text-xl font-semibold">
                    Analytics for {device.name}
                </h2>
                <table className="table-auto divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-slate-600">Date</th>
                            <th className="border border-slate-600">Time</th>
                            <th className="border border-slate-600">
                                Solar Power Input
                            </th>
                            <th className="border border-slate-600">
                                Power Output
                            </th>
                            <th className="border border-slate-600">
                                Panel Voltage
                            </th>
                            <th className="border border-slate-600">RPM</th>
                            <th className="border border-slate-600">
                                Voltage (V)
                            </th>
                            <th className="border border-slate-600">
                                Current (A)
                            </th>
                            <th className="border border-slate-600">
                                Temperature (°C)
                            </th>
                            <th className="border border-slate-600">
                                Error Code
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {analytics.voltage.map((voltage, index) => {
                            const dateObj = new Date(
                                analytics.timestamp[index]
                            );
                            const date = dateObj.toLocaleDateString();
                            const time = dateObj.toLocaleTimeString();
                            const current = analytics.current[index];
                            const power_output = analytics.power_output[index];
                            const rpm = analytics.rpm[index];
                            const solar_power_input =
                                analytics.solar_power_input[index];
                            const panel_voltage =
                                analytics.panel_voltage[index];
                            const temperature = analytics.temperature[index];
                            const error_code = analytics.error_code[index];
                            return (
                                <tr key={index}>
                                    <td className="border border-slate-600">
                                        {date}
                                    </td>
                                    <td className="border border-slate-600">
                                        {time}
                                    </td>
                                    <td className="border border-slate-600">
                                        {solar_power_input}
                                    </td>
                                    <td className="border border-slate-600">
                                        {power_output}
                                    </td>
                                    <td className="border border-slate-600">
                                        {panel_voltage}
                                    </td>
                                    <td className="border border-slate-600">
                                        {rpm}
                                    </td>
                                    <td className="border border-slate-600">
                                        {voltage}
                                    </td>
                                    <td className="border border-slate-600">
                                        {current}
                                    </td>
                                    <td className="border border-slate-600">
                                        {temperature}
                                    </td>
                                    <td className="border border-slate-600">
                                        {error_code}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Charts */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold">
                            Average Efficiency
                        </h3>
                        <Bar data={efficiencyData} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            Average Voltage Stability
                        </h3>
                        <Bar data={voltageStabilityData} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            Average Device Temperature
                        </h3>
                        <Bar data={temperatureData} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            Voltage vs Time
                        </h3>
                        <Line data={voltageTimeData} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            Average Power Output & RPM
                        </h3>
                        <Line data={powerRPMData} />
                    </div>
                </div>

                <div className="py-2">
                    <button className="text-white font-bold dashbtn">
                        {/* <a href={route("user.devices")}>Back to dashboard</a> */}
                        {user.role === "admin" ? (
                            <a href={route("admin.devices")}>
                                Back to dashboard
                            </a>
                        ) : (
                            <a href={route("user.devices")}>
                                Back to dashboard
                            </a>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeviceAnalytics;
