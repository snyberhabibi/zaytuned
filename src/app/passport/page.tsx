"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/contexts/UserProgressContext";
import { getAllCities } from "@/data/cities";
import type { City, Badge as BadgeType, PassportStamp } from "@/types";

// City data map for stamp designs
const CITY_STAMP_DESIGNS: Record<string, { icon: string; color: string; tagline: { en: string; ar: string } }> = {
  jerusalem: {
    icon: "dome",
    color: "#C41E3A",
    tagline: { en: "Holy City", ar: "المدينة المقدسة" }
  },
  jaffa: {
    icon: "waves",
    color: "#228B22",
    tagline: { en: "Bride of the Sea", ar: "عروس البحر" }
  },
  gaza: {
    icon: "phoenix",
    color: "#1A1A1A",
    tagline: { en: "City of Resilience", ar: "مدينة الصمود" }
  },
  nablus: {
    icon: "mountain",
    color: "#556B2F",
    tagline: { en: "Mountain of Fire", ar: "جبل النار" }
  },
  hebron: {
    icon: "grapes",
    color: "#8B0000",
    tagline: { en: "City of the Patriarchs", ar: "مدينة الخليل" }
  },
};

// Badge icons mapping
const BADGE_ICONS: Record<string, string> = {
  explorer: "compass",
  historian: "scroll",
  chef: "utensils",
  linguist: "language",
  artist: "palette",
  quiz_master: "trophy",
  first_city: "flag",
  all_cities: "globe",
};

