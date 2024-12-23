import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Sidebar() {
    const user = usePage().props.auth.user;

    return (
        <div className="w-64 h-full bg-gray-100 text-black-100 font-bold fixed shadow-lg">
            <div className="p-4">
                <h2 className="text-lg font-semibold">IOT</h2>
            </div>
            <nav className="mt-4">
                <ul>
                    <li>
                        <Link href={route('dashboard')} className="block p-4 hover:bg-gray-700 hover:text-white">
                            <i className='bx bxs-dashboard'></i> Dashboard
                        </Link>
                    </li>
                    {user.role === 'admin' && (
                        <>
                            <li>
                                <Link href={route('admin.devices')} className="block p-4 hover:bg-gray-700 hover:text-white">
                                    <i className='bx bx-devices'></i> Devices
                                </Link>
                            </li>
                            <li>
                                <Link href={route('admin.users')} className="block p-4 hover:bg-gray-700 hover:text-white">
                                    <i className='bx bx-user'></i> Users
                                </Link>
                            </li>
                        </>
                    )}
                    {user.role === 'user' && (
                        <>
                            <li>
                                <Link href={route('user.devices')} className="block p-4 hover:bg-gray-700 hover:text-white">
                                    <i className='bx bx-devices'></i> Device Management
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link href={route('profile.edit')} className="block p-4 hover:bg-gray-700 hover:text-white">
                            <i className='bx bx-user'></i> Profile
                        </Link>
                    </li>
                    <li>
                        <Link href={route('logout')} method="post" as="button" className="block p-4 hover:bg-gray-700 hover:text-white">
                            <i className='bx bx-log-out'></i> Log Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
