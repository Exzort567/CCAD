'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { News, Event, Program, Banner } from '@/types';

interface DashboardStats {
  totalNews: number;
  totalEvents: number;
  totalPrograms: number;
  totalBanners: number;
}

const AdminDashboard = () => {
  const [recentNews, setRecentNews] = useState<News[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalNews: 0,
    totalEvents: 0,
    totalPrograms: 0,
    totalBanners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes, programsRes, bannersRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/events'),
          fetch('/api/programs'),
          fetch('/api/banners'),
        ]);
        
        const newsData = await newsRes.json();
        const eventsData = await eventsRes.json();
        const programsData = await programsRes.json();
        const bannersData = await bannersRes.json();

        setRecentNews(newsData.slice(0, 3));
        setUpcomingEvents(eventsData.slice(0, 3));
        setStats({
          totalNews: newsData.length,
          totalEvents: eventsData.length,
          totalPrograms: programsData.length,
          totalBanners: bannersData.length,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ icon, title, value, color, href }: {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: string;
    href: string;
  }) => (
    <Link href={href}>
      <div className={`${color} rounded-xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="text-4xl opacity-80">
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );

  const QuickActionCard = ({ icon, title, description, href, color }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    color: string;
  }) => (
    <Link href={href}>
      <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-white text-xl">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with CCAD.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
            </svg>
          }
          title="Total News"
          value={stats.totalNews}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          href="/admin/news"
        />
        <StatCard
          icon={
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          }
          title="Total Events"
          value={stats.totalEvents}
          color="bg-gradient-to-r from-green-500 to-green-600"
          href="/admin/events"
        />
        <StatCard
          icon={
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="Total Programs"
          value={stats.totalPrograms}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          href="/admin/programs"
        />
        <StatCard
          icon={
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          }
          title="Total Banners"
          value={stats.totalBanners}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          href="/admin/banners"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent News</h2>
            <Link href="/admin/news" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentNews.length > 0 ? (
              recentNews.map((news) => (
                <div key={news._id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{news.title}</p>
                    <p className="text-sm text-gray-500">{new Date(news.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent news found</p>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/admin/events" className="text-green-600 hover:text-green-800 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event._id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{event.title}</p>
                    <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming events</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <QuickActionCard
              icon={
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              }
              title="Add News"
              description="Create and publish new articles"
              href="/admin/news#add"
              color="bg-blue-500"
            />
            <QuickActionCard
              icon={
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              }
              title="Add Event"
              description="Schedule new events"
              href="/admin/events#add"
              color="bg-green-500"
            />
            <QuickActionCard
              icon={
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              }
              title="Add Program"
              description="Create new programs"
              href="/admin/programs#add"
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 