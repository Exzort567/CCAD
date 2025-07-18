'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

const AdminCCADContentPage = () => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{ [key: string]: 'success' | 'error' | null }>({});

  // Form 1: About CCAD
  const [aboutContent, setAboutContent] = useState('');

  // Form 2: Programs (Impact & Recognition)
  const [impactItems, setImpactItems] = useState([
    { title: 'Artists Trained', value: '1000' },
    { title: 'Cultural Sites', value: '50' },
    { title: 'Communities', value: '25' },
    { title: 'Years of Service', value: '5' },
    { title: 'Strategic Plan', value: '2025' },
    { title: 'Global Network', value: 'Global' },
  ]);
  const [recognition, setRecognition] = useState<string[]>([]);
  const [newRecognition, setNewRecognition] = useState('');

  // Form 3: Achievements
  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState('');
  const [lookingForward, setLookingForward] = useState('');
  // Remove these from achievements, now in impact

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/ccad-content');
      const data = await res.json();
      setContent(data);
      
      // Populate form data
      setAboutContent(data.about?.content || '');
      setImpactItems(
        Array.isArray(data.impact?.impactStats)
          ? data.impact.impactStats.map((item: any, idx: number) => ({
              title: item.title || `Item ${idx + 1}`,
              value: item.value || '',
            }))
          : [
              { title: 'Artists Trained', value: '1000' },
              { title: 'Cultural Sites', value: '50' },
              { title: 'Communities', value: '25' },
              { title: 'Years of Service', value: '5' },
              { title: 'Strategic Plan', value: '2025' },
              { title: 'Global Network', value: 'Global' },
            ]
      );
      setRecognition(data.impact?.recognition || []);
      setAchievements(data.achievements?.content || []);
      setLookingForward(data.achievements?.lookingForward || '');
      // Remove these from achievements, now in impact
    } catch (error) {
      console.error('Failed to fetch CCAD content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (section: string, data: any) => {
    setSaving(section);
    setSaveStatus({ ...saveStatus, [section]: null });
    
    try {
      const res = await fetch('/api/ccad-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, ...data }),
      });

      if (res.ok) {
        setSaveStatus({ ...saveStatus, [section]: 'success' });
        setTimeout(() => {
          setSaveStatus((prev) => ({ ...prev, [section]: null }));
        }, 3000);
      } else {
        setSaveStatus({ ...saveStatus, [section]: 'error' });
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus({ ...saveStatus, [section]: 'error' });
    } finally {
      setSaving(null);
    }
  };

  const addRecognition = () => {
    if (newRecognition.trim()) {
      setRecognition([...recognition, newRecognition.trim()]);
      setNewRecognition('');
    }
  };

  const removeRecognition = (index: number) => {
    setRecognition(recognition.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()]);
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CCAD Content Management</h1>
        <p className="text-gray-600 mt-2">
          Edit the content for the "What is CCAD" page. Each form can be saved independently.
        </p>
      </div>

      {/* Form 1: About CCAD */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Form 1: Edit About CCAD</h2>
          {saveStatus.about === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Saved successfully!
            </div>
          )}
          {saveStatus.about === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              Error saving
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              About CCAD Description
            </label>
            <textarea
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={8}
              placeholder="Enter the main description for the About CCAD section..."
            />
          </div>
          
          <button
            onClick={() => handleSave('about', { content: aboutContent })}
            disabled={saving === 'about'}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving === 'about' ? 'Saving...' : 'Save About Section'}
          </button>
        </div>
      </div>

      {/* Form 2: Programs (Impact & Recognition) */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Form 2: Edit Programs Section</h2>
          {saveStatus.programs === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Saved successfully!
            </div>
          )}
          {saveStatus.programs === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              Error saving
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Program Impact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Impact & Featured Items</h3>
            <div className="space-y-4">
              {impactItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => {
                        const newItems = [...impactItems];
                        newItems[idx].title = e.target.value;
                        setImpactItems(newItems);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Item ${idx + 1} Title`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Value</label>
                    <input
                      type="text"
                      value={item.value}
                      onChange={e => {
                        const newItems = [...impactItems];
                        newItems[idx].value = e.target.value;
                        setImpactItems(newItems);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Item ${idx + 1} Value`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recognition */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recognition Awards</h3>
            <div className="space-y-3 mb-4">
              {recognition.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newRecognition = [...recognition];
                      newRecognition[index] = e.target.value;
                      setRecognition(newRecognition);
                    }}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Award ${index + 1}...`}
                  />
                  <button
                    onClick={() => removeRecognition(index)}
                    className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Remove this award"
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
                placeholder="Add new award..."
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecognition())}
              />
              <button
                onClick={addRecognition}
                className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Award
              </button>
            </div>
          </div>

          <button
            onClick={() => handleSave('impact', { impactStats: impactItems, recognition })}
            disabled={saving === 'impact'}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving === 'impact' ? 'Saving...' : 'Save Program Section'}
          </button>
        </div>
      </div>

      {/* Form 3: Achievements */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Form 3: Edit Achievements Section</h2>
          {saveStatus.achievements === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Saved successfully!
            </div>
          )}
          {saveStatus.achievements === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              Error saving
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Key Achievements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
            <div className="space-y-3 mb-4">
              {achievements.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newAchievements = [...achievements];
                      newAchievements[index] = e.target.value;
                      setAchievements(newAchievements);
                    }}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Achievement ${index + 1}...`}
                  />
                  <button
                    onClick={() => removeAchievement(index)}
                    className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Remove this achievement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Add new achievement..."
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
              />
              <button
                onClick={addAchievement}
                className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>
          </div>

          {/* Looking Forward */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Looking Forward Text</h3>
            <textarea
              value={lookingForward}
              onChange={(e) => setLookingForward(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter the 'Looking Forward' text..."
            />
          </div>

          <button
            onClick={() => handleSave('achievements', { 
              content: achievements, 
              lookingForward
            })}
            disabled={saving === 'achievements'}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving === 'achievements' ? 'Saving...' : 'Save Achievements Section'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCCADContentPage; 