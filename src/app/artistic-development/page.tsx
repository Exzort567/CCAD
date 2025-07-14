"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { artisticDevelopmentPrograms } from '../../data/programs';

interface Program {
  slug: string;
  title: string;
  images: string[];
  date: string;
  [key: string]: any;
}

const formatDateRange = (start: string, end: string | null) => {
  if (!end) return new Date(start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startMonth = startDate.toLocaleString('default', { month: 'long' });
  const endMonth = endDate.toLocaleString('default', { month: 'long' });

  if (startMonth === endMonth && startDate.getFullYear() === endDate.getFullYear()) {
    if (startDate.getDate() === endDate.getDate()) {
      return `${startMonth} ${startDate.getDate()}, ${startDate.getFullYear()}`;
    }
    return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`;
  }
  return `${startMonth} ${startDate.getDate()}, ${startDate.getFullYear()} - ${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`;
};

const ArtisticDevelopmentPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const [allDbPrograms, setAllDbPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const fetchAllPrograms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/programs?category=artistic-development`);
        if (!response.ok) throw new Error('Failed to fetch programs.');
        
        const data = await response.json();
        const formattedData: Program[] = data.map((program: any) => ({
          ...program,
          date: formatDateRange(program.dateStart, program.dateEnd),
        }));
        setAllDbPrograms(formattedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPrograms();
  }, []);

  // Filter programs by selected year
  const dbPrograms = useMemo(() => {
    return allDbPrograms.filter(program => {
      if (program.dateStart) {
        const year = new Date(program.dateStart).getFullYear().toString();
        return year === selectedYear;
      }
      return false;
    });
  }, [allDbPrograms, selectedYear]);

  // Get years from both static data and database programs
  const years = useMemo(() => {
    const staticYears = Object.keys(artisticDevelopmentPrograms);
    const dbYears = allDbPrograms.map((program: Program) => {
      if (program.dateStart) {
        return new Date(program.dateStart).getFullYear().toString();
      }
      return null;
    }).filter((year): year is string => year !== null);
    
    const allYears = [...staticYears, ...dbYears];
    const uniqueYears = [...new Set(allYears)].sort((a, b) => Number(b) - Number(a));
    return uniqueYears;
  }, [allDbPrograms]);

  const staticEvents: Program[] = (artisticDevelopmentPrograms as any)[selectedYear] || [];
  const combinedEvents = [...dbPrograms, ...staticEvents];

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
          <div className="inline-block rounded-md bg-[#c4a46a] text-white font-semibold px-8 py-4 shadow-md text-xl">
            Artistic Development Programs – 7 Forms of Art
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
          {loading && <p className="text-center py-4">Loading new programs...</p>}
          {error && <p className="text-center text-red-500 py-4">Error: {error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {combinedEvents.length > 0 ? (
              combinedEvents.map((event: Program) => (
                <Link key={event.slug} href={`/artistic-development/${event.slug}`} passHref>
                  <div className="block bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
                    <div className="relative w-full h-56">
                      <Image
                        src={event.images && event.images.length > 0 ? event.images[0] : '/images/logo.jpg'}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#813F02] mb-2 h-16">{event.title.length > 55 ? `${event.title.substring(0, 55)}...` : event.title}</h3>
                      <p className="text-gray-500">{event.date}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              !loading && (
                <p className="text-center md:col-span-2 lg:col-span-3 text-gray-500">
                  No events found for the selected year.
                </p>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArtisticDevelopmentPage; 