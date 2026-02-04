'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from './messages.module.css';

interface Message {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

export default function MessagesInABottle() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "You make my heart skip a beat every time I see you.",
      author: "Anonymous Admirer",
      timestamp: "Today",
    },
  ]);
  const [messageText, setMessageText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: messageText,
        author: authorName || 'Anonymous',
        timestamp: 'Just now',
      };
      setMessages([newMessage, ...messages]);
      setMessageText('');
      setAuthorName('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">← Go Back</Link>
        <h1>💌 Messages in a Bottle 💌</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>Write a Sweet Message</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className={styles.textarea}
              placeholder="Write your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              maxLength={280}
            />
            <div className={styles.charCount}>
              {messageText.length}/280 characters
            </div>
            <input
              type="text"
              className={styles.input}
              placeholder="Your name (optional)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={50}
            />
            <button type="submit" className={styles.submitButton}>
              Send Message 💌
            </button>
          </form>
        </div>

        <div className={styles.messagesSection}>
          <h2>Messages Wall ({messages.length})</h2>
          <div className={styles.messagesList}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={styles.messageCard}
                onClick={() => setSelectedMessage(msg)}
              >
                <p className={styles.messageText}>{msg.text}</p>
                <div className={styles.messageFooter}>
                  <span className={styles.author}>— {msg.author}</span>
                  <span className={styles.time}>{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedMessage && (
        <div className={styles.modal} onClick={() => setSelectedMessage(null)}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedMessage(null)}
            >
              ✕
            </button>
            <p className={styles.modalText}>{selectedMessage.text}</p>
            <div className={styles.modalFooter}>
              — {selectedMessage.author}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
