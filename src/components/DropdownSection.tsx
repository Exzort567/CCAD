"use client";

import Image from "next/image";
import { useState, useRef, useLayoutEffect } from "react";

interface DropdownSectionProps {
  title: string;
  items: string[];
  bulletSrc?: string;
  initialVisibleCount?: number;
}

export default function DropdownSection({ 
  title, 
  items,
  bulletSrc = "/images/bullet.png",
  initialVisibleCount = 6 
}: DropdownSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const [opacity, setOpacity] = useState(0);

  useLayoutEffect(() => {
    if (showAll && dropdownRef.current) {
      setMaxHeight(dropdownRef.current.scrollHeight + 'px');
      setOpacity(1);
    } else {
      setOpacity(0);
      setMaxHeight('0px');
    }
  }, [showAll]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h2 className="text-3xl md:text-4xl font-normal text-[#4a2e2a] uppercase tracking-wide mb-6 text-center md:text-left">{title}</h2>
        <ul className="space-y-6">
          {items.slice(0, initialVisibleCount).map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <Image src={bulletSrc} alt="bullet" width={24} height={24} className="mt-1" />
              <span className="text-[#4a2e2a] text-lg text-justify">{item}</span>
            </li>
          ))}
        </ul>
        {/* Animated dropdown for extra items */}
        <div
          ref={dropdownRef}
          style={{ maxHeight, opacity, transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s' }}
          className="overflow-hidden"
        >
          <ul className="space-y-6 pt-6">
            {items.slice(initialVisibleCount).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Image src={bulletSrc} alt="bullet" width={24} height={24} className="mt-1" />
                <span className="text-[#4a2e2a] text-lg text-justify">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {items.length > initialVisibleCount && (
        <div className="relative mt-10 mb-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#4a2e2a]" />
          </div>
          <div className="relative flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              aria-label={showAll ? 'Show less' : 'Show more'}
              className="w-10 h-10 rounded-full bg-[#4a2e2a] flex items-center justify-center focus:outline-none transition-transform hover:scale-110"
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
        </div>
      )}
    </div>
  );
} 