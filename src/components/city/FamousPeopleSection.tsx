"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import type { City } from "@/types";

interface FamousPeopleSectionProps {
  city: City;
}

export function FamousPeopleSection({ city }: FamousPeopleSectionProps) {
  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const famousSection = city.sections.find((s) => s.type === "famous_people");

  if (!famousSection) {
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
          {language === "ar" ? "⭐ شخصيات بارزة" : "⭐ Notable Figures"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl mx-auto">
          {t(famousSection.content.description)}
        </p>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {famousSection.content.items.map((item) => (
          <div
            key={item.id}
            className={`card card-tatreez overflow-hidden cursor-pointer transition-all ${
              selectedPerson === item.id ? "ring-2 ring-[var(--tatreez-red)]" : ""
            }`}
            onClick={() =>
              setSelectedPerson(selectedPerson === item.id ? null : item.id)
            }
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[var(--cream)] flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={t(item.title)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{t(item.title)}</h3>
                <p className="text-sm arabic-text text-[var(--olive)]">
                  {item.title.ar}
                </p>
                <p className="text-sm text-[var(--foreground-muted)] mt-2">
                  {isKidsMode && item.kidsVersion
                    ? t(item.kidsVersion)
                    : t(item.description)}
                </p>
              </div>
            </div>

            {/* Expanded Biography */}
            {selectedPerson === item.id && item.deepDiveContent && !isKidsMode && (
              <div className="mt-4 pt-4 border-t border-[var(--cream-dark)] animate-fade-in">
                <h4 className="font-medium text-sm text-[var(--olive-dark)] mb-2">
                  {language === "ar" ? "السيرة الذاتية" : "Biography"}
                </h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {t(item.deepDiveContent)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Inspiration Card */}
      <div className="card bg-gradient-to-r from-[var(--olive)] to-[var(--olive-dark)] text-white">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">
            {language === "ar"
              ? "\"من لا ماضي له، لا حاضر له ولا مستقبل\""
              : '"Who has no past, has no present or future"'}
          </p>
          <p className="text-white/80 text-sm">
            {language === "ar" ? "مثل فلسطيني" : "Palestinian Proverb"}
          </p>
        </div>
      </div>
    </div>
  );
}
