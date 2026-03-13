"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import type { City } from "@/types";

interface TatreezSectionProps {
  city: City;
}

export function TatreezSection({ city }: TatreezSectionProps) {
  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  const tatreezSection = city.sections.find((s) => s.type === "tatreez");

  if (!tatreezSection) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--foreground-muted)]">
          {language === "ar" ? "قريباً..." : "Coming soon..."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="heading-2 text-[var(--tatreez-red)]">
          {language === "ar" ? "🧵 التطريز" : "🧵 Tatreez"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl mx-auto">
          {t(tatreezSection.content.description)}
        </p>
      </div>

      {/* Introduction Card */}
      <div className="card card-tatreez bg-gradient-to-br from-[var(--cream)] to-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🪡</div>
          <div>
            <h3 className="font-bold text-lg mb-2">
              {language === "ar"
                ? "ما هو التطريز الفلسطيني؟"
                : "What is Palestinian Tatreez?"}
            </h3>
            <p className="text-[var(--foreground-muted)]">
              {language === "ar"
                ? "التطريز الفلسطيني هو فن تقليدي يعود لآلاف السنين. كل منطقة في فلسطين لها أنماطها وألوانها المميزة التي تحكي قصة المكان وتراثه."
                : "Palestinian tatreez is a traditional embroidery art dating back thousands of years. Each region in Palestine has distinctive patterns and colors that tell the story of the place and its heritage."}
            </p>
          </div>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tatreezSection.content.items.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              setSelectedPattern(selectedPattern === item.id ? null : item.id)
            }
            className={`card text-left transition-all ${
              selectedPattern === item.id
                ? "ring-2 ring-[var(--tatreez-red)] shadow-lg"
                : "hover:shadow-lg"
            }`}
          >
            {/* Pattern Preview */}
            <div className="aspect-square bg-[var(--cream)] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={t(item.title)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl opacity-50">🧵</div>
              )}
            </div>

            <h3 className="font-bold text-lg">{t(item.title)}</h3>
            <p className="text-sm text-[var(--foreground-muted)] mt-1">
              {isKidsMode && item.kidsVersion
                ? t(item.kidsVersion)
                : t(item.description)}
            </p>

            {/* Expanded Details */}
            {selectedPattern === item.id && item.deepDiveContent && !isKidsMode && (
              <div className="mt-4 pt-4 border-t border-[var(--cream-dark)] animate-fade-in">
                <h4 className="font-medium text-sm text-[var(--olive-dark)] mb-2">
                  {language === "ar" ? "المعنى والرمزية" : "Meaning & Symbolism"}
                </h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {t(item.deepDiveContent)}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Colors Legend */}
      <div className="card bg-[var(--cream)]">
        <h3 className="font-bold mb-4">
          {language === "ar" ? "الألوان التقليدية" : "Traditional Colors"}
        </h3>
        <div className="flex flex-wrap gap-4">
          {[
            { color: "#C41E3A", name: { ar: "أحمر - الفرح والحب", en: "Red - Joy & Love" } },
            { color: "#1A1A1A", name: { ar: "أسود - الأرض", en: "Black - The Land" } },
            { color: "#228B22", name: { ar: "أخضر - الزيتون", en: "Green - Olive Trees" } },
            { color: "#DAA520", name: { ar: "ذهبي - الحصاد", en: "Gold - Harvest" } },
          ].map((item) => (
            <div key={item.color} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">
                {language === "ar" ? item.name.ar : item.name.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Fact for Kids */}
      {isKidsMode && (
        <div className="card bg-[var(--gold)]/10 border-2 border-[var(--gold)]">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🌟</span>
            <div>
              <h4 className="font-bold">
                {language === "ar" ? "هل تعلم؟" : "Did you know?"}
              </h4>
              <p className="text-sm mt-1">
                {language === "ar"
                  ? "كانت الجدات قديماً يعلمن بناتهن التطريز منذ سن صغيرة، وكان الثوب المطرز جزءاً مهماً من جهاز العروس!"
                  : "Grandmothers used to teach their daughters embroidery from a young age, and the embroidered dress was an important part of a bride's trousseau!"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
