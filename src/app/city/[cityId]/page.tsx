"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import { useUserProgress } from "@/contexts/UserProgressContext";
import { getCityData } from "@/data/cities";
import type { City, SectionType } from "@/types";

// Section Components
import { HistorySection } from "@/components/city/HistorySection";
import { TatreezSection } from "@/components/city/TatreezSection";
import { FoodSection } from "@/components/city/FoodSection";
import { DialectSection } from "@/components/city/DialectSection";
import { LandmarksSection } from "@/components/city/LandmarksSection";
import { SayingsSection } from "@/components/city/SayingsSection";
import { FamousPeopleSection } from "@/components/city/FamousPeopleSection";
import { BeforeAfterSection } from "@/components/city/BeforeAfterSection";
import { CityHero } from "@/components/city/CityHero";
import { CityNav } from "@/components/city/CityNav";
import { CityQuiz } from "@/components/city/CityQuiz";

const sections: { id: SectionType; icon: string; labelEn: string; labelAr: string }[] = [
  { id: "history", icon: "📜", labelEn: "History", labelAr: "التاريخ" },
  { id: "tatreez", icon: "🧵", labelEn: "Tatreez", labelAr: "التطريز" },
  { id: "food", icon: "🍽️", labelEn: "Cuisine", labelAr: "المأكولات" },
  { id: "dialect", icon: "🗣️", labelEn: "Dialect", labelAr: "اللهجة" },
  { id: "landmarks", icon: "🏛️", labelEn: "Landmarks", labelAr: "المعالم" },
  { id: "sayings", icon: "💬", labelEn: "Sayings", labelAr: "الأمثال" },
  { id: "famous_people", icon: "⭐", labelEn: "Famous Figures", labelAr: "الشخصيات" },
  { id: "before_after", icon: "⏳", labelEn: "Then & Now", labelAr: "قبل وبعد" },
];

export default function CityPage() {
  const params = useParams();
  const router = useRouter();
  const cityId = params.cityId as string;

  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();
  const { markCityVisited, markSectionViewed, getCityProgress, completeCity } = useUserProgress();

  const [city, setCity] = useState<City | null>(null);
  const [activeSection, setActiveSection] = useState<SectionType>("history");
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCity = async () => {
      setIsLoading(true);
      const data = await getCityData(cityId);
      if (data) {
        setCity(data);
        markCityVisited(cityId);
      }
      setIsLoading(false);
    };
    loadCity();
  }, [cityId, markCityVisited]);

  useEffect(() => {
    if (city) {
      markSectionViewed(cityId, activeSection);
    }
  }, [activeSection, city, cityId, markSectionViewed]);

  const progress = getCityProgress(cityId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center tatreez-pattern-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--tatreez-red)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--foreground-muted)]">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center tatreez-pattern-bg">
        <div className="text-center">
          <p className="text-xl mb-4">
            {language === "ar" ? "المدينة غير موجودة" : "City not found"}
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            {language === "ar" ? "العودة للخريطة" : "Back to Map"}
          </button>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "history":
        return <HistorySection city={city} />;
      case "tatreez":
        return <TatreezSection city={city} />;
      case "food":
        return <FoodSection city={city} />;
      case "dialect":
        return <DialectSection city={city} />;
      case "landmarks":
        return <LandmarksSection city={city} />;
      case "sayings":
        return <SayingsSection city={city} />;
      case "famous_people":
        return <FamousPeopleSection city={city} />;
      case "before_after":
        return <BeforeAfterSection city={city} />;
      default:
        return <HistorySection city={city} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[var(--cream-dark)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--tatreez-red)] transition-colors"
          >
            <span>←</span>
            <span>{language === "ar" ? "الخريطة" : "Map"}</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="text-center">
              <h1 className="font-bold text-[var(--tatreez-red)]">
                {t(city.name)}
              </h1>
              <p className="text-xs text-[var(--olive)] arabic-text">
                {city.name.ar}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="progress-bar w-20">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium">{progress}%</span>
            </div>

            {/* Quiz Button */}
            <button
              onClick={() => setShowQuiz(true)}
              className="btn-secondary text-sm"
            >
              {language === "ar" ? "اختبار 📝" : "Quiz 📝"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <CityHero city={city} />

      {/* Section Navigation */}
      <CityNav
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        language={language}
      />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-fade-in">{renderSection()}</div>
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <CityQuiz
          city={city}
          onClose={() => setShowQuiz(false)}
          onComplete={() => {
            setShowQuiz(false);
            if (progress >= 80) {
              completeCity(cityId);
            }
          }}
        />
      )}

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-[var(--cream-dark)] py-3">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => {
              const currentIndex = sections.findIndex((s) => s.id === activeSection);
              if (currentIndex > 0) {
                setActiveSection(sections[currentIndex - 1].id);
              }
            }}
            disabled={activeSection === sections[0].id}
            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← {language === "ar" ? "السابق" : "Previous"}
          </button>

          <span className="text-sm text-[var(--foreground-muted)]">
            {sections.findIndex((s) => s.id === activeSection) + 1} / {sections.length}
          </span>

          <button
            onClick={() => {
              const currentIndex = sections.findIndex((s) => s.id === activeSection);
              if (currentIndex < sections.length - 1) {
                setActiveSection(sections[currentIndex + 1].id);
              }
            }}
            disabled={activeSection === sections[sections.length - 1].id}
            className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === "ar" ? "التالي" : "Next"} →
          </button>
        </div>
      </footer>
    </div>
  );
}
