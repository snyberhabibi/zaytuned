"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/contexts/UserProgressContext";
import type { Translatable } from "@/types";

interface CityMarker {
  id: string;
  name: Translatable;
  x: number;
  y: number;
  status: "existing" | "destroyed" | "occupied";
  region: string;
  icon: string;
}

// Coordinates are percentages relative to the SVG viewBox
const cities: CityMarker[] = [
  {
    id: "jerusalem",
    name: { ar: "القدس", en: "Jerusalem", transliteration: "Al-Quds" },
    x: 58,
    y: 62,
    status: "occupied",
    region: "jerusalem",
    icon: "🕌",
  },
  {
    id: "jaffa",
    name: { ar: "يافا", en: "Jaffa", transliteration: "Yafa" },
    x: 38,
    y: 55,
    status: "occupied",
    region: "coastal",
    icon: "🌊",
  },
  {
    id: "gaza",
    name: { ar: "غزة", en: "Gaza", transliteration: "Ghazza" },
    x: 28,
    y: 72,
    status: "existing",
    region: "gaza",
    icon: "🔥",
  },
  {
    id: "nablus",
    name: { ar: "نابلس", en: "Nablus", transliteration: "Nablus" },
    x: 52,
    y: 48,
    status: "existing",
    region: "central",
    icon: "⛰️",
  },
  {
    id: "hebron",
    name: { ar: "الخليل", en: "Hebron", transliteration: "Al-Khalil" },
    x: 52,
    y: 70,
    status: "existing",
    region: "hebron",
    icon: "🍇",
  },
  {
    id: "haifa",
    name: { ar: "حيفا", en: "Haifa", transliteration: "Haifa" },
    x: 40,
    y: 30,
    status: "occupied",
    region: "coastal",
    icon: "🏔️",
  },
  {
    id: "acre",
    name: { ar: "عكا", en: "Acre", transliteration: "Akka" },
    x: 42,
    y: 22,
    status: "occupied",
    region: "galilee",
    icon: "🏰",
  },
  {
    id: "nazareth",
    name: { ar: "الناصرة", en: "Nazareth", transliteration: "An-Nasira" },
    x: 50,
    y: 28,
    status: "existing",
    region: "galilee",
    icon: "⛪",
  },
  {
    id: "safad",
    name: { ar: "صفد", en: "Safad", transliteration: "Safad" },
    x: 54,
    y: 16,
    status: "destroyed",
    region: "galilee",
    icon: "🌄",
  },
  {
    id: "bethlehem",
    name: { ar: "بيت لحم", en: "Bethlehem", transliteration: "Bayt Lahm" },
    x: 56,
    y: 65,
    status: "existing",
    region: "jerusalem",
    icon: "⭐",
  },
  {
    id: "ramallah",
    name: { ar: "رام الله", en: "Ramallah", transliteration: "Ramallah" },
    x: 54,
    y: 56,
    status: "existing",
    region: "central",
    icon: "🏛️",
  },
  {
    id: "jenin",
    name: { ar: "جنين", en: "Jenin", transliteration: "Jenin" },
    x: 48,
    y: 38,
    status: "existing",
    region: "central",
    icon: "🌿",
  },
  {
    id: "lydd",
    name: { ar: "اللد", en: "Lydd", transliteration: "Al-Lydd" },
    x: 42,
    y: 54,
    status: "destroyed",
    region: "coastal",
    icon: "✈️",
  },
  {
    id: "ramla",
    name: { ar: "الرملة", en: "Ramla", transliteration: "Ar-Ramla" },
    x: 40,
    y: 56,
    status: "destroyed",
    region: "coastal",
    icon: "🏺",
  },
];

// MVP cities that have full content
const mvpCityIds = ["jerusalem", "jaffa", "gaza", "nablus", "hebron"];

interface PalestineMapProps {
  onCitySelect?: (cityId: string) => void;
  showProgress?: boolean;
}

