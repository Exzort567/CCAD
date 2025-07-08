'use client';

import { useState, useEffect, useMemo } from 'react';
import CouncilForm from '@/components/admin/CouncilForm';

interface CouncilMember {
  _id: string;
  name: string;
  position: string;
  category: string;
  committee?: string;
  order?: number;
}

type SortField = 'name' | 'position' | null;
type SortDirection = 'asc' | 'desc';

const CouncilAdminPage = () => {
  const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CouncilMember | undefined>(undefined);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Position hierarchy (highest to lowest)
  const positionHierarchy: { [key: string]: number } = {
    'Honorary Chairperson': 1,
    'Chairperson': 2,
    'Co-Chairperson': 3,
    'Secretary': 4,
    'Treasurer': 5,
    'Auditor': 6,
    'Executive Director': 7,
    'Section Head': 8,
  };

  const getPositionRank = (position: string): number => {
    // Check for exact matches first
    if (positionHierarchy[position]) {
      return positionHierarchy[position];
    }
    
    // Check for partial matches (e.g., "Section Head (ARTS)")
    for (const [key, rank] of Object.entries(positionHierarchy)) {
      if (position.includes(key)) {
        return rank;
      }
    }
    
    // Default rank for unknown positions
    return 999;
  };

  const sortedMembers = useMemo(() => {
    if (!sortField) return councilMembers;

    return [...councilMembers].sort((a, b) => {
      let comparison = 0;

      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'position') {
        const rankA = getPositionRank(a.position);
        const rankB = getPositionRank(b.position);
        comparison = rankA - rankB;
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [councilMembers, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg className="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortDirection === 'asc' ? (
      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const fetchCouncilMembers = async () => {
    const res = await fetch('/api/council');
    if (res.ok) {
      const data = await res.json();
      setCouncilMembers(data);
    }
  };

  useEffect(() => {
    fetchCouncilMembers();
  }, []);

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchCouncilMembers();
  };

  const openModal = (member?: CouncilMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      const res = await fetch(`/api/council?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchCouncilMembers();
      } else {
        console.error('Failed to delete council member');
      }
    }
  };

  return (
    <div className="p-4 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Council Management</h1>
        <button onClick={() => openModal()} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap">
          Add Member
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 mb-6" role="alert">
        <h3 className="font-bold text-lg mb-2">How to Manage Committees</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>
            <strong>To create a new section/committee:</strong>
            <ul className="list-disc list-inside pl-5 mt-1">
              <li>First, create a <strong>Section Head</strong>. Their position must include the committee name in parentheses, e.g., <code className="bg-blue-100 px-1 rounded">Section Head (ARTS)</code>. The name inside the parentheses is the unique identifier for the committee (e.g., <code className="bg-blue-100 px-1 rounded">ARTS</code>).</li>
            </ul>
          </li>
          <li>
            <strong>To add members to a committee:</strong>
            <ul className="list-disc list-inside pl-5 mt-1">
              <li>Create a new member with the category <strong>Committee Heads & Members</strong>.</li>
              <li>A 'Committee' field will appear. Enter the exact committee identifier you defined for the Section Head (e.g., <code className="bg-blue-100 px-1 rounded">ARTS</code>). This links the member to that section.</li>
            </ul>
          </li>
        </ol>
        <p className="mt-4 text-sm">
          <strong>Note:</strong> The text in the Section Head's position parentheses and the text in the Committee Member's 'Committee' field must match exactly for the structure to display correctly.
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedMember ? 'Edit Member' : 'Add New Member'}</h2>
            <CouncilForm
              councilMember={selectedMember}
              onSuccess={handleSuccess}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th 
                  className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none"
                  onClick={() => handleSort('position')}
                >
                  <div className="flex items-center">
                    Position
                    {getSortIcon('position')}
                  </div>
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Committee</th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedMembers.map((member) => (
                <tr key={member._id}>
                  <td className="px-3 sm:px-4 py-3 text-sm font-medium text-gray-900 min-w-[120px]">
                    <div className="break-words">{member.name}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm text-gray-700 min-w-[140px]">
                    <div className="break-words">{member.position}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm text-gray-700 min-w-[120px]">
                    <div className="break-words">{member.category}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm text-gray-700 min-w-[100px]">
                    <div className="break-words">{member.committee || 'N/A'}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm text-gray-700 text-center w-16">{member.order}</td>
                  <td className="px-3 sm:px-4 py-3 text-right text-sm font-medium min-w-[120px]">
                    <div className="flex flex-col sm:flex-row justify-end gap-1 sm:gap-2">
                      <button onClick={() => openModal(member)} className="text-indigo-600 hover:text-indigo-900 text-xs sm:text-sm">Edit</button>
                      <button onClick={() => handleDelete(member._id)} className="text-red-600 hover:text-red-900 text-xs sm:text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouncilAdminPage; 