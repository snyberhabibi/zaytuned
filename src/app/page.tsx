"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PalestineMap } from "@/components/map/PalestineMap";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import { useUserProgress } from "@/contexts/UserProgressContext";

export default function Home() {
  const router = useRouter();
  const { language, setLanguage, isRTL } = useLanguage();
  const { mode, setMode, isKidsMode } = useContentMode();
  const { totalPoints, progress } = useUserProgress();
  const [showModeInfo, setShowModeInfo] = useState(false);

  const citiesCompleted = progress?.citiesCompleted.length || 0;

  return (
    <main className="min-h-screen tatreez-pattern-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-[var(--cream-dark)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--olive)] flex items-center justify-center">
              <span className="text-xl">🫒</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--tatreez-red)]">
                Zaytuned
              </h1>
              <p className="text-xs text-[var(--olive)] arabic-text">زيتونة</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center gap-2 bg-[var(--cream)] px-3 py-1.5 rounded-full">
              <span className="text-lg">⭐</span>
              <span className="font-semibold text-[var(--olive-dark)]">
                {totalPoints}
              </span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--cream)] hover:bg-[var(--cream-dark)] transition-colors"
              aria-label="Toggle language"
            >
              <span className="text-sm font-medium">
                {language === "en" ? "عربي" : "EN"}
              </span>
            </button>

            {/* Mode Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowModeInfo(!showModeInfo)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                  isKidsMode
                    ? "bg-[var(--gold)] text-white"
                    : "bg-[var(--tatreez-green)] text-white"
                }`}
              >
                <span>{isKidsMode ? "👶" : "📚"}</span>
                <span className="text-sm font-medium hidden sm:inline">
                  {isKidsMode
                    ? language === "ar"
                      ? "الأطفال"
                      : "Kids"
                    : language === "ar"
                    ? "تعمق"
                    : "Deep Dive"}
                </span>
              </button>

              {showModeInfo && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
                  <p className="text-sm mb-3">
                    {language === "ar"
                      ? "اختر طريقة العرض:"
                      : "Choose your experience:"}
                  </p>
                  <button
                    onClick={() => {
                      setMode("kids");
                      setShowModeInfo(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-2 ${
                      isKidsMode
                        ? "bg-[var(--gold)] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="font-medium">
                      👶 {language === "ar" ? "وضع الأطفال" : "Kids Mode"}
                    </span>
                    <p className="text-xs mt-1 opacity-80">
                      {language === "ar"
                        ? "محتوى مبسط وألعاب ممتعة"
                        : "Simplified content & fun games"}
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setMode("deep");
                      setShowModeInfo(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg ${
                      !isKidsMode
                        ? "bg-[var(--tatreez-green)] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="font-medium">
                      📚 {language === "ar" ? "وضع التعمق" : "Deep Dive"}
                    </span>
                    <p className="text-xs mt-1 opacity-80">
                      {language === "ar"
                        ? "محتوى مفصل وتاريخ شامل"
                        : "Detailed content & full history"}
                    </p>
                  </button>
                </div>
              )}
            </div>

            {/* Passport Button */}
            <button
              onClick={() => router.push("/passport")}
              className="flex items-center gap-2 btn-secondary"
            >
              <span>📕</span>
              <span className="hidden sm:inline">
                {language === "ar" ? "جواز السفر" : "Passport"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Decorative Tatreez Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--tatreez-red)] via-[var(--tatreez-black)] to-[var(--tatreez-green)]" />

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-1 mb-4">
            {language === "ar" ? (
              <span className="arabic-text">
                اكتشف تراثك الفلسطيني
              </span>
            ) : (
              <>
                Discover Your{" "}
                <span className="text-[var(--tatreez-red)]">Palestinian</span>{" "}
                Heritage
              </>
            )}
          </h2>

          <p className="body-large text-[var(--foreground-muted)] max-w-2xl mx-auto mb-8">
            {language === "ar" ? (
              <span className="arabic-text">
                رحلة تفاعلية عبر مدن وقرى فلسطين التاريخية. اكتشف التقاليد، التطريز، الأكلات، اللهجات، والمعالم - مدينة مدينة.
              </span>
            ) : (
              "An interactive journey through historic Palestinian cities and villages. Explore traditions, tatreez, cuisine, dialects, and landmarks — city by city."
            )}
          </p>

          {/* Progress Summary */}
          {citiesCompleted > 0 && (
            <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-md mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏅</span>
                <div className="text-left">
                  <p className="text-sm text-[var(--foreground-muted)]">
                    {language === "ar" ? "المدن المكتملة" : "Cities Completed"}
                  </p>
                  <p className="font-bold text-[var(--tatreez-green)]">
                    {citiesCompleted}/5
                  </p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div className="text-left">
                  <p className="text-sm text-[var(--foreground-muted)]">
                    {language === "ar" ? "النقاط" : "Points"}
                  </p>
                  <p className="font-bold text-[var(--gold)]">{totalPoints}</p>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="olive-divider max-w-md mx-auto mb-4">
            <span className="text-[var(--olive)] font-medium">
              {language === "ar" ? "🫒 ابدأ رحلتك 🫒" : "🫒 Begin Your Journey 🫒"}
            </span>
          </div>
          <p className="text-sm text-[var(--foreground-muted)] mb-8">
            {language === "ar"
              ? "انقر على أي مدينة على الخريطة للاستكشاف"
              : "Click any city on the map to explore"}
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-[var(--cream-dark)]">
            <h3 className="heading-3 text-center">
              {language === "ar" ? (
                <span className="arabic-text">خريطة فلسطين التاريخية</span>
              ) : (
                "Historic Palestine"
              )}
            </h3>
          </div>
          <div className="p-4">
            <PalestineMap showProgress={true} />
          </div>
        </div>
      </section>

      {/* Featured Cities Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="heading-2 text-center mb-8">
          {language === "ar" ? (
            <span className="arabic-text">استكشف المدن</span>
          ) : (
            "Explore Cities"
          )}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "jerusalem",
              name: { ar: "القدس", en: "Jerusalem" },
              description: {
                ar: "قلب فلسطين وروحها",
                en: "The heart and soul of Palestine",
              },
              emoji: "🕌",
            },
            {
              id: "jaffa",
              name: { ar: "يافا", en: "Jaffa" },
              description: {
                ar: "عروس البحر",
                en: "The Bride of the Sea",
              },
              emoji: "🍊",
            },
            {
              id: "gaza",
              name: { ar: "غزة", en: "Gaza" },
              description: {
                ar: "مدينة الصمود",
                en: "City of Resilience",
              },
              emoji: "🏛️",
            },
            {
              id: "nablus",
              name: { ar: "نابلس", en: "Nablus" },
              description: {
                ar: "جبل النار",
                en: "Mountain of Fire",
              },
              emoji: "🔥",
            },
            {
              id: "hebron",
              name: { ar: "الخليل", en: "Hebron" },
              description: {
                ar: "مدينة الخليل إبراهيم",
                en: "City of Abraham",
              },
              emoji: "⛰️",
            },
          ].map((city) => (
            <button
              key={city.id}
              onClick={() => router.push(`/city/${city.id}`)}
              className="card card-tatreez text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{city.emoji}</div>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-[var(--tatreez-red)] transition-colors">
                    {language === "ar" ? city.name.ar : city.name.en}
                  </h4>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">
                    {language === "ar"
                      ? city.description.ar
                      : city.description.en}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="progress-bar flex-1 mr-4">
                  <div
                    className="progress-bar-fill"
                    style={{ width: "0%" }}
                  />
                </div>
                <span className="text-[var(--tatreez-red)] text-sm font-medium group-hover:translate-x-1 transition-transform">
                  {language === "ar" ? "استكشف ←" : "Explore →"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--tatreez-black)] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--olive)] flex items-center justify-center">
              <span className="text-2xl">🫒</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Zaytuned</h2>
              <p className="text-sm text-gray-400 arabic-text">زيتونة</p>
            </div>
          </div>

          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            {language === "ar" ? (
              <span className="arabic-text">
                نحفظ ونشارك التراث الفلسطيني للأجيال القادمة
              </span>
            ) : (
              "Preserving and sharing Palestinian heritage for generations to come."
            )}
          </p>

          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>
              {language === "ar" ? "من فلسطين مع الحب" : "From Palestine with love"}{" "}
              ❤️
            </span>
          </div>

          {/* Decorative Tatreez Border */}
          <div className="mt-8 h-1 bg-gradient-to-r from-[var(--tatreez-red)] via-[var(--tatreez-black)] to-[var(--tatreez-green)]" />
        </div>
      </footer>
    </main>
  );
}
