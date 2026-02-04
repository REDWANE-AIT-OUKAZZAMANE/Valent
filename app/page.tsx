'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCountdown } from "./util/useCountdown";
import { useSound } from "./util/useSound";
import AnimatedHearts from "./util/AnimatedHearts";

interface Coordinates {
  x: string;
  y: string;
}

export default function Home() {
  const [image, setImage] = useState(false);
  const [coord, setCoords] = useState<Coordinates | null>(null);
  const [response, setResponse] = useState('No');
  const [customQuestion, setCustomQuestion] = useState('Will you be my Valentine?');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const countdown = useCountdown();
  const { playDing } = useSound();

  const handleNoBtn = () => {
    const x = Math.random() * 60;
    const y = Math.random() * 60;

    setCoords({ x: `${x}%`, y: `${y}%` });

    const phrases = [
      "Wrong button ❌",
      "Are you sure 🤔?",
      "But what if 🫣?",
      "You&apos;re breaking my heart 💔",
      "Pwetty please 🥺👉👈",
      "Can&apos;t catch up? 😂"
    ]

    const randomIndex = Math.floor(Math.random() * phrases.length);
    setResponse(phrases[randomIndex]);
  }

  const handleYesBtn = () => {
    setImage(!image);
    playDing();
  }

  const handleCustomSubmit = () => {
    setIsCustomizing(false);
  }

  return (
    <div className="container">
      <AnimatedHearts />
      <div className="navbar">
        <Link href="/love-language" className="nav-link">Love Language Quiz 💬</Link>
        <Link href="/love-match" className="nav-link">Match Game 🎮</Link>
        {/* <Link href="/messages" className="nav-link">Messages 💌</Link> */}
        <Link href="/gallery" className="nav-link">Gallery 📸</Link>
      </div>
      <div className="countdown-timer">
        <p>Valentine&apos;s Day in: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</p>
      </div>
      <section>
        <div>
          {isCustomizing ? (
            <div className="customize-form">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Ask your own question..."
                maxLength={100}
              />
              <button onClick={handleCustomSubmit}>Done ✓</button>
            </div>
          ) : (
            <div>
              <p>♡ {customQuestion} ♡</p>
              {/* <button className="customize-btn" onClick={() => setIsCustomizing(true)}>✎ Customize</button> */}
            </div>
          )}
        </div>
        <div className="img-container">
          {image ? (
            <Image src="/heppi.gif" alt="cat spinning with sparkles" width={270} height={200} className="cat" />

          ) : (
            <Image src="/please.gif" alt="two animals asking each other to be their valentine gif" width={340} height={200} priority />
          )}
        </div>
        <div className="button-section">
          <Link href='/success'>
            <button
              className="yes-button button-base button-green"
              onMouseOver={handleYesBtn} onMouseOut={handleYesBtn}
            >
              Yes
            </button>
          </Link>
          <button className='no-button button-base button-red' style={coord ? { position: 'absolute', top: coord.x, right: coord.y } : undefined}
            onClick={handleNoBtn} onMouseOver={handleNoBtn}
          >{response}</button>
        </div>
      </section>
    </div >
  );
}
