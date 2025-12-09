import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExcelSkills - Master Excel with AI-Powered Guidance",
  description: "Comprehensive Excel skills directory with AI chatbot assistance. Learn formulas, pivot tables, data analysis and more.",
  keywords: ["Excel", "Excel Skills", "Excel Training", "Excel Courses", "AI Assistant", "Data Analysis"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ErrorBoundary>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
