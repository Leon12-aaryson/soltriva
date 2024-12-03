import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function AdminDashboard({ devices }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        serial_number: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('devices.store'), {
            onSuccess: () => reset(),
        });
    };

    const toggleDeviceStatus = (deviceId) => {
        // Implement the logic to toggle the device status
    };

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
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Device Name</label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="serial_number" className="block text-sm font-medium text-gray-700">Serial Number</label>
                            <input
                                id="serial_number"
                                type="text"
                                value={data.serial_number}
                                onChange={(e) => setData('serial_number', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                            {errors.serial_number && <p className="mt-2 text-sm text-red-600">{errors.serial_number}</p>}
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={processing}>
                                Add Device
                            </button>
                        </div>
                    </form>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Device ID</th>
                                <th className="px-4 py-2">Device Name</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map(device => (
                                <tr key={device.id}>
                                    <td className="border px-4 py-2">{device.id}</td>
                                    <td className="border px-4 py-2">{device.name}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => toggleDeviceStatus(device.id)}
                                            className={`px-4 py-2 rounded ${device.status === 'on' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                        >
                                            {device.status === 'on' ? 'On' : 'Off'}
                                        </button>
                                    </td>
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
