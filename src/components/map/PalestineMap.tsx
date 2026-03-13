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
  },
  {
    id: "jaffa",
    name: { ar: "يافا", en: "Jaffa", transliteration: "Yafa" },
    x: 38,
    y: 55,
    status: "occupied",
    region: "coastal",
  },
  {
    id: "gaza",
    name: { ar: "غزة", en: "Gaza", transliteration: "Ghazza" },
    x: 28,
    y: 72,
    status: "existing",
    region: "gaza",
  },
  {
    id: "nablus",
    name: { ar: "نابلس", en: "Nablus", transliteration: "Nablus" },
    x: 52,
    y: 48,
    status: "existing",
    region: "central",
  },
  {
    id: "hebron",
    name: { ar: "الخليل", en: "Hebron", transliteration: "Al-Khalil" },
    x: 52,
    y: 70,
    status: "existing",
    region: "hebron",
  },
  {
    id: "haifa",
    name: { ar: "حيفا", en: "Haifa", transliteration: "Haifa" },
    x: 40,
    y: 30,
    status: "occupied",
    region: "coastal",
  },
  {
    id: "acre",
    name: { ar: "عكا", en: "Acre", transliteration: "Akka" },
    x: 42,
    y: 22,
    status: "occupied",
    region: "galilee",
  },
  {
    id: "nazareth",
    name: { ar: "الناصرة", en: "Nazareth", transliteration: "An-Nasira" },
    x: 50,
    y: 28,
    status: "existing",
    region: "galilee",
  },
  {
    id: "safad",
    name: { ar: "صفد", en: "Safad", transliteration: "Safad" },
    x: 54,
    y: 16,
    status: "destroyed",
    region: "galilee",
  },
  {
    id: "bethlehem",
    name: { ar: "بيت لحم", en: "Bethlehem", transliteration: "Bayt Lahm" },
    x: 56,
    y: 65,
    status: "existing",
    region: "jerusalem",
  },
  {
    id: "ramallah",
    name: { ar: "رام الله", en: "Ramallah", transliteration: "Ramallah" },
    x: 54,
    y: 56,
    status: "existing",
    region: "central",
  },
  {
    id: "jenin",
    name: { ar: "جنين", en: "Jenin", transliteration: "Jenin" },
    x: 48,
    y: 38,
    status: "existing",
    region: "central",
  },
  {
    id: "lydd",
    name: { ar: "اللد", en: "Lydd", transliteration: "Al-Lydd" },
    x: 42,
    y: 54,
    status: "destroyed",
    region: "coastal",
  },
  {
    id: "ramla",
    name: { ar: "الرملة", en: "Ramla", transliteration: "Ar-Ramla" },
    x: 40,
    y: 56,
    status: "destroyed",
    region: "coastal",
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
      y: e.clientY - rect.top - 60,
    });
    setHoveredCity(city.id);
  };

  return (
    <div className="map-container relative">
      {/* Tooltip */}
      {hoveredCity && (
        <div
          className="absolute z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2 pointer-events-none transform -translate-x-1/2 animate-fade-in"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          {(() => {
            const city = cities.find((c) => c.id === hoveredCity);
            if (!city) return null;
            const progress = getCityProgress(city.id);
            const isMvp = mvpCityIds.includes(city.id);

            return (
              <>
                <div className="text-center">
                  <p className="font-bold text-[var(--tatreez-red)]">
                    {t(city.name)}
                  </p>
                  <p className="text-sm text-gray-500 arabic-text">
                    {city.name.ar}
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    {city.name.transliteration}
                  </p>
                </div>
                {showProgress && isMvp && (
                  <div className="mt-2">
                    <div className="progress-bar w-24">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-center mt-1">{progress}%</p>
                  </div>
                )}
                {!isMvp && (
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    Coming soon
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
        </defs>

        {/* Sea (Mediterranean) */}
        <rect x="0" y="0" width="35" height="100" fill="url(#seaGradient)" opacity="0.3" />

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
          fontWeight="500"
        >
          {language === "ar" ? "الجليل" : "Galilee"}
        </text>
        <text
          x="35"
          y="45"
          fontSize="3"
          fill="var(--olive-dark)"
          textAnchor="middle"
          fontWeight="500"
        >
          {language === "ar" ? "الساحل" : "Coast"}
        </text>
        <text
          x="58"
          y="50"
          fontSize="3"
          fill="var(--olive-dark)"
          textAnchor="middle"
          fontWeight="500"
        >
          {language === "ar" ? "الوسط" : "Central"}
        </text>
        <text
          x="30"
          y="78"
          fontSize="3"
          fill="var(--olive-dark)"
          textAnchor="middle"
          fontWeight="500"
        >
          {language === "ar" ? "غزة" : "Gaza"}
        </text>

        {/* City markers */}
        {cities.map((city) => {
          const isMvp = mvpCityIds.includes(city.id);
          const progress = getCityProgress(city.id);
          const isCompleted = progress === 100;

          return (
            <g
              key={city.id}
              transform={`translate(${city.x}, ${city.y})`}
              className={`cursor-pointer transition-transform ${
                isMvp ? "hover:scale-125" : "opacity-50"
              }`}
              onClick={() => handleCityClick(city.id)}
              onMouseMove={(e) => handleMouseMove(e, city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              {/* Progress ring for MVP cities */}
              {isMvp && showProgress && progress > 0 && (
                <circle
                  r="3.5"
                  fill="none"
                  stroke="var(--tatreez-green)"
                  strokeWidth="0.5"
                  strokeDasharray={`${(progress / 100) * 22} 22`}
                  transform="rotate(-90)"
                />
              )}
              {/* City dot */}
              <circle
                r="2"
                fill={
                  isCompleted
                    ? "var(--tatreez-green)"
                    : city.status === "destroyed"
                    ? "var(--charcoal)"
                    : "var(--tatreez-red)"
                }
                stroke="white"
                strokeWidth="0.5"
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
            </g>
          );
        })}

        {/* Olive branch decoration in corner */}
        <g transform="translate(5, 90) scale(0.15)">
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
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 text-sm">
        <p className="font-semibold mb-2">
          {language === "ar" ? "دليل الخريطة" : "Map Legend"}
        </p>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[var(--tatreez-red)]" />
          <span>{language === "ar" ? "مدينة" : "City"}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[var(--tatreez-green)]" />
          <span>{language === "ar" ? "مكتملة" : "Completed"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--charcoal)] opacity-70" />
          <span>{language === "ar" ? "قرية مدمرة" : "Destroyed Village"}</span>
        </div>
      </div>
    </div>
  );
}
