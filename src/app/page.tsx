"use client";

import Image from "next/image";
import { Eye, Rocket } from 'lucide-react';
import { useState, useRef, useLayoutEffect } from 'react';
import ObjectivesSection from "../components/ObjectivesSection";

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative h-[600px] w-full">
        <Image
          src="/images/banner.jpg"
          alt="Philippine Independence Day"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </section>

      <section className="py-20 bg-[#FFFFFF]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#4a2e2a] mb-8">VISION & MISSION</h2>
          <p className="max-w-4xl mx-auto text-[#4a2e2a] mb-16 text-lg">
            The Center for Culture and Arts Development – Bohol (CCAD) envisions a dynamic and inclusive cultural landscape that celebrates Boholano identity, creativity, and heritage. Guided by a clear mission, CCAD is committed to preserving, promoting, and developing the arts and culture of Bohol through sustainable programs, education, and community engagement.
          </p>
          <div className="grid md:grid-cols-2 gap-50 max-w-7xl mx-auto items-start relative">
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
      <section className="flex justify-center bg-white py-10 w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row justify-center items-start gap-12 md:gap-10">
            {/* Logo */}
            <div className="flex-shrink-0 flex flex-col justify-center items-center w-[340px] h-full">
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
    </div>
  );
}
