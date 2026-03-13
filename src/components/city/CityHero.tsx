"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { City } from "@/types";

interface CityHeroProps {
  city: City;
}

export function CityHero({ city }: CityHeroProps) {
  const { language, t } = useLanguage();

  return (
    <section className="relative h-64 md:h-80 overflow-hidden">
      {/* Background gradient as placeholder */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--tatreez-red)] via-[var(--olive)] to-[var(--tatreez-green)]"
        style={{
          backgroundImage: city.heroImage ? `url(${city.heroImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/80 text-sm mb-1">
            {city.name.transliteration}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {t(city.name)}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 arabic-text font-arabic">
            {city.name.ar}
          </p>
          <p className="text-white/80 mt-3 max-w-2xl">
            {t(city.description)}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            {city.established && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-white/80 text-xs">
                  {language === "ar" ? "تأسست" : "Est."}
                </span>
                <span className="text-white font-medium ml-1">
                  {city.established}
                </span>
              </div>
            )}
            {city.population?.pre1948 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-white/80 text-xs">
                  {language === "ar" ? "السكان ١٩٤٨" : "Pop. 1948"}
                </span>
                <span className="text-white font-medium ml-1">
                  {city.population.pre1948.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Tatreez Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--tatreez-red)] via-[var(--tatreez-black)] to-[var(--tatreez-green)]" />
    </section>
  );
}
