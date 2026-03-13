"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/contexts/UserProgressContext";
import type { City } from "@/types";

interface CityQuizProps {
  city: City;
  onClose: () => void;
  onComplete: () => void;
}

// Sample quiz questions - in production these would come from the city data
const getQuizQuestions = (cityId: string, language: "ar" | "en") => {
  const quizzes: Record<string, Array<{
    question: { ar: string; en: string };
    options: { ar: string; en: string }[];
    correctIndex: number;
    explanation: { ar: string; en: string };
  }>> = {
    jerusalem: [
      {
        question: {
          ar: "ما هو اسم القدس باللغة العربية الفصحى؟",
          en: "What is the formal Arabic name for Jerusalem?",
        },
        options: [
          { ar: "القدس الشريف", en: "Al-Quds Al-Sharif" },
          { ar: "بيت المقدس", en: "Bayt Al-Maqdis" },
          { ar: "أورشليم", en: "Urshalim" },
          { ar: "كلها صحيحة", en: "All of the above" },
        ],
        correctIndex: 3,
        explanation: {
          ar: "للقدس أسماء عديدة عبر التاريخ، منها القدس الشريف وبيت المقدس وأورشليم",
          en: "Jerusalem has many historical names including Al-Quds Al-Sharif, Bayt Al-Maqdis, and Urshalim",
        },
      },
      {
        question: {
          ar: "أي مسجد يقع في القدس؟",
          en: "Which mosque is located in Jerusalem?",
        },
        options: [
          { ar: "المسجد الأقصى", en: "Al-Aqsa Mosque" },
          { ar: "المسجد النبوي", en: "Prophet's Mosque" },
          { ar: "المسجد الحرام", en: "Grand Mosque" },
          { ar: "مسجد قباء", en: "Quba Mosque" },
        ],
        correctIndex: 0,
        explanation: {
          ar: "المسجد الأقصى هو ثالث أقدس المساجد في الإسلام ويقع في القدس",
          en: "Al-Aqsa Mosque is the third holiest mosque in Islam and is located in Jerusalem",
        },
      },
    ],
    jaffa: [
      {
        question: {
          ar: "بماذا تشتهر يافا؟",
          en: "What is Jaffa famous for?",
        },
        options: [
          { ar: "البرتقال", en: "Oranges" },
          { ar: "الكنافة", en: "Kunafa" },
          { ar: "الصابون", en: "Soap" },
          { ar: "الزجاج", en: "Glass" },
        ],
        correctIndex: 0,
        explanation: {
          ar: "يافا مشهورة ببرتقالها الشهير 'برتقال يافا' الذي كان يُصدّر للعالم",
          en: "Jaffa is famous for its 'Jaffa oranges' which were exported worldwide",
        },
      },
    ],
    gaza: [
      {
        question: {
          ar: "ما هو الاسم القديم لغزة؟",
          en: "What is the ancient name of Gaza?",
        },
        options: [
          { ar: "غزة هاشم", en: "Gaza Hashim" },
          { ar: "عزة", en: "Azza" },
          { ar: "غزاتو", en: "Gazatu" },
          { ar: "كلها صحيحة", en: "All are correct" },
        ],
        correctIndex: 0,
        explanation: {
          ar: "غزة هاشم نسبة إلى هاشم بن عبد مناف جد النبي محمد",
          en: "Gaza Hashim, named after Hashim ibn Abd Manaf, great-grandfather of Prophet Muhammad",
        },
      },
    ],
    nablus: [
      {
        question: {
          ar: "ما هو الطبق الشهير في نابلس؟",
          en: "What is the famous dish from Nablus?",
        },
        options: [
          { ar: "المسخن", en: "Musakhan" },
          { ar: "الكنافة النابلسية", en: "Nabulsi Kunafa" },
          { ar: "المقلوبة", en: "Maqluba" },
          { ar: "المنسف", en: "Mansaf" },
        ],
        correctIndex: 1,
        explanation: {
          ar: "الكنافة النابلسية حلوى تقليدية مشهورة عالمياً",
          en: "Nabulsi Kunafa is a traditional dessert famous worldwide",
        },
      },
    ],
    hebron: [
      {
        question: {
          ar: "لماذا سميت الخليل بهذا الاسم؟",
          en: "Why is Hebron called Al-Khalil?",
        },
        options: [
          { ar: "نسبة إلى النبي إبراهيم خليل الله", en: "After Prophet Abraham, Friend of God" },
          { ar: "نسبة إلى أحد ملوكها", en: "After one of its kings" },
          { ar: "نسبة إلى نوع من الأشجار", en: "After a type of tree" },
          { ar: "نسبة إلى نهر قريب", en: "After a nearby river" },
        ],
        correctIndex: 0,
        explanation: {
          ar: "سميت الخليل نسبة إلى النبي إبراهيم عليه السلام الذي لُقب بخليل الله",
          en: "Hebron is named after Prophet Abraham who was called Khalil Allah (Friend of God)",
        },
      },
    ],
  };

  return quizzes[cityId] || quizzes.jerusalem;
};

