import type { Metadata } from "next";
import "./globals.css";

// Note: Using system fonts due to build environment restrictions
// Replace with Google Fonts when deploying to production
const fontVariables = "font-sans";
const monoFontVariables = "font-mono";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
