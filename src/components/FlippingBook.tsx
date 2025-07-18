'use client';

import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';

const PageCover = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        {props.children}
      </div>
    </div>
  );
});
PageCover.displayName = 'PageCover';

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode, number: number }>((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        {/* The div below is set to take the full width and height of its container */}
        <div className="w-full h-full">
          {props.children}
        </div>
      </div>
    </div>
  );
});
Page.displayName = 'Page';

const FlippingBook: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile view - simple image carousel
  if (isMobile) {
    return (
      <div className="flex flex-col justify-center items-center py-8 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
          THE BOHOL ARTS AND <br /> CULTURAL HERITAGE CODE
        </h1>
        <div className="w-full max-w-sm mx-auto">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <Image 
              src="/images/coverPage.jpg" 
              alt="Book Cover" 
              width={300} 
              height={400} 
              className="w-full h-auto rounded shadow-lg mb-4"
            />
            <p className="text-sm text-gray-600 mb-4">
              The Bohol Arts and Cultural Heritage Code is available in full desktop view.
            </p>
            <a 
              href="/images/coverPage.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#382716] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              View PDF Version
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - full flipping book
  return (
    <div className="flex flex-col justify-center items-center py-8 md:py-12">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 md:mb-8">
          THE BOHOL ARTS AND <br /> CULTURAL HERITAGE CODE
        </h1>
        <div className="overflow-x-auto w-full flex justify-center">
          <HTMLFlipBook 
            width={550} 
            height={733} 
            showCover={true}
            className=""
            style={{}}
            startPage={0}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={1}
            mobileScrollSupport={false}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            renderOnlyPageLengthChange={false}
            onFlip={() => {}}
            onChangeOrientation={() => {}}
            onChangeState={() => {}}
            onInit={() => {}}
            onUpdate={() => {}}
          >
            <PageCover>
              <div className="flex items-center justify-center h-full bg-gray-900">
                  <div className="w-full h-full relative">
                      <Image src="/images/coverPage.jpg" alt="Book Cover" layout="fill" objectFit="cover" />
                  </div>
              </div>
            </PageCover>
            <Page number={0}>
                <Image src="/images/book1.jpg" alt="Page 1" layout="fill" objectFit="cover" />
            </Page>
            <Page number={1}> 
                {/* This is an empty page, you might want to add content or an image */}
                <div className="w-full h-full bg-white"></div>
            </Page>
            <Page number={2}>
                <Image src="/images/bookcode.png" alt="Page 2" layout="fill" objectFit="cover" />
            </Page>
            <Page number={3}>
                <Image src="/images/book3.jpg" alt="Page 3" layout="fill" objectFit="cover" />
            </Page>
            <Page number={4}>
                 {/* This page has text, it will now appear on a blank background */}
                <div className="p-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
                </div>
            </Page>
            <Page number={5}>
                {/* This page has both text and an image. You might need to adjust the layout for this kind of content. */}
                <div className="relative w-full h-full">
                    <Image src="/images/a1.jpg" alt="Page 4" layout="fill" objectFit="cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white p-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
                    </div>
                </div>
            </Page>
            <PageCover>
                <div className="flex items-center justify-center h-full bg-white">
                    <h2 className="text-xl font-bold">THE END</h2>
                </div>
            </PageCover>
          </HTMLFlipBook>
        </div>
    </div>
  );
};

export default FlippingBook;