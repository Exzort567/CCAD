'use client';

import React, { useState, useEffect } from 'react';
import { Program } from '@/types';

interface ProgramsFormProps {
  program: Program | null;
  onSave: (data: Omit<Program, '_id' | 'image'>, imageFiles: File[]) => void;
  onClose: () => void;
}

const programCategories = [
  'Artistic Development Programs - 7 Forms of Art',
  'Culture and Development Programs',
  'Cultural Heritage Programs',
  'Creative Industry',
  'Culture and Governance',
];

const ProgramsForm: React.FC<ProgramsFormProps> = ({ program, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Program, '_id' | 'image'>>({
    title: '',
    category: programCategories[0],
    dateStart: '',
    dateEnd: '',
    description: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (program) {
      setFormData({
        title: program.title,
        category: program.category,
        dateStart: new Date(program.dateStart).toISOString().split('T')[0],
        dateEnd: program.dateEnd ? new Date(program.dateEnd).toISOString().split('T')[0] : '',
        description: program.description,
      });
    }
  }, [program]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > 255) {
      setDescriptionError('Description cannot exceed 255 characters.');
    } else {
      setDescriptionError('');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 4) {
        alert('You can only upload a maximum of 4 images.');
        return;
      }
      setImageFiles(files);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.length > 255) {
      return;
    }
    onSave(formData, imageFiles);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{program ? 'Edit Program' : 'Add Program'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
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
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {programCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <div className="flex space-x-2">
              <input
                type="date"
                name="dateStart"
                value={formData.dateStart}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                required
              />
              <span className="flex items-center text-gray-500">-</span>
              <input
                type="date"
                name="dateEnd"
                value={formData.dateEnd}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full p-2 border ${descriptionError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              required
            />
            {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="images" className="block text-gray-700 font-medium mb-2">
              Upload Images (Max 4)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">
              {imageFiles.length}/4 images selected
            </p>
            
            {/* Preview selected images */}
            {imageFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Images:</p>
                <div className="space-y-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              {program ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramsForm; 