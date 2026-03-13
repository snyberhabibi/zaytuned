"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import type { City } from "@/types";

interface BeforeAfterSectionProps {
  city: City;
}

export function BeforeAfterSection({ city }: BeforeAfterSectionProps) {
  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const beforeAfterSection = city.sections.find((s) => s.type === "before_after");

  if (!beforeAfterSection) {
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
          {language === "ar" ? "⏳ قبل وبعد" : "⏳ Then & Now"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl mx-auto">
          {t(beforeAfterSection.content.description)}
        </p>
      </div>

      {/* Timeline Introduction */}
      <div className="card card-tatreez bg-gradient-to-br from-[var(--cream)] to-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">📅</div>
          <div>
            <h3 className="font-bold text-lg mb-2">
              {language === "ar" ? "رحلة عبر الزمن" : "Journey Through Time"}
            </h3>
            <p className="text-[var(--foreground-muted)]">
              {isKidsMode
                ? language === "ar"
                  ? "شاهد كيف كانت مدينتنا قديماً وكيف أصبحت اليوم!"
                  : "See how our city looked long ago and how it looks today!"
                : language === "ar"
                ? "استكشف التغييرات التي مرت بها هذه المدينة عبر العقود. من الحكم العثماني إلى الانتداب البريطاني، ومن نكبة 1948 إلى يومنا هذا."
                : "Explore the changes this city has undergone over the decades. From Ottoman rule to the British Mandate, from the 1948 Nakba to the present day."}
            </p>
          </div>
        </div>
      </div>

      {/* Before/After Comparisons */}
      <div className="space-y-8">
        {beforeAfterSection.content.items.map((item) => (
          <div
            key={item.id}
            className="card overflow-hidden"
          >
            <h3 className="font-bold text-lg mb-4">{t(item.title)}</h3>

            {/* Image Comparison Slider */}
            <div className="relative aspect-video bg-[var(--cream)] rounded-lg overflow-hidden mb-4">
              {/* This is a simplified slider - in production you'd use a proper comparison slider */}
              <div className="absolute inset-0 flex">
                {/* Before */}
                <div
                  className="h-full bg-[var(--charcoal)]/20 flex items-center justify-center"
                  style={{ width: `${sliderValue}%` }}
                >
                  <div className="text-center text-white p-4">
                    <p className="text-sm opacity-80">
                      {language === "ar" ? "قبل" : "Before"}
                    </p>
                    <p className="font-bold">
                      {language === "ar" ? "فلسطين التاريخية" : "Historic Palestine"}
                    </p>
                  </div>
                </div>
                {/* After */}
                <div className="flex-1 bg-[var(--cream-dark)] flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-sm opacity-80">
                      {language === "ar" ? "اليوم" : "Today"}
                    </p>
                    <p className="font-bold">
                      {language === "ar" ? "الوضع الحالي" : "Current State"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Control */}
              <div className="absolute bottom-4 left-4 right-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full accent-[var(--tatreez-red)]"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-[var(--foreground-muted)]">
              {isKidsMode && item.kidsVersion
                ? t(item.kidsVersion)
                : t(item.description)}
            </p>

            {/* Deep Dive */}
            {!isKidsMode && item.deepDiveContent && (
              <div className="mt-4 pt-4 border-t border-[var(--cream-dark)]">
                <button
                  onClick={() =>
                    setSelectedItem(selectedItem === item.id ? null : item.id)
                  }
                  className="text-sm text-[var(--tatreez-red)] font-medium"
                >
                  {selectedItem === item.id
                    ? language === "ar"
                      ? "إخفاء التفاصيل ▲"
                      : "Hide details ▲"
                    : language === "ar"
                    ? "المزيد من التفاصيل ▼"
                    : "More details ▼"}
                </button>
                {selectedItem === item.id && (
                  <p className="text-sm text-[var(--foreground-muted)] mt-3 animate-fade-in">
                    {t(item.deepDiveContent)}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Historical Timeline */}
      <div className="card bg-[var(--cream)]">
        <h3 className="font-bold mb-4 text-center">
          {language === "ar" ? "الجدول الزمني" : "Timeline"}
        </h3>
        <div className="flex justify-between items-center text-sm">
          {[
            { year: "1516", label: { ar: "العثمانية", en: "Ottoman" } },
            { year: "1917", label: { ar: "الانتداب", en: "Mandate" } },
            { year: "1948", label: { ar: "النكبة", en: "Nakba" } },
            { year: "1967", label: { ar: "النكسة", en: "Naksa" } },
            { year: language === "ar" ? "اليوم" : "Today", label: { ar: "الحاضر", en: "Present" } },
          ].map((period, index) => (
            <div key={index} className="text-center">
              <div className="w-3 h-3 bg-[var(--tatreez-red)] rounded-full mx-auto mb-1" />
              <p className="font-bold">{period.year}</p>
              <p className="text-xs text-[var(--foreground-muted)]">
                {language === "ar" ? period.label.ar : period.label.en}
              </p>
            </div>
          ))}
        </div>
        <div className="h-0.5 bg-[var(--olive)] -mt-[2.75rem] mx-1.5" />
      </div>

      {/* Memory Note */}
      <div className="card bg-[var(--tatreez-red)]/10 border border-[var(--tatreez-red)]">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💭</span>
          <div>
            <h4 className="font-bold">
              {language === "ar" ? "لن ننسى" : "We Remember"}
            </h4>
            <p className="text-sm mt-1">
              {language === "ar"
                ? "نحفظ ذاكرة أرضنا ومدننا وقرانا. كل حجر يحكي قصة، وكل شجرة زيتون شاهدة على تاريخنا."
                : "We preserve the memory of our land, cities, and villages. Every stone tells a story, and every olive tree witnesses our history."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