export default function PassportPage() {
  const { language, t, isRTL } = useLanguage();
  const { progress, isLoading, totalPoints } = useUserProgress();
  const [currentPage, setCurrentPage] = useState<"cover" | "stamps" | "badges" | "stats">("cover");
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const cities = getAllCities();

  const translations = {
    title: { en: "My Palestinian Heritage Passport", ar: "جواز سفري التراثي الفلسطيني", transliteration: "" },
    coverTitle: { en: "Palestinian Heritage", ar: "التراث الفلسطيني", transliteration: "" },
    passport: { en: "PASSPORT", ar: "جواز سفر", transliteration: "" },
    stamps: { en: "My Stamps", ar: "طوابعي", transliteration: "" },
    badges: { en: "My Badges", ar: "شاراتي", transliteration: "" },
    statistics: { en: "My Journey", ar: "رحلتي", transliteration: "" },
    totalPoints: { en: "Total Points", ar: "مجموع النقاط", transliteration: "" },
    citiesExplored: { en: "Cities Explored", ar: "المدن المستكشفة", transliteration: "" },
    badgesEarned: { en: "Badges Earned", ar: "الشارات المكتسبة", transliteration: "" },
    stampsCollected: { en: "Stamps Collected", ar: "الطوابع المجمعة", transliteration: "" },
    generateCard: { en: "Generate Heritage Card", ar: "إنشاء بطاقة التراث", transliteration: "" },
    shareJourney: { en: "Share Your Journey", ar: "شارك رحلتك", transliteration: "" },
    noStampsYet: { en: "Start exploring cities to collect stamps!", ar: "ابدأ باستكشاف المدن لجمع الطوابع!", transliteration: "" },
    noBadgesYet: { en: "Complete challenges to earn badges!", ar: "أكمل التحديات لكسب الشارات!", transliteration: "" },
    earnedOn: { en: "Earned on", ar: "حصلت عليها في", transliteration: "" },
    back: { en: "Back", ar: "رجوع", transliteration: "" },
    viewPassport: { en: "Open Passport", ar: "افتح الجواز", transliteration: "" },
    downloadCard: { en: "Download Card", ar: "تحميل البطاقة", transliteration: "" },
    close: { en: "Close", ar: "إغلاق", transliteration: "" },
    heritageExplorer: { en: "Heritage Explorer", ar: "مستكشف التراث", transliteration: "" },
    journeyStarted: { en: "Journey Started", ar: "بدأت الرحلة", transliteration: "" },
    loading: { en: "Loading your passport...", ar: "جارٍ تحميل جوازك...", transliteration: "" },
  };

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

  const generateHeritageCard = useCallback(async () => {
    setIsGeneratingCard(true);
    // Simulate card generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGeneratingCard(false);
    setShowCardModal(true);
  }, []);

  const downloadCard = useCallback(() => {
    // In a real app, this would use html2canvas or similar
    alert(language === "ar" ? "سيتم تحميل البطاقة قريباً!" : "Card download coming soon!");
  }, [language]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center tatreez-pattern-bg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[var(--tatreez-red)] border-t-transparent animate-spin" />
          <p className="text-lg" style={{ color: "var(--foreground-muted)" }}>
            {t(translations.loading)}
          </p>
        </div>
      </div>
    );
  }

  // Passport Cover Component
  const PassportCover = () => (
    <div
      className="relative w-full max-w-sm mx-auto aspect-[3/4] cursor-pointer group"
      onClick={() => setCurrentPage("stamps")}
    >
      {/* Passport book */}
      <div
        className="absolute inset-0 rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, var(--tatreez-green-dark) 0%, var(--tatreez-green) 50%, var(--olive-dark) 100%)",
          border: "4px solid var(--gold)",
        }}
      >
        {/* Embossed pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L25 10H35L27 17L30 27L20 21L10 27L13 17L5 10H15Z' fill='%23DAA520' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }} />

        {/* Top olive branch decoration */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <OliveBranchSVG />
        </div>

        {/* Central emblem */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {/* Keffiyeh pattern circle */}
          <div
            className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{
              background: "var(--cream)",
              border: "4px solid var(--gold)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <span className="text-5xl">&#127477;&#127480;</span>
          </div>

          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--gold)", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            {t(translations.coverTitle)}
          </h1>
          <p
            className="text-lg tracking-[0.3em] uppercase"
            style={{ color: "var(--cream)" }}
          >
            {t(translations.passport)}
          </p>
        </div>

        {/* Bottom olive branch decoration */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180">
          <OliveBranchSVG />
        </div>

        {/* Spine effect */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.3), transparent)",
          }}
        />

        {/* Click hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "var(--cream)" }}
        >
          <p className="text-sm flex items-center gap-2">
            <span>{t(translations.viewPassport)}</span>
            <span className="animate-bounce inline-block">&rarr;</span>
          </p>
        </div>
      </div>
    </div>
  );

  // Stamps Page Component
  const StampsPage = () => (
    <div className="w-full max-w-4xl mx-auto">
      {/* Page header like passport page */}
      <div
        className="p-6 rounded-t-lg"
        style={{
          background: "var(--cream)",
          borderBottom: "2px dashed var(--olive)",
        }}
      >
        <h2 className="heading-3 text-center" style={{ color: "var(--tatreez-red)" }}>
          {t(translations.stamps)}
        </h2>
      </div>

      {/* Stamps grid */}
      <div
        className="p-8 min-h-[400px]"
        style={{
          background: "linear-gradient(to bottom, var(--cream), var(--background-secondary))",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='50' x2='100' y2='50' stroke='%23C2B280' stroke-width='0.5' stroke-dasharray='5,5'/%3E%3Cline x1='50' y1='0' x2='50' y2='100' stroke='%23C2B280' stroke-width='0.5' stroke-dasharray='5,5'/%3E%3C/svg%3E")`,
        }}
      >
        {progress?.passportStamps && progress.passportStamps.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {progress.passportStamps.map((stamp, index) => (
              <StampComponent key={stamp.cityId} stamp={stamp} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-30">&#128747;</div>
            <p className="text-lg" style={{ color: "var(--foreground-muted)" }}>
              {t(translations.noStampsYet)}
            </p>
            <Link href="/" className="btn-primary inline-block mt-4">
              {language === "ar" ? "استكشف المدن" : "Explore Cities"}
            </Link>
          </div>
        )}
      </div>

      {/* Navigation tabs */}
      <div
        className="flex border-t"
        style={{ borderColor: "var(--olive)" }}
      >
        <button
          onClick={() => setCurrentPage("cover")}
          className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
          style={{ color: "var(--foreground-muted)" }}
        >
          &#128214; {t(translations.back)}
        </button>
        <button
          onClick={() => setCurrentPage("badges")}
          className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
          style={{ borderLeft: "1px solid var(--olive)", color: "var(--tatreez-red)" }}
        >
          &#127942; {t(translations.badges)}
        </button>
        <button
          onClick={() => setCurrentPage("stats")}
          className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
          style={{ borderLeft: "1px solid var(--olive)", color: "var(--tatreez-green)" }}
        >
          &#128200; {t(translations.statistics)}
        </button>
      </div>
    </div>
  );

  // Individual Stamp Component
  const StampComponent = ({ stamp, index }: { stamp: PassportStamp; index: number }) => {
    const design = CITY_STAMP_DESIGNS[stamp.cityId] || {
      icon: "star",
      color: "var(--tatreez-red)",
      tagline: { en: "Explored", ar: "مستكشفة" }
    };

    return (
      <div
        className="passport-stamp animate-stamp relative"
        style={{
          animationDelay: `${index * 0.15}s`,
          borderColor: design.color,
          transform: `rotate(${-8 + Math.random() * 16}deg)`,
        }}
      >
        <div className="text-center">
          {/* City icon */}
          <div className="text-4xl mb-2">
            {stamp.cityId === "jerusalem" && "&#128332;"}
            {stamp.cityId === "jaffa" && "&#127754;"}
            {stamp.cityId === "gaza" && "&#128293;"}
            {stamp.cityId === "nablus" && "&#9968;"}
            {stamp.cityId === "hebron" && "&#127815;"}
            {!["jerusalem", "jaffa", "gaza", "nablus", "hebron"].includes(stamp.cityId) && "&#11088;"}
          </div>

          {/* City name */}
          <h3
            className="font-bold text-lg mb-1"
            style={{ color: design.color }}
          >
            {getCityName(stamp.cityId)}
          </h3>

          {/* Tagline */}
          <p className="text-xs italic mb-2" style={{ color: "var(--foreground-muted)" }}>
            {design.tagline[language]}
          </p>

          {/* Date */}
          <div
            className="text-xs px-2 py-1 rounded"
            style={{ background: `${design.color}20`, color: design.color }}
          >
            {formatDate(stamp.earnedAt)}
          </div>
        </div>

        {/* Decorative border dots */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{
          border: `2px dotted ${design.color}40`,
          transform: "scale(0.92)",
        }} />
      </div>
    );
  };

  // Badges Page Component
  const BadgesPage = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="p-6 rounded-t-lg"
        style={{
          background: "var(--cream)",
          borderBottom: "2px dashed var(--olive)",
        }}
      >
        <h2 className="heading-3 text-center" style={{ color: "var(--gold)" }}>
          {t(translations.badges)}
        </h2>
      </div>

      <div
        className="p-8 min-h-[400px]"
        style={{ background: "var(--background-secondary)" }}
      >
        {progress?.badges && progress.badges.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {progress.badges.map((badge, index) => (
              <BadgeComponent key={badge.id} badge={badge} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-30">&#127942;</div>
            <p className="text-lg" style={{ color: "var(--foreground-muted)" }}>
              {t(translations.noBadgesYet)}
            </p>
          </div>
        )}
      </div>

      {/* Navigation tabs */}
      <div
        className="flex border-t"
        style={{ borderColor: "var(--olive)" }}
      >
        <button
          onClick={() => setCurrentPage("stamps")}
          className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
          style={{ color: "var(--tatreez-red)" }}
        >
          &#128747; {t(translations.stamps)}
        </button>
        <button
          onClick={() => setCurrentPage("cover")}
          className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
          style={{ borderLeft: "1px solid var(--olive)", color: "var(--foreground-muted)" }}
        >
          &#128214; {t(translations.back)}
        </button>
        <button
          onClick={() => setCurrentPage("stats")}
          className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
          style={{ borderLeft: "1px solid var(--olive)", color: "var(--tatreez-green)" }}
        >
          &#128200; {t(translations.statistics)}
        </button>
      </div>
    </div>
  );

  // Individual Badge Component
  const BadgeComponent = ({ badge, index }: { badge: BadgeType; index: number }) => {
    const badgeColors: Record<string, string> = {
      city: "var(--tatreez-red)",
      quiz: "var(--gold)",
      explorer: "var(--tatreez-green)",
      special: "var(--olive)",
    };

    return (
      <div
        className="card card-tatreez text-center animate-fade-in"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Badge icon container */}
        <div
          className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-4xl"
          style={{
            background: `linear-gradient(135deg, ${badgeColors[badge.type]}, ${badgeColors[badge.type]}CC)`,
            boxShadow: `0 4px 15px ${badgeColors[badge.type]}40`,
          }}
        >
          {badge.icon || "&#127942;"}
        </div>

        {/* Badge name */}
        <h3 className="font-bold mb-1" style={{ color: "var(--foreground)" }}>
          {t(badge.name)}
        </h3>

        {/* Badge description */}
        <p className="text-sm mb-2" style={{ color: "var(--foreground-muted)" }}>
          {t(badge.description)}
        </p>

        {/* Earned date */}
        <div className="text-xs" style={{ color: badgeColors[badge.type] }}>
          {t(translations.earnedOn)} {formatDate(badge.earnedAt)}
        </div>
      </div>
    );
  };

  // Statistics Page Component
  const StatsPage = () => {
    const stats = [
      {
        label: translations.totalPoints,
        value: totalPoints,
        icon: "&#11088;",
        color: "var(--gold)",
      },
      {
        label: translations.citiesExplored,
        value: progress?.citiesCompleted.length || 0,
        total: cities.length,
        icon: "&#127961;",
        color: "var(--tatreez-red)",
      },
      {
        label: translations.stampsCollected,
        value: progress?.passportStamps.length || 0,
        total: cities.length,
        icon: "&#128747;",
        color: "var(--tatreez-green)",
      },
      {
        label: translations.badgesEarned,
        value: progress?.badges.length || 0,
        icon: "&#127942;",
        color: "var(--olive)",
      },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div
          className="p-6 rounded-t-lg"
          style={{
            background: "var(--cream)",
            borderBottom: "2px dashed var(--olive)",
          }}
        >
          <h2 className="heading-3 text-center" style={{ color: "var(--tatreez-green)" }}>
            {t(translations.statistics)}
          </h2>
        </div>

        <div
          className="p-8"
          style={{ background: "var(--background-secondary)" }}
        >
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card text-center py-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="text-4xl mb-2"
                  dangerouslySetInnerHTML={{ __html: stat.icon }}
                />
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                  {stat.total && (
                    <span className="text-lg" style={{ color: "var(--foreground-muted)" }}>
                      /{stat.total}
                    </span>
                  )}
                </div>
                <div className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                  {t(stat.label)}
                </div>
                {stat.total && (
                  <div className="progress-bar mt-3">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(stat.value / stat.total) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Journey timeline */}
          {progress?.createdAt && (
            <div className="text-center mb-8 py-4 rounded-lg" style={{ background: "var(--cream)" }}>
              <p style={{ color: "var(--foreground-muted)" }}>
                {t(translations.journeyStarted)}
              </p>
              <p className="font-bold text-lg" style={{ color: "var(--olive)" }}>
                {formatDate(progress.createdAt)}
              </p>
            </div>
          )}

          {/* Generate Heritage Card button */}
          <div className="text-center">
            <button
              onClick={generateHeritageCard}
              disabled={isGeneratingCard}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
            >
              {isGeneratingCard ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {language === "ar" ? "جاري الإنشاء..." : "Generating..."}
                </>
              ) : (
                <>
                  &#127912; {t(translations.generateCard)}
                </>
              )}
            </button>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              {t(translations.shareJourney)}
            </p>
          </div>
        </div>

        {/* Navigation tabs */}
        <div
          className="flex border-t"
          style={{ borderColor: "var(--olive)" }}
        >
          <button
            onClick={() => setCurrentPage("stamps")}
            className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
            style={{ color: "var(--tatreez-red)" }}
          >
            &#128747; {t(translations.stamps)}
          </button>
          <button
            onClick={() => setCurrentPage("badges")}
            className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
            style={{ borderLeft: "1px solid var(--olive)", color: "var(--gold)" }}
          >
            &#127942; {t(translations.badges)}
          </button>
          <button
            onClick={() => setCurrentPage("cover")}
            className="flex-1 py-3 text-center transition-colors hover:bg-[var(--cream)]"
            style={{ borderLeft: "1px solid var(--olive)", color: "var(--foreground-muted)" }}
          >
            &#128214; {t(translations.back)}
          </button>
        </div>
      </div>
    );
  };

  // Heritage Card Modal
  const HeritageCardModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={() => setShowCardModal(false)}
    >
      <div
        className="w-full max-w-md animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* The Heritage Card */}
        <div
          ref={cardRef}
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, var(--cream) 0%, var(--background-secondary) 100%)",
          }}
        >
          {/* Card Header */}
          <div
            className="p-6 text-center"
            style={{
              background: "linear-gradient(135deg, var(--tatreez-red) 0%, var(--tatreez-red-dark) 100%)",
            }}
          >
            <div className="flex justify-center mb-3">
              <OliveBranchSVG light />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {t(translations.heritageExplorer)}
            </h3>
            <p className="text-white/80 text-sm">
              Zaytuned Palestinian Heritage
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {/* User stats */}
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <div className="text-3xl font-bold" style={{ color: "var(--gold)" }}>
                  {totalPoints}
                </div>
                <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                  Points
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: "var(--tatreez-red)" }}>
                  {progress?.citiesCompleted.length || 0}
                </div>
                <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                  Cities
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: "var(--tatreez-green)" }}>
                  {progress?.badges.length || 0}
                </div>
                <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                  Badges
                </div>
              </div>
            </div>

            {/* City stamps showcase */}
            {progress?.passportStamps && progress.passportStamps.length > 0 && (
              <div className="flex justify-center gap-2 flex-wrap mb-6">
                {progress.passportStamps.slice(0, 5).map((stamp) => (
                  <div
                    key={stamp.cityId}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{
                      background: "var(--cream)",
                      border: `2px solid ${CITY_STAMP_DESIGNS[stamp.cityId]?.color || "var(--olive)"}`,
                    }}
                  >
                    {stamp.cityId === "jerusalem" && "&#128332;"}
                    {stamp.cityId === "jaffa" && "&#127754;"}
                    {stamp.cityId === "gaza" && "&#128293;"}
                    {stamp.cityId === "nablus" && "&#9968;"}
                    {stamp.cityId === "hebron" && "&#127815;"}
                  </div>
                ))}
              </div>
            )}

            {/* Tatreez border */}
            <div className="tatreez-border p-4 text-center">
              <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                {language === "ar"
                  ? "رحلة في التراث الفلسطيني"
                  : "A Journey Through Palestinian Heritage"}
              </p>
            </div>
          </div>

          {/* Card Footer */}
          <div
            className="p-4 text-center"
            style={{ background: "var(--tatreez-black)" }}
          >
            <p className="text-white/60 text-xs">zaytuned.app</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={downloadCard}
            className="btn-primary flex-1"
          >
            &#128229; {t(translations.downloadCard)}
          </button>
          <button
            onClick={() => setShowCardModal(false)}
            className="btn-secondary flex-1"
          >
            {t(translations.close)}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen tatreez-pattern-bg py-8 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--foreground-muted)" }}
          >
            <span>{isRTL ? "&larr;" : "&larr;"}</span>
            {language === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <h1 className="heading-2 text-center" style={{ color: "var(--tatreez-red)" }}>
            {t(translations.title)}
          </h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main content */}
      <div className="flex justify-center">
        {currentPage === "cover" && <PassportCover />}
        {currentPage === "stamps" && <StampsPage />}
        {currentPage === "badges" && <BadgesPage />}
        {currentPage === "stats" && <StatsPage />}
      </div>

      {/* Heritage Card Modal */}
      {showCardModal && <HeritageCardModal />}
    </main>
  );
}

