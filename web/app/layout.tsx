import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { SectionViewTracker } from "@/components/analytics/section-view-tracker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { I18nProvider } from "@/lib/i18n/provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Museo Reformer — Crime and Punishment AI",
  description:
    "A bilingual mini-museum to explore google/reformer-crime-and-punishment: history, how it works, and a live text experiment.",
  openGraph: {
    title: "Museo Reformer",
    description:
      "Explore a historic 2020 language model trained on Dostoevsky's Crime and Punishment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans font-normal">
        <I18nProvider>
          <SectionViewTracker />
          <SiteNav />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}