"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper/types';
import type { Banner } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// Fallback images in case API fails
const fallbackImages = [
    { src: "/images/banner.jpg", alt: "Philippine Independence Day" },
    { src: "/images/banner1.png", alt: "Cultural Programs Banner" },
    { src: "/images/banner4.png", alt: "Arts Development" },
];

export default function Banner() {
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch('/api/banners');
                if (response.ok) {
                    const data = await response.json();
                    setBanners(data);
                } else {
                    console.error('Failed to fetch banners');
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    // Use banners from API if available, otherwise use fallback images
    const carouselImages = banners.length > 0 
        ? banners.map(banner => ({ src: banner.image, alt: banner.alt }))
        : fallbackImages;

    // Show loading state while fetching banners
    if (loading) {
        return (
            <div className="relative w-full bg-gray-800 aspect-[3/1] md:aspect-auto md:h-[550px] flex items-center justify-center">
                <div className="text-white">Loading banners...</div>
            </div>
        );
    }

    // Swiper configuration based on number of slides
    const shouldLoop = carouselImages.length >= 3;
    const swiperEffect = carouselImages.length >= 3 ? "coverflow" : "slide";
    const shouldShowThumbnails = carouselImages.length > 1;

    const prevIndex = (activeIndex - 1 + carouselImages.length) % carouselImages.length;
    const nextIndex = (activeIndex + 1) % carouselImages.length;

    // Create visible thumbnails based on number of images
    let visibleThumbnails = [];
    if (carouselImages.length === 1) {
        visibleThumbnails = [
            { ...carouselImages[0], index: 0 }
        ];
    } else if (carouselImages.length === 2) {
        visibleThumbnails = [
            { ...carouselImages[0], index: 0 },
            { ...carouselImages[1], index: 1 }
        ];
    } else {
        visibleThumbnails = [
            { ...carouselImages[prevIndex], index: prevIndex },
            { ...carouselImages[activeIndex], index: activeIndex },
            { ...carouselImages[nextIndex], index: nextIndex },
        ];
    }

    return (
        <div>
            {/* The Banner Section */}
            <section className="relative w-full bg-gray-800 aspect-[3/1] md:aspect-auto md:h-[550px]">
                <Swiper
                    modules={[Autoplay, Navigation, EffectCoverflow]}
                    effect={swiperEffect as any}
                    coverflowEffect={swiperEffect === "coverflow" ? {
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    } : undefined}
                    grabCursor={carouselImages.length > 1}
                    centeredSlides={swiperEffect === "coverflow"}
                    onSwiper={setMainSwiper}
                    onSlideChange={(swiper) => setActiveIndex(shouldLoop ? swiper.realIndex : swiper.activeIndex)}
                    loop={shouldLoop}
                    autoplay={carouselImages.length > 1 ? { delay: 4000, disableOnInteraction: false } : false}
                    navigation={carouselImages.length > 1}
                    className="h-full w-full"
                    slidesPerView={swiperEffect === "coverflow" ? 'auto' : 1}
                    spaceBetween={swiperEffect === "slide" ? 0 : undefined}
                >
                    {carouselImages.map((image, index) => (
                        <SwiperSlide key={index} style={{ width: '100%', maxWidth: '100vw' }}>
                            <div className="relative h-full w-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="100vw"
                                    style={{ objectFit: 'cover' }}
                                    quality={100}
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                 {/* Custom Styles for Navigation Arrows */}
                <style jsx global>{`
                    .swiper-button-next, .swiper-button-prev {
                        color: rgba(255, 255, 255, 0.7) !important;
                        transition: color 0.2s ease-in-out;
                    }
                    .swiper-button-next:hover, .swiper-button-prev:hover {
                        color: #ffffff !important;
                    }
                `}</style>
            </section>

            {/* The Thumbnail Navigation Section */}
            {shouldShowThumbnails && (
                <section className="bg-white w-full py-4">
                    <div className="flex justify-center items-center gap-3 md:gap-4">
                        {carouselImages.length <= 2 ? (
                            /* Cases for 1 or 2 thumbnails remain the same */
                            carouselImages.map((thumb, index) => (
                                <div
                                    key={index}
                                    onClick={() => mainSwiper?.slideToLoop(index)}
                                    className={`relative cursor-pointer transition-all duration-300 ease-in-out transform ${
                                        carouselImages.length === 1 
                                        ? 'w-32 h-20 md:w-60 md:h-32 scale-100 opacity-100 border-4 border-yellow-500 rounded-lg shadow-lg'
                                        : `w-28 h-16 md:w-52 md:h-28 ${activeIndex === index 
                                            ? 'scale-110 opacity-100 border-4 border-yellow-500 rounded-lg shadow-lg' 
                                            : 'scale-90 opacity-60 hover:opacity-100 hover:scale-95'}`
                                    }`}
                                >
                                    <Image
                                        src={thumb.src}
                                        alt={thumb.alt}
                                        fill
                                        sizes={carouselImages.length === 1 ? "33vw" : "50vw"}
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ))
                        ) : (
                            /* MODIFICATION START: Corrected fog effect for 3+ thumbnails */
                            <>
                                {/* Previous Thumbnail */}
                                <div
                                    onClick={() => mainSwiper?.slidePrev()}
                                    className="group relative w-28 h-16 md:w-52 md:h-28 cursor-pointer transition-all duration-300 ease-in-out transform scale-90 hover:scale-95"
                                >
                                    <Image
                                        src={visibleThumbnails[0].src}
                                        alt={visibleThumbnails[0].alt}
                                        fill
                                        sizes="33vw"
                                        className="object-cover rounded-lg"
                                    />
                                    {/* Corrected Gradient: Fades out by the 70% mark */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent to-[70%] rounded-lg transition-opacity duration-300 group-hover:opacity-0" aria-hidden="true"></div>
                                </div>

                                {/* Active Thumbnail (No Overlay) */}
                                <div className="relative w-32 h-20 md:w-60 md:h-32 transition-all duration-300 ease-in-out transform scale-110 opacity-100 border-4 border-yellow-500 rounded-lg shadow-lg">
                                    <Image
                                        src={visibleThumbnails[1].src}
                                        alt={visibleThumbnails[1].alt}
                                        fill
                                        sizes="33vw"
                                        className="object-cover rounded-lg"
                                    />
                                </div>

                                {/* Next Thumbnail */}
                                <div
                                    onClick={() => mainSwiper?.slideNext()}
                                    className="group relative w-28 h-16 md:w-52 md:h-28 cursor-pointer transition-all duration-300 ease-in-out transform scale-90 hover:scale-95"
                                >
                                    <Image
                                        src={visibleThumbnails[2].src}
                                        alt={visibleThumbnails[2].alt}
                                        fill
                                        sizes="33vw"
                                        className="object-cover rounded-lg"
                                    />
                                    {/* Corrected Gradient: Fades out by the 70% mark */}
                                    <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent to-[70%] rounded-lg transition-opacity duration-300 group-hover:opacity-0" aria-hidden="true"></div>
                                </div>
                            </>
                            /* MODIFICATION END */
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}