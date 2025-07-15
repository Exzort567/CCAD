'use client';

import React, { useState, useEffect } from 'react';
import { Event } from '@/types';
import { FileUpload } from '../ui/file-upload';

interface EventsFormProps {
  event: Event | null;
  onSave: (data: Omit<Event, '_id' | 'image'>, imageFile: File | null) => void;
  onClose: () => void;
}

const EventsForm: React.FC<EventsFormProps> = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Event, '_id' | 'image'>>({
    title: '',
    date: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        date: new Date(event.date).toISOString().split('T')[0], // Format for date input
        description: event.description,
      });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > 5000) {
      setDescriptionError('Description cannot exceed 5000 characters.');
    } else {
      setDescriptionError('');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: File[]) => {
    if (files && files[0]) {
      setImageFile(files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.length > 5000) {
      return; // Prevent submission if description is too long
    }
    onSave(formData, imageFile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">{event ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
              className={`w-full p-2 border ${descriptionError ? 'border-red-500' : 'border-gray-300'} rounded-md resize-vertical`}
              required
              placeholder="Enter a detailed description..."
            />
            {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <FileUpload onChange={handleFileChange} maxFiles={1} />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={!!descriptionError}
            >
              {event ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventsForm; 