"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { programData } from '../../data/programs';

// --- Event Card Component ---
interface ProgramEventCardProps {
  slug: string;
  title: string;
  date: string;
}

const ProgramEventCard: FC<ProgramEventCardProps> = ({ slug, title, date }) => (
  <div className="bg-[#fcfaf5] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <Link href={`/artistic-development/${slug}`} className="group">
      <h3 className="text-lg font-semibold text-[#8c6b3b] underline underline-offset-4 group-hover:text-[#382716]">
        {title}
      </h3>
    </Link>
    {date && <p className="text-gray-600 mt-3 text-sm">{date}</p>}
  </div>
);

const ArtisticDevelopmentPage = () => {
  const [activeYear, setActiveYear] = useState(2025);

  const renderContentForYear = (year: number) => {
    const events = programData[year as keyof typeof programData];
    if (!events || events.length === 0) {
      return (
        <div className="mt-12 text-center text-lg text-gray-700">
          <p>No events found for the year <span className="font-bold">{year}</span>.</p>
        </div>
      );
    }
    return (
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <ProgramEventCard key={event.slug} slug={event.slug} title={event.title} date={event.date} />
        ))}
      </div>
    );
  };

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
          <div className="inline-block bg-[#c4a46a] text-white font-semibold rounded-lg px-8 py-4 shadow-md text-xl">
            Artistic Development Programs – 7 Forms of Art
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 md:gap-10">
          {[2025, 2024, 2023].map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`text-2xl font-semibold tracking-widest py-3 px-6 rounded-lg transition-colors duration-300
                ${activeYear === year
                  ? 'bg-[#fcfaf5] text-[#382716] shadow-inner border-b-4 border-[#c4a46a]'
                  : 'bg-[#f8f3ea] text-gray-500 hover:bg-[#fcfaf5]'
                }`}
            >
              YEAR {year}
            </button>
          ))}
        </div>

        <main>
          {renderContentForYear(activeYear)}
        </main>
      </div>
    </div>
  );
};

export default ArtisticDevelopmentPage; 