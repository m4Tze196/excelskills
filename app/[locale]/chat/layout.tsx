import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel AI Chatbot - Sofortige Excel Hilfe | ExcelSkills",
  description: "Excel AI Chatbot für sofortige Hilfe bei Excel-Fragen. Erhalten Sie Antworten zu Formeln, Funktionen, Datenanalyse und Excel-Problemen. KI-gestützter Excel Assistant kostenlos nutzen!",
  keywords: ["Excel Chatbot", "Excel AI", "Excel Hilfe", "Excel lernen", "Excel Assistant", "Excel Fragen", "Excel Formeln Hilfe", "KI Excel", "Excel Support", "Excel Tutorials"],
  openGraph: {
    title: "Excel AI Chatbot - Sofortige Excel Hilfe",
    description: "Stellen Sie Fragen zu Excel und erhalten Sie sofort KI-gestützte Antworten. Formeln, Funktionen, Best Practices und mehr.",
    url: "https://excelskills.com/chat",
    type: "website",
    images: [
      {
        url: "/og-image-chat.jpg",
        width: 1200,
        height: 630,
        alt: "ExcelSkills AI Chatbot - Excel Hilfe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel AI Chatbot | ExcelSkills",
    description: "KI-gestützter Excel Chatbot für sofortige Hilfe bei all Ihren Excel-Fragen.",
    images: ["/og-image-chat.jpg"],
  },
  alternates: {
    canonical: "https://excelskills.com/chat",
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
