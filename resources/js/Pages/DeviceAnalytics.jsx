import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Head } from '@inertiajs/react';

const DeviceAnalytics = () => {
    const { id } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch(route('device.analytics', id));
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnalytics(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Head title={`Analytics for ${analytics.device.name}`} />
            <h2 className="text-xl font-semibold">Analytics for {analytics.device.name}</h2>
            <div>
                <h3>Voltage Data</h3>
                <ul>
                    {analytics.analytics.voltage.map((value, index) => (
                        <li key={index}>Timestamp: {analytics.analytics.timestamp[index]}, Voltage: {value} V</li>
                    ))}
                </ul>
                <h3>Current Data</h3>
                <ul>
                    {analytics.analytics.current.map((value, index) => (
                        <li key={index}>Timestamp: {analytics.analytics.timestamp[index]}, Current: {value} A</li>
                    ))}
                </ul>
                <h3>Temperature Data</h3>
                <ul>
                    {analytics.analytics.temperature.map((value, index) => (
                        <li key={index}>Timestamp: {analytics.analytics.timestamp[index]}, Temperature: {value} °C</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DeviceAnalytics;
