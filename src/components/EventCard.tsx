import Image from "next/image";
import type { FC } from 'react';
import { CiClock2 } from "react-icons/ci";


interface EventCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
}

const EventCard: FC<EventCardProps> = ({ image, title, date, description }) => {
  return (
    <div className="flex bg-[#fcfaf5] min-h-[140px] max-h-[140px] shadow-md overflow-hidden w-full rounded-lg">
      <div className="flex-shrink-0 flex items-center justify-center w-[160px] p-3">
        <div className="relative w-full h-full">
          <Image src={image} alt={title} layout="fill" className="object-cover rounded-md" />
        </div>
      </div>
      <div className="flex justify-between p-3 flex-1 overflow-hidden">
        <div className="flex flex-col pr-2 overflow-hidden">
          <h3 className="text-base font-bold text-[#382716] mb-1 leading-tight truncate">{title}</h3>
          <p className="text-[#382716] text-sm leading-snug opacity-80 text-ellipsis line-clamp-3">{description}</p>
        </div>
        <div className="flex flex-col justify-end items-end flex-shrink-0">
          <div className="flex items-center gap-1 text-[#382716] text-xs whitespace-nowrap">
            <CiClock2 className="text-base opacity-70" />
            <span className="opacity-80">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 