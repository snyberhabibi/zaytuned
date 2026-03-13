import type { City } from "@/types";

export const jaffaData: City = {
  id: "jaffa",
  name: { ar: "يافا", en: "Jaffa", transliteration: "Yafa" },
  region: "coastal",
  coordinates: { lat: 32.0522, lng: 34.7522 },
  description: { ar: "يافا، عروس البحر", en: "Jaffa, Bride of the Sea", transliteration: "Yafa, 'arus al-bahr" },
  heroImage: "/images/cities/jaffa-hero.jpg",
  population: { pre1948: 70000, current: 18000 },
  established: "1800 BCE",
  status: "occupied",
  sections: [
    { type: "history", content: { title: { ar: "تاريخ يافا", en: "History of Jaffa", transliteration: "Tarikh Yafa" }, description: { ar: "رحلة عبر تاريخ عروس البحر", en: "Journey through the Bride of the Sea", transliteration: "" }, items: [] } },
    { type: "tatreez", content: { title: { ar: "تطريز يافا", en: "Jaffa Tatreez", transliteration: "" }, description: { ar: "أنماط ساحلية", en: "Coastal patterns", transliteration: "" }, items: [] } },
    { type: "food", content: { title: { ar: "مأكولات يافا", en: "Jaffa Cuisine", transliteration: "" }, description: { ar: "المطبخ الساحلي", en: "Coastal cuisine", transliteration: "" }, items: [] } },
    { type: "dialect", content: { title: { ar: "لهجة يافا", en: "Jaffa Dialect", transliteration: "" }, description: { ar: "اللهجة الساحلية", en: "Coastal dialect", transliteration: "" }, items: [] } },
    { type: "landmarks", content: { title: { ar: "معالم يافا", en: "Jaffa Landmarks", transliteration: "" }, description: { ar: "مواقع تاريخية", en: "Historic sites", transliteration: "" }, items: [] } },
    { type: "sayings", content: { title: { ar: "أمثال يافاوية", en: "Jaffan Proverbs", transliteration: "" }, description: { ar: "حكم من يافا", en: "Wisdom from Jaffa", transliteration: "" }, items: [] } },
    { type: "famous_people", content: { title: { ar: "شخصيات يافاوية", en: "Jaffan Figures", transliteration: "" }, description: { ar: "أبناء يافا", en: "Sons of Jaffa", transliteration: "" }, items: [] } },
    { type: "before_after", content: { title: { ar: "يافا قبل وبعد", en: "Jaffa Then and Now", transliteration: "" }, description: { ar: "التحول", en: "The transformation", transliteration: "" }, items: [] } }
  ]
};
