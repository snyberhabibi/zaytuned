"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/contexts/UserProgressContext";
import { MemoryMatch } from "@/components/games/MemoryMatch";
import { DialectQuiz } from "@/components/games/DialectQuiz";

type GameType = "menu" | "memory" | "dialect";

const games = [
  {
    id: "memory",
    title: { ar: "مطابقة الذاكرة", en: "Memory Match" },
    category: { ar: "التطريز", en: "Tatreez" },
    categoryColor: "text-emerald-600",
    icon: "🧩",
    iconBg: "bg-[#C41E3A]/10",
    iconHoverBg: "group-hover:bg-[#C41E3A]/20",
    difficulty: 1,
    points: 50,
    completed: false,
    playable: true,
  },
  {
    id: "dialect",
    title: { ar: "تحدي اللهجة", en: "Dialect Challenge" },
    category: { ar: "اللهجات", en: "Dialects" },
    categoryColor: "text-[#E07B53]",
    icon: "🗣️",
    iconBg: "bg-[#2D8B4E]/10",
    iconHoverBg: "group-hover:bg-[#2D8B4E]/20",
    difficulty: 2,
    points: 100,
    completed: false,
    playable: true,
  },
  {
    id: "recipe-master",
    title: { ar: "تحدي الطبخ", en: "Recipe Master" },
    category: { ar: "المطبخ", en: "Cuisine" },
    categoryColor: "text-indigo-600",
    icon: "👨‍🍳",
    iconBg: "bg-[#E07B53]/10",
    iconHoverBg: "group-hover:bg-[#E07B53]/20",
    difficulty: 3,
    points: 200,
    completed: false,
    playable: false,
  },
  {
    id: "city-locator",
    title: { ar: "موقع المدن", en: "City Locator" },
    category: { ar: "الجغرافيا", en: "Geography" },
    categoryColor: "text-[#2D8B4E]",
    icon: "📍",
    iconBg: "bg-[#D4AF37]/10",
    iconHoverBg: "group-hover:bg-[#D4AF37]/20",
    difficulty: 2,
    points: 120,
    completed: false,
    playable: false,
  },
  {
    id: "time-explorer",
    title: { ar: "مستكشف الزمن", en: "Time Explorer" },
    category: { ar: "التاريخ", en: "History" },
    categoryColor: "text-[#9B1B30]",
    icon: "⏳",
    iconBg: "bg-indigo-100",
    iconHoverBg: "group-hover:bg-indigo-200",
    difficulty: 3,
    points: 250,
    completed: false,
    playable: false,
  },
  {
    id: "trivia-king",
    title: { ar: "ملك المعلومات", en: "Trivia King" },
    category: { ar: "التراث", en: "Heritage" },
    categoryColor: "text-emerald-600",
    icon: "🧠",
    iconBg: "bg-[#2D8B4E]/10",
    iconHoverBg: "group-hover:bg-[#2D8B4E]/20",
    difficulty: 1,
    points: 75,
    completed: false,
    playable: false,
  },
];

const leaderboard = [
  { rank: 1, name: "Yasmine A.", level: 42, points: "12.5k" },
  { rank: 2, name: "Omar K.", level: 38, points: "11.2k" },
  { rank: 3, name: "Salma H.", level: 35, points: "9.8k" },
];

