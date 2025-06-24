"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cultureAndGovernance } from '../../data/programs';

const ArtisticDevelopmentPage = () => {
  const [selectedYear, setSelectedYear] = useState<'2025' | '2024' | '2023'>('2023');

  const handleYearChange = (year: string) => {
    setSelectedYear(year as '2025' | '2024' | '2023');
  };

  const years = Object.keys(cultureAndGovernance).sort((a, b) => Number(b) - Number(a));
  const events = cultureAndGovernance[selectedYear] || [];

  return (
    <div className="w-full bg-white text-[#382716]">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold uppercase tracking-wider leading-relaxed">
            Preservation and Promotion of Boholano
            <br />
            Cultural Heritage and Arts
          </h1>
        </header>

        <div className="my-10">
          <Image
            src="/images/programBanner.png"
            alt="Artistic Development Programs Banner"
            width={1200}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center my-12">
          <div className="inline-block bg-[#c4a46a] text-white font-semibold px-8 py-4 shadow-md text-xl">
            Culture and Governance
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 md:gap-10">
          {years.map(year => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-10 py-4 text-lg font-semibold mx-2 transition-colors ${
                selectedYear === year
                  ? 'bg-[#813F02] text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {events.length > 0 ? (
              events.map((event: any) => (
                <Link key={event.slug} href={`/culture-governance/${event.slug}`} passHref>
                  <div className="block bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
                    <div className="relative w-full h-56">
                      <Image
                        src={event.images[0] || '/images/logo.jpg'}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#813F02] mb-2 h-16">{event.title.length > 47 ? `${event.title.substring(0, 55)}...` : event.title}</h3>
                      <p className="text-gray-500">{event.date}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center md:col-span-2 lg:col-span-3 text-gray-500">
                No events found for the selected year.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArtisticDevelopmentPage; 