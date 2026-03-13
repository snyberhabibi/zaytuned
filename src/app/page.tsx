"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PalestineMap } from "@/components/map/PalestineMap";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContentMode } from "@/contexts/ContentModeContext";
import { useUserProgress } from "@/contexts/UserProgressContext";

const cities = [
  {
    id: "jerusalem",
    name: { ar: "القدس", en: "Jerusalem" },
    description: {
      ar: "المدينة المقدسة وقلب الأرض التاريخي",
      en: "The Holy City and historical heart of the land",
    },
    emoji: "🕌",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    progressColor: "bg-amber-500",
    progress: 75,
  },
  {
    id: "jaffa",
    name: { ar: "يافا", en: "Jaffa" },
    description: {
      ar: "مدينة البرتقال والتاريخ البحري",
      en: "Port city of oranges and maritime history",
    },
    emoji: "🍊",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
    progressColor: "bg-orange-500",
    progress: 42,
  },
  {
    id: "gaza",
    name: { ar: "غزة", en: "Gaza" },
    description: {
      ar: "مدينة الصمود والتجارة الساحلية القديمة",
      en: "City of resilience and ancient coastal trade",
    },
    emoji: "🔥",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    progressColor: "bg-[#C41E3A]",
    progress: 10,
  },
  {
    id: "nablus",
    name: { ar: "نابلس", en: "Nablus" },
    description: {
      ar: "جبال الصابون وزيت الزيتون والكنافة",
      en: "Mountains of soap, olive oil, and Kanafeh",
    },
    emoji: "⛰️",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    progressColor: "bg-emerald-500",
    progress: 60,
  },
  {
    id: "hebron",
    name: { ar: "الخليل", en: "Hebron" },
    description: {
      ar: "سحر المدينة القديمة وفن الزجاج",
      en: "Old city charm and master glassmaking",
    },
    emoji: "🏛️",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100",
    progressColor: "bg-indigo-600",
    progress: 28,
  },
];

const features = [
  {
    icon: "🧵",
    title: { ar: "إتقان التطريز", en: "Tatreez Mastery" },
    description: {
      ar: "تعلم معاني الأنماط التقليدية وصمم تطريزك الرقمي",
      en: "Learn the meaning behind traditional patterns and create your own digital embroidery designs",
    },
    tags: ["Workshop", "History"],
    color: "text-[#C41E3A]",
    bgColor: "bg-[#C41E3A]/5",
  },
  {
    icon: "🍽️",
    title: { ar: "المطبخ والنكهات", en: "Cuisine & Flavors" },
    description: {
      ar: "وصفات تفاعلية من المقلوبة إلى المسخن",
      en: "Interactive recipes from Maqluba to Musakhan. Discover the land's bounty in every bite",
    },
    tags: ["Recipes", "Interactive"],
    color: "text-[#D4AF37]",
    bgColor: "bg-[#D4AF37]/5",
  },
  {
    icon: "🗣️",
    title: { ar: "اللهجات والشعر", en: "Dialects & Poetry" },
    description: {
      ar: "استكشف اللهجات المحلية وأعمال الأدباء الفلسطينيين",
      en: "Explore regional spoken dialects and the profound works of Palestinian literary giants",
    },
    tags: ["Language", "Poetry"],
    color: "text-[#2D8B4E]",
    bgColor: "bg-[#2D8B4E]/5",
  },
];

