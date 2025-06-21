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
    <div className="flex bg-[#fcfaf5] min-h-[160px] shadow-md overflow-hidden w-full">
      <div className="flex-shrink-0 flex items-center justify-center w-[140px] p-2">
        <div className="relative w-full h-[120px]">
          <Image src={image} alt={title} layout="fill" className="object-cover rounded-md" />
        </div>
      </div>
      <div className="flex flex-col justify-center p-4 flex-1">
        <div>
          <h3 className="text-base font-semibold text-[#382716] mb-1 leading-tight">{title}</h3>
          <p className="text-[#382716] text-xs leading-snug opacity-80">{description}</p>
        </div>
        <div className="flex items-center gap-2 text-[#382716] text-xs justify-end mt-4">
          <CiClock2 className="text-lg opacity-70" />
          <span className="opacity-80">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 