export default function GamesPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { totalPoints } = useUserProgress();
  const [activeGame, setActiveGame] = useState<GameType>("menu");
  const [mounted, setMounted] = useState(false);
  const [dailyChallengeProgress] = useState(2);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGameComplete = () => {
    // Points are handled by individual games
  };

  const renderStars = (difficulty: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={i < difficulty ? "text-[#D4AF37]" : "text-[#E8DCC4]"}>
        ★
      </span>
    ));
  };

  // If a game is active, show the game
  if (activeGame !== "menu") {
    return (
      <div className="min-h-screen bg-[#FFFEF7]">
        <header className="sticky top-0 z-50 bg-[#FFFEF7] border-b border-[#E8DCC4] py-4 px-8 flex justify-between items-center">
          <button
            onClick={() => setActiveGame("menu")}
            className="flex items-center gap-2 text-[#36454F] hover:text-[#C41E3A] transition-all group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium">{language === "ar" ? "العودة للألعاب" : "Back to Games"}</span>
          </button>
          <div className="flex items-center gap-2 bg-[#D4AF37]/20 px-4 py-2 rounded-full">
            <span className="text-[#D4AF37]">⭐</span>
            <span className="font-bold">{totalPoints}</span>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#E8DCC4]">
            {activeGame === "memory" && (
              <MemoryMatch onComplete={handleGameComplete} difficulty="easy" />
            )}
            {activeGame === "dialect" && (
              <DialectQuiz onComplete={handleGameComplete} />
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7] relative overflow-hidden">
      {/* Tatreez Pattern Background */}
      <div className="absolute inset-0 tatreez-pattern-bg opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FFFEF7] border-b border-[#E8DCC4] py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E8DCC4] text-[#36454F] hover:bg-white hover:shadow-sm transition-all"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#C41E3A] flex items-center gap-2">
              🫒 Zaytuned
              <span className="text-[#36454F] font-medium text-lg ml-2 border-l border-[#E8DCC4] pl-4">
                {language === "ar" ? "الألعاب" : "Games"} • {language === "ar" ? "Games" : "الألعاب"}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-white border border-[#E8DCC4] rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
            <span className="text-[#D4AF37] text-2xl animate-pulse">⭐</span>
            <span className="font-bold text-lg">{mounted ? totalPoints : 0}</span>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Pts</span>
          </div>
          <Link href="/passport" className="w-10 h-10 rounded-full border-2 border-[#C41E3A] p-0.5 overflow-hidden ring-4 ring-[#C41E3A]/10 flex items-center justify-center bg-[#E8DCC4]">
            📕
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Games */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            {/* Featured Game */}
            <section>
              <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#E07B53] to-[#D4AF37] p-1 shadow-xl shadow-[#E07B53]/20 group transition-all hover:scale-[1.01]">
                <div className="relative bg-gradient-to-br from-[#E07B53] to-[#D4AF37] rounded-[30px] p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />

                  {/* Content */}
                  <div className="flex-1 relative z-10 text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm font-semibold mb-6 border border-white/30">
                      🔥 {language === "ar" ? "اللعبة المميزة" : "Featured Game"}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
                      {language === "ar" ? "لعبة مطابقة الذاكرة" : "Memory Match Game"}
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-md">
                      {language === "ar"
                        ? "اختبر ذاكرتك مع رموز التراث الفلسطيني. جد الأزواج المتطابقة واكسب النقاط!"
                        : "Test your memory with Palestinian heritage symbols. Find matching pairs and earn points!"}
                    </p>
                    <button
                      onClick={() => setActiveGame("memory")}
                      className="inline-flex items-center gap-3 bg-white text-[#E07B53] font-extrabold text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                    >
                      {language === "ar" ? "ابدأ اللعب" : "Play Now"} →
                    </button>
                  </div>

                  {/* Preview Grid */}
                  <div className="w-full md:w-2/5 relative">
                    <div className="aspect-square bg-white/15 backdrop-blur-md rounded-3xl border border-white/30 flex items-center justify-center p-8 relative overflow-hidden">
                      <div className="grid grid-cols-4 gap-2 w-full">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-12 rounded shadow-inner ${
                              i % 3 === 0 ? "bg-[#C41E3A] animate-pulse" : i % 2 === 0 ? "bg-[#2D8B4E] animate-pulse" : "bg-white/20"
                            }`}
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-white text-[#36454F] px-4 py-2 rounded-2xl shadow-lg border border-[#E8DCC4] flex items-center gap-2">
                      👥 <span className="font-bold">12k+ {language === "ar" ? "يلعبون" : "Playing"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Games Grid */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-extrabold text-[#36454F]">
                  {language === "ar" ? "جميع الألعاب" : "All Games"} <span className="text-[#C41E3A]">•</span>{" "}
                  <span className="arabic-text">{language === "ar" ? "All Games" : "جميع الألعاب"}</span>
                </h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full bg-white border border-[#E8DCC4] text-sm font-semibold hover:border-[#C41E3A] hover:text-[#C41E3A] transition-all">
                    {language === "ar" ? "الكل" : "All"}
                  </button>
                  <button className="px-4 py-2 rounded-full bg-white border border-[#E8DCC4] text-sm font-semibold hover:border-[#C41E3A] hover:text-[#C41E3A] transition-all">
                    {language === "ar" ? "مسابقات" : "Quiz"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {games.map((game, index) => (
                  <button
                    key={game.id}
                    onClick={() => game.playable && setActiveGame(game.id as GameType)}
                    disabled={!game.playable}
                    className={`bg-white rounded-3xl p-6 border border-[#E8DCC4] shadow-sm hover:shadow-md transition-all group relative text-left ${
                      game.playable ? "hover:-translate-y-2 cursor-pointer" : "opacity-60 cursor-not-allowed"
                    } ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Coming Soon Badge */}
                    {!game.playable && (
                      <div className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white">
                        {language === "ar" ? "قريباً" : "Soon"}
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 ${game.iconBg} ${game.iconHoverBg} rounded-2xl flex items-center justify-center mb-4 transition-colors`}>
                      <span className="text-3xl">{game.icon}</span>
                    </div>

                    {/* Category Tag */}
                    <div className={`mb-4 text-xs font-bold uppercase tracking-widest ${game.categoryColor} flex items-center gap-1`}>
                      🏷️ {language === "ar" ? game.category.ar : game.category.en}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-extrabold text-[#36454F] mb-1">
                      {language === "ar" ? game.title.ar : game.title.en}
                    </h3>
                    <p className="arabic-text text-gray-500 mb-4">
                      {language === "ar" ? game.title.en : game.title.ar}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1">{renderStars(game.difficulty)}</div>
                      <div className="flex items-center gap-1 bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-lg font-bold text-sm">
                        +{game.points} ⭐
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            {/* Daily Challenge */}
            <section>
              <div className="bg-[#2D8B4E] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border-2 border-[#1E6B3A]">
                <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12 text-[140px]">🏆</div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/20 rounded-2xl">
                      <span className="text-3xl">📅</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase font-bold opacity-80 mb-1">
                        {language === "ar" ? "الوقت المتبقي" : "Time Left"}
                      </div>
                      <div className="text-xl font-mono font-bold">14:23:05</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2">
                    {language === "ar" ? "التحدي اليومي" : "Daily Challenge"}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {language === "ar"
                      ? "أكمل 3 ألعاب لكسب مكافآت إضافية!"
                      : "Complete 3 games to earn bonus rewards!"}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 bg-white/20 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${(dailyChallengeProgress / 3) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold">{dailyChallengeProgress}/3</span>
                  </div>
                  <button className="w-full bg-white text-[#2D8B4E] font-extrabold py-3 rounded-xl hover:bg-[#F5F0E1] transition-colors">
                    {language === "ar" ? "تابع المهمة" : "Continue Mission"}
                  </button>
                </div>
              </div>
            </section>

            {/* Leaderboard */}
            <section>
              <div className="bg-white rounded-3xl p-8 border border-[#E8DCC4] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-extrabold text-[#36454F]">
                    {language === "ar" ? "لوحة المتصدرين" : "Leaderboard"}
                  </h3>
                  <span className="text-xs font-bold text-[#C41E3A] uppercase">
                    {language === "ar" ? "عرض الكل" : "View All"}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F5F0E1] transition-colors border-2 border-transparent hover:border-[#E8DCC4]"
                    >
                      <div
                        className={`w-8 text-center font-extrabold ${
                          player.rank === 1 ? "text-[#D4AF37]" : player.rank === 3 ? "text-[#E07B53]" : "text-gray-400"
                        }`}
                      >
                        {player.rank}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#E8DCC4] overflow-hidden flex items-center justify-center">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{player.name}</div>
                        <div className="text-xs text-gray-500">Level {player.level}</div>
                      </div>
                      <div className={`font-bold ${player.rank === 1 ? "text-[#D4AF37]" : player.rank === 3 ? "text-[#E07B53]" : "text-gray-500"}`}>
                        {player.points}
                      </div>
                    </div>
                  ))}
                </div>

                {/* User Rank */}
                <div className="pt-6 border-t border-[#E8DCC4]">
                  <div className="bg-[#F5F0E1] rounded-2xl p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-6 text-center font-extrabold text-[#36454F]">124</div>
                      <div className="w-10 h-10 rounded-full bg-[#C41E3A] flex items-center justify-center text-white">
                        👤
                      </div>
                      <div className="flex-1">
                        <div className="font-extrabold text-sm text-[#36454F]">
                          {language === "ar" ? "أنت" : "You"}
                        </div>
                        <div className="text-xs text-gray-500">{language === "ar" ? "الترتيب الحالي" : "Current Rank"}</div>
                      </div>
                      <div className="font-bold text-[#C41E3A]">{totalPoints}</div>
                    </div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex justify-between">
                      <span>{language === "ar" ? "نقاط للترقية" : "Points to Rank Up"}</span>
                      <span>550 Pts</span>
                    </div>
                    <div className="w-full bg-[#E8DCC4] h-2 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-[#C41E3A] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