export default function Home() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { mode, setMode, isKidsMode } = useContentMode();
  const { totalPoints, progress } = useUserProgress();
  const [mounted, setMounted] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const citiesCompleted = progress?.citiesCompleted.length || 0;

  return (
    <div className="min-h-screen bg-[#FFFEF7] selection:bg-[#C41E3A] selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-[#C41E3A]/10">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">🫒</span>
            <span className="text-2xl font-bold tracking-tight">Zaytuned</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="hover:text-[#C41E3A] transition-colors">
              {language === "ar" ? "المدن" : "Cities"}
            </Link>
            <Link href="/games" className="hover:text-[#C41E3A] transition-colors">
              {language === "ar" ? "الألعاب" : "Games"}
            </Link>
            <Link href="/passport" className="hover:text-[#C41E3A] transition-colors">
              {language === "ar" ? "جوازي" : "Passport"}
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Points Display */}
            <div className="flex items-center bg-[#F5F0E1] px-4 py-2 rounded-full border border-[#D4AF37]/30 shadow-sm">
              <span className="text-[#D4AF37] mr-2">⭐</span>
              <span className="font-bold">{mounted ? totalPoints : 0}</span>
            </div>

            {/* Language Toggle */}
            <div className="flex bg-white border border-gray-200 rounded-full p-1 shadow-inner">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-sm font-bold rounded-full transition-all ${
                  language === "en" ? "bg-[#C41E3A] text-white" : "text-gray-500 hover:text-[#C41E3A]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-3 py-1 text-sm font-bold rounded-full transition-all arabic-text ${
                  language === "ar" ? "bg-[#C41E3A] text-white" : "text-gray-500 hover:text-[#C41E3A]"
                }`}
              >
                عربي
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowModeDropdown(!showModeDropdown)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                  isKidsMode
                    ? "bg-[#D4AF37] text-white"
                    : "bg-[#2D8B4E] text-white"
                }`}
              >
                {isKidsMode ? "🧒 Kids" : "📚 Deep"}
              </button>
              {showModeDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowModeDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-2">
                    <button
                      onClick={() => { setMode("kids"); setShowModeDropdown(false); }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        isKidsMode ? "bg-[#D4AF37] text-white" : "hover:bg-gray-50"
                      }`}
                    >
                      🧒 {language === "ar" ? "وضع الأطفال" : "Kids Mode"}
                    </button>
                    <button
                      onClick={() => { setMode("deep"); setShowModeDropdown(false); }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        !isKidsMode ? "bg-[#2D8B4E] text-white" : "hover:bg-gray-50"
                      }`}
                    >
                      📚 {language === "ar" ? "وضع التعمق" : "Deep Dive"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 tatreez-pattern-bg">
          {/* Floating Emojis */}
          <div className="absolute -top-10 -left-10 text-6xl animate-float opacity-30 select-none">🍊</div>
          <div className="absolute top-40 right-10 text-6xl animate-float opacity-30 select-none" style={{ animationDelay: "1s" }}>🧶</div>
          <div className="absolute bottom-10 left-1/4 text-6xl animate-float opacity-30 select-none" style={{ animationDelay: "2s" }}>🏛️</div>
          <div className="absolute top-20 left-1/2 text-6xl animate-float opacity-30 select-none" style={{ animationDelay: "3s" }}>🇵🇸</div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${mounted ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C41E3A]/10 text-[#C41E3A] rounded-full text-sm font-bold uppercase tracking-wider">
                ✨ {language === "ar" ? "رحلة عبر التاريخ" : "Journey Through History"}
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-[#1A1A1A]">
                {language === "ar" ? (
                  <span className="arabic-text">
                    اكتشف <span className="text-[#C41E3A]">روح</span> فلسطين
                  </span>
                ) : (
                  <>
                    Discover the <span className="text-[#C41E3A]">Soul</span> of Palestine
                  </>
                )}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                {language === "ar" ? (
                  <span className="arabic-text">
                    استكشف المدن القديمة، أتقن الفنون التقليدية، واكتشف النسيج الغني للتراث الفلسطيني من خلال مغامرة تعليمية تفاعلية.
                  </span>
                ) : (
                  "Explore ancient cities, master traditional arts, and unlock the rich tapestry of Palestinian heritage through an immersive educational adventure."
                )}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="#cities"
                  className="px-8 py-4 bg-gradient-to-br from-[#C41E3A] to-[#9B1B30] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  {language === "ar" ? "ابدأ الاستكشاف" : "Start Exploration"} →
                </Link>
                <Link
                  href="/games"
                  className="px-8 py-4 bg-white border-2 border-[#C41E3A] text-[#C41E3A] rounded-full font-bold text-lg hover:bg-[#C41E3A] hover:text-white transition-all"
                >
                  {language === "ar" ? "العب الألعاب" : "Play Games"}
                </Link>
              </div>
            </div>

            {/* Right - Progress Card */}
            <div className={`relative ${mounted ? "animate-fade-in-scale stagger-2" : "opacity-0"}`}>
              <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold">{language === "ar" ? "رحلتك" : "Your Journey"}</h3>
                  <div className="text-[#D4AF37] flex items-center gap-1">
                    🏅
                    <span className="font-bold">{language === "ar" ? "مستكشف مبتدئ" : "Novice Explorer"}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#FFFEF7] border border-[#C41E3A]/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl">🕌</div>
                    <div>
                      <div className="font-bold">{language === "ar" ? "وحدة القدس" : "Jerusalem Module"}</div>
                      <div className="text-sm text-gray-500">{citiesCompleted > 0 ? "75%" : "0%"} {language === "ar" ? "مكتمل" : "Complete"}</div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: citiesCompleted > 0 ? "75%" : "0%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFEF7] border border-[#2D8B4E]/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">🫒</div>
                    <div>
                      <div className="font-bold">{language === "ar" ? "مهارة قطف الزيتون" : "Olive Harvest Skill"}</div>
                      <div className="text-sm text-gray-500">{language === "ar" ? "مفتوح!" : "Unlocked!"}</div>
                    </div>
                    <span className="ml-auto text-emerald-500 text-2xl">✓</span>
                  </div>
                </div>

                <Link
                  href="/passport"
                  className="w-full mt-8 py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-medium hover:border-[#C41E3A] hover:text-[#C41E3A] transition-all block text-center"
                >
                  + {language === "ar" ? "عرض جوازي" : "View My Passport"}
                </Link>
              </div>

              {/* Decorative Background */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#2D8B4E]/10 rounded-[40px] -z-10" />

              {/* Floating Icons */}
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 flex flex-col gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float">🍪</div>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float" style={{ animationDelay: "1.5s" }}>🎻</div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              {language === "ar" ? <span className="arabic-text">خريطة الذكريات</span> : "The Map of Memories"}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {language === "ar"
                ? "كل دبوس هو قصة، ونكهة، وقطعة من التاريخ. مرر على مدينة لتبدأ درسك."
                : "Each pin is a story, a flavor, and a piece of history. Hover over a city to start your lesson."}
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-[#E8DCC4] via-[#F5F0E1] to-[#E8DCC4] rounded-[60px] p-8 min-h-[600px] border-4 border-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10 tatreez-pattern-bg pointer-events-none" />
            <PalestineMap showProgress={true} />
          </div>
        </section>

        {/* Cities Grid */}
        <section id="cities" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-4xl font-extrabold mb-4">
                  {language === "ar" ? <span className="arabic-text">اختر وجهتك</span> : "Choose Your Destination"}
                </h2>
                <p className="text-gray-500">
                  {language === "ar"
                    ? "استكشف الثقافة والتاريخ والتقاليد الفريدة لكل مدينة. كل بطاقة تفتح دروسًا ومكافآت جديدة."
                    : "Explore the unique culture, history, and traditions of each city. Every card unlocks new lessons and rewards."}
                </p>
              </div>
              <Link href="#" className="flex items-center gap-2 font-bold text-[#C41E3A] hover:gap-4 transition-all">
                {language === "ar" ? "عرض جميع المدن" : "View All Cities"} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {cities.map((city, index) => (
                <button
                  key={city.id}
                  onClick={() => router.push(`/city/${city.id}`)}
                  className={`group text-left p-6 rounded-3xl ${city.bgColor} border ${city.borderColor} hover:shadow-xl transition-all hover:-translate-y-2 ${mounted ? `animate-fade-in-up` : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110">
                    {city.emoji}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {language === "ar" ? city.name.ar : city.name.en}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {language === "ar" ? city.description.ar : city.description.en}
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>{language === "ar" ? "التقدم" : "Progress"}</span>
                      <span>{city.progress}%</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className={`h-full ${city.progressColor} transition-all duration-700 group-hover:w-full`}
                        style={{ width: `${city.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-[#FFFEF7] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none tatreez-pattern-bg" />
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg transition-all ${mounted ? `animate-fade-in-up` : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} ${feature.color} flex items-center justify-center text-3xl mb-8`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {language === "ar" ? feature.title.ar : feature.title.en}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {language === "ar" ? feature.description.ar : feature.description.en}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#F5F0E1] rounded-full text-xs font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Tatreez Border */}
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#C41E3A] via-[#1A1A1A] to-[#2D8B4E]" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🫒</span>
                <span className="text-3xl font-bold tracking-tight">Zaytuned</span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                {language === "ar"
                  ? "مكرسون للحفاظ على التراث الثقافي الفلسطيني النابض بالحياة والاحتفال به للأجيال القادمة."
                  : "Dedicated to preserving and celebrating the vibrant cultural heritage of Palestine for generations to come."}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C41E3A] transition-colors">📱</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C41E3A] transition-colors">📸</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C41E3A] transition-colors">🐦</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-xs text-[#C41E3A]">
                {language === "ar" ? "استكشف" : "Explore"}
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-white transition-colors"><Link href="/">{language === "ar" ? "المدن" : "Cities"}</Link></li>
                <li className="hover:text-white transition-colors"><Link href="/games">{language === "ar" ? "الألعاب" : "Games"}</Link></li>
                <li className="hover:text-white transition-colors"><Link href="/passport">{language === "ar" ? "جوازي" : "Passport"}</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-xs text-[#C41E3A]">
                {language === "ar" ? "النشرة الإخبارية" : "Newsletter"}
              </h4>
              <p className="text-sm text-gray-400">
                {language === "ar" ? "احصل على قصص التراث مباشرة في بريدك." : "Get stories of heritage directly in your inbox."}
              </p>
              <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
                <input
                  type="email"
                  placeholder={language === "ar" ? "البريد الإلكتروني" : "Email address"}
                  className="bg-transparent px-4 py-2 text-sm focus:outline-none flex-1"
                />
                <button className="bg-[#C41E3A] px-4 py-2 rounded-full text-sm font-bold">
                  {language === "ar" ? "اشترك" : "Join"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">© 2024 Zaytuned Heritage App. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {language === "ar" ? "صنع بـ" : "Made with"} <span className="text-[#C41E3A] animate-pulse">❤️</span> {language === "ar" ? "للثقافة الفلسطينية" : "for Palestinian Culture"}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
