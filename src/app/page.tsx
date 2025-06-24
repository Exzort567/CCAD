"use client";

import Image from "next/image";
import { Eye, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import ObjectivesSection from "../components/ObjectivesSection";
import NewsCarousel from "../components/NewsCarousel";
import EventCard from "../components/EventCard";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    setEventsLoading(true);
    fetch('/api/events')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setEventsLoading(false);
      })
      .catch(err => {
        setEventsError(err.message);
        setEventsLoading(false);
      });
  }, []);

  const section1Ref = useSectionAnimation();
  const section2Ref = useSectionAnimation();
  const section3Ref = useSectionAnimation();
  const section4Ref = useSectionAnimation();

  return (
    <div className="w-full">
      <section ref={section1Ref} className="relative h-[160px] md:h-[600px] w-full bg-[#0052a4] animated-section slide-in-left">
        <Image
          src="/images/banner.jpg"
          alt="Philippine Independence Day"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </section>

      <section ref={section2Ref} id="vision-mission" className="py-20 bg-[#FFFFFF] animated-section slide-in-right">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#4a2e2a] mb-8">VISION & MISSION</h2>
          <p className="max-w-4xl mx-auto text-[#000000] mb-16 text-lg">
            The <span className="text-[#4a2e2a] font-bold">Center for Culture and Arts Development – Bohol (CCAD)</span> envisions a dynamic and inclusive cultural landscape that celebrates Boholano identity, creativity, and heritage. Guided by a clear mission, CCAD is committed to preserving, promoting, and developing the arts and culture of Bohol through sustainable programs, education, and community engagement.
          </p>
          <div className="grid md:grid-cols-2 gap-y-12 md:gap-x-16 max-w-7xl mx-auto items-start relative">
            {/* Vision */}
            <div className="flex flex-col items-center">
              <div className="p-6 mb-4">
                <Eye className="w-20 h-20 text-[#4a2e2a]" />
              </div>
              <h3 className="text-4xl font-normal text-[#4a2e2a] mb-4">Vision</h3>
              <p className="text-[#4a2e2a] text-lg">
                Bohol is a prime eco-cultural tourism destination and a strong, balanced agro-industrial province, with a well-educated, God-loving, and law-abiding citizenry, proud of their cultural heritage, enjoying a state of well-being, and committed to sound environment management.
              </p>
            </div>
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-[#4a2e2a]" style={{transform: 'translateX(-50%)'}} />
            {/* Mission */}
            <div className="flex flex-col items-center">
              <div className="p-6 mb-4">
                <Rocket className="w-20 h-20 text-[#4a2e2a]" />
              </div>
              <h3 className="text-4xl font-normal text-[#4a2e2a] mb-4">Mission</h3>
              <p className="text-[#4a2e2a] text-lg">
                To enrich Bohol's social, economic, cultural, political, and environmental resources through good governance and effective partnerships with stakeholders to increase global competitiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandates & Objectives Section */}
      <section ref={section3Ref} id="mandates-objectives" className="flex justify-center bg-white py-30 w-full animated-section slide-in-left">
        <div className="w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row justify-center items-start gap-12 md:gap-10">
            {/* Logo - Hide on mobile */}
            <div className="hidden md:flex flex-shrink-0 flex-col justify-center items-center w-[340px] h-full">
              <Image src="/images/ccadSquare.png" alt="CCAD Logo" width={320} height={320} className="mx-auto" />
            </div>

            {/* Mandates */}
            <div className="flex-1 flex flex-col items-center md:items-start w-full max-w-md mx-auto">
              <h2 className="text-3xl md:text-4xl font-normal text-[#4a2e2a] uppercase tracking-wide mb-6 text-center md:text-left">Mandates</h2>
              <ul className="space-y-6 w-full">
                <li className="flex items-start gap-3">
                  <Image src="/images/bullet.png" alt="bullet" width={24} height={24} className="mt-1" />
                  <span className="text-[#4a2e2a] text-lg text-justify">The preservation and revitalization of the Boholano Cultural Heritage, raising Boholano/Filipino pride and self-identity</span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/bullet.png" alt="bullet" width={24} height={24} className="mt-1" />
                  <span className="text-[#4a2e2a] text-lg text-justify">The cultural empowerment of Boholano individuals, groups, communities, and institutions working for the highest standards of artistic expression, faithfully reflecting the Boholano people's values, ideas, struggles, and aspirations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/bullet.png" alt="bullet" width={24} height={24} className="mt-1" />
                  <span className="text-[#4a2e2a] text-lg text-justify">Sustainable community-based cultural productivity integrated into eco-tourism for the economic development of Bohol</span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/bullet.png" alt="bullet" width={24} height={24} className="mt-1" />
                  <span className="text-[#4a2e2a] text-lg text-justify">Cultural promotion and networking</span>
                </li>
              </ul>
            </div>
            {/* Objectives with Dropdown */}
            <div className="flex-1 flex flex-col items-center md:items-start w-full max-w-md mx-auto">
              <ObjectivesSection />
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section ref={section4Ref} className="w-full flex justify-center bg-white py-16 animated-section slide-in-right">
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[1.8fr_1.2fr] gap-x-12 gap-y-16 items-start">
          {/* News */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-semibold text-[#382716] mb-8 border-b-4 border-[#382716] pb-2">News</h2>
            <NewsCarousel />
          </div>
          {/* Events */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-semibold text-[#382716] mb-8 border-b-4 border-[#382716] pb-2">Events</h2>
            <div className="flex flex-col gap-5 w-full max-w-sm md:max-w-full">
              {eventsLoading && <div className="text-center py-8">Loading events...</div>}
              {eventsError && <div className="text-center text-red-600 py-8">{eventsError}</div>}
              {!eventsLoading && !eventsError && events.length === 0 && (
                <div className="text-center py-8">No events available.</div>
              )}
              {!eventsLoading && !eventsError && events.map(event => (
                <EventCard
                  key={event._id || event.title}
                  image={event.image}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
