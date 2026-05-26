'use client';

import { useState, useRef } from 'react';
import { uploadFile } from '@/lib/api';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await upload(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
    }
  };

  const upload = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      onUploadComplete(result.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-gray-700 hover:border-primary hover:bg-gray-900'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
      {isUploading ? (
        <p className="text-gray-400">Uploading...</p>
      ) : (
        <>
          <p className="text-2xl mb-2">📎</p>
          <p className="text-sm text-gray-400">
            Drag & drop a file here, or <span className="text-primary">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Supports images, PDFs, and documents</p>
        </>
      )}
    </div>
  );
}
