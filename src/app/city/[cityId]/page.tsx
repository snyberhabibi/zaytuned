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

// City themes with emojis
const cityThemes: Record<string, { primary: string; secondary: string; emoji: string; gradient: string }> = {
  jerusalem: { primary: "#f59e0b", secondary: "#d97706", emoji: "🕌", gradient: "from-amber-500 to-amber-600" },
  jaffa: { primary: "#f97316", secondary: "#ea580c", emoji: "🍊", gradient: "from-orange-400 to-orange-500" },
  gaza: { primary: "#ef4444", secondary: "#dc2626", emoji: "🔥", gradient: "from-red-500 to-red-600" },
  nablus: { primary: "#10b981", secondary: "#059669", emoji: "⛰️", gradient: "from-emerald-500 to-emerald-600" },
  hebron: { primary: "#8b5cf6", secondary: "#7c3aed", emoji: "🏛️", gradient: "from-purple-500 to-purple-600" },
};

export default function CityPage() {
  const params = useParams();
  const router = useRouter();
  const cityId = params.cityId as string;

  const { language } = useLanguage();
  const { isKidsMode } = useContentMode();
  const { markCityVisited, markSectionViewed, getCityProgress, completeCity } = useUserProgress();

  const [city, setCity] = useState<City | null>(null);
  const [activeSection, setActiveSection] = useState<SectionType>("history");
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const theme = cityThemes[cityId] || cityThemes.jerusalem;

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEF7]">
        <div className="tatreez-pattern-bg" />
        <div className="text-center relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: theme.primary }}
            />
            <div
              className="relative w-full h-full rounded-full border-4 border-t-transparent animate-spin flex items-center justify-center"
              style={{ borderColor: `${theme.primary}40`, borderTopColor: theme.primary }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-4xl">
              {theme.emoji}
            </span>
          </div>
          <p className="text-lg font-medium text-[#36454F]">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // City Not Found
  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEF7]">
        <div className="tatreez-pattern-bg" />
        <div className="text-center relative z-10 animate-fade-in-scale">
          <div className="text-8xl mb-6 animate-float">🔍</div>
          <p className="text-2xl mb-6 font-bold text-[#1A1A1A]">
            {language === "ar" ? "المدينة غير موجودة" : "City not found"}
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C41E3A] to-[#9B1B30] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <span>←</span>
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

  const currentSectionIndex = sections.findIndex((s) => s.id === activeSection);
  const currentSectionData = sections[currentSectionIndex];

  return (
    <div className={`min-h-screen bg-[#FFFEF7] ${isKidsMode ? "kids-mode" : ""}`}>
      {/* Background Pattern */}
      <div className="tatreez-pattern-bg" />

      {/* Gradient Stripe Top */}
      <div className="h-1 bg-gradient-to-r from-[#C41E3A] via-[#1A1A1A] to-[#2D8B4E]" />

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#F5F0E1] shadow-sm ${mounted ? "animate-fade-in" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-[#36454F] hover:text-[#C41E3A] transition-all group"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F0E1] group-hover:bg-[#C41E3A]/10 transition-colors">
                <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              </span>
              <span className="font-medium hidden sm:inline">
                {language === "ar" ? "الخريطة" : "Map"}
              </span>
            </button>

            {/* City Title */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${theme.gradient} shadow-md`}
              >
                {theme.emoji}
              </div>
              <div className="text-center">
                <h1 className="font-bold text-lg text-[#1A1A1A]">
                  {language === "ar" ? city.name.ar : city.name.en}
                </h1>
                <p className="text-xs text-[#6B8E23]" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                  {language === "ar" ? city.name.en : city.name.ar}
                </p>
              </div>
            </div>

            {/* Progress & Quiz */}
            <div className="flex items-center gap-3">
              {/* Progress Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F5F0E1] rounded-full">
                <div className="w-16 h-2 bg-[#E8DCC4] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`
                    }}
                  />
                </div>
                <span className="text-sm font-bold" style={{ color: theme.primary }}>
                  {progress}%
                </span>
              </div>

              {/* Quiz Button */}
              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#C41E3A] text-[#C41E3A] font-semibold rounded-full hover:bg-[#C41E3A] hover:text-white transition-all hover:scale-105"
              >
                <span>📝</span>
                <span className="hidden sm:inline">
                  {language === "ar" ? "اختبار" : "Quiz"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <CityHero city={city} />

      {/* Section Navigation */}
      <nav className="sticky top-[65px] z-40 bg-white/90 backdrop-blur-lg border-b border-[#F5F0E1] shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {sections.map((section, index) => {
              const isActive = section.id === activeSection;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "text-white shadow-lg scale-105"
                      : "bg-[#F5F0E1] text-[#36454F] hover:bg-[#E8DCC4] hover:scale-102"
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                  } : undefined}
                >
                  <span className={isActive ? "animate-bounce-subtle" : ""}>{section.icon}</span>
                  <span className="text-sm">
                    {language === "ar" ? section.labelAr : section.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Current Section Header */}
      <div className="relative py-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}20, transparent)`
          }}
        />
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-4 relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-float"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
            }}
          >
            {currentSectionData?.icon}
          </div>
          <div>
            <h2 className="font-bold text-2xl text-[#1A1A1A]">
              {language === "ar" ? currentSectionData?.labelAr : currentSectionData?.labelEn}
            </h2>
            <p className="text-sm text-[#6B8E23]">
              {language === "ar"
                ? `القسم ${currentSectionIndex + 1} من ${sections.length}`
                : `Section ${currentSectionIndex + 1} of ${sections.length}`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 pb-32">
        <div
          className={`bg-white rounded-2xl shadow-lg border border-[#F5F0E1] p-6 sm:p-8 ${mounted ? "animate-fade-in-up" : ""}`}
          key={activeSection}
        >
          {/* Tatreez Border Top */}
          <div className="h-1 bg-gradient-to-r from-[#C41E3A] via-[#1A1A1A] to-[#2D8B4E] rounded-full mb-6" />

          {renderSection()}

          {/* Tatreez Border Bottom */}
          <div className="h-1 bg-gradient-to-r from-[#2D8B4E] via-[#1A1A1A] to-[#C41E3A] rounded-full mt-6" />
        </div>
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
      <footer className="fixed bottom-0 left-0 right-0 z-40">
        {/* Gradient Stripe */}
        <div className="h-1 bg-gradient-to-r from-[#C41E3A] via-[#1A1A1A] to-[#2D8B4E]" />

        <div className="bg-white/95 backdrop-blur-xl border-t border-[#F5F0E1] py-4 shadow-2xl">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={() => {
                if (currentSectionIndex > 0) {
                  setActiveSection(sections[currentSectionIndex - 1].id);
                }
              }}
              disabled={currentSectionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E8DCC4] text-[#36454F] font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#C41E3A] hover:text-[#C41E3A] transition-all group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="hidden sm:inline">
                {language === "ar" ? "السابق" : "Previous"}
              </span>
            </button>

            {/* Progress Dots */}
            <div className="flex items-center gap-1.5">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
                    index === currentSectionIndex
                      ? "scale-125 shadow-md"
                      : "bg-[#E8DCC4] hover:bg-[#6B8E23]"
                  }`}
                  style={index === currentSectionIndex ? {
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                  } : undefined}
                  title={language === "ar" ? section.labelAr : section.labelEn}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                if (currentSectionIndex < sections.length - 1) {
                  setActiveSection(sections[currentSectionIndex + 1].id);
                }
              }}
              disabled={currentSectionIndex === sections.length - 1}
              className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all group hover:scale-105 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
              }}
            >
              <span className="hidden sm:inline">
                {language === "ar" ? "التالي" : "Next"}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
