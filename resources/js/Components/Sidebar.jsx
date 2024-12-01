import { Link } from '@inertiajs/react';

export default function Sidebar() {
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
                    <li>
                        <Link href={route('profile.edit')} className="block p-4 hover:bg-gray-700 hover:text-white">
                            <i className='bx bx-user'></i> Profile
                        </Link>
                    </li>
                    <li>
                        <Link href={route('logout')} method="post" className="block p-4 hover:bg-gray-700 hover:text-white">
                            <i className='bx bx-log-out'></i> Log Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
