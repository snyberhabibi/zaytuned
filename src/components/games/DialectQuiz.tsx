"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DialectQuestion {
  phrase: { ar: string; transliteration: string };
  meaning: string;
  correctCity: string;
  options: { id: string; name: { ar: string; en: string } }[];
}

const questions: DialectQuestion[] = [
  {
    phrase: { ar: "إيش هاد", transliteration: "Eish had" },
    meaning: "What is this?",
    correctCity: "jerusalem",
    options: [
      { id: "jerusalem", name: { ar: "القدس", en: "Jerusalem" } },
      { id: "gaza", name: { ar: "غزة", en: "Gaza" } },
      { id: "nablus", name: { ar: "نابلس", en: "Nablus" } },
      { id: "hebron", name: { ar: "الخليل", en: "Hebron" } },
    ],
  },
  {
    phrase: { ar: "والله لكان", transliteration: "Wallah lakan" },
    meaning: "Really? / Is that so?",
    correctCity: "nablus",
    options: [
      { id: "jaffa", name: { ar: "يافا", en: "Jaffa" } },
      { id: "nablus", name: { ar: "نابلس", en: "Nablus" } },
      { id: "jerusalem", name: { ar: "القدس", en: "Jerusalem" } },
      { id: "gaza", name: { ar: "غزة", en: "Gaza" } },
    ],
  },
  {
    phrase: { ar: "شو هالحكي", transliteration: "Shu hal-haki" },
    meaning: "What's this talk? / What nonsense!",
    correctCity: "gaza",
    options: [
      { id: "hebron", name: { ar: "الخليل", en: "Hebron" } },
      { id: "jerusalem", name: { ar: "القدس", en: "Jerusalem" } },
      { id: "gaza", name: { ar: "غزة", en: "Gaza" } },
      { id: "nablus", name: { ar: "نابلس", en: "Nablus" } },
    ],
  },
  {
    phrase: { ar: "يا خَي", transliteration: "Ya khay" },
    meaning: "Hey brother (casual)",
    correctCity: "hebron",
    options: [
      { id: "jaffa", name: { ar: "يافا", en: "Jaffa" } },
      { id: "hebron", name: { ar: "الخليل", en: "Hebron" } },
      { id: "gaza", name: { ar: "غزة", en: "Gaza" } },
      { id: "jerusalem", name: { ar: "القدس", en: "Jerusalem" } },
    ],
  },
  {
    phrase: { ar: "على عيني", transliteration: "'Ala 'eini" },
    meaning: "At your service / My pleasure",
    correctCity: "jaffa",
    options: [
      { id: "jaffa", name: { ar: "يافا", en: "Jaffa" } },
      { id: "nablus", name: { ar: "نابلس", en: "Nablus" } },
      { id: "hebron", name: { ar: "الخليل", en: "Hebron" } },
      { id: "gaza", name: { ar: "غزة", en: "Gaza" } },
    ],
  },
];

interface DialectQuizProps {
  onComplete?: (score: number, total: number) => void;
}

export function DialectQuiz({ onComplete }: DialectQuizProps) {
  const { language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<DialectQuestion[]>([]);

  useEffect(() => {
    // Shuffle questions on mount
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
  }, []);

  const question = shuffledQuestions[currentQuestion];

  const handleAnswer = (cityId: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(cityId);
    setShowResult(true);

    if (cityId === question.correctCity) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
      onComplete?.(score, shuffledQuestions.length);
    }
  };

  const restartGame = () => {
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setGameComplete(false);
  };

  if (!question) return null;

  return (
    <div className="max-w-md mx-auto">
      {!gameComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-[var(--foreground-muted)]">
              {currentQuestion + 1}/{shuffledQuestions.length}
            </span>
            <span className="text-sm font-bold text-[var(--tatreez-green)]">
              {language === "ar" ? "النتيجة" : "Score"}: {score}
            </span>
          </div>

          {/* Question */}
          <div className="card card-tatreez mb-6">
            <p className="text-sm text-[var(--foreground-muted)] mb-2">
              {language === "ar"
                ? "من أي مدينة هذه العبارة؟"
                : "Which city is this phrase from?"}
            </p>
            <p className="text-2xl font-bold arabic-text text-[var(--tatreez-red)] mb-2">
              "{question.phrase.ar}"
            </p>
            <p className="text-sm italic text-[var(--foreground-muted)]">
              {question.phrase.transliteration}
            </p>
            <p className="text-sm mt-2">
              {language === "ar" ? "المعنى: " : "Meaning: "}
              {question.meaning}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  !showResult
                    ? "bg-[var(--cream)] hover:bg-[var(--cream-dark)]"
                    : option.id === question.correctCity
                    ? "bg-[var(--tatreez-green)] text-white"
                    : option.id === selectedAnswer
                    ? "bg-[var(--tatreez-red)] text-white"
                    : "bg-[var(--cream)] opacity-50"
                }`}
              >
                <span className="font-medium">
                  {language === "ar" ? option.name.ar : option.name.en}
                </span>
                {language !== "ar" && (
                  <span className="text-sm opacity-70 ml-2">
                    ({option.name.ar})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Result & Next */}
          {showResult && (
            <div className="mt-6">
              <div
                className={`p-4 rounded-lg mb-4 ${
                  selectedAnswer === question.correctCity
                    ? "bg-[var(--tatreez-green)]/10"
                    : "bg-[var(--tatreez-red)]/10"
                }`}
              >
                <p className="font-bold">
                  {selectedAnswer === question.correctCity
                    ? language === "ar"
                      ? "✅ إجابة صحيحة!"
                      : "✅ Correct!"
                    : language === "ar"
                    ? "❌ إجابة خاطئة"
                    : "❌ Incorrect"}
                </p>
              </div>
              <button onClick={nextQuestion} className="w-full btn-primary">
                {currentQuestion < shuffledQuestions.length - 1
                  ? language === "ar"
                    ? "السؤال التالي"
                    : "Next Question"
                  : language === "ar"
                  ? "عرض النتيجة"
                  : "Show Results"}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Game Complete */
        <div className="text-center py-8">
          <div className="text-6xl mb-4">
            {score >= shuffledQuestions.length * 0.8
              ? "🏆"
              : score >= shuffledQuestions.length * 0.5
              ? "👏"
              : "📚"}
          </div>
          <h3 className="text-xl font-bold mb-2">
            {language === "ar" ? "انتهت اللعبة!" : "Quiz Complete!"}
          </h3>
          <p className="text-3xl font-bold text-[var(--tatreez-red)] mb-2">
            {score}/{shuffledQuestions.length}
          </p>
          <p className="text-[var(--foreground-muted)] mb-6">
            {score >= shuffledQuestions.length * 0.8
              ? language === "ar"
                ? "أنت خبير في اللهجات الفلسطينية!"
                : "You're an expert in Palestinian dialects!"
              : score >= shuffledQuestions.length * 0.5
              ? language === "ar"
                ? "أداء جيد! استمر في التعلم"
                : "Good job! Keep learning"
              : language === "ar"
              ? "حاول مرة أخرى بعد زيارة المدن"
              : "Try again after visiting the cities"}
          </p>
          <button onClick={restartGame} className="btn-primary">
            {language === "ar" ? "العب مرة أخرى" : "Play Again"}
          </button>
        </div>
      )}
    </div>
  );
}
