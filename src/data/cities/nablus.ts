import type { City } from "@/types";

export const nablusData: City = {
  id: "nablus",
  name: { ar: "نابلس", en: "Nablus", transliteration: "Nablus" },
  region: "central",
  coordinates: { lat: 32.2211, lng: 35.2544 },
  description: { ar: "نابلس، جبل النار", en: "Nablus, Mountain of Fire", transliteration: "" },
  heroImage: "/images/cities/nablus-hero.jpg",
  population: { pre1948: 25000, current: 150000 },
  established: "72 CE",
  status: "existing",
  sections: [
    { type: "history", content: { title: { ar: "تاريخ نابلس", en: "History of Nablus", transliteration: "" }, description: { ar: "رحلة عبر جبل النار", en: "Journey through the Mountain of Fire", transliteration: "" }, items: [] } },
    { type: "tatreez", content: { title: { ar: "تطريز نابلس", en: "Nablus Tatreez", transliteration: "" }, description: { ar: "أنماط جبلية", en: "Mountain patterns", transliteration: "" }, items: [] } },
    { type: "food", content: { title: { ar: "مأكولات نابلس", en: "Nablus Cuisine", transliteration: "" }, description: { ar: "الكنافة والصابون", en: "Kunafa and soap", transliteration: "" }, items: [] } },
    { type: "dialect", content: { title: { ar: "لهجة نابلس", en: "Nablus Dialect", transliteration: "" }, description: { ar: "اللهجة النابلسية", en: "Nablusi dialect", transliteration: "" }, items: [] } },
    { type: "landmarks", content: { title: { ar: "معالم نابلس", en: "Nablus Landmarks", transliteration: "" }, description: { ar: "مواقع تاريخية", en: "Historic sites", transliteration: "" }, items: [] } },
    { type: "sayings", content: { title: { ar: "أمثال نابلسية", en: "Nablusi Proverbs", transliteration: "" }, description: { ar: "حكم من نابلس", en: "Wisdom from Nablus", transliteration: "" }, items: [] } },
    { type: "famous_people", content: { title: { ar: "شخصيات نابلسية", en: "Nablusi Figures", transliteration: "" }, description: { ar: "أبناء نابلس", en: "Sons of Nablus", transliteration: "" }, items: [] } },
    { type: "before_after", content: { title: { ar: "نابلس قبل وبعد", en: "Nablus Then and Now", transliteration: "" }, description: { ar: "التاريخ", en: "History", transliteration: "" }, items: [] } }
  ]
};
