import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ devices }) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold">Device Management</h2>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Admin User</h3>
                        <p className="mt-2">
                            Role Description: Admin users are responsible for managing devices (pump drivers) and viewing performance logs in tabular format.
                        </p>
                        <p className="mt-2">
                            Permissions: Add, remove, and monitor devices.
                        </p>
                    </div>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Device ID</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map(device => (
                                <tr key={device.id}>
                                    <td className="border px-4 py-2">{device.id}</td>
                                    <td className="border px-4 py-2">{device.status}</td>
                                    <td className="border px-4 py-2">
                                        <button className="text-red-500">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
