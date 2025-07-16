'use client';

import React, { useState, useEffect } from 'react';
import { Info, Plus, Trash2, Save, X } from 'lucide-react';

interface CCADContentFormProps {
  section: string;
  content: any;
  onSave: (section: string, data: any) => void;
  onClose: () => void;
}

const CCADContentForm: React.FC<CCADContentFormProps> = ({ section, content, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: content?.title || '',
    content: content?.content || [],
    impactStats: content?.impactStats || {
      artistsTrained: 1000,
      culturalSites: 50,
      communities: 25,
      yearsOfService: 5,
    },
    recognition: content?.recognition || [],
  });
  const [newItem, setNewItem] = useState('');
  const [newRecognition, setNewRecognition] = useState('');
  const [showTips, setShowTips] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImpactChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      impactStats: {
        ...prev.impactStats,
        [field]: value,
      },
    }));
  };

  const addContentItem = () => {
    if (newItem.trim()) {
      setFormData(prev => ({
        ...prev,
        content: [...prev.content, newItem.trim()],
      }));
      setNewItem('');
    }
  };

  const removeContentItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.filter((_: string, i: number) => i !== index),
    }));
  };

  const addRecognition = () => {
    if (newRecognition.trim()) {
      setFormData(prev => ({
        ...prev,
        recognition: [...prev.recognition, newRecognition.trim()],
      }));
      setNewRecognition('');
    }
  };

  const removeRecognition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      recognition: prev.recognition.filter((_: string, i: number) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(section, formData);
    onClose();
  };

  const getSectionTitle = (section: string) => {
    const titles: { [key: string]: string } = {
      about: 'About CCAD',
      coreValues: 'Core Values',
      keyPrograms: 'Key Programs',
      achievements: 'Achievements',
      impact: 'Impact Statistics',
      recognition: 'Recognition',
    };
    return titles[section] || section;
  };

  const getSectionTips = (section: string) => {
    const tips: { [key: string]: string[] } = {
      about: [
        'Keep the introduction concise but comprehensive',
        'Highlight CCAD\'s role in cultural preservation',
        'Mention key achievements and impact',
        'Use professional, engaging language'
      ],
      coreValues: [
        'List 4-6 core values that guide CCAD\'s work',
        'Each value should be a complete sentence',
        'Focus on cultural preservation and community development',
        'Make values specific to CCAD\'s mission'
      ],
      keyPrograms: [
        'Describe each program with its name and purpose',
        'Include the 7 Forms of Art programs',
        'Mention cultural heritage preservation programs',
        'Highlight community development initiatives'
      ],
      achievements: [
        'List major accomplishments and milestones',
        'Include specific numbers and dates when possible',
        'Focus on cultural preservation achievements',
        'Mention partnerships and recognitions'
      ],
      impact: [
        'Update statistics regularly with current numbers',
        'Use realistic, verifiable numbers',
        'Include both quantitative and qualitative impact',
        'Focus on community and cultural impact'
      ],
      recognition: [
        'List awards and recognitions with years',
        'Include both local and national recognitions',
        'Mention partnerships and collaborations',
        'Keep the list current and relevant'
      ],
    };
    return tips[section] || [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Edit {getSectionTitle(section)}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors text-sm"
              >
                <Info className="w-4 h-4" />
                {showTips ? 'Hide Tips' : 'Show Tips'}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showTips && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Writing Tips for {getSectionTitle(section)}:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {getSectionTips(section).map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Section Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the section title..."
              required
            />
            <p className="text-sm text-gray-500 mt-1">This title will appear as the main heading for this section.</p>
          </div>

          {/* Content Items */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content Items *
            </label>
            <div className="space-y-3 mb-4">
              {formData.content.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newContent = [...formData.content];
                      newContent[index] = e.target.value;
                      setFormData(prev => ({ ...prev, content: newContent }));
                    }}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Content item ${index + 1}...`}
                  />
                  <button
                    type="button"
                    onClick={() => removeContentItem(index)}
                    className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Remove this item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new content item..."
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addContentItem())}
              />
              <button
                type="button"
                onClick={addContentItem}
                className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formData.content.length} item{formData.content.length !== 1 ? 's' : ''} added
            </p>
          </div>

          {/* Impact Statistics */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Impact Statistics
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Artists Trained</label>
                <input
                  type="number"
                  value={formData.impactStats.artistsTrained}
                  onChange={(e) => handleImpactChange('artistsTrained', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Cultural Sites</label>
                <input
                  type="number"
                  value={formData.impactStats.culturalSites}
                  onChange={(e) => handleImpactChange('culturalSites', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Communities</label>
                <input
                  type="number"
                  value={formData.impactStats.communities}
                  onChange={(e) => handleImpactChange('communities', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Years of Service</label>
                <input
                  type="number"
                  value={formData.impactStats.yearsOfService}
                  onChange={(e) => handleImpactChange('yearsOfService', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">These statistics are displayed prominently on the website.</p>
          </div>

          {/* Recognition */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Recognition Items
            </label>
            <div className="space-y-3 mb-4">
              {formData.recognition.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newRecognition = [...formData.recognition];
                      newRecognition[index] = e.target.value;
                      setFormData(prev => ({ ...prev, recognition: newRecognition }));
                    }}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Recognition item ${index + 1}...`}
                  />
                  <button
                    type="button"
                    onClick={() => removeRecognition(index)}
                    className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Remove this item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newRecognition}
                onChange={(e) => setNewRecognition(e.target.value)}
                placeholder="Add new recognition item..."
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecognition())}
              />
              <button
                type="button"
                onClick={addRecognition}
                className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formData.recognition.length} recognition item{formData.recognition.length !== 1 ? 's' : ''} added
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CCADContentForm; 