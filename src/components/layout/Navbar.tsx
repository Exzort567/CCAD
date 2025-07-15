'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const programLinks = [
  { label: 'Artistic Development Programs - 7 Forms of Art', href: '/artistic-development' },
  { label: 'Culture and Development Programs', href: '/development-programs' },
  { label: 'Cultural Heritage Programs', href: '/heritage-programs' },
  { label: 'Creative Industry', href: '/creative-industry' },
  { label: 'Culture and Governance', href: '/culture-governance' },
];


const aboutUsLinks = [
  { label: 'Vision and Mission', href: '/#vision-mission' },
  { label: 'Mandates and Objectives', href: '/#mandates-objectives' },
  { label: 'What is CCAD?', href: '#' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAboutUsDropdownOpen, setAboutUsDropdownOpen] = useState(false);
  const aboutUsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isProgramDropdownOpen, setProgramDropdownOpen] = useState(false);
  const programTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleProgramMouseEnter = () => {
    if (programTimeoutRef.current) {
      clearTimeout(programTimeoutRef.current);
    }
    setProgramDropdownOpen(true);
  };

  const handleProgramMouseLeave = () => {
    programTimeoutRef.current = setTimeout(() => {
      setProgramDropdownOpen(false);
    }, 200); // 200ms delay
  };

  const handleAboutUsMouseEnter = () => {
    if (aboutUsTimeoutRef.current) {
      clearTimeout(aboutUsTimeoutRef.current);
    }
    setAboutUsDropdownOpen(true);
  };

  const handleAboutUsMouseLeave = () => {
    aboutUsTimeoutRef.current = setTimeout(() => {
      setAboutUsDropdownOpen(false);
    }, 200); // 200ms delays
  };

  return (
    <nav className={`sticky top-0 w-full font-montserrat z-50 transition-all duration-300 ${scrolled ? 'h-[72px] bg-[#382716]/90 shadow-lg' : 'h-[96px] bg-[#382716]'}`}>
      <div className="flex items-center h-full px-0">
        {/* Left Logo */}
        <div className="flex-shrink-0 pl-6">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={scrolled ? 55 : 70}
            height={scrolled ? 55 : 70}
            className="rounded-full transition-all duration-300"
            priority
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-end items-center relative pr-12">
          <div className="flex items-center gap-[48px] text-white text-[1.2rem] font-medium">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            {/* About us DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleAboutUsMouseEnter}
              onMouseLeave={handleAboutUsMouseLeave}
            >
              <button
                className="flex items-center hover:text-gray-300 transition-colors focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isAboutUsDropdownOpen}
                tabIndex={0}
              >
                <span>About Us</span>
                <ChevronDown className="w-6 h-6 ml-2" />
              </button>
              <div
                className={`absolute left-0 mt-2 w-72 bg-white text-[#382716] rounded-lg shadow-lg py-2 z-50 transition-all duration-200 origin-top transform ${
                  isAboutUsDropdownOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                {aboutUsLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-6 py-3 hover:bg-[#f3e2bb] hover:text-[#382716] text-base text-left"
                    tabIndex={0}
                    onClick={() => setAboutUsDropdownOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Program Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProgramMouseEnter}
              onMouseLeave={handleProgramMouseLeave}
            >
              <button
                className="flex items-center hover:text-gray-300 transition-colors focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isProgramDropdownOpen}
                tabIndex={0}
              >
                <span>Program</span>
                <ChevronDown className="w-6 h-6 ml-2" />
              </button>
              <div
                className={`absolute left-0 mt-2 w-72 bg-white text-[#382716] rounded-lg shadow-lg py-2 z-50 transition-all duration-200 origin-top transform ${
                  isProgramDropdownOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                {programLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-6 py-3 hover:bg-[#f3e2bb] hover:text-[#382716] text-base text-left"
                    tabIndex={0}
                    onClick={() => setProgramDropdownOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <a 
              href="https://sandugo.bohol.gov.ph/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/sandugo.png"
                alt="Sandugo Logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </a>
            <Link href="/bach-council" className="hover:text-gray-300 transition-colors">Bach Council</Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex-1 flex justify-end pr-6">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="absolute left-1/2 top-full -translate-x-1/2 w-[90vw] max-w-sm bg-[#382716] shadow-lg z-50 animate-dropdown flex flex-col items-center py-6 rounded-b-2xl border border-[#2c1c18]">
            <Link href="/" className="text-white text-lg font-semibold py-2 w-full text-center hover:bg-[#4a2e2a]" onClick={() => setMobileOpen(false)}>Home</Link>
            {/* Program Dropdown (always open on mobile) */}
            <div className="w-full flex flex-col items-start">
              <div className="flex items-center text-white text-lg font-semibold py-2 w-full pl-6">
                <span>Program</span>
                <span className="ml-2 block lg:hidden" />
              </div>
              <div className="w-full">
                <div className="bg-white rounded-lg shadow-md ml-3 mt-1 mb-3 py-2 w-[calc(100%-1.5rem)]">
                  {programLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block text-[#382716] text-base py-2 pl-6 pr-4 text-left hover:bg-[#f3e2bb] rounded"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Sandugo logo after Program */}
            <div className="my-4">
              <Image
                src="/images/sandugo.png"
                alt="Sandugo Logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <Link href="/creative-industry" className="text-white text-lg font-semibold py-2 w-full text-center hover:bg-[#4a2e2a]" onClick={() => setMobileOpen(false)}>Creative Industry</Link>
            <Link href="/bach-council" className="text-white text-lg font-semibold py-2 w-full text-center hover:bg-[#4a2e2a]" onClick={() => setMobileOpen(false)}>Bach Council</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// Add dropdown animation
// In your global CSS (e.g., globals.css), add:
// @keyframes dropdown {
//   0% { opacity: 0; transform: translateY(-16px); }
//   100% { opacity: 1; transform: translateY(0); }
// }
// .animate-dropdown { animation: dropdown 0.25s ease; } 