import { MapPin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const governmentLinks = [
    'Office of the President',
    'Office of the Vice President',
    'Senate of the Philippines',
    'House of Representatives',
    'Supreme Court',
    'Court of Appeals',
    'Sandiganbayan',
    'Gov.PH',
    'Open Data Portal',
    'Official Gazette',
  ];

  const partnerLogos = [
    { src: '/images/logo1.jpg', alt: 'Province of Bohol' },
    { src: '/images/logo2.jpg', alt: 'BACA' },
    { src: '/images/logo3.jpg', alt: 'Bohol Island Geopark' },
    { src: '/images/logo4.jpg', alt: 'UNESCO' },
  ];

  return (
    <footer className="bg-[#4a2e2a] text-white">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">GOVERNMENT LINKS:</h3>
            <ul className="space-y-2">
              {governmentLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:underline">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
              <p className="font-semibold">Center for Culture and Arts Development - Bohol</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <span>2nd Floor, New Capitol Building, Gov. Lino I. Chatto Drive, Barangay Cogon, Tagbilaran City, Bohol, 6300 Philippines</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                  <a href="mailto:ccad.bohol@gmail.com" className="hover:underline">
                    ccad.bohol@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>(555) 555-0199</span>
                </div>
              </div>
            </div>
            <div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4640.011803967226!2d123.85698241127407!3d9.65923619038956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa4db095629def%3A0xa8d531c9130bc8c4!2sBohol%20Provincial%20Capitol!5e1!3m2!1sen!2sph!4v1750476225273!5m2!1sen!2sph" 
                width="400" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#3b2521]">
        <div className="container mx-auto px-8 py-6 flex flex-wrap items-center justify-center gap-8">
          {partnerLogos.map((logo, index) => (
            <Image key={index} src={logo.src} alt={logo.alt} width={logo.alt === 'BACA' || logo.alt === 'UNESCO' ? 100 : 80} height={logo.alt === 'BACA' ? 40 : (logo.alt === 'UNESCO' ? 50 : 80)} />
          ))}
        </div>
      </div>

      <div className="bg-[#2c1c18]">
        <div className="container mx-auto px-8 py-4 flex justify-between items-center">
          <p className="text-sm">©2025 Center for Culture and Arts Development – Bohol. All rights reserved.</p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            <svg
              width={40}
              height={40}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
} 