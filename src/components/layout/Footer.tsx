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
    'GOV.PH',
    'Open Data Portal',
    'Official Gazette',
  ];

  const partnerLogos = [
    { src: '/images/logo1.png', alt: 'Province of Bohol' },
    { src: '/images/logo2.png', alt: 'BACA' },
    { src: '/images/logo3.png', alt: 'Bohol Island Geopark' },
    { src: '/images/logo4.png', alt: 'UNESCO' },
  ];

  return (
    <footer className="font-sans">
      {/* Main Section */}
      <div className="bg-[#3c2a18] text-[#f3e2bb] w-full">
        <div className="max-w-[1400px] mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Government Links */}
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">Government Links:</h3>
            <ul className="space-y-1 text-lg">
              {governmentLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:underline">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-1 flex flex-col items-start">
            <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">Contact Us</h3>
            <div className="font-bold text-lg mb-2 leading-tight">Center for Culture and Arts<br />Development - Bohol</div>
            <div className="mb-2 text-lg leading-snug flex items-start gap-2">
              <Image className='mt-1' src="/images/loc.png" alt="Logo" width={30} height={30} />
              2nd Floor, New Capitol Building,<br />
              Gov. Lino I. Chatto Drive, Barangay Cogon,<br />
              Tagbilaran City, Bohol, 6300 Philippines
            </div>
            <div className="mb-2 flex items-start gap-2 text-lg leading-snug">
              <Image src="/images/mail.png" alt="Logo" width={30} height={30} />
              <Link href="mailto:ccad.bohol@gmail.com" className="underline">ccad.bohol@gmail.com</Link>
            </div>
            <div className="text-lg flex items-start gap-2">
              <Image src="/images/call.svg" alt="Logo" width={30} height={30} />
              <div>(555) 555-0199</div>
            </div>
          </div>

          {/* Map */}
          <div className="flex justify-end w-full">
            <div className="w-full max-w-[600px] h-[300px] rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4640.011803967226!2d123.85698241127407!3d9.65923619038956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa4db095629def%3A0xa8d531c9130bc8c4!2sBohol%20Provincial%20Capitol!5e1!3m2!1sen!2sph!4v1750476225273!5m2!1sen!2sph"
                width="600"
                height="450"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos Row */}
      <div className="bg-[#f3e2bb] py-6">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-16">
          {partnerLogos.map((logo, index) => (
            <Image key={index} src={logo.src} alt={logo.alt} width={logo.alt === 'BACA' || logo.alt === 'UNESCO' ? 120 : 90} height={logo.alt === 'BACA' ? 48 : (logo.alt === 'UNESCO' ? 60 : 90)} />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#2c1c18]">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-lg text-white tracking-wide">©2025 Center for Culture and Arts Development – Bohol. All rights reserved.</p>
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