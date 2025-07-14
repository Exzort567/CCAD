'use client';

import React, { useState, useEffect } from 'react';
import { Banner } from '@/types';
import BannerForm from '@/components/admin/BannerForm';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const BannersPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners');
      if (response.ok) {
        const data = await response.json();
        setBanners(data.sort((a: Banner, b: Banner) => a.order - b.order));
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBanner = () => {
    setSelectedBanner(null);
    setShowForm(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setSelectedBanner(banner);
    setShowForm(true);
  };

  const handleSaveBanner = async (
    data: { alt: string; order: number },
    imageFile: File | null
  ) => {
    try {
      // Validate data before sending
      if (!data.alt || data.alt.trim() === '') {
        alert('Alt text is required');
        return;
      }
      
      if (!imageFile) {
        alert('Please select an image file');
        return;
      }

      // Check file size (Cloudinary free plan limit is 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (imageFile.size > maxSize) {
        const fileSizeMB = (imageFile.size / (1024 * 1024)).toFixed(2);
        alert(`File size too large (${fileSizeMB}MB). Cloudinary free plan limit is 10MB. Please compress your image or select a smaller file.`);
        return;
      }

      // Check file type
      if (!imageFile.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const formData = new FormData();
      formData.append('alt', data.alt.trim());
      formData.append('order', data.order.toString());
      formData.append('file', imageFile);

      console.log('Sending banner data:', {
        alt: data.alt,
        order: data.order,
        hasFile: !!imageFile,
        fileName: imageFile?.name,
        fileSize: imageFile?.size
      });

      const response = await fetch('/api/banners', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status, response.statusText);

      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        setShowForm(false);
        fetchBanners();
        alert('Banner saved successfully!');
      } else {
        console.log('Response not ok, status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        let error;
        try {
          error = JSON.parse(responseText);
        } catch (e) {
          error = { error: 'Invalid response format', details: responseText };
        }
        
        console.error('Banner save error:', error);
        alert(`Error: ${error.error || 'Unknown error'}${error.details ? '\nDetails: ' + error.details : ''}`);
      }
    } catch (error) {
      console.error('Failed to save banner:', error);
      alert('Failed to save banner. Please try again.');
    } finally {
      // Reset form state regardless of success or failure
      setShowForm(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) {
      return;
    }

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBanners();
        alert('Banner deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to delete banner:', error);
      alert('Failed to delete banner. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading banners...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
      </div>

      {/* Add Image Button */}
      <div className="mb-8">
        <button
          onClick={handleAddBanner}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
        >
          Add Image
        </button>
      </div>

      {/* Banners Grid */}
      {banners.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No banners available.</p>
          <p className="text-gray-400 text-sm mt-2">Click "Add Image" to create your first banner.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Banner Image */}
              <div className="relative w-full h-48">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Delete Button - Shows on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteBanner(banner._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
                    title="Delete banner"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {/* Banner Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{banner.title}</h3>
                <p className="text-sm text-gray-500 truncate">{banner.alt}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">Order: {banner.order}</span>
                  <button
                    onClick={() => handleEditBanner(banner)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Banner Form Modal */}
      {showForm && (
        <BannerForm
          banner={selectedBanner}
          onSave={handleSaveBanner}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default BannersPage; 