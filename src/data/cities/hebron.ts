import type { City } from "@/types";

export const hebronData: City = {
  id: "hebron",
  name: { ar: "الخليل", en: "Hebron", transliteration: "Al-Khalil" },
  region: "hebron",
  coordinates: { lat: 31.5326, lng: 35.0998 },
  description: { ar: "الخليل، مدينة خليل الرحمن", en: "Hebron, city of Abraham", transliteration: "" },
  heroImage: "/images/cities/hebron-hero.jpg",
  population: { pre1948: 25000, current: 215000 },
  established: "3500 BCE",
  status: "existing",
  sections: [
    { type: "history", content: { title: { ar: "تاريخ الخليل", en: "History of Hebron", transliteration: "" }, description: { ar: "رحلة عبر مدينة إبراهيم", en: "Journey through Abraham's city", transliteration: "" }, items: [] } },
    { type: "tatreez", content: { title: { ar: "تطريز الخليل", en: "Hebron Tatreez", transliteration: "" }, description: { ar: "أنماط خليلية", en: "Hebroni patterns", transliteration: "" }, items: [] } },
    { type: "food", content: { title: { ar: "مأكولات الخليل", en: "Hebron Cuisine", transliteration: "" }, description: { ar: "العنب والمقلوبة", en: "Grapes and maqluba", transliteration: "" }, items: [] } },
    { type: "dialect", content: { title: { ar: "لهجة الخليل", en: "Hebron Dialect", transliteration: "" }, description: { ar: "اللهجة الخليلية", en: "Hebroni dialect", transliteration: "" }, items: [] } },
    { type: "landmarks", content: { title: { ar: "معالم الخليل", en: "Hebron Landmarks", transliteration: "" }, description: { ar: "مواقع تاريخية", en: "Historic sites", transliteration: "" }, items: [] } },
    { type: "sayings", content: { title: { ar: "أمثال خليلية", en: "Hebroni Proverbs", transliteration: "" }, description: { ar: "حكم من الخليل", en: "Wisdom from Hebron", transliteration: "" }, items: [] } },
    { type: "famous_people", content: { title: { ar: "شخصيات خليلية", en: "Hebroni Figures", transliteration: "" }, description: { ar: "أبناء الخليل", en: "Sons of Hebron", transliteration: "" }, items: [] } },
    { type: "before_after", content: { title: { ar: "الخليل قبل وبعد", en: "Hebron Then and Now", transliteration: "" }, description: { ar: "التاريخ", en: "History", transliteration: "" }, items: [] } }
  ]
};
