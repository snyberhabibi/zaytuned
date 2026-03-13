"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { City } from "@/types";

interface SayingsSectionProps {
  city: City;
}

export function SayingsSection({ city }: SayingsSectionProps) {
  const { language, t } = useLanguage();
  const [expandedSaying, setExpandedSaying] = useState<string | null>(null);

  const sayingsSection = city.sections.find((s) => s.type === "sayings");

  if (!sayingsSection) {
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
          {language === "ar" ? "💬 الأمثال الشعبية" : "💬 Proverbs & Sayings"}
        </h2>
        <p className="text-[var(--foreground-muted)] mt-2 max-w-2xl mx-auto">
          {t(sayingsSection.content.description)}
        </p>
      </div>

      {/* Introduction */}
      <div className="card card-tatreez bg-gradient-to-br from-[var(--cream)] to-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">📜</div>
          <div>
            <h3 className="font-bold text-lg mb-2">
              {language === "ar" ? "حكمة الأجداد" : "Wisdom of the Ancestors"}
            </h3>
            <p className="text-[var(--foreground-muted)]">
              {language === "ar"
                ? "الأمثال الشعبية الفلسطينية تحمل حكمة الأجيال. كل مثل يحكي قصة ويعلم درساً من دروس الحياة."
                : "Palestinian proverbs carry the wisdom of generations. Each saying tells a story and teaches a life lesson."}
            </p>
          </div>
        </div>
      </div>

      {/* Sayings List */}
      <div className="space-y-4">
        {sayingsSection.content.items.map((item) => (
          <div
            key={item.id}
            className="card hover:shadow-lg transition-all cursor-pointer"
            onClick={() =>
              setExpandedSaying(expandedSaying === item.id ? null : item.id)
            }
          >
            {/* Arabic Proverb */}
            <blockquote className="text-xl arabic-text text-[var(--tatreez-red)] font-medium mb-2 leading-relaxed">
              "{item.title.ar}"
            </blockquote>

            {/* Transliteration */}
            <p className="text-sm text-[var(--foreground-muted)] italic mb-3">
              {item.title.transliteration}
            </p>

            {/* English Translation */}
            <p className="text-[var(--foreground)]">
              "{item.title.en}"
            </p>

            {/* Meaning & Context */}
            {expandedSaying === item.id && (
              <div className="mt-4 pt-4 border-t border-[var(--cream-dark)] animate-fade-in">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-[var(--olive-dark)]">
                      {language === "ar" ? "المعنى" : "Meaning"}
                    </h4>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      {t(item.description)}
                    </p>
                  </div>
                  {item.deepDiveContent && (
                    <div>
                      <h4 className="font-medium text-sm text-[var(--olive-dark)]">
                        {language === "ar" ? "متى نستخدمه" : "When to use it"}
                      </h4>
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {t(item.deepDiveContent)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Expand Indicator */}
            <div className="mt-3 text-center">
              <span className="text-xs text-[var(--olive)]">
                {expandedSaying === item.id
                  ? language === "ar"
                    ? "اضغط للإغلاق ▲"
                    : "Click to collapse ▲"
                  : language === "ar"
                  ? "اضغط للمزيد ▼"
                  : "Click for more ▼"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Share a Saying */}
      <div className="card bg-[var(--gold)]/10 border-2 border-[var(--gold)]">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="font-bold">
              {language === "ar" ? "شارك المثل" : "Share a Proverb"}
            </h4>
            <p className="text-sm mt-1">
              {language === "ar"
                ? "هل تعرف أمثالاً شعبية أخرى من هذه المدينة؟ شاركها مع عائلتك واحفظوها معاً!"
                : "Do you know other proverbs from this city? Share them with your family and learn them together!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
