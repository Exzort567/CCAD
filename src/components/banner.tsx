"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const carouselImages = [
    { src: "/images/banner.jpg", alt: "Philippine Independence Day" },
    { src: "/images/banner1.png", alt: "Cultural Programs Banner" },
    { src: "/images/banner4.png", alt: "Arts Development" },
    { src: "/images/banner.jpg", alt: "A demonstration image" },
    { src: "/images/banner1.png", alt: "Another demonstration image" },
];

export default function Banner() {
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const prevIndex = (activeIndex - 1 + carouselImages.length) % carouselImages.length;
    const nextIndex = (activeIndex + 1) % carouselImages.length;

    const visibleThumbnails = [
        { ...carouselImages[prevIndex], index: prevIndex },
        { ...carouselImages[activeIndex], index: activeIndex },
        { ...carouselImages[nextIndex], index: nextIndex },
    ];

    return (
        <div>
            {/* The Banner Section */}
            {/* THIS IS THE LINE TO CHANGE: Updated to a 3:1 aspect ratio */}
            <section className="relative w-full bg-gray-800 aspect-[3/1] md:aspect-auto md:h-[550px]">
                <Swiper
                    modules={[Autoplay, Navigation, EffectCoverflow]}
                    effect="coverflow"
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    grabCursor={true}
                    centeredSlides={true}
                    onSwiper={setMainSwiper}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    navigation={true}
                    className="h-full w-full"
                    slidesPerView={'auto'}
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
            <section className="bg-white w-full py-4">
                <div className="flex justify-center items-center gap-3 md:gap-4">
                    {/* Previous Thumbnail */}
                    <div
                        onClick={() => mainSwiper?.slidePrev()}
                        className="relative w-28 h-16 md:w-52 md:h-28 cursor-pointer transition-all duration-300 ease-in-out transform scale-90 opacity-60 hover:opacity-100 hover:scale-95"
                    >
                        <Image
                            src={visibleThumbnails[0].src}
                            alt={visibleThumbnails[0].alt}
                            fill
                            sizes="33vw"
                            className="object-cover rounded-lg"
                        />
                    </div>

                    {/* Active Thumbnail */}
                    <div
                        className="relative w-32 h-20 md:w-60 md:h-32 transition-all duration-300 ease-in-out transform scale-100 opacity-100 border-4 border-yellow-500 rounded-lg shadow-lg"
                    >
                        <Image
                            src={visibleThumbnails[1].src}
                            alt={visibleThumbnails[1].alt}
                            fill
                            sizes="33vw"
                            className="object-cover rounded-md"
                        />
                    </div>

                    {/* Next Thumbnail */}
                    <div
                        onClick={() => mainSwiper?.slideNext()}
                        className="relative w-28 h-16 md:w-52 md:h-28 cursor-pointer transition-all duration-300 ease-in-out transform scale-90 opacity-60 hover:opacity-100 hover:scale-95"
                    >
                         <Image
                            src={visibleThumbnails[2].src}
                            alt={visibleThumbnails[2].alt}
                            fill
                            sizes="33vw"
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}