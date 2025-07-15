"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface URLParameterHandlerProps {
  events: any[];
  news: any[];
  isEventModalOpen: boolean;
  isNewsModalOpen: boolean;
  onEventOpen: (event: any) => void;
  onNewsOpen: (newsItem: any) => void;
}

export default function URLParameterHandler({
  events,
  news,
  isEventModalOpen,
  isNewsModalOpen,
  onEventOpen,
  onNewsOpen
}: URLParameterHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for shared event URL parameter
    const eventId = searchParams.get('event');
    if (eventId && events.length > 0 && !isEventModalOpen) {
      const event = events.find(e => 
        e._id === eventId || 
        encodeURIComponent(e.title.toLowerCase().replace(/\s+/g, '-')) === eventId
      );
      
      if (event) {
        onEventOpen(event);
        // Clean up URL without reloading
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('event');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }

    // Check for shared news URL parameter
    const newsId = searchParams.get('news');
    if (newsId && news.length > 0 && !isNewsModalOpen) {
      const newsItem = news.find(n => 
        n._id === newsId || 
        encodeURIComponent(n.title.toLowerCase().replace(/\s+/g, '-')) === newsId
      );
      
      if (newsItem) {
        onNewsOpen(newsItem);
        // Clean up URL without reloading
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('news');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, [events, news, searchParams, isEventModalOpen, isNewsModalOpen, onEventOpen, onNewsOpen]);

  return null; // This component doesn't render anything
} 