'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { News, Event } from '@/types';

const AdminDashboard = () => {
  const [recentNews, setRecentNews] = useState<News[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/events'),
        ]);
        const newsData = await newsRes.json();
        const eventsData = await eventsRes.json();

        setRecentNews(newsData.slice(0, 3));
        setUpcomingEvents(eventsData.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Recent News */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent News</h2>
          <ul>
            {recentNews.map((news) => (
              <li key={news._id} className="border-b last:border-b-0 py-2">
                <p className="font-semibold">{news.title}</p>
                <p className="text-sm text-gray-500">{new Date(news.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event._id} className="border-b last:border-b-0 py-2">
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-col space-y-4">
            <Link href="/admin/news#add">
              <span className="block w-full text-center bg-gray-200 hover:bg-gray-300 p-3 rounded-md cursor-pointer">
                + Add News
              </span>
            </Link>
            <Link href="/admin/events#add">
              <span className="block w-full text-center bg-gray-200 hover:bg-gray-300 p-3 rounded-md cursor-pointer">
                + Add Events
              </span>
            </Link>
            <Link href="/admin/programs#add">
              <span className="block w-full text-center bg-gray-200 hover:bg-gray-300 p-3 rounded-md cursor-pointer">
                + Add Programs
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 