'use client'

import { useState, useEffect } from 'react';
import styles from './AnimatedHearts.module.css';

interface Heart {
  id: number;
  left: number;
}

export default function AnimatedHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: nextId,
        left: Math.random() * 100,
      };
      setHearts((prev) => [...prev, newHeart]);
      setNextId((prev) => prev + 1);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3000);
    }, 300);

    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <div className={styles.heartsContainer}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={styles.heart}
          style={{ left: `${heart.left}%` }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}