// Olive Branch SVG Component
function OliveBranchSVG({ light = false }: { light?: boolean }) {
  const color = light ? "#FFF8DC" : "#556B2F";
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left branch */}
      <path
        d="M10 20 Q30 15 50 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Left leaves */}
      <ellipse cx="20" cy="15" rx="8" ry="4" fill={color} transform="rotate(-30 20 15)" />
      <ellipse cx="30" cy="12" rx="8" ry="4" fill={color} transform="rotate(-20 30 12)" />
      <ellipse cx="40" cy="14" rx="8" ry="4" fill={color} transform="rotate(-10 40 14)" />
      <ellipse cx="25" cy="25" rx="8" ry="4" fill={color} transform="rotate(30 25 25)" />
      <ellipse cx="35" cy="26" rx="8" ry="4" fill={color} transform="rotate(20 35 26)" />

      {/* Right branch */}
      <path
        d="M110 20 Q90 15 70 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Right leaves */}
      <ellipse cx="100" cy="15" rx="8" ry="4" fill={color} transform="rotate(30 100 15)" />
      <ellipse cx="90" cy="12" rx="8" ry="4" fill={color} transform="rotate(20 90 12)" />
      <ellipse cx="80" cy="14" rx="8" ry="4" fill={color} transform="rotate(10 80 14)" />
      <ellipse cx="95" cy="25" rx="8" ry="4" fill={color} transform="rotate(-30 95 25)" />
      <ellipse cx="85" cy="26" rx="8" ry="4" fill={color} transform="rotate(-20 85 26)" />

      {/* Center olives */}
      <circle cx="60" cy="20" r="5" fill={color} />
      <circle cx="55" cy="18" r="4" fill={color} opacity="0.8" />
      <circle cx="65" cy="18" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}
