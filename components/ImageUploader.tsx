import React, { useState, useRef } from 'react';
import { FaUpload, FaImage, FaTimes } from 'react-icons/fa';
import styles from '../styles/ImageUploader.module.scss';

interface ImageUploaderProps {
  onImageUpload: (base64: string, fileName: string) => void;
  currentImage?: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImage,
  label = "Upload Image",
  accept = "image/*",
  maxSizeMB = 5
}) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setPreview(base64);
        onImageUpload(base64, file.name);
        setUploading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image');
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageUpload('', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.imageUploader}>
      <label className={styles.label}>{label}</label>
      
      <div
        className={`${styles.uploadArea} ${dragOver ? styles.dragOver : ''} ${preview ? styles.hasImage : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className={styles.fileInput}
          disabled={uploading}
        />

        {preview ? (
          <div className={styles.imagePreview}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
            <div className={styles.imageOverlay}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className={styles.removeButton}
              >
                <FaTimes />
              </button>
              <div className={styles.changeText}>
                {uploading ? 'Processing...' : 'Click to change'}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.uploadPrompt}>
            <div className={styles.uploadIcon}>
              {uploading ? (
                <div className={styles.spinner}></div>
              ) : (
                <FaImage />
              )}
            </div>
            <div className={styles.uploadText}>
              {uploading ? (
                <p>Processing image...</p>
              ) : (
                <>
                  <p><strong>Click to upload</strong> or drag and drop</p>
                  <p className={styles.uploadHint}>
                    PNG, JPG, GIF up to {maxSizeMB}MB
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
