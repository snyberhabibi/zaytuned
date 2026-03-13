"use client";

import type { SectionType, Language } from "@/types";

interface Section {
  id: SectionType;
  icon: string;
  labelEn: string;
  labelAr: string;
}

interface CityNavProps {
  sections: Section[];
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  language: Language;
}

export function CityNav({
  sections,
  activeSection,
  onSectionChange,
  language,
}: CityNavProps) {
  return (
    <nav className="sticky top-14 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[var(--cream-dark)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex overflow-x-auto scrollbar-hide py-2 px-4 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? "bg-[var(--tatreez-red)] text-white shadow-md"
                  : "bg-[var(--cream)] hover:bg-[var(--cream-dark)] text-[var(--foreground)]"
              }`}
            >
              <span>{section.icon}</span>
              <span className="text-sm font-medium">
                {language === "ar" ? section.labelAr : section.labelEn}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
