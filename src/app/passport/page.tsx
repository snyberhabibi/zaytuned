"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/contexts/UserProgressContext";
import { getAllCities } from "@/data/cities";
import type { Badge as BadgeType, PassportStamp } from "@/types";

// City data map for stamp designs
const CITY_STAMP_DESIGNS: Record<string, { icon: string; color: string; tagline: { en: string; ar: string } }> = {
  jerusalem: {
    icon: "🕌",
    color: "#f59e0b",
    tagline: { en: "Holy City", ar: "المدينة المقدسة" }
  },
  jaffa: {
    icon: "🍊",
    color: "#f97316",
    tagline: { en: "Bride of the Sea", ar: "عروس البحر" }
  },
  gaza: {
    icon: "🔥",
    color: "#C41E3A",
    tagline: { en: "City of Resilience", ar: "مدينة الصمود" }
  },
  nablus: {
    icon: "⛰️",
    color: "#10b981",
    tagline: { en: "Mountain of Fire", ar: "جبل النار" }
  },
  hebron: {
    icon: "🏛️",
    color: "#6366f1",
    tagline: { en: "City of the Patriarchs", ar: "مدينة الخليل" }
  },
};

export default function PassportPage() {
  const { language, t } = useLanguage();
  const { progress, isLoading, totalPoints } = useUserProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cities = getAllCities();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCityName = (cityId: string): string => {
    const city = cities.find((c) => c.id === cityId);
    return city ? t(city.name) : cityId;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEF7]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#C41E3A] border-t-transparent animate-spin" />
          <p className="text-lg font-medium text-gray-500">
            {language === "ar" ? "جارٍ تحميل جوازك..." : "Loading your passport..."}
          </p>
        </div>
      </div>
    );
  }

  const stampedCities = progress?.passportStamps || [];
  const lockedCities = ["nablus", "hebron"].filter(id => !stampedCities.find(s => s.cityId === id));

  return (
    <div className="min-h-screen bg-[#FFFEF7] tatreez-pattern-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-8 py-4 flex items-center justify-between border-b border-[#C41E3A]/10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-[#F5F0E1] flex items-center justify-center hover:bg-[#C41E3A]/10 transition-colors text-[#C41E3A]"
          >
            ←
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              {language === "ar" ? "جواز التراث" : "My Heritage Passport"}
            </h1>
            <p className="text-xs text-[#C41E3A] uppercase tracking-widest font-bold">
              Explorer ID: Z-98234
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-[#F5F0E1] px-4 py-2 rounded-full border border-[#E8DCC4]">
            <span className="text-[#2D8B4E]">📍</span>
            <span className="font-bold text-sm">
              {progress?.citiesCompleted?.length || 0} / {cities.length} {language === "ar" ? "مدن" : "Cities"}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/20">
            <span className="text-[#D4AF37]">⭐</span>
            <span className="font-bold text-sm">{mounted ? totalPoints : 0} {language === "ar" ? "نقطة" : "Points"}</span>
          </div>
          <button className="bg-[#C41E3A] text-white px-5 py-2 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all flex items-center gap-2">
            📤 {language === "ar" ? "شارك" : "Share"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Column - ID & Stats */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* ID Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8DCC4] shadow-xl relative overflow-hidden">
              {/* Top border stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C41E3A] via-[#1A1A1A] to-[#2D8B4E]" />

              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-3xl bg-[#E8DCC4] p-1 border-2 border-[#C41E3A] flex items-center justify-center">
                    <span className="text-6xl">🧑‍🎓</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#2D8B4E] text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    ✓
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-[#1A1A1A]">
                  {language === "ar" ? "مستكشف التراث" : "Heritage Explorer"}
                </h2>
                <p className="text-[#C41E3A] font-medium mb-4">
                  {language === "ar" ? "مستوى 14 • زيتونة ذهبية" : "Level 14 • Golden Olive"}
                </p>

                <div className="w-full border-t border-dashed border-[#E8DCC4] my-6" />

                <div className="w-full space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                      {language === "ar" ? "الجنسية" : "Nationality"}
                    </span>
                    <span className="font-bold text-[#1A1A1A]">
                      {language === "ar" ? "فلسطيني" : "Palestinian"} 🇵🇸
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                      {language === "ar" ? "تاريخ الانضمام" : "Joined Date"}
                    </span>
                    <span className="font-bold text-[#1A1A1A]">
                      {progress?.createdAt ? formatDate(progress.createdAt) : "Oct 2023"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                      {language === "ar" ? "الرتبة" : "Rank"}
                    </span>
                    <span className="font-bold text-[#D4AF37]">
                      {language === "ar" ? "زيتونة ذهبية" : "Golden Olive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="bg-[#FFFEF7] px-4 py-4 rounded-2xl border border-[#E8DCC4]/30 flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-[#2D8B4E]">
                    {progress?.citiesCompleted?.length || 0}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-500">
                    {language === "ar" ? "دروس" : "Lessons"}
                  </span>
                </div>
                <div className="bg-[#FFFEF7] px-4 py-4 rounded-2xl border border-[#E8DCC4]/30 flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-[#C41E3A]">420</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500">
                    {language === "ar" ? "دقيقة" : "Minutes"}
                  </span>
                </div>
                <div className="bg-[#FFFEF7] px-4 py-4 rounded-2xl border border-[#E8DCC4]/30 flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-amber-600">8</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500">
                    {language === "ar" ? "ألعاب" : "Games Won"}
                  </span>
                </div>
                <div className="bg-[#FFFEF7] px-4 py-4 rounded-2xl border border-[#E8DCC4]/30 flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-[#1A1A1A]">{stampedCities.length}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500">
                    {language === "ar" ? "طوابع" : "Stamps"}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DCC4] shadow-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-[#D4AF37]">🏆</span>
                {language === "ar" ? "الإنجازات" : "Achievements"}
              </h3>
              <div className="space-y-4">
                {/* Unlocked Badge */}
                <div className="flex items-center gap-4 p-3 bg-[#FFFEF7] rounded-2xl">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-white shadow-sm">
                    🧵
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{language === "ar" ? "خبير التطريز" : "Tatreez Master"}</p>
                    <p className="text-xs text-gray-500">{language === "ar" ? "حدد 10 أنماط" : "Identify 10 patterns"}</p>
                  </div>
                  <span className="text-[#2D8B4E] text-xl">✓</span>
                </div>

                {/* Locked Badge */}
                <div className="flex items-center gap-4 p-3 bg-[#FFFEF7] rounded-2xl opacity-60">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#E8DCC4] flex items-center justify-center text-gray-400 shadow-sm">
                    🍽️
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{language === "ar" ? "مستكشف الطعام" : "Foodie Explorer"}</p>
                    <p className="text-xs text-gray-500">8/15 {language === "ar" ? "وصفات" : "Recipes learned"}</p>
                  </div>
                  <span className="text-gray-300">🔒</span>
                </div>

                {/* Progress */}
                <div className="mt-4 pt-4 border-t border-[#E8DCC4]/50">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>{language === "ar" ? "الإنجاز التالي: أسطورة الخريطة" : "Next: Map Legend"}</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E8DCC4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C41E3A] rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stamps */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-3xl border border-[#E8DCC4] shadow-xl flex flex-col min-h-full relative overflow-hidden">
              {/* Top border stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C41E3A] via-[#1A1A1A] to-[#2D8B4E]" />

              {/* Header */}
              <div className="p-8 border-b border-[#E8DCC4] bg-[#FFFEF7]/30 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#1A1A1A]">
                    {language === "ar" ? "طوابع المدن" : "City Stamps"}
                  </h2>
                  <p className="text-gray-500 italic">
                    {language === "ar" ? "اجمع الطوابع بإكمال مهام المدن" : "Collect stamps by completing city quests"}
                  </p>
                </div>
                <div className="hidden md:block">
                  <span className="text-6xl text-[#C41E3A] opacity-10 rotate-12">📕</span>
                </div>
              </div>

              {/* Stamps Grid */}
              <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 flex-1">
                {/* Collected Stamps */}
                {stampedCities.map((stamp, index) => (
                  <StampComponent
                    key={stamp.cityId}
                    stamp={stamp}
                    design={CITY_STAMP_DESIGNS[stamp.cityId]}
                    cityName={getCityName(stamp.cityId)}
                    formatDate={formatDate}
                    language={language}
                    index={index}
                    mounted={mounted}
                  />
                ))}

                {/* Show placeholder stamps if no stamps yet */}
                {stampedCities.length === 0 && (
                  <>
                    <LockedStamp name="القدس" nameEn="Jerusalem" language={language} />
                    <LockedStamp name="يافا" nameEn="Jaffa" language={language} />
                    <LockedStamp name="غزة" nameEn="Gaza" language={language} />
                  </>
                )}

                {/* Locked Stamps */}
                {lockedCities.map((cityId) => (
                  <LockedStamp
                    key={cityId}
                    name={cityId === "nablus" ? "نابلس" : "الخليل"}
                    nameEn={cityId === "nablus" ? "Nablus" : "Hebron"}
                    language={language}
                    level={cityId === "nablus" ? 15 : 18}
                  />
                ))}

                {/* Future City Slot */}
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#E8DCC4] rounded-3xl opacity-40">
                  <span className="text-4xl text-[#E8DCC4] mb-2">➕</span>
                  <p className="text-xs font-bold text-center">
                    {language === "ar" ? "اكتشف المزيد قريباً" : "Discover More Cities Soon"}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-[#FFFEF7]/30 border-t border-[#E8DCC4] flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-[#C41E3A] font-bold text-sm hover:underline">
                    📥 {language === "ar" ? "حفظ كصورة" : "Export as Image"}
                  </button>
                  <button className="flex items-center gap-2 text-[#C41E3A] font-bold text-sm hover:underline">
                    🖨️ {language === "ar" ? "طباعة" : "Print Passport"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                    {language === "ar" ? "موثق من زيتونة" : "Verified by Zaytuned"}
                  </span>
                  <span className="text-[#2D8B4E]">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-12 bg-[#1A1A1A] text-[#FFFEF7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🫒</span>
            <span className="text-xl font-extrabold tracking-tight">Zaytuned</span>
          </div>

          <p className="text-[#FFFEF7]/60 text-sm max-w-md text-center md:text-left">
            {language === "ar"
              ? "يسجل جواز زيتونة الرقمي رحلتك عبر التراث والتاريخ الفلسطيني الغني."
              : "The Zaytuned Digital Passport records your journey through the rich heritage and history of Palestine."}
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#C41E3A] transition-colors text-2xl">📸</a>
            <a href="#" className="hover:text-[#C41E3A] transition-colors text-2xl">🐦</a>
            <a href="#" className="hover:text-[#C41E3A] transition-colors text-2xl">📱</a>
          </div>
        </div>

        <div className="w-full h-px bg-[#FFFEF7]/10 mt-12 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-[#FFFEF7]/40">
          <p>© 2024 Zaytuned Educational Apps</p>
          <p className="flex items-center gap-1">
            {language === "ar" ? "صنع بـ" : "Made with"}{" "}
            <span className="text-[#C41E3A] animate-pulse">❤️</span>{" "}
            {language === "ar" ? "لفلسطين" : "for Palestine"}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Stamp Component
function StampComponent({
  stamp,
  design,
  cityName,
  formatDate,
  language,
  index,
  mounted,
}: {
  stamp: PassportStamp;
  design: { icon: string; color: string; tagline: { en: string; ar: string } };
  cityName: string;
  formatDate: (date: Date) => string;
  language: string;
  index: number;
  mounted: boolean;
}) {
  const rotation = [-8, 12, -4][index % 3];

  return (
    <div
      className={`flex flex-col items-center gap-4 ${mounted ? "animate-fade-in-scale" : "opacity-0"}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="w-40 h-40 rounded-full border-4 p-1 flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
        style={{
          borderColor: design?.color || "#C41E3A",
          backgroundColor: `${design?.color}10` || "#C41E3A10",
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-dashed flex flex-col items-center justify-center" style={{ borderColor: `${design?.color}50` }}>
          <span className="text-5xl mb-1">{design?.icon || "⭐"}</span>
          <span className="text-[10px] font-black uppercase tracking-tighter arabic-text">{cityName}</span>
          <span className="text-[8px] font-bold mt-1 opacity-60">
            {formatDate(stamp.earnedAt)}
          </span>
        </div>
      </div>
      <p className="font-bold text-[#1A1A1A]">{cityName}</p>
    </div>
  );
}

// Locked Stamp Component
function LockedStamp({
  name,
  nameEn,
  language,
  level = 0,
}: {
  name: string;
  nameEn: string;
  language: string;
  level?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-4 grayscale opacity-20">
      <div className="w-40 h-40 border-4 border-dashed border-gray-400 rounded-full flex items-center justify-center p-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl mb-1">🔒</span>
          <span className="text-[10px] font-black uppercase arabic-text">{name}</span>
          <span className="text-xs font-bold">{nameEn}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500 italic">
        {level > 0
          ? language === "ar"
            ? `افتح في المستوى ${level}`
            : `Unlock in Level ${level}`
          : language === "ar"
          ? "استكشف لتفتح"
          : "Explore to unlock"}
      </p>
    </div>
  );
}
