"use client";

import Image from "next/image";
import { useState, useMemo } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { useMediaQuery } from '../hooks/useMediaQuery';

const news = [
  {
    image: '/images/kulturo.jpg',
    title: 'Kulturo Dos: A Culture-based Lesson Exemplar Competition',
    date: 'July 20, 2025',
    description: 'The Center for Culture and Arts Development (CCAD) and the Bohol Arts and Cultural Heritage (BACH) Council–Committee on Culture and Education, in cooperation with SAKDAP–Bohol, present Kulturo.....',
  },
  {
    image: '/images/stencil.jpg',
    title: 'Pabuhagay Dos: Pride Month Celebration Announcement',
    date: 'June 9, 2025',
    description: 'The Provincial Government of Bohol and partners announce Pabuhagay Dos, a Pride Month event featuring an art exhibit and workshops for the LGBTQ+ community. Activities include stencil printmaking and....',
  },
  {
    image: '/images/stencil.jpg',
    title: 'Stencil Printmaking & Tie Dyeing',
    date: 'June 15, 2025',
    description: 'Join our workshop participants for a creative session on stencil printmaking and tie dyeing. Open to all interested artists and hobbyists!',
  },
  {
    image: '/images/kulturo.jpg',
    title: 'Kulturo Dos: A Culture-based Lesson Exemplar Competition',
    date: 'July 20, 2025',
    description: 'The Center for Culture and Arts Development (CCAD) and the Bohol Arts and Cultural Heritage (BACH) Council–Committee on Culture and Education, in cooperation with SAKDAP–Bohol, present Kulturo.....',
  },
];

function NewsCarousel() {
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const itemsPerSlide = isDesktop ? 2 : 1;
  
  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < news.length; i += itemsPerSlide) {
      result.push(news.slice(i, i + itemsPerSlide));
    }
    return result;
  }, [itemsPerSlide]);

  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  const handlePrev = () => {
    if (canPrev) setIndex(index - 1);
  };

  const handleNext = () => {
    if (canNext) setIndex(index + 1);
  };

  return (
    <div className="relative w-full max-w-sm md:max-w-none">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${(index * 100) / slides.length}%)`,
          }}
        >
          {slides.map((slideItems, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
              <div className="flex items-stretch justify-center gap-8 px-4">
                {slideItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-[#fcfaf5] h-[500px] shadow-md flex-1 flex flex-col overflow-hidden">
                    <div className="relative w-full h-[200px]">
                      <Image src={item.image} alt={item.title} layout="fill" className="object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-base font-semibold text-[#382716] px-3 mb-3 leading-tight">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[#382716] text-xs mb-3">
                        <CiClock2 className="text-lg opacity-70" />
                        <span className="opacity-80">{item.date}</span>
                      </div>
                      <p className="text-[#382716] text-xs text-left leading-relaxed opacity-80 flex-grow">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`absolute top-1/2 -translate-y-1/2 -left-0 md:-left-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#382716] text-white flex items-center justify-center text-3xl font-bold shadow-md z-10 transition-all ${canPrev ? 'opacity-100 hover:bg-opacity-90' : 'opacity-30 cursor-not-allowed'}`}
        onClick={handlePrev}
        disabled={!canPrev}
        aria-label="Previous"
      >
        <IoIosArrowBack />
      </button>
      <button
        className={`absolute top-1/2 -translate-y-1/2 -right-0 md:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#382716] text-white flex items-center justify-center text-3xl font-bold shadow-md z-10 transition-all ${canNext ? 'opacity-100 hover:bg-opacity-90' : 'opacity-30 cursor-not-allowed'}`}
        onClick={handleNext}
        disabled={!canNext}
        aria-label="Next"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default NewsCarousel; 