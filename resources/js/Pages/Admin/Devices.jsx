import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import swal from 'sweetalert';

export default function Devices({ devices: initialDevices, users = [] }) {
    console.log(users); // Check if users are being passed correctly
    const [devices, setDevices] = useState(initialDevices);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        serial_number: '',
        user_id: '',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));


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
            <div className="py-5">
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
                            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                                Assign User
                            </label>
                            <div className="relative" ref={dropdownRef}>
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setIsDropdownOpen(true); // Open dropdown on typing
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)} // Also open on focus
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {isDropdownOpen && (
                                    <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map(user => (
                                                <div
                                                    key={user.id}
                                                    onClick={() => {
                                                        setData('user_id', user.id);
                                                        setSearchTerm(user.name);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {user.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-gray-500">No users found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <input
                                type="hidden"
                                id="user_id"
                                name="user_id"
                                value={data.user_id}
                            />
                            {errors.user_id && <p className="mt-2 text-sm text-red-600">{errors.user_id}</p>}
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
                                <th className="px-4 py-2">Assigned User</th>
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
                                    <td className="border px-4 py-2">{device.user_id ? users.find(user => user.id === device.user_id)?.name : 'Unassigned'}</td>
                                    <td className="border px-4 py-2">{device.is_on ? 'On' : 'Off'}</td>
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
