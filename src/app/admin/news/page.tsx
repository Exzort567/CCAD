'use client';

import React, { useState, useEffect } from 'react';
import { News } from '@/types';
import NewsForm from '@/components/admin/NewsForm';
import Image from 'next/image';

const AdminNewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAdd = () => {
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleEdit = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
        try {
            await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
            fetchNews(); // Refresh list
        } catch (error) {
            console.error('Failed to delete news:', error);
        }
    }
  };

  const handleFormSave = async (formData: Omit<News, '_id' | 'image'>, imageFile: File | null) => {
    try {
      let imageUrl = selectedNews?.image || '';

      if (imageFile) {
        const data = new FormData();
        data.append('file', imageFile);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        const result = await res.json();
        if (!result.success) {
          throw new Error(result.error || 'Image upload failed');
        }
        imageUrl = result.path;
      }

      const dataToSave = { ...formData, image: imageUrl };

      if (selectedNews) {
        // Update
        await fetch('/api/news', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id: selectedNews._id, ...dataToSave}),
        });
      } else {
        // Add
        await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave),
        });
      }
      fetchNews(); // Refresh list
    } catch (error) {
      console.error('Failed to save news:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">News Management</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-8 hover:bg-blue-600"
      >
        + Add News
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.map((newsItem) => (
          <div key={newsItem._id} className="bg-white p-4 rounded-lg shadow-md flex">
            <div className="relative w-32 h-32 mr-4">
                <Image
                    src={newsItem.image}
                    alt={newsItem.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{newsItem.title}</h2>
              <p className="text-gray-500">{new Date(newsItem.date).toLocaleDateString()}</p>
              <p className="mt-2 text-gray-700 break-words">
                {newsItem.description.length > 125
                  ? `${newsItem.description.substring(0, 125)}...`
                  : newsItem.description}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(newsItem)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(newsItem._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <NewsForm
          news={selectedNews}
          onSave={(formData, imageFile) => {
            handleFormSave(formData, imageFile);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminNewsPage; 