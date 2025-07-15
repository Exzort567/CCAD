'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { X, Calendar, Clock, Share2, Copy, Check } from 'lucide-react';

interface ModalItem {
  _id?: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

interface NewsEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ModalItem | null;
  type: 'news' | 'event';
}

export default function NewsEventModal({ isOpen, onClose, item, type }: NewsEventModalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset share success state after 2 seconds
  useEffect(() => {
    if (shareSuccess) {
      const timeout = setTimeout(() => {
        setShareSuccess(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [shareSuccess]);

  // Helper function to check if image is from Cloudinary
  const isCloudinaryImage = (imageUrl: string) => {
    return imageUrl?.includes('cloudinary.com') || imageUrl?.includes('res.cloudinary.com');
  };

  // Helper function to extract public ID from Cloudinary URL
  const getPublicIdFromUrl = (url: string) => {
    if (!isCloudinaryImage(url)) return url;
    
    const regex = /\/image\/upload\/(?:v\d+\/)?(.+)$/;
    const match = url.match(regex);
    if (match) {
      return match[1].replace(/\.[^/.]+$/, "");
    }
    return url;
  };

  // Format date for better display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Handle sharing functionality
  const handleShare = async () => {
    if (!item) return;
    
    setIsSharing(true);
    setShareSuccess(false);

    // Create a specific URL for this news/event item
    const baseUrl = window.location.origin + window.location.pathname;
    const itemId = item._id || encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'));
    const shareUrl = `${baseUrl}?${type}=${itemId}`;

    const shareData = {
      title: `${type === 'news' ? 'News' : 'Event'}: ${item.title}`,
      text: `${item.title}\n\n${item.description.substring(0, 150)}${item.description.length > 150 ? '...' : ''}`,
      url: shareUrl
    };

    try {
      // Try Web Share API first (mobile and modern browsers)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setShareSuccess(true);
      } else {
        // Fallback to clipboard
        const shareText = `${type === 'news' ? 'News' : 'Event'}: ${item.title}\n\n${item.description}\n\nView more: ${shareUrl}`;
        await navigator.clipboard.writeText(shareText);
        setShareSuccess(true);
      }
    } catch (error) {
      // If all else fails, try a simple clipboard copy of just the URL
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareSuccess(true);
      } catch (clipboardError) {
        console.error('Failed to share:', error);
        // Could add a toast notification here for user feedback
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Container - Centered with proper scrolling */}
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div 
          className={`relative w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl transform transition-all duration-500 ease-out ${
            isOpen 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-8'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#382716] hover:bg-white hover:scale-110 transition-all duration-300 group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Modal Content */}
          <div className="flex flex-col lg:flex-row min-h-0 max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-4rem)]">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative h-48 sm:h-56 md:h-64 lg:h-auto lg:min-h-[400px] xl:min-h-[500px] bg-[#f3e2bb]/10 shrink-0">
            {item.image ? (
              isCloudinaryImage(item.image) ? (
                <CldImage
                  src={getPublicIdFromUrl(item.image)}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#f3e2bb]/30 to-[#382716]/10 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-[#382716]/30 mx-auto mb-4" />
                  <span className="text-[#382716]/40 text-lg">No Image Available</span>
                </div>
              </div>
            )}
            
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6">
                <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg ${
                  type === 'news'
                    ? 'bg-[#382716]/90 text-white'
                    : 'bg-[#f3e2bb]/90 text-[#382716]'
                }`}>
                                    {type === 'news' ? (
                      <>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">NEWS</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">EVENT</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 flex flex-col min-h-0 flex-1">
              {/* Header - Fixed at top */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12 pb-0 shrink-0">
                {/* Date */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f3e2bb]/30 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#382716]" />
                  </div>
                  <div>
                    <p className="text-[#382716]/60 text-xs sm:text-sm font-medium uppercase tracking-wide">
                      {type === 'news' ? 'Published' : 'Scheduled'}
                    </p>
                    <p className="text-[#382716] text-sm sm:text-base lg:text-lg font-semibold">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#382716] leading-tight mb-4 sm:mb-6">
                  {item.title}
                </h2>

                {/* Divider */}
                <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-[#382716] to-[#f3e2bb] rounded-full mb-4 sm:mb-6"></div>
              </div>

              {/* Description - Scrollable */}
              <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-4 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-[#382716]/20 scrollbar-track-transparent">
                <div className="pr-2 sm:pr-4"> {/* Add padding for scrollbar */}
                  <p className="text-[#382716]/80 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-line break-words">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer Actions - Fixed at bottom */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12 pt-3 sm:pt-4 lg:pt-6 shrink-0 border-t border-[#f3e2bb]/30">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-[#382716] text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-[#4a2e2a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleShare}
                    disabled={isSharing}
                    className={`flex-1 border-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 ${
                      shareSuccess 
                        ? 'border-green-500 bg-green-500 text-white' 
                        : 'border-[#382716] text-[#382716] hover:bg-[#382716] hover:text-white'
                    } ${isSharing ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSharing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        Sharing...
                      </>
                    ) : shareSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        Shared!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        Share
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Animation Overlay (for future use) */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm hidden items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#382716]"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 