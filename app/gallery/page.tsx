'use client'

import { useState, useEffect } from 'react';
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
  '/pics/WhatsApp Image 2026-02-04 at 2.47.27 PM.jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (6).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (7).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.10 PM.jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.10 PM (1).jpeg',
];

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    // Load initial photos from public/pics folder
    const initialPhotoObjects: Photo[] = initialPhotos.map((src, index) => ({
      id: index,
      src,
      alt: `Memory ${index + 1}`,
    }));
    setPhotos(initialPhotoObjects);
  }, []);

  const removePhoto = (id: number) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">← Go Back</Link>
        <h1>📸 Our Love Story 📸</h1>
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
