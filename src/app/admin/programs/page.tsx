'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Program } from '@/types';
import ProgramsForm from '@/components/admin/ProgramsForm';
import Image from 'next/image';

const programCategories = [
  'All',
  'Artistic Development Programs - 7 Forms of Art',
  'Culture and Development Programs',
  'Cultural Heritage Programs',
  'Creative Industry',
  'Culture and Governance',
];

const AdminProgramsPage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [selectedYear, setSelectedYear] = useState('All');

  const fetchPrograms = async () => {
    try {
      const res = await fetch('/api/programs');
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleAdd = () => {
    setSelectedProgram(null);
    setIsModalOpen(true);
  };

  const handleEdit = (programItem: Program) => {
    setSelectedProgram(programItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await fetch(`/api/programs?id=${id}`, { method: 'DELETE' });
        fetchPrograms();
      } catch (error) {
        console.error('Failed to delete program:', error);
      }
    }
  };

  const handleFormSave = async (formData: Omit<Program, '_id' | 'image'>, imageFile: File | null) => {
    try {
      let imageUrl = selectedProgram?.image || '';

      if (imageFile) {
        const data = new FormData();
        data.append('file', imageFile);
        const res = await fetch('/api/upload', { method: 'POST', body: data });
        const result = await res.json();
        if (!result.success) throw new Error(result.error || 'Image upload failed');
        imageUrl = result.path;
      }

      const dataToSave = { ...formData, image: imageUrl };

      if (selectedProgram) {
        await fetch('/api/programs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedProgram._id, ...dataToSave }),
        });
      } else {
        await fetch('/api/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave),
        });
      }
      fetchPrograms();
    } catch (error) {
      console.error('Failed to save program:', error);
    }
  };
  
  const years = useMemo(() => {
    const allYears = programs.map(p => new Date(p.dateStart).getFullYear());
    return ['All', ...Array.from(new Set(allYears)).sort((a, b) => b - a)];
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs
      .filter(program => selectedCategory === 'All' || program.category === selectedCategory)
      .filter(program => selectedYear === 'All' || new Date(program.dateStart).getFullYear() === parseInt(selectedYear))
      .filter(program => program.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'date-desc') {
          return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime();
        }
        if (sortOrder === 'date-asc') {
          return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
        }
        if (sortOrder === 'name-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortOrder === 'name-desc') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [programs, selectedCategory, selectedYear, searchTerm, sortOrder]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Programs Management</h1>
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {programCategories.map(category => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-md text-sm ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white'}`}>
              {category}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
              {years.map(year => (
                <button key={year} onClick={() => setSelectedYear(year.toString())} className={`px-3 py-1 rounded-md text-xs ${selectedYear === year.toString() ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  {year}
                </button>
              ))}
          </div>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} className="p-2 border rounded-md">
            <option value="date-desc">Sort by Date (Newest)</option>
            <option value="date-asc">Sort by Date (Oldest)</option>
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
          </select>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded-md" />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap">+ Add Program</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((programItem) => (
          <div key={programItem._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <div className="relative w-full h-48 mb-4">
              <Image src={programItem.image} alt={programItem.title} layout="fill" objectFit="cover" className="rounded-md" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{programItem.title}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(programItem.dateStart).toLocaleDateString()}
                {programItem.dateEnd && ` - ${new Date(programItem.dateEnd).toLocaleDateString()}`}
              </p>
              <p className="mt-2 text-gray-700 break-words flex-grow">
                {programItem.description.length > 100 ? `${programItem.description.substring(0, 100)}...` : programItem.description}
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEdit(programItem)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(programItem._id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProgramsForm
          program={selectedProgram}
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

export default AdminProgramsPage; 