"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { useMediaQuery } from '../hooks/useMediaQuery';

interface NewsItem {
  _id?: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

function NewsCarousel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setLoading(true);
    fetch('/api/news')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch news');
        return res.json();
      })
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const itemsPerSlide = isDesktop ? 2 : 1;

  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < news.length; i += itemsPerSlide) {
      result.push(news.slice(i, i + itemsPerSlide));
    }
    return result;
  }, [itemsPerSlide, news]);

  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  const handlePrev = () => {
    if (canPrev) setIndex(index - 1);
  };

  const handleNext = () => {
    if (canNext) setIndex(index + 1);
  };

  if (loading) return <div className="text-center py-8">Loading news...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!news.length) return <div className="text-center py-8">No news available.</div>;

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
                  <div key={item._id || itemIndex} className="bg-[#fcfaf5] h-[500px] shadow-md flex-1 flex flex-col overflow-hidden rounded-lg">
                    <div className="relative w-full h-[250px]">
                      <Image src={item.image} alt={item.title} layout="fill" className="object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-[#382716] mb-2 leading-tight">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[#382716] text-sm mb-3">
                        <CiClock2 className="text-lg opacity-70" />
                        <span className="opacity-80">{item.date}</span>
                      </div>
                      <p className="text-[#382716] text-sm text-left leading-relaxed opacity-80 flex-grow">{item.description}</p>
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