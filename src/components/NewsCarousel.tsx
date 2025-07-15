"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { useMediaQuery } from '../hooks/useMediaQuery';
import NewsEventModal from './NewsEventModal';

interface NewsItem {
  _id?: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

interface NewsCarouselProps {
  news?: NewsItem[];
  loading?: boolean;
  error?: string | null;
  selectedNews?: NewsItem | null;
  isModalOpen?: boolean;
  onNewsClick?: (newsItem: NewsItem) => void;
  onCloseModal?: () => void;
}

function NewsCarousel({ 
  news: propNews,
  loading: propLoading,
  error: propError,
  selectedNews: propSelectedNews,
  isModalOpen: propIsModalOpen,
  onNewsClick,
  onCloseModal
}: NewsCarouselProps) {
  const [news, setNews] = useState<NewsItem[]>(propNews || []);
  const [loading, setLoading] = useState(propLoading ?? true);
  const [error, setError] = useState<string | null>(propError ?? null);
  const [index, setIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(propSelectedNews || null);
  const [isModalOpen, setIsModalOpen] = useState(propIsModalOpen ?? false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Update state when props change
  useEffect(() => {
    if (propNews) {
      setNews(propNews);
      setLoading(propLoading ?? false);
      setError(propError ?? null);
    } else {
      // Fetch news only if not provided as props
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
    }
  }, [propNews, propLoading, propError]);

  // Update modal state when props change
  useEffect(() => {
    if (propSelectedNews !== undefined) {
      setSelectedNews(propSelectedNews);
    }
    if (propIsModalOpen !== undefined) {
      setIsModalOpen(propIsModalOpen);
    }
  }, [propSelectedNews, propIsModalOpen]);

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

  const handleNewsClick = (newsItem: NewsItem) => {
    if (onNewsClick) {
      onNewsClick(newsItem);
    } else {
      setSelectedNews(newsItem);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    } else {
      setIsModalOpen(false);
      setSelectedNews(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#382716]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-12 bg-red-50 rounded-xl border border-red-200">
        <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="text-center py-16 text-[#382716]/60">
        <svg className="w-16 h-16 text-[#382716]/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H9m4-4l-4 4 4 4m6-8a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-lg font-medium">No news available at the moment.</p>
        <p className="text-sm mt-2">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${(index * 100) / slides.length}%)`,
            }}
          >
            {slides.map((slideItems, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
                <div className="flex items-stretch justify-center gap-8 px-2">
                  {slideItems.map((item, itemIndex) => (
                    <div key={item._id || itemIndex} className="group flex-1">
                      <div 
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-[580px] overflow-hidden border border-[#f3e2bb]/30 hover:-translate-y-2 group cursor-pointer"
                        onClick={() => handleNewsClick(item)}
                      >
                        {/* Image Section */}
                        <div className="relative h-[280px] overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#382716]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                              NEWS
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-[#382716]/70 text-sm mb-3">
                            <div className="w-8 h-8 bg-[#f3e2bb]/50 rounded-full flex items-center justify-center">
                              <CiClock2 className="text-lg" />
                            </div>
                            <span className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-[#382716] mb-4 leading-tight line-clamp-2 group-hover:text-[#4a2e2a] transition-colors">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[#382716]/80 text-sm leading-relaxed flex-grow line-clamp-4">
                            {item.description}
                          </p>

                          {/* Read More Button */}
                          <div className="mt-6 pt-4 border-t border-[#f3e2bb]/50">
                            <button 
                              className="group/btn inline-flex items-center gap-2 text-[#382716] font-medium text-sm hover:text-[#4a2e2a] transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNewsClick(item);
                              }}
                            >
                              <span>Read More</span>
                              <IoIosArrowForward className="text-base group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <>
            <button
              className={`absolute top-1/2 -translate-y-1/2 -left-4 w-12 h-12 rounded-full bg-white shadow-lg border border-[#f3e2bb]/30 flex items-center justify-center text-2xl font-bold z-10 transition-all duration-300 ${
                canPrev 
                  ? 'text-[#382716] hover:bg-[#382716] hover:text-white hover:shadow-xl hover:scale-110' 
                  : 'text-gray-300 cursor-not-allowed opacity-50'
              }`}
              onClick={handlePrev}
              disabled={!canPrev}
              aria-label="Previous news"
            >
              <IoIosArrowBack />
            </button>
            
            <button
              className={`absolute top-1/2 -translate-y-1/2 -right-4 w-12 h-12 rounded-full bg-white shadow-lg border border-[#f3e2bb]/30 flex items-center justify-center text-2xl font-bold z-10 transition-all duration-300 ${
                canNext 
                  ? 'text-[#382716] hover:bg-[#382716] hover:text-white hover:shadow-xl hover:scale-110' 
                  : 'text-gray-300 cursor-not-allowed opacity-50'
              }`}
              onClick={handleNext}
              disabled={!canNext}
              aria-label="Next news"
            >
              <IoIosArrowForward />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => setIndex(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  slideIndex === index 
                    ? 'bg-[#382716] scale-125' 
                    : 'bg-[#382716]/30 hover:bg-[#382716]/60'
                }`}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* News Modal */}
      <NewsEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedNews}
        type="news"
      />
    </>
  );
}

export default NewsCarousel; 