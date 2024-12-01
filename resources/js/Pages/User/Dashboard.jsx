import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function UserDashboard({ devices, alerts }) {
    return (
        <AuthenticatedLayout>
            <Head title="User Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold">Pump Monitoring</h2>
                    {alerts.length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Alerts:</strong>
                            <ul>
                                {alerts.map((alert, index) => (
                                    <li key={index}>{alert}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {devices.map(device => (
                            <div key={device.id} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold">{device.name}</h3>
                                <p>Status: {device.status}</p>
                                <p>Error Code: {device.error_code || 'N/A'}</p>
                                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                    {device.is_on ? 'Turn Off' : 'Turn On'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
