"use client";

import Image from "next/image";
import { useState, useRef, useLayoutEffect } from "react";

export default function ObjectivesSection() {
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
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const [opacity, setOpacity] = useState(0);

  useLayoutEffect(() => {
    if (showAll && dropdownRef.current) {
      setMaxHeight(dropdownRef.current.scrollHeight + 'px');
      setTimeout(() => setOpacity(1), 50);
    } else {
      setOpacity(0);
      setTimeout(() => setMaxHeight('0px'), 300);
    }
  }, [showAll]);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-normal text-[#4a2e2a] uppercase tracking-wide mb-6 text-center md:text-left">Objectives</h2>
      <ul className="space-y-6">
        {objectives.slice(0, 6).map((obj, i) => (
          <li key={i} className="flex items-start gap-3">
            <Image src="/images/bullet.png" alt="bullet" width={24} height={24} className="mt-1" />
            <span className="text-[#4a2e2a] text-lg text-justify">{obj}</span>
          </li>
        ))}
      </ul>
      {/* Animated dropdown for extra objectives */}
      <div
        ref={dropdownRef}
        style={{ maxHeight, opacity, transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s' }}
        className="overflow-hidden"
      >
        <ul className="space-y-6 mt-0">
          {objectives.slice(6).map((obj, i) => (
            <li key={i} className="flex items-start gap-3">
              <Image src="/images/bullet.png" alt="bullet" width={24} height={24} className="mt-1" />
              <span className="text-[#4a2e2a] text-lg text-justify">{obj}</span>
            </li>
          ))}
        </ul>
      </div>
      {objectives.length > 6 && (
        <>
          <div className="w-full border-t border-[#4a2e2a] mt-10 mb-2"></div>
          <div className="flex justify-center">
            <button
              className="w-10 h-10 rounded-full bg-[#4a2e2a] flex items-center justify-center focus:outline-none transition-transform hover:scale-110 -mt-6"
              onClick={() => setShowAll((v) => !v)}
              aria-label={showAll ? 'Show less' : 'Show more'}
            >
              <svg
                className={`w-6 h-6 text-white transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
} 