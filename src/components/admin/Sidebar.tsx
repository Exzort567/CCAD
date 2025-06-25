'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/news', label: 'New Management' },
    { href: '/admin/events', label: 'Events Management' },
    { href: '/admin/programs', label: 'Programs Management' },
  ];

  return (
    <div className="w-64 bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold mb-8">CCAD Admin</h1>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-4">
              <Link href={item.href}>
                <span
                  className={`block p-2 rounded-md ${
                    pathname === item.href
                      ? 'bg-gray-200 font-bold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-6">
        <button className="w-full p-2 rounded-md text-left hover:bg-gray-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 