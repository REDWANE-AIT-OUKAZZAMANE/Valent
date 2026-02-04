'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './loveMatch.module.css';

interface Card {
  id: number;
  image: string;
  matched: boolean;
  flipped: boolean;
}

const images = [
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM.jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (1).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (2).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (3).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (4).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.08 PM (5).jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM.jpeg',
  '/pics/WhatsApp Image 2026-02-04 at 2.38.09 PM (1).jpeg',
];

export default function LoveMatchGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image, idx) => ({
        id: idx,
        image,
        matched: false,
        flipped: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].image === cards[second].image) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped, cards, matched]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const toggleCard = (id: number) => {
    if (flipped.includes(id) || matched.includes(id) || flipped.length === 2) return;
    setFlipped([...flipped, id]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">← Go Back</Link>
        <h1>💕 Love Match Game 💕</h1>
      </div>

      <div className={styles.stats}>
        <p>Moves: {moves}</p>
        <p>Matched: {matched.length / 2} / {cards.length / 2}</p>
      </div>

      {gameWon ? (
        <div className={styles.wonMessage}>
          <h2>🎉 You Won! 🎉</h2>
          <p>You matched all pairs in {moves} moves!</p>
          <button className={styles.button} onClick={initializeGame}>
            Play Again
          </button>
        </div>
      ) : (
        <div className={styles.gameBoard}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.card} ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? styles.flipped
                  : ''
              }`}
              onClick={() => toggleCard(card.id)}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>?</div>
                <div className={styles.cardBack}>
                  <img src={card.image} alt="Memory card" className={styles.cardImage} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
