"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { culturalHeritagePrograms } from '../../../data/programs';
import { ArrowLeft } from 'lucide-react';

const ProgramDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  // Find the event data based on the slug from the URL
  const event = Object.values(culturalHeritagePrograms).flat().find(e => e.slug === slug);

  // Show a "not found" message if the event doesn't exist
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="mt-2">The event you are looking for does not exist.</p>
        <Link href="/development-programs" className="text-blue-500 hover:underline mt-6 inline-block">
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
          <Link href="/development-programs" className="inline-block bg-[#c4a46a] text-white font-semibold rounded-lg px-8 py-3 shadow-md text-lg hover:bg-opacity-90 transition-opacity">
             Culture Heritage Programs
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
          <h2 className="text-3xl font-bold text-[#813F02] mb-2">{event.title}</h2>
          <p className="text-gray-500 mb-6">{event.date}</p>
          <p className="text-lg text-gray-800 leading-relaxed mb-10">{event.description}</p>
          
          {event.images && event.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.images.map((src, index) => (
                <div key={index} className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
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