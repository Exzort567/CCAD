"use client";

import Image from "next/image";
import { Eye, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DropdownSection from "../components/DropdownSection";
import NewsCarousel from "../components/NewsCarousel";
import EventCard from "../components/EventCard";
import NewsEventModal from "../components/NewsEventModal";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Banner from "@/components/banner";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

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

  // Check for shared event URL parameter
  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId && events.length > 0 && !isEventModalOpen) {
      // Find event by ID or title slug
      const event = events.find(e => 
        e._id === eventId || 
        encodeURIComponent(e.title.toLowerCase().replace(/\s+/g, '-')) === eventId
      );
      
      if (event) {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
        // Clean up URL without reloading
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('event');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, [events, searchParams, isEventModalOpen]);

  const section1Ref = useSectionAnimation();
  const section2Ref = useSectionAnimation();
  const section3Ref = useSectionAnimation();
  const section4Ref = useSectionAnimation();

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  // Carousel images array
  const carouselImages = [
    {
      src: "/images/banner.jpg",
      alt: "Philippine Independence Day"
    },
    {
      src: "/images/banner1.png",
      alt: "Cultural Programs Banner"
    },
    {
      src: "/images/banner4.png",
      alt: "Arts Development"
    },
  ];

  const mandates = [
    'The preservation and revitalization of the Boholano Cultural Heritage, raising Boholano/Filipino pride and self-identity',
    'The cultural empowerment of Boholano individuals, groups, communities, and institutions working for the highest standards of artistic expression, faithfully reflecting the Boholano people\'s values, ideas, struggles, and aspirations',
    'Sustainable community-based cultural productivity integrated into eco-tourism for the economic development of Bohol',
    'Cultural promotion and networking',
  ];

  const objectives = [
    'To foster awareness and appreciation of Boholano and Filipino Cultural Heritage',
    'To initiate the formulation and enactment of appropriate legislation for the preservation and protection of Boholano cultural heritage',
    'To help revitalize Boholano cultural traditions',
    'To promote the growth of the creation of new artistic works',
    'To foster cultural empowerment of communities, groups, and institutions',
    'To help provide opportunities for the upgrading of cultural education in the schools',
    'To promote cultural talents and eco-cultural heritage sites',
    'To establish and develop appropriate venue; and',
    'To develop sustainable community-based eco-cultural tourism',
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Banner Carousel Section */}
      <div className="relative">
        <Banner/>
        {/* Overlay decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Vision & Mission Section */}
      <section ref={section2Ref} id="vision-mission" className="py-24 bg-gradient-to-br from-white via-[#faf8f3] to-white animated-section slide-in-right">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-[#4a2e2a] rounded-full"></div>
              <h2 className="text-5xl font-bold text-[#4a2e2a] tracking-wide">VISION & MISSION</h2>
              <div className="w-12 h-1 bg-[#4a2e2a] rounded-full"></div>
            </div>
            <div className="max-w-5xl mx-auto">
              <p className="text-[#382716] text-xl leading-relaxed font-medium">
                The <span className="text-[#4a2e2a] font-bold bg-[#f3e2bb]/30 px-2 py-1 rounded">Center for Culture and Arts Development – Bohol (CCAD)</span> envisions a dynamic and inclusive cultural landscape that celebrates Boholano identity, creativity, and heritage.
              </p>
              <p className="text-[#382716]/80 text-lg mt-4">
                Guided by a clear mission, CCAD is committed to preserving, promoting, and developing the arts and culture of Bohol through sustainable programs, education, and community engagement.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-stretch">
            {/* Vision Card */}
            <div className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#f3e2bb]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#f3e2bb] to-[#d4c5a0] rounded-full p-4 shadow-lg">
                    <Image src="/images/comedy.png" alt="Vision" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="pt-8 text-center">
                  <h3 className="text-4xl font-bold text-[#4a2e2a] mb-6 group-hover:text-[#382716] transition-colors">Vision</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#4a2e2a] to-[#f3e2bb] mx-auto mb-6 rounded-full"></div>
                  <p className="text-[#382716] text-lg leading-relaxed">
                    Bohol is a prime eco-cultural tourism destination and a strong, balanced agro-industrial province, with a well-educated, God-loving, and law-abiding citizenry, proud of their cultural heritage, enjoying a state of well-being, and committed to sound environment management.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#f3e2bb]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#f3e2bb] to-[#d4c5a0] rounded-full p-4 shadow-lg">
                    <Image src="/images/paint-palette.png" alt="Mission" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="pt-8 text-center">
                  <h3 className="text-4xl font-bold text-[#4a2e2a] mb-6 group-hover:text-[#382716] transition-colors">Mission</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#f3e2bb] to-[#4a2e2a] mx-auto mb-6 rounded-full"></div>
                  <p className="text-[#382716] text-lg leading-relaxed">
                    To enrich Bohol's social, economic, cultural, political, and environmental resources through good governance and effective partnerships with stakeholders to increase global competitiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandates & Objectives Section */}
      <section ref={section3Ref} id="mandates-objectives" className="py-24 bg-gradient-to-br from-[#faf8f3] to-white animated-section slide-in-left">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#382716] mb-4">Our Foundation</h2>
            <p className="text-[#382716]/70 text-xl max-w-3xl mx-auto">
              The principles and goals that guide our commitment to cultural excellence and heritage preservation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* CCAD Logo - Enhanced */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f3e2bb]/20 to-[#382716]/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#f3e2bb]/30">
                  <Image 
                    src="/images/ccadSquare.png" 
                    alt="CCAD Logo" 
                    width={320} 
                    height={320} 
                    className="mx-auto drop-shadow-lg group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Content Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mandates */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#f3e2bb]/30 hover:shadow-xl transition-all duration-300">
                <DropdownSection title="Mandates" items={mandates} />
              </div>
              
              {/* Objectives */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#f3e2bb]/30 hover:shadow-xl transition-all duration-300">
                <DropdownSection title="Objectives" items={objectives} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section ref={section4Ref} className="py-24 bg-gradient-to-br from-white via-[#faf8f3] to-white animated-section slide-in-right">
        <div className="w-full max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#382716] mb-4">Latest Updates</h2>
            <p className="text-[#382716]/70 text-xl max-w-3xl mx-auto">
              Stay informed with our latest news and upcoming cultural events
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
            {/* News Section */}
            <div className="xl:col-span-7">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#f3e2bb]/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#382716] to-[#4a2e2a] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-[#382716]">News</h3>
                  <div className="flex-1 h-1 bg-gradient-to-r from-[#382716] to-transparent rounded-full"></div>
                </div>
                <NewsCarousel />
              </div>
            </div>

            {/* Events Section */}
            <div className="xl:col-span-5">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#f3e2bb]/30 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#f3e2bb] to-[#d4c5a0] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#382716]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-[#382716]">Events</h3>
                  <div className="flex-1 h-1 bg-gradient-to-r from-[#f3e2bb] to-transparent rounded-full"></div>
                </div>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                  {eventsLoading && (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#382716]"></div>
                    </div>
                  )}
                  {eventsError && (
                    <div className="text-center text-red-600 py-8 bg-red-50 rounded-xl border border-red-200">
                      <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {eventsError}
                    </div>
                  )}
                  {!eventsLoading && !eventsError && events.length === 0 && (
                    <div className="text-center py-12 text-[#382716]/60">
                      <svg className="w-16 h-16 text-[#382716]/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14l-7 7-7-7z" />
                      </svg>
                      <p className="text-lg">No events scheduled at the moment.</p>
                      <p className="text-sm mt-2">Check back soon for updates!</p>
                    </div>
                  )}
                  {!eventsLoading && !eventsError && events.map((event, index) => (
                    <div key={event._id || event.title} 
                         className="transform transition-all duration-300 hover:scale-[1.02]"
                         style={{ animationDelay: `${index * 100}ms` }}>
                      <EventCard
                        image={event.image}
                        title={event.title}
                        date={event.date}
                        description={event.description}
                        onClick={() => handleEventClick(event)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Modal */}
      <NewsEventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        item={selectedEvent}
        type="event"
      />
    </div>
  );
}