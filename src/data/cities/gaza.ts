import type { City } from "@/types";

export const gazaData: City = {
  id: "gaza",
  name: { ar: "غزة", en: "Gaza", transliteration: "Ghazza" },
  region: "gaza",
  coordinates: { lat: 31.5, lng: 34.47 },
  description: { ar: "غزة هاشم، مدينة الصمود", en: "Gaza Hashim, city of resilience", transliteration: "" },
  heroImage: "/images/cities/gaza-hero.jpg",
  population: { pre1948: 80000, current: 2000000 },
  established: "3000 BCE",
  status: "existing",
  sections: [
    { type: "history", content: { title: { ar: "تاريخ غزة", en: "History of Gaza", transliteration: "" }, description: { ar: "رحلة عبر تاريخ مدينة الصمود", en: "Journey through resilience", transliteration: "" }, items: [] } },
    { type: "tatreez", content: { title: { ar: "تطريز غزة", en: "Gaza Tatreez", transliteration: "" }, description: { ar: "أنماط غزاوية", en: "Gazan patterns", transliteration: "" }, items: [] } },
    { type: "food", content: { title: { ar: "مأكولات غزة", en: "Gaza Cuisine", transliteration: "" }, description: { ar: "المطبخ الغزاوي", en: "Gazan cuisine", transliteration: "" }, items: [] } },
    { type: "dialect", content: { title: { ar: "لهجة غزة", en: "Gaza Dialect", transliteration: "" }, description: { ar: "اللهجة الغزاوية", en: "Gazan dialect", transliteration: "" }, items: [] } },
    { type: "landmarks", content: { title: { ar: "معالم غزة", en: "Gaza Landmarks", transliteration: "" }, description: { ar: "مواقع تاريخية", en: "Historic sites", transliteration: "" }, items: [] } },
    { type: "sayings", content: { title: { ar: "أمثال غزاوية", en: "Gazan Proverbs", transliteration: "" }, description: { ar: "حكم من غزة", en: "Wisdom from Gaza", transliteration: "" }, items: [] } },
    { type: "famous_people", content: { title: { ar: "شخصيات غزاوية", en: "Gazan Figures", transliteration: "" }, description: { ar: "أبناء غزة", en: "Sons of Gaza", transliteration: "" }, items: [] } },
    { type: "before_after", content: { title: { ar: "غزة قبل وبعد", en: "Gaza Then and Now", transliteration: "" }, description: { ar: "الصمود", en: "Resilience", transliteration: "" }, items: [] } }
  ]
};
