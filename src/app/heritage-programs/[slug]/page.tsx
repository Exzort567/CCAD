"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { culturalHeritagePrograms } from '../../../data/programs';
import { ArrowLeft } from 'lucide-react';
import '../../../styles/holographic-card.css';

interface Program {
  slug: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  dateStart?: string;
  dateEnd?: string;
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

const ProgramDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const [event, setEvent] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const findEvent = async () => {
      setLoading(true);
      setError(null);

      // 1. Search in static data first
      const staticEvent = Object.values(culturalHeritagePrograms)
        .flat()
        .find(e => e.slug === slug);
      
      if (staticEvent) {
        setEvent(staticEvent);
        setLoading(false);
        return;
      }

      // 2. If not found, fetch from the API
      try {
        const response = await fetch(`/api/programs?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Could not fetch event from API.');
        }
        const dbEvent = await response.json();

        if (dbEvent) {
          const formattedEvent = {
            ...dbEvent,
            date: formatDateRange(dbEvent.dateStart, dbEvent.dateEnd),
          };
          setEvent(formattedEvent);
        } else {
          throw new Error('Event not found in API response.');
        }
      } catch (err) {
        setError('The event you are looking for does not exist.');
      } finally {
        setLoading(false);
      }
    };

    findEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading event...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-2">{error || 'The event you are looking for does not exist.'}</p>
        <Link href="/heritage-programs" className="text-blue-500 hover:underline mt-6 inline-block">
          &larr; Back to programs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-[#382716]">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">

        <header className="mb-10 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider leading-relaxed">
            Preservation and Promotion of Boholano
            <br />
            Cultural Heritage and Arts
          </h1>
        </header>

        <div className="text-center mb-10">
          <Link href="/heritage-programs" className="inline-block bg-[#c4a46a] text-white font-semibold rounded-lg px-8 py-3 shadow-md text-lg hover:bg-opacity-90 transition-opacity">
             Cultural Heritage Programs
          </Link>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-3 text-lg md:text-xl font-bold text-[#382716] mb-8 group"
        >
          <div className="bg-[#382716] text-white rounded-full p-2 group-hover:bg-[#5a4a3a] transition-colors">
            <ArrowLeft size={24} />
          </div>
          Go back
        </button>

        <article>
          <h2 className="text-2xl md:text-3xl font-bold text-[#813F02] mb-2">{event.title}</h2>
          <p className="text-gray-500 mb-6">{event.date}</p>
          <p className="text-lg text-gray-800 leading-relaxed mb-10">{event.description}</p>
          
          {event.images && event.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.images.map((src, index) => (
                <div key={index} className="holographic-card">
                  <Image
                    src={src}
                    alt={`${event.title} image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          )}
        </article>

      </div>
    </div>
  );
};

export default ProgramDetailPage; 