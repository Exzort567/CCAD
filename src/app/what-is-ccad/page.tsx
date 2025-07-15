'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSectionAnimation } from '@/hooks/useSectionAnimation';
import DropdownSection from '@/components/DropdownSection';

export default function WhatIsCCADPage() {
  const section1Ref = useSectionAnimation();
  const section2Ref = useSectionAnimation();
  const section3Ref = useSectionAnimation();
  const section4Ref = useSectionAnimation();
  const section5Ref = useSectionAnimation();

  const coreValues = [
    'Cultural Preservation: Safeguarding Bohol\'s rich cultural heritage for future generations through documentation, conservation, and active promotion.',
    'Community Empowerment: Enabling local communities, artists, and cultural practitioners to take ownership of their cultural identity and development.',
    'Educational Excellence: Providing comprehensive cultural education and training programs that nurture artistic talents and cultural awareness.',
    'Innovation and Creativity: Encouraging creative expression while respecting traditional forms and promoting contemporary artistic development.',
    'Sustainable Development: Integrating cultural activities with economic development to create sustainable livelihood opportunities for communities.',
    'Inclusivity and Accessibility: Ensuring that cultural programs and opportunities are accessible to all members of Boholano society.'
  ];

  const keyPrograms = [
    'Artistic Development Programs - 7 Forms of Art: Comprehensive training in music, dance, theater, visual arts, literature, film, and architecture.',
    'Cultural Heritage Programs: Documentation, preservation, and promotion of Bohol\'s intangible and tangible cultural heritage.',
    'Creative Industry Development: Supporting local artists and creative entrepreneurs in developing sustainable cultural enterprises.',
    'Culture and Development Programs: Integrating cultural activities with community development and economic growth initiatives.',
    'Culture and Governance: Advocating for cultural policies and ensuring cultural considerations in government planning and decision-making.',
  ];

  const achievements = [
    'Successfully established the Bohol Arts and Cultural Heritage (BACH) Council as the province\'s cultural governing body.',
    'Documented and preserved over 50 traditional Boholano cultural practices, songs, and dances.',
    'Trained more than 1,000 local artists and cultural practitioners through various development programs.',
    'Facilitated the recognition of multiple Boholano cultural sites and practices by national heritage institutions.',
    'Developed sustainable cultural tourism initiatives that benefit local communities while preserving cultural integrity.',
    'Created partnerships with national and international cultural organizations to promote Boholano culture globally.'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/coverPage.jpg"
            alt="CCAD Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <div className="mb-6">
              <Image
                src="/images/logo.jpg"
                alt="CCAD Logo"
                width={120}
                height={120}
                className="mx-auto rounded-full border-4 border-white/80"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow-lg">What is CCAD?</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Center for Culture and Arts Development
            </p>
            <p className="text-lg md:text-xl text-white/80 mt-2">
              Preserving Heritage • Nurturing Creativity • Building Communities
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={section1Ref} className="py-20 bg-white animated-section slide-in-left">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#382716] mb-6">About CCAD</h2>
              <p className="text-lg text-[#382716] text-justify leading-relaxed mb-6">
                The <strong>Center for Culture and Arts Development (CCAD)</strong> is Bohol's premier institution dedicated to the preservation, promotion, and development of the province's rich cultural heritage. Established as a cornerstone of cultural education and artistic excellence, CCAD serves as the driving force behind Bohol's cultural renaissance.
              </p>
              <p className="text-lg text-[#382716] text-justify leading-relaxed mb-6">
                As the cultural hub of the province, CCAD works tirelessly to bridge the gap between traditional Boholano culture and contemporary artistic expression. We believe that culture is not just our past, but the foundation for our future development and identity as Boholanos.
              </p>
              <p className="text-lg text-[#382716] text-justify leading-relaxed">
                Through innovative programs, community partnerships, and dedicated advocacy, CCAD empowers individuals and communities to embrace their cultural identity while fostering creativity and sustainable development.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/images/ccadSquare.png"
                  alt="CCAD Square Logo"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section ref={section4Ref} className="py-20 bg-[#f9f6f1] animated-section slide-in-right">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#382716] mb-4">Our Programs</h2>
            <p className="text-lg text-[#382716]/80 max-w-3xl mx-auto">
              Comprehensive programs designed to nurture artistic talents, preserve cultural heritage, and promote sustainable development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <DropdownSection title="Key Programs" items={keyPrograms} />
            </div>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-[#382716] mb-4">Program Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#f3e2bb]/30 rounded-lg">
                    <div className="text-3xl font-bold text-[#382716]">1000+</div>
                    <div className="text-sm text-[#382716]/80">Artists Trained</div>
                  </div>
                  <div className="text-center p-4 bg-[#f3e2bb]/30 rounded-lg">
                    <div className="text-3xl font-bold text-[#382716]">50+</div>
                    <div className="text-sm text-[#382716]/80">Cultural Sites</div>
                  </div>
                  <div className="text-center p-4 bg-[#f3e2bb]/30 rounded-lg">
                    <div className="text-3xl font-bold text-[#382716]">25+</div>
                    <div className="text-sm text-[#382716]/80">Communities</div>
                  </div>
                  <div className="text-center p-4 bg-[#f3e2bb]/30 rounded-lg">
                    <div className="text-3xl font-bold text-[#382716]">5</div>
                    <div className="text-sm text-[#382716]/80">Years of Service</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-[#382716] mb-4">Recognition</h3>
                <ul className="space-y-2 text-[#382716]">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#382716] rounded-full mr-3"></span>
                    Provincial Cultural Institution of the Year (2023)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#382716] rounded-full mr-3"></span>
                    National Heritage Preservation Award (2022)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#382716] rounded-full mr-3"></span>
                    Community Development Excellence (2021)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={section5Ref} className="py-20 bg-white animated-section slide-in-left">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#382716] mb-4">Our Achievements</h2>
            <p className="text-lg text-[#382716]/80 max-w-3xl mx-auto">
              Milestones that mark our journey in cultural development and community empowerment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <DropdownSection title="Key Achievements" items={achievements} />
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#382716] to-[#4a2e2a] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Looking Forward</h3>
                <p className="text-white/90 leading-relaxed">
                  As we continue our mission, CCAD remains committed to expanding our reach, deepening our impact, and strengthening the cultural fabric of Bohol. We envision a future where every Boholano is a proud ambassador of our rich cultural heritage.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f3e2bb] rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-[#382716]">2025</div>
                  <div className="text-sm text-[#382716]/80">Strategic Plan</div>
                </div>
                <div className="bg-[#f3e2bb] rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-[#382716]">Global</div>
                  <div className="text-sm text-[#382716]/80">Cultural Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#382716] to-[#4a2e2a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Cultural Journey</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Be part of Bohol's cultural renaissance. Whether you're an artist, community leader, or cultural enthusiast, 
            there's a place for you in our mission to preserve, promote, and develop Boholano culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/development-programs"
              className="bg-[#f3e2bb] text-[#382716] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors inline-block"
            >
              Explore Our Programs
            </a>
            <a
              href="/bach-council"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#382716] transition-colors inline-block"
            >
              Meet Our Council
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 