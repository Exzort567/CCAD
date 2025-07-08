'use client';

import { useState, useEffect } from 'react';
import CouncilForm from '@/components/admin/CouncilForm';

interface CouncilMember {
  _id: string;
  name: string;
  position: string;
  category: string;
  committee?: string;
  order?: number;
}

const CouncilAdminPage = () => {
  const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CouncilMember | undefined>(undefined);

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Council Management</h1>
        <button onClick={() => openModal()} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Member
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 mb-6" role="alert">
        <h3 className="font-bold text-lg mb-2">How to Manage Committees</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>To create a new section/committee:</strong>
            <ul className="list-disc list-inside pl-5 mt-1">
              <li>First, create a <strong>Section Head</strong>. Their position must include the committee name in parentheses, e.g., <code>Section Head (ARTS)</code>. The name inside the parentheses is the unique identifier for the committee (e.g., <code>ARTS</code>).</li>
            </ul>
          </li>
          <li>
            <strong>To add members to a committee:</strong>
            <ul className="list-disc list-inside pl-5 mt-1">
              <li>Create a new member with the category <strong>Committee Heads & Members</strong>.</li>
              <li>A 'Committee' field will appear. Enter the exact committee identifier you defined for the Section Head (e.g., <code>ARTS</code>). This links the member to that section.</li>
            </ul>
          </li>
        </ol>
        <p className="mt-4">
          <strong>Note:</strong> The text in the Section Head's position parentheses and the text in the Committee Member's 'Committee' field must match exactly for the structure to display correctly.
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
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
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Committee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {councilMembers.map((member) => (
              <tr key={member._id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.committee || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openModal(member)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(member._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouncilAdminPage; 