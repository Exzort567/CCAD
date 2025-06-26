'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ setSidebarOpen }: { setSidebarOpen?: (open: boolean) => void }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/news', label: 'New Management' },
    { href: '/admin/events', label: 'Events Management' },
    { href: '/admin/programs', label: 'Programs Management' },
  ];

  const handleLinkClick = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="w-64 bg-white h-full p-6 shadow-md flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">CCAD Admin</h1>
        <button onClick={() => setSidebarOpen && setSidebarOpen(false)} className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-4">
              <Link href={item.href} onClick={handleLinkClick}>
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
      <div className="mt-auto">
        <button className="w-full p-2 rounded-md text-left hover:bg-gray-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 