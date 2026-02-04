'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './gallery.module.css';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const initialPhotos = [
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM.jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (1).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (2).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (3).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (4).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (5).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM.jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (1).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (2).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (3).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (4).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (5).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (6).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (7).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.10 PM.jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.10 PM (1).jpeg',
];

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load initial photos from public/pics folder
    const initialPhotoObjects: Photo[] = initialPhotos.map((src, index) => ({
      id: index,
      src,
      alt: `Memory ${index + 1}`,
    }));
    setPhotos(initialPhotoObjects);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const src = event.target?.result as string;
          const newPhoto: Photo = {
            id: Date.now() + Math.random(),
            src,
            alt: file.name,
          };
          setPhotos((prev) => [newPhoto, ...prev]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (id: number) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">← Go Back</Link>
        <h1>📸 Our Love Story 📸</h1>
      </div>

      <div className={styles.uploadSection}>
        <h2>Share Your Memories</h2>
        <div
          className={styles.uploadArea}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={styles.uploadIcon}>📷</div>
          <p>Click to upload or drag photos here</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {photos.length > 0 && (
        <div className={styles.gallerySection}>
          <h2>Gallery ({photos.length} photos)</h2>
          <div className={styles.photoGrid}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={styles.photoCard}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img src={photo.src} alt={photo.alt} className={styles.photoImg} />
                <div className={styles.overlay}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(photo.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {photos.length === 0 && (
        <div className={styles.emptyState}>
          <p>No photos yet. Add some to get started! 💕</p>
        </div>
      )}

      {selectedPhoto && (
        <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} className={styles.modalImg} />
          </div>
        </div>
      )}
    </div>
  );
}
