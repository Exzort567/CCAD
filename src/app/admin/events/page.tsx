'use client';

import React, { useState, useEffect } from 'react';
import { Event } from '@/types';
import EventsForm from '@/components/admin/EventsForm';
import Image from 'next/image';

const AdminEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAdd = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (eventItem: Event) => {
    setSelectedEvent(eventItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
        fetchEvents(); // Refresh list
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleFormSave = async (formData: Omit<Event, '_id' | 'image'>, imageFile: File | null) => {
    try {
      let imageUrl = selectedEvent?.image || '';

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

      if (selectedEvent) {
        // Update
        await fetch('/api/events', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id: selectedEvent._id, ...dataToSave}),
        });
      } else {
        // Add
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave),
        });
      }
      fetchEvents(); // Refresh list
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Events Management</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-8 hover:bg-blue-600"
      >
        + Add Event
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((eventItem) => (
          <div key={eventItem._id} className="bg-white p-4 rounded-lg shadow-md flex">
            <div className="relative w-32 h-32 mr-4">
                <Image
                    src={eventItem.image}
                    alt={eventItem.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{eventItem.title}</h2>
              <p className="text-gray-500">{new Date(eventItem.date).toLocaleDateString()}</p>
              <p className="mt-2 text-gray-700 break-words">
                {eventItem.description.length > 125
                  ? `${eventItem.description.substring(0, 125)}...`
                  : eventItem.description}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(eventItem)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(eventItem._id)}
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
        <EventsForm
          event={selectedEvent}
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

export default AdminEventsPage; 