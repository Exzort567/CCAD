'use client';

import React, { useState, useEffect } from 'react';
import { Program } from '@/types';

interface ProgramsFormProps {
  program: Program | null;
  onSave: (data: Omit<Program, '_id' | 'image'>, imageFile: File | null) => void;
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
  const [imageFile, setImageFile] = useState<File | null>(null);
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
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.length > 255) {
      return;
    }
    onSave(formData, imageFile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">{program ? 'Edit Program' : 'Add Program'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required>
              {programCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
            <div className="flex items-center space-x-2">
              <input type="date" id="dateStart" name="dateStart" value={formData.dateStart} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
              <span>-</span>
              <input type="date" id="dateEnd" name="dateEnd" value={formData.dateEnd} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className={`w-full p-2 border ${descriptionError ? 'border-red-500' : 'border-gray-300'} rounded-md`} required />
            {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Upload Image</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300" disabled={!!descriptionError}>{program ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramsForm; 