export function CityQuiz({ city, onClose, onComplete }: CityQuizProps) {
  const { language } = useLanguage();
  const { progress } = useUserProgress();

  const questions = getQuizQuestions(city.id, language);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-[var(--cream-dark)] flex items-center justify-between">
          <h2 className="font-bold text-lg">
            {language === "ar" ? `اختبار ${city.name.ar}` : `${city.name.en} Quiz`}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--cream)] flex items-center justify-center hover:bg-[var(--cream-dark)]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!quizComplete ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-6">
                <div className="progress-bar flex-1">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>

              {/* Question */}
              <h3 className="text-xl font-bold mb-6">
                {language === "ar" ? question.question.ar : question.question.en}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedAnswer === null
                        ? "bg-[var(--cream)] hover:bg-[var(--cream-dark)]"
                        : index === question.correctIndex
                        ? "bg-[var(--tatreez-green)] text-white"
                        : index === selectedAnswer
                        ? "bg-[var(--tatreez-red)] text-white"
                        : "bg-[var(--cream)] opacity-50"
                    }`}
                  >
                    <span className="font-medium">
                      {language === "ar" ? option.ar : option.en}
                    </span>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="mt-6 p-4 bg-[var(--cream)] rounded-lg animate-fade-in">
                  <p className="font-medium mb-1">
                    {selectedAnswer === question.correctIndex
                      ? language === "ar"
                        ? "✅ إجابة صحيحة!"
                        : "✅ Correct!"
                      : language === "ar"
                      ? "❌ إجابة خاطئة"
                      : "❌ Incorrect"}
                  </p>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    {language === "ar"
                      ? question.explanation.ar
                      : question.explanation.en}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {showExplanation && (
                <button
                  onClick={nextQuestion}
                  className="w-full mt-6 btn-primary"
                >
                  {currentQuestion < questions.length - 1
                    ? language === "ar"
                      ? "السؤال التالي →"
                      : "Next Question →"
                    : language === "ar"
                    ? "عرض النتيجة"
                    : "Show Results"}
                </button>
              )}
            </>
          ) : (
            /* Quiz Complete */
            <div className="text-center py-8">
              <div className="text-6xl mb-4">
                {percentage >= 80 ? "🏆" : percentage >= 50 ? "👍" : "📚"}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {language === "ar" ? "اكتمل الاختبار!" : "Quiz Complete!"}
              </h3>
              <p className="text-4xl font-bold text-[var(--tatreez-red)] mb-4">
                {score}/{questions.length}
              </p>
              <p className="text-[var(--foreground-muted)] mb-6">
                {percentage >= 80
                  ? language === "ar"
                    ? "ممتاز! أنت خبير في هذه المدينة!"
                    : "Excellent! You're an expert on this city!"
                  : percentage >= 50
                  ? language === "ar"
                    ? "جيد! استمر في التعلم!"
                    : "Good job! Keep learning!"
                  : language === "ar"
                  ? "حاول مرة أخرى بعد مراجعة المحتوى"
                  : "Try again after reviewing the content"}
              </p>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 btn-secondary">
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
                <button onClick={onComplete} className="flex-1 btn-primary">
                  {language === "ar" ? "متابعة" : "Continue"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
