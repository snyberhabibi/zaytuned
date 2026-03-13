import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts/Providers";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaytuned | زيتونة - Explore Palestinian Heritage",
  description:
    "An interactive journey into Palestinian culture, traditions, and history. Explore cities, learn dialects, discover tatreez patterns, and connect with your heritage.",
  keywords: [
    "Palestine",
    "Palestinian culture",
    "Palestinian heritage",
    "Tatreez",
    "Arabic dialects",
    "Palestinian food",
    "Palestinian history",
    "فلسطين",
    "تراث فلسطيني",
    "تطريز",
  ],
  authors: [{ name: "Zaytuned Team" }],
  openGraph: {
    title: "Zaytuned | زيتونة - Explore Palestinian Heritage",
    description:
      "An interactive journey into Palestinian culture, traditions, and history.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_PS",
    siteName: "Zaytuned",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaytuned | زيتونة",
    description: "Explore Palestinian Heritage - City by City",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoArabic.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
