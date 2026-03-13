"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import type { City } from "@/types";

interface HistorySectionProps {
  city: City;
}

export function HistorySection({ city }: HistorySectionProps) {
  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();

  const historySection = city.sections.find((s) => s.type === "history");

  if (!historySection) {
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
          {language === "ar" ? "📜 التاريخ" : "📜 History"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2">
          {t(historySection.content.description)}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--olive)]" />

        {historySection.content.items.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex items-start gap-4 mb-8 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--tatreez-red)] rounded-full transform -translate-x-1/2 mt-2 z-10" />

            {/* Content Card */}
            <div
              className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
              }`}
            >
              <div className="card card-tatreez">
                <h3 className="font-bold text-lg mb-2">{t(item.title)}</h3>
                <p className="text-[var(--foreground-muted)]">
                  {isKidsMode && item.kidsVersion
                    ? t(item.kidsVersion)
                    : t(item.description)}
                </p>

                {/* Deep Dive Content */}
                {!isKidsMode && item.deepDiveContent && (
                  <div className="mt-4 pt-4 border-t border-[var(--cream-dark)]">
                    <p className="text-sm text-[var(--foreground-muted)]">
                      {t(item.deepDiveContent)}
                    </p>
                  </div>
                )}

                {/* Sources */}
                {!isKidsMode && item.sources && item.sources.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-[var(--foreground-muted)]">
                      {language === "ar" ? "المصادر:" : "Sources:"}
                    </p>
                    <ul className="text-xs text-[var(--olive)]">
                      {item.sources.map((source, i) => (
                        <li key={i}>{source}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
