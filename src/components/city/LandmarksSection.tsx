"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import type { City } from "@/types";

interface LandmarksSectionProps {
  city: City;
}

export function LandmarksSection({ city }: LandmarksSectionProps) {
  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);

  const landmarksSection = city.sections.find((s) => s.type === "landmarks");

  if (!landmarksSection) {
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
          {language === "ar" ? "🏛️ المعالم" : "🏛️ Landmarks"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl mx-auto">
          {t(landmarksSection.content.description)}
        </p>
      </div>

      {/* Landmarks Grid */}
      <div className="grid grid-cols-1 gap-6">
        {landmarksSection.content.items.map((item) => (
          <div
            key={item.id}
            className={`card card-tatreez overflow-hidden transition-all cursor-pointer ${
              selectedLandmark === item.id ? "ring-2 ring-[var(--tatreez-red)]" : ""
            }`}
            onClick={() =>
              setSelectedLandmark(selectedLandmark === item.id ? null : item.id)
            }
          >
            <div className="md:flex gap-6">
              {/* Image */}
              <div className="md:w-1/3 aspect-video md:aspect-square bg-[var(--cream)] rounded-lg overflow-hidden mb-4 md:mb-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={t(item.title)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🏛️
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="md:w-2/3">
                <h3 className="font-bold text-xl">{t(item.title)}</h3>
                <p className="text-sm arabic-text text-[var(--olive)] mb-3">
                  {item.title.ar}
                </p>
                <p className="text-[var(--foreground-muted)]">
                  {isKidsMode && item.kidsVersion
                    ? t(item.kidsVersion)
                    : t(item.description)}
                </p>

                {/* Expanded Content */}
                {selectedLandmark === item.id && item.deepDiveContent && !isKidsMode && (
                  <div className="mt-4 pt-4 border-t border-[var(--cream-dark)] animate-fade-in">
                    <h4 className="font-medium text-sm text-[var(--olive-dark)] mb-2">
                      {language === "ar" ? "الأهمية التاريخية" : "Historical Significance"}
                    </h4>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      {t(item.deepDiveContent)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Virtual Tour CTA */}
      <div className="card bg-gradient-to-r from-[var(--tatreez-red)] to-[var(--tatreez-red-dark)] text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">
              {language === "ar" ? "جولة افتراضية" : "Virtual Tour"}
            </h3>
            <p className="text-white/80 text-sm mt-1">
              {language === "ar"
                ? "قريباً: استكشف المعالم بتقنية 360°"
                : "Coming soon: Explore landmarks in 360°"}
            </p>
          </div>
          <div className="text-4xl">🎥</div>
        </div>
      </div>
    </div>
  );
}