export function PalestineMap({
  onCitySelect,
  showProgress = true,
}: PalestineMapProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { getCityProgress } = useUserProgress();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleCityClick = (cityId: string) => {
    if (mvpCityIds.includes(cityId)) {
      if (onCitySelect) {
        onCitySelect(cityId);
      } else {
        router.push(`/city/${cityId}`);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent, city: CityMarker) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 80,
    });
    setHoveredCity(city.id);
  };

  return (
    <div className="map-container relative">
      {/* Tooltip */}
      {hoveredCity && (
        <div
          className="absolute z-50 bg-white rounded-2xl shadow-2xl px-5 py-4 pointer-events-none transform -translate-x-1/2 animate-fade-in-scale border-2"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            borderColor: mvpCityIds.includes(hoveredCity) ? "var(--tatreez-red)" : "var(--cream-dark)"
          }}
        >
          {(() => {
            const city = cities.find((c) => c.id === hoveredCity);
            if (!city) return null;
            const progress = getCityProgress(city.id);
            const isMvp = mvpCityIds.includes(city.id);

            return (
              <>
                <div className="text-center">
                  <div className="text-3xl mb-2">{city.icon}</div>
                  <p className="font-bold text-lg text-[var(--tatreez-red)]">
                    {t(city.name)}
                  </p>
                  <p className="text-sm text-[var(--olive)] arabic-text">
                    {city.name.ar}
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)] italic">
                    {city.name.transliteration}
                  </p>
                </div>
                {showProgress && isMvp && (
                  <div className="mt-3">
                    <div className="progress-bar w-28">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-center mt-1 font-medium" style={{ color: "var(--tatreez-green)" }}>
                      {progress}% {language === "ar" ? "مكتمل" : "complete"}
                    </p>
                  </div>
                )}
                {!isMvp && (
                  <p className="text-xs text-[var(--foreground-muted)] mt-2 text-center bg-[var(--cream)] px-3 py-1 rounded-full">
                    {language === "ar" ? "قريباً" : "Coming soon"}
                  </p>
                )}
                {isMvp && (
                  <p className="text-xs text-center mt-2 font-medium" style={{ color: "var(--tatreez-red)" }}>
                    {language === "ar" ? "انقر للاستكشاف →" : "Click to explore →"}
                  </p>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Map SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--cream)" />
            <stop offset="100%" stopColor="var(--sand)" />
          </linearGradient>
          <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#4682B4" />
          </linearGradient>
          {/* Tatreez pattern for decoration */}
          <pattern
            id="tatreezPattern"
            x="0"
            y="0"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <rect width="4" height="4" fill="var(--cream)" />
            <rect
              x="0"
              y="0"
              width="2"
              height="2"
              fill="var(--tatreez-red)"
              opacity="0.1"
            />
            <rect
              x="2"
              y="2"
              width="2"
              height="2"
              fill="var(--tatreez-red)"
              opacity="0.1"
            />
          </pattern>
          {/* Glow filter for MVP cities */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Sea (Mediterranean) */}
        <rect x="0" y="0" width="35" height="100" fill="url(#seaGradient)" opacity="0.3" />

        {/* Waves animation */}
        <g opacity="0.2">
          <path d="M0 30 Q10 28 20 30 T40 30" stroke="#4682B4" strokeWidth="0.5" fill="none">
            <animate attributeName="d" dur="3s" repeatCount="indefinite"
              values="M0 30 Q10 28 20 30 T40 30;M0 30 Q10 32 20 30 T40 30;M0 30 Q10 28 20 30 T40 30"/>
          </path>
          <path d="M0 50 Q10 48 20 50 T40 50" stroke="#4682B4" strokeWidth="0.5" fill="none">
            <animate attributeName="d" dur="2.5s" repeatCount="indefinite"
              values="M0 50 Q10 48 20 50 T40 50;M0 50 Q10 52 20 50 T40 50;M0 50 Q10 48 20 50 T40 50"/>
          </path>
          <path d="M0 70 Q10 68 20 70 T40 70" stroke="#4682B4" strokeWidth="0.5" fill="none">
            <animate attributeName="d" dur="3.5s" repeatCount="indefinite"
              values="M0 70 Q10 68 20 70 T40 70;M0 70 Q10 72 20 70 T40 70;M0 70 Q10 68 20 70 T40 70"/>
          </path>
        </g>

        {/* Historic Palestine outline - simplified */}
        <path
          d="M35 5
             L60 5
             L65 15
             L68 25
             L70 40
             L72 55
             L70 70
             L65 80
             L55 90
             L40 95
             L30 90
             L25 80
             L28 65
             L30 50
             L32 35
             L33 20
             L35 5"
          fill="url(#tatreezPattern)"
          stroke="var(--olive)"
          strokeWidth="0.5"
        />

        {/* Region labels */}
        <text
          x="50"
          y="12"
          fontSize="3"
          fill="var(--olive-dark)"
          textAnchor="middle"
          fontWeight="600"
          className="select-none"
        >
          {language === "ar" ? "الجليل" : "Galilee"}
        </text>
        <text
          x="35"
          y="45"
          fontSize="3"
          fill="var(--olive-dark)"
          textAnchor="middle"
          fontWeight="600"
          className="select-none"
        >
          {language === "ar" ? "الساحل" : "Coast"}
        </text>
        <text
          x="58"
          y="50"
          fontSize="3"
          fill="var(--olive-dark)"
          textAnchor="middle"
          fontWeight="600"
          className="select-none"
        >
          {language === "ar" ? "الوسط" : "Central"}
        </text>
        <text
          x="30"
          y="78"
          fontSize="3"
          fill="var(--olive-dark)"
          textAnchor="middle"
          fontWeight="600"
          className="select-none"
        >
          {language === "ar" ? "غزة" : "Gaza"}
        </text>

        {/* City markers */}
        {cities.map((city) => {
          const isMvp = mvpCityIds.includes(city.id);
          const progress = getCityProgress(city.id);
          const isCompleted = progress === 100;
          const isHovered = hoveredCity === city.id;

          return (
            <g
              key={city.id}
              transform={`translate(${city.x}, ${city.y})`}
              className={`cursor-pointer transition-all duration-300 ${
                isMvp ? "hover:scale-150" : "opacity-50 hover:opacity-70"
              }`}
              onClick={() => handleCityClick(city.id)}
              onMouseMove={(e) => handleMouseMove(e, city)}
              onMouseLeave={() => setHoveredCity(null)}
              filter={isMvp && isHovered ? "url(#glow)" : undefined}
            >
              {/* Pulse animation for MVP cities */}
              {isMvp && !isCompleted && (
                <circle
                  r="4"
                  fill="none"
                  stroke="var(--tatreez-red)"
                  strokeWidth="0.3"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Progress ring for MVP cities */}
              {isMvp && showProgress && progress > 0 && (
                <circle
                  r="3.5"
                  fill="none"
                  stroke="var(--tatreez-green)"
                  strokeWidth="0.6"
                  strokeDasharray={`${(progress / 100) * 22} 22`}
                  transform="rotate(-90)"
                  strokeLinecap="round"
                />
              )}

              {/* City dot */}
              <circle
                r={isMvp ? 2.5 : 1.5}
                fill={
                  isCompleted
                    ? "var(--tatreez-green)"
                    : city.status === "destroyed"
                    ? "var(--charcoal)"
                    : "var(--tatreez-red)"
                }
                stroke="white"
                strokeWidth="0.5"
                className={isHovered && isMvp ? "animate-ping" : ""}
              />

              {/* Checkmark for completed cities */}
              {isCompleted && (
                <text
                  fontSize="2"
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  ✓
                </text>
              )}

              {/* City label for MVP cities */}
              {isMvp && (
                <text
                  y="6"
                  fontSize="2"
                  fill="var(--foreground)"
                  textAnchor="middle"
                  fontWeight="500"
                  className="select-none"
                >
                  {language === "ar" ? city.name.ar.slice(0, 4) : city.name.en.slice(0, 4)}
                </text>
              )}
            </g>
          );
        })}

        {/* Olive branch decoration in corner */}
        <g transform="translate(5, 88) scale(0.15)">
          <path
            d="M10 50 Q30 30 60 40 Q90 50 100 30"
            stroke="var(--olive)"
            strokeWidth="3"
            fill="none"
          />
          {/* Olive leaves */}
          <ellipse cx="25" cy="35" rx="8" ry="4" fill="var(--olive)" transform="rotate(-30 25 35)" />
          <ellipse cx="45" cy="38" rx="8" ry="4" fill="var(--olive)" transform="rotate(-15 45 38)" />
          <ellipse cx="65" cy="42" rx="8" ry="4" fill="var(--olive)" transform="rotate(10 65 42)" />
          <ellipse cx="85" cy="35" rx="8" ry="4" fill="var(--olive)" transform="rotate(30 85 35)" />
          {/* Olives */}
          <circle cx="30" cy="42" r="3" fill="var(--olive-dark)" />
          <circle cx="55" cy="45" r="3" fill="var(--olive-dark)" />
          <circle cx="78" cy="40" r="3" fill="var(--olive-dark)" />
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 text-sm shadow-lg border border-[var(--cream-dark)]">
        <p className="font-bold mb-3 text-[var(--foreground)]">
          {language === "ar" ? "دليل الخريطة" : "Map Legend"}
        </p>
        <div className="flex items-center gap-2 mb-2 group cursor-pointer">
          <span className="w-4 h-4 rounded-full bg-[var(--tatreez-red)] shadow-md group-hover:scale-110 transition-transform" />
          <span className="font-medium">{language === "ar" ? "مدينة" : "City"}</span>
        </div>
        <div className="flex items-center gap-2 mb-2 group cursor-pointer">
          <span className="w-4 h-4 rounded-full bg-[var(--tatreez-green)] shadow-md group-hover:scale-110 transition-transform" />
          <span className="font-medium">{language === "ar" ? "مكتملة" : "Completed"}</span>
        </div>
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="w-4 h-4 rounded-full bg-[var(--charcoal)] opacity-70 shadow-md group-hover:scale-110 transition-transform" />
          <span className="font-medium">{language === "ar" ? "قرية مدمرة" : "Destroyed Village"}</span>
        </div>
      </div>

      {/* Map instructions */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 text-sm shadow-lg border border-[var(--cream-dark)]">
        <p className="font-medium text-[var(--tatreez-red)] flex items-center gap-2">
          <span className="animate-bounce">👆</span>
          {language === "ar" ? "انقر على مدينة للاستكشاف" : "Click a city to explore"}
        </p>
      </div>
    </div>
  );
}
