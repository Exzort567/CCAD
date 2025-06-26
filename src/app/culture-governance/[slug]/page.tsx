"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cultureAndGovernance } from '../../../data/programs';
import { ObjectId } from 'mongodb';

interface Program {
  _id?: string;
  title: string;
  description: string;
  images: string[];
  date?: string;
  dateStart?: string;
  dateEnd?: string;
  slug?: string;
}

const formatDateRange = (start?: string, end?: string) => {
  if (!start) return '';
  if (!end || start === end) return new Date(start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startMonth = startDate.toLocaleString('default', { month: 'long' });
  const endMonth = endDate.toLocaleString('default', { month: 'long' });

  if (startMonth === endMonth && startDate.getFullYear() === endDate.getFullYear()) {
    return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`;
  }
  return `${startMonth} ${startDate.getDate()}, ${startDate.getFullYear()} - ${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`;
};

const ProgramDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchProgram = async () => {
        setLoading(true);
        setError(null);
        // Attempt to fetch from API if it looks like an ObjectId
        if (typeof slug === 'string' && slug.length === 24 && /^[0-9a-fA-F]+$/.test(slug)) {
          try {
            const response = await fetch(`/api/programs?id=${slug}`);
            if (response.ok) {
              const data = await response.json();
              setProgram(data);
              setLoading(false);
              return;
            }
          } catch (err) {
            // Fall through to static search if API fails
          }
        }
        
        // Fallback to searching in static data
        const staticProgram = Object.values(cultureAndGovernance)
          .flat()
          .find(e => e.slug === slug);

        if (staticProgram) {
          setProgram(staticProgram);
        } else {
          setError('Program not found.');
        }
        setLoading(false);
      };
      fetchProgram();
    }
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }
  
  if (error) {
    return <div className="container mx-auto px-4 py-16 text-center text-red-500">{error}</div>;
  }

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-2">The event you are looking for does not exist.</p>
        <Link href="/culture-governance" className="text-blue-500 hover:underline mt-6 inline-block">
          &larr; Back to programs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-[#382716]">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">

        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold uppercase tracking-wider leading-relaxed">
            Preservation and Promotion of Boholano
            <br />
            Cultural Heritage and Arts
          </h1>
        </header>

        <div className="text-center mb-10">
          <Link href="/culture-governance" className="inline-block bg-[#c4a46a] text-white font-semibold rounded-lg px-8 py-3 shadow-md text-lg hover:bg-opacity-90 transition-opacity">
             Culture and Governance
          </Link>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-3 text-xl font-bold text-[#382716] mb-8 group"
        >
          <div className="bg-[#382716] text-white rounded-full p-2 group-hover:bg-[#5a4a3a] transition-colors">
            <ArrowLeft size={24} />
          </div>
          Go back
        </button>

        <article>
          <h2 className="text-3xl font-bold text-[#813F02] mb-2">{program.title}</h2>
          <p className="text-gray-500 mb-6">{program.date || formatDateRange(program.dateStart, program.dateEnd)}</p>
          <p className="text-lg text-gray-800 leading-relaxed mb-10">{program.description}</p>
          
          {program.images && program.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.images.map((src, index) => (
                <div key={index} className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={src}
                    alt={`${program.title} image ${index + 1}`}
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