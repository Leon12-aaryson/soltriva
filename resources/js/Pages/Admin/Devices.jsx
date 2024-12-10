import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import swal from 'sweetalert';

export default function Devices({ devices: initialDevices }) {
    const [devices, setDevices] = useState(initialDevices);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        serial_number: '',
    });

    // Function to handle adding a new device
    const submit = (e) => {
        e.preventDefault();
        post(route('devices.store'), {
            onSuccess: (response) => {
                setDevices([...devices, response]);
                reset(); // Reset the form fields
                swal("Success", "Device added successfully", "success").then(() => {
                    window.location.reload(); // Reload the page after the alert is acknowledged
                });
            },
        });
    };

    // Function to toggle device status
    const toggleStatus = (id) => {
        post(route('devices.toggle', id), {
            onSuccess: (response) => {
                const updatedDevices = devices.map(device =>
                    device.id === response.id ? response : device
                );
                setDevices(updatedDevices);
            }
        });
    };

    const deleteDevice = (id) => {
        if (confirm("Are you sure you want to delete this device?")) {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

            fetch(route('devices.destroy', id), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken // Safely use CSRF token
                }
            })
                .then(response => response.json())
                .then(data => {
                    setDevices(devices.filter(device => device.id !== id)); // Remove the deleted device from the state
                    swal("Deleted", "Device deleted successfully", "success");
                })
                .catch(error => {
                    swal("Error", "Failed to delete the device", "error");
                });
        }
    };



    return (
        <AuthenticatedLayout>
            <Head title="Devices Management" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold">Device Management</h2>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Device Name
                            </label>
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
                            <label htmlFor="serial_number" className="block text-sm font-medium text-gray-700">
                                Serial Number
                            </label>
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
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={processing}
                            >
                                Add Device
                            </button>
                        </div>
                    </form>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Device ID</th>
                                <th className="px-4 py-2">Device Name</th>
                                <th className="px-4 py-2">Serial Number</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((device) => (
                                <tr key={device.id}>
                                    <td className="border px-4 py-2">{device.id}</td>
                                    <td className="border px-4 py-2">{device.name}</td>
                                    <td className="border px-4 py-2">{device.serial_number}</td>
                                    <td className="border px-4 py-2">
                                        {device.is_on ? 'On' : 'Off'}
                                    </td>
                                    <td className="border px-2 py-2">
                                        <div className="flex items-center justify-center space-x-4">
                                            <button
                                                className={`text-3xl mr-2 transition-colors ${device.is_on ? 'text-green-500' : 'text-gray-500'}`}
                                                onClick={() => toggleStatus(device.id)}
                                            >
                                                <i className={`bx ${device.is_on ? 'bxs-toggle-right' : 'bx-toggle-left'}`}></i>
                                            </button>
                                            <button className="text-red-500" onClick={() => deleteDevice(device.id)}>
                                                <i className="bx bx-trash"></i>
                                            </button>
                                        </div>
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
