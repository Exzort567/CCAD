"use client";

import Image from "next/image";
import { useState, useRef, useLayoutEffect } from "react";

interface DropdownSectionProps {
  title: string;
  items: string[];
  bulletSrc?: string;
}

export default function DropdownSection({ 
  title, 
  items,
  bulletSrc = "/images/bullet.png",
}: DropdownSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const [opacity, setOpacity] = useState(0);

  const totalChars = items.reduce((acc, item) => acc + item.length, 0);
  const useDropdown = totalChars > 500;
  const initialVisibleCount = 4;

  useLayoutEffect(() => {
    if (showAll && dropdownRef.current) {
      setMaxHeight(dropdownRef.current.scrollHeight + 'px');
      setOpacity(1);
    } else {
      setOpacity(0);
      setMaxHeight('0px');
    }
  }, [showAll, items]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex justify-center lg:justify-start">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#382716] mb-4 sm:mb-6 md:mb-8 border-b-2 sm:border-b-3 md:border-b-4 border-[#382716] pb-1 sm:pb-2">{title}</h2>
        </div>
        
        <ul className="space-y-3 sm:space-y-4 md:space-y-6">
          {items.slice(0, useDropdown ? initialVisibleCount : items.length).map((item, i) => (
            <li key={i} className="flex items-start gap-2 sm:gap-3">
              <Image 
                src={bulletSrc} 
                alt="bullet" 
                width={24} 
                height={24} 
                className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" 
              />
              <span className="text-[#382716] text-sm sm:text-base md:text-lg text-justify">{item}</span>
            </li>
          ))}
        </ul>

        {useDropdown && (
          <div
            ref={dropdownRef}
            style={{ maxHeight, opacity, transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s' }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 sm:space-y-4 md:space-y-6 pt-3 sm:pt-4 md:pt-6">
              {items.slice(initialVisibleCount).map((item, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3">
                  <Image 
                    src={bulletSrc} 
                    alt="bullet" 
                    width={24} 
                    height={24} 
                    className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" 
                  />
                  <span className="text-[#382716] text-sm sm:text-base md:text-lg text-justify">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {useDropdown && (
        <div className="relative mt-6 sm:mt-8 md:mt-10 mb-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#382716]" />
          </div>
          <div className="relative flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              aria-label={showAll ? 'Show less' : 'Show more'}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#382716] flex items-center justify-center focus:outline-none transition-transform hover:scale-110"
            >
              <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
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