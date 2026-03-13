"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/contexts/UserProgressContext";
import { MemoryMatch } from "@/components/games/MemoryMatch";
import { DialectQuiz } from "@/components/games/DialectQuiz";

type GameType = "menu" | "memory" | "dialect";

export default function GamesPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { totalPoints } = useUserProgress();
  const [activeGame, setActiveGame] = useState<GameType>("menu");

  const games = [
    {
      id: "memory",
      title: { ar: "لعبة الذاكرة", en: "Memory Match" },
      description: {
        ar: "جد الأزواج المتطابقة من الرموز الفلسطينية",
        en: "Find matching pairs of Palestinian symbols",
      },
      icon: "🧠",
      color: "bg-[var(--tatreez-red)]",
    },
    {
      id: "dialect",
      title: { ar: "تحدي اللهجة", en: "Dialect Challenge" },
      description: {
        ar: "خمن من أي مدينة هذه العبارة",
        en: "Guess which city this phrase is from",
      },
      icon: "🗣️",
      color: "bg-[var(--olive)]",
    },
    {
      id: "tatreez",
      title: { ar: "صانع التطريز", en: "Tatreez Maker" },
      description: {
        ar: "صمم نمط تطريز خاص بك",
        en: "Design your own embroidery pattern",
      },
      icon: "🧵",
      color: "bg-[var(--gold)]",
      comingSoon: true,
    },
    {
      id: "food",
      title: { ar: "مسابقة الأكلات", en: "Food Quiz" },
      description: {
        ar: "تعرف على الأكلات الفلسطينية",
        en: "Learn about Palestinian cuisine",
      },
      icon: "🍽️",
      color: "bg-[var(--tatreez-green)]",
      comingSoon: true,
    },
  ];

  const handleGameComplete = (score: number) => {
    // Points are handled by individual games
  };

  return (
    <div className="min-h-screen bg-[var(--background)] tatreez-pattern-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[var(--cream-dark)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() =>
              activeGame === "menu" ? router.push("/") : setActiveGame("menu")
            }
            className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--tatreez-red)] transition-colors"
          >
            <span>←</span>
            <span>
              {activeGame === "menu"
                ? language === "ar"
                  ? "الرئيسية"
                  : "Home"
                : language === "ar"
                ? "الألعاب"
                : "Games"}
            </span>
          </button>

          <h1 className="font-bold text-lg text-[var(--tatreez-red)]">
            {language === "ar" ? "🎮 الألعاب" : "🎮 Games"}
          </h1>

          <div className="flex items-center gap-2 bg-[var(--cream)] px-3 py-1.5 rounded-full">
            <span className="text-lg">⭐</span>
            <span className="font-semibold text-[var(--olive-dark)]">
              {totalPoints}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeGame === "menu" ? (
          <>
            {/* Games Menu */}
            <div className="text-center mb-8">
              <h2 className="heading-2 mb-2">
                {language === "ar" ? "تعلم وأنت تلعب" : "Learn While You Play"}
              </h2>
              <p className="text-[var(--foreground-muted)]">
                {language === "ar"
                  ? "العب الألعاب واكسب النقاط واكتشف التراث الفلسطيني"
                  : "Play games, earn points, and discover Palestinian heritage"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() =>
                    !game.comingSoon && setActiveGame(game.id as GameType)
                  }
                  disabled={game.comingSoon}
                  className={`card card-tatreez text-left transition-all ${
                    game.comingSoon
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-lg hover:scale-[1.02]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 ${game.color} rounded-xl flex items-center justify-center text-3xl text-white`}
                    >
                      {game.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">
                          {language === "ar" ? game.title.ar : game.title.en}
                        </h3>
                        {game.comingSoon && (
                          <span className="text-xs bg-[var(--cream)] px-2 py-0.5 rounded-full">
                            {language === "ar" ? "قريباً" : "Soon"}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--foreground-muted)] mt-1">
                        {language === "ar"
                          ? game.description.ar
                          : game.description.en}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Game Tips */}
            <div className="mt-8 card bg-[var(--cream)]">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-bold">
                    {language === "ar" ? "نصيحة" : "Tip"}
                  </h4>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">
                    {language === "ar"
                      ? "قم بزيارة المدن أولاً لتتعلم المزيد وتحسن نتائجك في الألعاب!"
                      : "Visit the cities first to learn more and improve your game scores!"}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : activeGame === "memory" ? (
          <div className="card">
            <MemoryMatch onComplete={handleGameComplete} difficulty="easy" />
          </div>
        ) : activeGame === "dialect" ? (
          <div className="card">
            <DialectQuiz onComplete={handleGameComplete} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
