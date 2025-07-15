import { CldImage } from "next-cloudinary";
import Image from "next/image";
import type { FC } from 'react';
import { CiClock2 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";

interface EventCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
  onClick?: () => void;
}

const EventCard: FC<EventCardProps> = ({ image, title, date, description, onClick }) => {
  // Helper function to check if image is from Cloudinary
  const isCloudinaryImage = (imageUrl: string) => {
    return imageUrl?.includes('cloudinary.com') || imageUrl?.includes('res.cloudinary.com');
  };

  // Helper function to extract public ID from Cloudinary URL
  const getPublicIdFromUrl = (url: string) => {
    if (!isCloudinaryImage(url)) return url;
    
    // Extract public ID from Cloudinary URL
    // Format: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/ccad/filename
    // We want just: ccad/filename
    const regex = /\/image\/upload\/(?:v\d+\/)?(.+)$/;
    const match = url.match(regex);
    if (match) {
      // Remove file extension from the public ID
      return match[1].replace(/\.[^/.]+$/, "");
    }
    return url;
  };

  // Format date for better display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-[#f3e2bb]/30 hover:-translate-y-1 hover:border-[#382716]/20">
        <div className="flex h-[160px]">
          {/* Image Section */}
          <div className="flex-shrink-0 w-[140px] relative overflow-hidden">
            {image ? (
              <div className="relative w-full h-full">
                {isCloudinaryImage(image) ? (
                  <CldImage
                    src={getPublicIdFromUrl(image)}
                    alt={title}
                    fill
                    sizes="140px"
                    crop="fill"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="140px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Event badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-[#f3e2bb]/90 backdrop-blur-sm text-[#382716] px-2 py-1 rounded-full text-xs font-medium">
                    EVENT
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#f3e2bb]/30 to-[#382716]/10 flex items-center justify-center">
                <div className="text-center">
                  <CiCalendar className="text-3xl text-[#382716]/30 mx-auto mb-1" />
                  <span className="text-[#382716]/40 text-xs font-medium">No Image</span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
            <div className="flex-1">
              {/* Title */}
              <h3 className="text-base font-bold text-[#382716] mb-2 leading-tight line-clamp-2 group-hover:text-[#4a2e2a] transition-colors">
                {title}
              </h3>

              {/* Description */}
              <p className="text-[#382716]/70 text-sm leading-relaxed line-clamp-3 mb-3">
                {description}
              </p>
            </div>

            {/* Date and Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#f3e2bb]/50 rounded-full flex items-center justify-center">
                  <CiClock2 className="text-sm text-[#382716]" />
                </div>
                <span className="text-[#382716]/60 text-sm font-medium">
                  {formatDate(date)}
                </span>
              </div>

              {/* Learn More Button */}
              <button 
                className="group/btn inline-flex items-center gap-1 text-[#382716] font-medium text-sm hover:text-[#4a2e2a] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.();
                }}
              >
                <span className="hidden sm:inline">Learn More</span>
                <span className="sm:hidden">More</span>
                <svg 
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 bg-gradient-to-r from-[#382716] via-[#f3e2bb] to-[#382716] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
};

export default EventCard; 