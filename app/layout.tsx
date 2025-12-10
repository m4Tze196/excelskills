import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/lib/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExcelSkills - Excel lernen mit KI-gestützter Anleitung | Excel Tutorials",
  description: "Umfassendes Excel Skills Verzeichnis mit KI-Chatbot-Unterstützung. Excel lernen mit Formeln, Pivot-Tabellen, Datenanalyse und mehr. Interaktive Excel Tutorials für Anfänger bis Fortgeschrittene.",
  keywords: ["Excel Skills", "Excel lernen", "Excel Tutorials", "Excel Kurs", "Excel Training", "Excel Formeln", "Pivot-Tabellen", "Datenanalyse", "Excel für Anfänger", "KI Assistant"],
  authors: [{ name: "ExcelSkills" }],
  creator: "ExcelSkills",
  publisher: "ExcelSkills",
  metadataBase: new URL("https://excelskills.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://excelskills.com",
    siteName: "ExcelSkills",
    title: "ExcelSkills - Excel lernen mit KI-gestützter Anleitung",
    description: "Umfassendes Excel Skills Verzeichnis mit KI-Chatbot-Unterstützung. Excel lernen mit interaktiven Tutorials, Kursen und AI-gestützter Hilfe.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ExcelSkills - Excel lernen und mastern",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ExcelSkills - Excel lernen mit KI-gestützter Anleitung",
    description: "Excel lernen mit umfassendem Skills Verzeichnis, interaktiven Tutorials und KI-Chatbot-Unterstützung.",
    images: ["/og-image.jpg"],
    creator: "@excelskills",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
