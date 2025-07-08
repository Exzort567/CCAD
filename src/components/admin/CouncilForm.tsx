'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CouncilMember {
  _id?: string;
  name: string;
  position: string;
  category: string;
  committee?: string;
  order?: number;
}

interface CouncilFormProps {
  councilMember?: CouncilMember;
  onSuccess: () => void;
  onCancel: () => void;
}

const CouncilForm = ({ councilMember, onSuccess, onCancel }: CouncilFormProps) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [category, setCategory] = useState('Executive Board');
  const [committee, setCommittee] = useState('');
  const [order, setOrder] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (councilMember) {
      setName(councilMember.name);
      setPosition(councilMember.position);
      setCategory(councilMember.category);
      setCommittee(councilMember.committee || '');
      setOrder(councilMember.order || 0);
    } else {
      setName('');
      setPosition('');
      setCategory('Executive Board');
      setCommittee('');
      setOrder(0);
    }
  }, [councilMember]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = councilMember ? 'PUT' : 'POST';
    const url = '/api/council';
    const body = councilMember 
      ? JSON.stringify({ id: councilMember._id, name, position, category, committee, order })
      : JSON.stringify({ name, position, category, committee, order });

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (res.ok) {
      onSuccess();
      router.refresh();
    } else {
      console.error('Failed to save council member');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
        <p className="mt-1 text-xs text-gray-500">The full name of the council member.</p>
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
        <p className="mt-1 text-xs text-gray-500">The member's role. For Section Heads, use format: <code>Section Head (COMMITTEE_NAME)</code>.</p>
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option>Honorary Chairperson</option>
          <option>Executive Board</option>
          <option>Section Head</option>
          <option>Committee Heads & Members</option>
        </select>
        <p className="mt-1 text-xs text-gray-500">Assigns the member to a part of the organizational chart.</p>
      </div>
       {category === 'Committee Heads & Members' && (
        <div>
          <label htmlFor="committee" className="block text-sm font-medium text-gray-700">Committee Identifier</label>
          <input
            type="text"
            id="committee"
            value={committee}
            onChange={(e) => setCommittee(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., ARTS"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Must exactly match the identifier from the corresponding Section Head.</p>
        </div>
      )}
      <div>
        <label htmlFor="order" className="block text-sm font-medium text-gray-700">Order</label>
        <input
          type="number"
          id="order"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">Determines display order within a category (lower numbers appear first).</p>
      </div>
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {councilMember ? 'Update Member' : 'Create Member'}
        </button>
      </div>
    </form>
  );
};

export default CouncilForm; 