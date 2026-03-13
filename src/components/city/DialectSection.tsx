"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import type { City } from "@/types";

interface DialectSectionProps {
  city: City;
}

export function DialectSection({ city }: DialectSectionProps) {
  const { language, t } = useLanguage();
  const { isKidsMode } = useContentMode();
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const dialectSection = city.sections.find((s) => s.type === "dialect");

  if (!dialectSection) {
    return (
      <div className="text-center py-8">
        <p className="text-[var(--foreground-muted)]">
          {language === "ar" ? "قريباً..." : "Coming soon..."}
        </p>
      </div>
    );
  }

  const playAudio = (audioUrl: string | undefined, itemId: string) => {
    if (!audioUrl) return;
    // In real implementation, this would play the audio
    setPlayingAudio(itemId);
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="heading-2 text-[var(--tatreez-red)]">
          {language === "ar" ? "🗣️ اللهجة" : "🗣️ Dialect"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl mx-auto">
          {t(dialectSection.content.description)}
        </p>
      </div>

      {/* Dialect Introduction */}
      <div className="card card-tatreez bg-gradient-to-br from-[var(--cream)] to-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎤</div>
          <div>
            <h3 className="font-bold text-lg mb-2">
              {language === "ar"
                ? `لهجة ${city.name.ar}`
                : `${t(city.name)} Dialect`}
            </h3>
            <p className="text-[var(--foreground-muted)]">
              {language === "ar"
                ? "كل مدينة فلسطينية لها لهجتها المميزة وكلماتها الخاصة. تعلم كيف يتحدث أهل هذه المدينة!"
                : "Every Palestinian city has its distinctive dialect and special words. Learn how the people of this city speak!"}
            </p>
          </div>
        </div>
      </div>

      {/* Words & Phrases */}
      <div className="space-y-4">
        <h3 className="heading-3">
          {language === "ar" ? "كلمات وعبارات" : "Words & Phrases"}
        </h3>

        {dialectSection.content.items.map((item) => (
          <div
            key={item.id}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Word in Arabic */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold arabic-text text-[var(--tatreez-red)]">
                    {item.title.ar}
                  </span>
                  <span className="text-sm text-[var(--foreground-muted)] italic">
                    ({item.title.transliteration})
                  </span>
                </div>

                {/* Meaning */}
                <p className="text-[var(--foreground)]">
                  {t(item.description)}
                </p>

                {/* Usage example if available */}
                {item.deepDiveContent && (
                  <p className="text-sm text-[var(--olive)] mt-2 italic">
                    "{t(item.deepDiveContent)}"
                  </p>
                )}
              </div>

              {/* Audio Button */}
              <button
                onClick={() => playAudio(item.audio, item.id)}
                className={`ml-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  playingAudio === item.id
                    ? "bg-[var(--tatreez-green)] text-white animate-pulse"
                    : "bg-[var(--cream)] hover:bg-[var(--cream-dark)]"
                }`}
              >
                {playingAudio === item.id ? "🔊" : "🔈"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialect Comparison */}
      {!isKidsMode && (
        <div className="card bg-[var(--cream)]">
          <h3 className="font-bold mb-4">
            {language === "ar"
              ? "كيف تختلف عن المدن الأخرى؟"
              : "How does it differ from other cities?"}
          </h3>
          <p className="text-sm text-[var(--foreground-muted)]">
            {language === "ar"
              ? "اللهجات الفلسطينية متنوعة وغنية. كل منطقة لها نطقها الخاص وكلماتها المميزة. مثلاً، قد تختلف طريقة نطق حرف القاف من مدينة لأخرى."
              : "Palestinian dialects are diverse and rich. Each region has its own pronunciation and distinctive words. For example, the pronunciation of the letter 'qaf' may differ from city to city."}
          </p>
        </div>
      )}

      {/* Fun Challenge */}
      <div className="card bg-[var(--gold)]/10 border-2 border-[var(--gold)]">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h4 className="font-bold">
              {language === "ar" ? "تحدي اللهجة" : "Dialect Challenge"}
            </h4>
            <p className="text-sm mt-1">
              {language === "ar"
                ? "حاول استخدام هذه الكلمات مع عائلتك! هل يعرفون من أي مدينة هذه اللهجة؟"
                : "Try using these words with your family! Can they guess which city this dialect is from?"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
