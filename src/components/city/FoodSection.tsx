"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import type { City } from "@/types";

interface FoodSectionProps {
  city: City;
}

export function FoodSection({ city }: FoodSectionProps) {
  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();
  const [selectedDish, setSelectedDish] = useState<string | null>(null);

  const foodSection = city.sections.find((s) => s.type === "food");

  if (!foodSection) {
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
          {language === "ar" ? "🍽️ المأكولات" : "🍽️ Cuisine"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl mx-auto">
          {t(foodSection.content.description)}
        </p>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {foodSection.content.items.map((item) => (
          <div
            key={item.id}
            className="card card-tatreez overflow-hidden group cursor-pointer"
            onClick={() =>
              setSelectedDish(selectedDish === item.id ? null : item.id)
            }
          >
            {/* Dish Image */}
            <div className="aspect-video bg-[var(--cream)] rounded-lg mb-4 overflow-hidden relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={t(item.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🍲
                </div>
              )}
              {/* Overlay badge */}
              <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
                {t(city.name)}
              </div>
            </div>

            {/* Dish Info */}
            <div>
              <h3 className="font-bold text-lg">{t(item.title)}</h3>
              <p className="text-sm arabic-text text-[var(--olive)] mb-2">
                {item.title.ar}
              </p>
              <p className="text-[var(--foreground-muted)]">
                {isKidsMode && item.kidsVersion
                  ? t(item.kidsVersion)
                  : t(item.description)}
              </p>
            </div>

            {/* Expanded Recipe Info */}
            {selectedDish === item.id && item.deepDiveContent && (
              <div className="mt-4 pt-4 border-t border-[var(--cream-dark)] animate-fade-in">
                <h4 className="font-medium text-sm text-[var(--olive-dark)] mb-2">
                  {language === "ar" ? "القصة والتقليد" : "Story & Tradition"}
                </h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {t(item.deepDiveContent)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cooking Tip */}
      <div className="card bg-[var(--olive)]/10 border border-[var(--olive)]">
        <div className="flex items-start gap-3">
          <span className="text-3xl">👩‍🍳</span>
          <div>
            <h4 className="font-bold">
              {language === "ar" ? "نصيحة من الجدة" : "Grandmother's Tip"}
            </h4>
            <p className="text-sm mt-1 text-[var(--foreground-muted)]">
              {language === "ar"
                ? "السر في الطبخ الفلسطيني هو الحب والصبر. لا تستعجل الطهي، واستخدم دائماً زيت الزيتون الفلسطيني الأصلي!"
                : "The secret to Palestinian cooking is love and patience. Never rush the cooking, and always use authentic Palestinian olive oil!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
