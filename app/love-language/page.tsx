'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from './loveLang.module.css';

interface LoveLanguageScores {
  words: number;
  acts: number;
  time: number;
  touch: number;
  gifts: number;
}

const questions = [
  {
    question: "What makes you feel most loved?",
    answers: [
      { text: "Hearing compliments and words of affirmation", lang: "words" },
      { text: "Receiving thoughtful gifts", lang: "gifts" },
      { text: "Quality time spent together", lang: "time" },
      { text: "Physical affection (hugs, holding hands)", lang: "touch" },
      { text: "Help with tasks (cooking, fixing things)", lang: "acts" },
    ],
  },
  {
    question: "How do you prefer to show affection?",
    answers: [
      { text: "Writing notes or texts", lang: "words" },
      { text: "Planning surprises", lang: "gifts" },
      { text: "Organizing special dates", lang: "time" },
      { text: "Physical closeness", lang: "touch" },
      { text: "Doing helpful things", lang: "acts" },
    ],
  },
  {
    question: "What upsets you most in a relationship?",
    answers: [
      { text: "Not being appreciated verbally", lang: "words" },
      { text: "Not receiving gifts or tokens", lang: "gifts" },
      { text: "Not spending quality time", lang: "time" },
      { text: "Lack of physical affection", lang: "touch" },
      { text: "Partner doesn't help when needed", lang: "acts" },
    ],
  },
  {
    question: "Your ideal date is:",
    answers: [
      { text: "Deep conversations", lang: "words" },
      { text: "A special gift exchange", lang: "gifts" },
      { text: "Uninterrupted time together", lang: "time" },
      { text: "Cuddling and being close", lang: "touch" },
      { text: "Cooking together or helping each other", lang: "acts" },
    ],
  },
  {
    question: "What makes your heart skip a beat?",
    answers: [
      { text: "Kind words and encouragement", lang: "words" },
      { text: "Unexpected presents", lang: "gifts" },
      { text: "Undivided attention", lang: "time" },
      { text: "A gentle touch", lang: "touch" },
      { text: "Someone taking care of something for you", lang: "acts" },
    ],
  },
];

const loveLanguages = {
  words: {
    name: "Words of Affirmation",
    description: "You feel most loved through compliments, encouragement, and verbal appreciation.",
    emoji: "💬",
  },
  acts: {
    name: "Acts of Service",
    description: "You feel loved when someone helps you with tasks and shows care through actions.",
    emoji: "🤝",
  },
  time: {
    name: "Quality Time",
    description: "You value undivided attention and meaningful time spent together.",
    emoji: "⏰",
  },
  touch: {
    name: "Physical Touch",
    description: "You feel loved through hugs, holding hands, and physical affection.",
    emoji: "🤗",
  },
  gifts: {
    name: "Receiving Gifts",
    description: "You appreciate thoughtful gifts that show someone is thinking of you.",
    emoji: "🎁",
  },
};

export default function LoveLanguagePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<LoveLanguageScores>({
    words: 0,
    acts: 0,
    time: 0,
    touch: 0,
    gifts: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (languageType: keyof LoveLanguageScores) => {
    setScores((prev) => ({
      ...prev,
      [languageType]: prev[languageType] + 1,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTopLanguage = () => {
    const entries = Object.entries(scores) as [keyof LoveLanguageScores, number][];
    return entries.reduce((max, current) =>
      current[1] > max[1] ? current : max
    )[0];
  };

  if (showResult) {
    const topLang = getTopLanguage();
    const langInfo = loveLanguages[topLang as keyof typeof loveLanguages];

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/">← Go Back</Link>
          <h1>💕 Your Love Language 💕</h1>
        </div>
        <div className={styles.resultCard}>
          <div className={styles.resultEmoji}>{langInfo.emoji}</div>
          <h2>{langInfo.name}</h2>
          <p>{langInfo.description}</p>
          <div className={styles.allScores}>
            {Object.entries(loveLanguages).map(([key, lang]) => (
              <div key={key} className={styles.scoreBar}>
                <span>{lang.emoji} {lang.name}</span>
                <div className={styles.bar}>
                  <div
                    className={styles.fill}
                    style={{
                      width: `${(scores[key as keyof LoveLanguageScores] / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={styles.button}
            onClick={() => {
              setCurrentQuestion(0);
              setScores({ words: 0, acts: 0, time: 0, touch: 0, gifts: 0 });
              setShowResult(false);
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/">← Go Back</Link>
        <h1>💕 Discover Your Love Language 💕</h1>
      </div>
      <div className={styles.quizCard}>
        <div className={styles.progress}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h2>{questions[currentQuestion].question}</h2>
        <div className={styles.answersGrid}>
          {questions[currentQuestion].answers.map((answer, idx) => (
            <button
              key={idx}
              className={styles.answerButton}
              onClick={() => handleAnswer(answer.lang as keyof LoveLanguageScores)}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
