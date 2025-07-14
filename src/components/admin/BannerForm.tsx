'use client';

import React, { useState } from 'react';
import { Banner } from '@/types';
import { FileUpload } from '../ui/file-upload';

interface BannerFormProps {
  banner?: Banner | null;
  onSave: (data: { alt: string; order: number }, imageFile: File | null) => Promise<void>;
  onClose: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ banner, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    alt: banner?.alt || '',
    order: banner?.order || 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageInfo, setImageInfo] = useState<{
    width: number;
    height: number;
    aspectRatio: string;
    isOptimal: boolean;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'number' ? parseInt(value) || 0 : value 
    }));
  };

  const handleFileChange = (files: File[]) => {
    if (files && files[0]) {
      setImageFile(files[0]);
      
      // Analyze image dimensions
      const file = files[0];
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const aspectRatio = (width / height).toFixed(2);
        const targetAspectRatio = 3.0; // 3:1 ratio
        const isOptimal = Math.abs(width / height - targetAspectRatio) < 0.1; // Within 10% of target
        
        setImageInfo({
          width,
          height,
          aspectRatio: `${aspectRatio}:1`,
          isOptimal
        });
        
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    } else {
      setImageFile(null);
      setImageInfo(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.alt || (!imageFile && !banner)) {
      alert('Please fill in all required fields and select an image.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSave(formData, imageFile);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {banner ? 'Edit Banner' : 'Add New Banner'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alt Text *
            </label>
            <input
              type="text"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image {!banner && '*'}
            </label>
            
            {/* Recommended Size Info */}
            <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-1">📏 Recommended Banner Dimensions</h4>
              <div className="text-sm text-blue-700">
                <p className="mb-1"><strong>Optimal:</strong> 1920 × 640 pixels (3:1 ratio)</p>
                <p className="mb-1"><strong>High Quality:</strong> 2400 × 800 pixels (3:1 ratio)</p>
                <p className="mb-2"><strong>Max File Size:</strong> 10MB (Cloudinary free plan limit)</p>
              </div>
            </div>

            <FileUpload
              onChange={handleFileChange}
              maxFiles={1}
            />

            {/* Image Analysis */}
            {imageInfo && (
              <div className={`mt-3 p-3 border rounded-md ${
                imageInfo.isOptimal 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <h4 className={`text-sm font-medium mb-1 ${
                  imageInfo.isOptimal ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  {imageInfo.isOptimal ? '✅ Image Analysis' : '⚠️ Image Analysis'}
                </h4>
                <div className={`text-sm ${
                  imageInfo.isOptimal ? 'text-green-700' : 'text-yellow-700'
                }`}>
                  <p><strong>Dimensions:</strong> {imageInfo.width} × {imageInfo.height} pixels</p>
                  <p><strong>Aspect Ratio:</strong> {imageInfo.aspectRatio}</p>
                  <p><strong>File Size:</strong> {(imageFile!.size / (1024 * 1024)).toFixed(2)}MB</p>
                  {!imageInfo.isOptimal && (
                    <p className="mt-1 text-yellow-600">
                      <strong>Note:</strong> For best results, use a 3:1 aspect ratio (width 3× the height)
                    </p>
                  )}
                </div>
              </div>
            )}

            {banner && !imageFile && (
              <p className="text-sm text-gray-500 mt-2">
                Current image will be kept if no new image is selected.
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm; 