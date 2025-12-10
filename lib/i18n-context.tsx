"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "de" | "fr" | "tr";

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Header
    "header.skills": "Skills",
    "header.courses": "Courses",
    "header.aiAssistant": "AI Assistant",
    "header.getStarted": "Get Started",

    // Home Page
    "home.hero.title": "Master Excel with",
    "home.hero.aiPowered": "AI-Powered",
    "home.hero.guidance": "Guidance",
    "home.hero.subtitle": "Comprehensive skills directory, interactive courses, and an intelligent chatbot to help you excel at Excel.",
    "home.hero.tryAI": "Try AI Assistant",
    "home.hero.browseSkills": "Browse Skills",

    "home.features.title": "Everything You Need to Master Excel",
    "home.features.skills.title": "Skills Directory",
    "home.features.skills.description": "Comprehensive catalog of Excel skills from beginner to advanced, organized by category and difficulty.",
    "home.features.skills.link": "Explore Skills",
    "home.features.courses.title": "Interactive Courses",
    "home.features.courses.description": "Step-by-step courses designed to build your Excel expertise with hands-on practice and real-world examples.",
    "home.features.courses.link": "View Courses",
    "home.features.ai.title": "AI Assistant",
    "home.features.ai.description": "Get instant answers to your Excel questions with our intelligent chatbot powered by advanced AI.",
    "home.features.ai.link": "Start Chatting",

    "home.cta.title": "Ready to Level Up Your Excel Skills?",
    "home.cta.subtitle": "Join thousands of professionals mastering Excel with our comprehensive platform.",
    "home.cta.button": "Get Started for Free",

    // Skills Page
    "skills.title": "Excel Skills Directory",
    "skills.subtitle": "Browse our comprehensive collection of Excel skills. From beginner fundamentals to advanced techniques.",
    "skills.category": "Category",
    "skills.difficulty": "Difficulty",
    "skills.all": "All",
    "skills.beginner": "Beginner",
    "skills.intermediate": "Intermediate",
    "skills.advanced": "Advanced",
    "skills.learnMore": "Learn More",
    "skills.cta.title": "Need Help with a Specific Skill?",
    "skills.cta.subtitle": "Ask our AI assistant for personalized guidance and instant answers to your Excel questions.",
    "skills.cta.button": "Ask AI Assistant",

    // Courses Page
    "courses.title": "Excel Courses",
    "courses.subtitle": "Structured learning paths to take you from Excel novice to expert. Learn at your own pace with hands-on practice.",
    "courses.stats.courses": "Courses",
    "courses.stats.lessons": "Lessons",
    "courses.stats.students": "Students",
    "courses.stats.content": "Content",
    "courses.level.beginner": "Beginner",
    "courses.level.intermediate": "Intermediate",
    "courses.level.advanced": "Advanced",
    "courses.level.title": "Level",
    "courses.lessons": "lessons",
    "courses.startCourse": "Start Course",
    "courses.cta.title": "Not Sure Where to Start?",
    "courses.cta.subtitle": "Our AI assistant can help you choose the right course based on your current skill level and learning goals.",
    "courses.cta.button": "Get Course Recommendations",

    // Chat Page
    "chat.title": "Excel AI Assistant",
    "chat.subtitle": "Ask questions, get formulas, learn techniques, and solve Excel problems instantly.",
    "chat.placeholder": "Ask me anything about Excel...",
    "chat.send": "Send",
    "chat.inputHint": "Press Enter to send, Shift+Enter for new line",
    "chat.greeting": "Hello! I'm your Excel AI assistant. Ask me anything about Excel formulas, functions, data analysis, or best practices. How can I help you today?",
    "chat.placeholderTitle": "Placeholder Mode",
    "chat.placeholderDescription": "This is a UI preview. Full AI functionality with backend integration and payment system will be implemented in the next phase.",

    // Footer
    "footer.tagline": "Master Excel with AI-powered guidance and comprehensive skill directory.",
    "footer.skills": "Skills",
    "footer.browseAll": "Browse All Skills",
    "footer.formulas": "Formulas",
    "footer.pivotTables": "Pivot Tables",
    "footer.dataAnalysis": "Data Analysis",
    "footer.courses": "Courses",
    "footer.allCourses": "All Courses",
    "footer.resources": "Resources",
    "footer.aiAssistant": "AI Assistant",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.copyright": "ExcelSkills. All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",

    // Categories
    "category.formulas": "Formulas",
    "category.dataAnalysis": "Data Analysis",
    "category.formatting": "Formatting",
    "category.visualization": "Visualization",
    "category.dataManagement": "Data Management",
    "category.automation": "Automation",
  },
  de: {
    // Header
    "header.skills": "Fähigkeiten",
    "header.courses": "Kurse",
    "header.aiAssistant": "KI-Assistent",
    "header.getStarted": "Loslegen",

    // Home Page
    "home.hero.title": "Excel meistern mit",
    "home.hero.aiPowered": "KI-gestützter",
    "home.hero.guidance": "Anleitung",
    "home.hero.subtitle": "Umfassendes Fähigkeitsverzeichnis, interaktive Kurse und ein intelligenter Chatbot, um Sie bei Excel zu unterstützen.",
    "home.hero.tryAI": "KI-Assistent testen",
    "home.hero.browseSkills": "Fähigkeiten durchsuchen",

    "home.features.title": "Alles, was Sie brauchen, um Excel zu meistern",
    "home.features.skills.title": "Fähigkeitsverzeichnis",
    "home.features.skills.description": "Umfassender Katalog von Excel-Fähigkeiten vom Anfänger bis zum Fortgeschrittenen, organisiert nach Kategorie und Schwierigkeit.",
    "home.features.skills.link": "Fähigkeiten erkunden",
    "home.features.courses.title": "Interaktive Kurse",
    "home.features.courses.description": "Schritt-für-Schritt-Kurse entwickelt, um Ihre Excel-Expertise mit praktischen Übungen und Beispielen aus der Praxis aufzubauen.",
    "home.features.courses.link": "Kurse ansehen",
    "home.features.ai.title": "KI-Assistent",
    "home.features.ai.description": "Erhalten Sie sofortige Antworten auf Ihre Excel-Fragen mit unserem intelligenten Chatbot, der von fortschrittlicher KI betrieben wird.",
    "home.features.ai.link": "Chat starten",

    "home.cta.title": "Bereit, Ihre Excel-Fähigkeiten zu verbessern?",
    "home.cta.subtitle": "Schließen Sie sich Tausenden von Fachleuten an, die Excel mit unserer umfassenden Plattform meistern.",
    "home.cta.button": "Kostenlos loslegen",

    // Skills Page
    "skills.title": "Excel Fähigkeitsverzeichnis",
    "skills.subtitle": "Durchsuchen Sie unsere umfassende Sammlung von Excel-Fähigkeiten. Von Grundlagen für Anfänger bis zu fortgeschrittenen Techniken.",
    "skills.category": "Kategorie",
    "skills.difficulty": "Schwierigkeit",
    "skills.all": "Alle",
    "skills.beginner": "Anfänger",
    "skills.intermediate": "Fortgeschritten",
    "skills.advanced": "Experte",
    "skills.learnMore": "Mehr erfahren",
    "skills.cta.title": "Brauchen Sie Hilfe bei einer bestimmten Fähigkeit?",
    "skills.cta.subtitle": "Fragen Sie unseren KI-Assistenten nach personalisierter Anleitung und sofortigen Antworten auf Ihre Excel-Fragen.",
    "skills.cta.button": "KI-Assistent fragen",

    // Courses Page
    "courses.title": "Excel Kurse",
    "courses.subtitle": "Strukturierte Lernpfade, die Sie vom Excel-Anfänger zum Experten führen. Lernen Sie in Ihrem eigenen Tempo mit praktischen Übungen.",
    "courses.stats.courses": "Kurse",
    "courses.stats.lessons": "Lektionen",
    "courses.stats.students": "Studenten",
    "courses.stats.content": "Inhalt",
    "courses.level.beginner": "Anfänger",
    "courses.level.intermediate": "Fortgeschritten",
    "courses.level.advanced": "Experte",
    "courses.level.title": "Level",
    "courses.lessons": "Lektionen",
    "courses.startCourse": "Kurs starten",
    "courses.cta.title": "Nicht sicher, wo Sie anfangen sollen?",
    "courses.cta.subtitle": "Unser KI-Assistent kann Ihnen helfen, den richtigen Kurs basierend auf Ihrem aktuellen Kenntnisstand und Lernzielen auszuwählen.",
    "courses.cta.button": "Kursempfehlungen erhalten",

    // Chat Page
    "chat.title": "Excel KI-Assistent",
    "chat.subtitle": "Fragen stellen, Formeln erhalten, Techniken lernen und Excel-Probleme sofort lösen.",
    "chat.placeholder": "Fragen Sie mich alles über Excel...",
    "chat.send": "Senden",
    "chat.inputHint": "Enter zum Senden, Shift+Enter für neue Zeile",
    "chat.greeting": "Hallo! Ich bin Ihr Excel KI-Assistent. Fragen Sie mich alles über Excel-Formeln, Funktionen, Datenanalyse oder Best Practices. Wie kann ich Ihnen heute helfen?",
    "chat.placeholderTitle": "Platzhalter-Modus",
    "chat.placeholderDescription": "Dies ist eine UI-Vorschau. Die vollständige KI-Funktionalität mit Backend-Integration und Zahlungssystem wird in der nächsten Phase implementiert.",

    // Footer
    "footer.tagline": "Excel meistern mit KI-gestützter Anleitung und umfassendem Fähigkeitsverzeichnis.",
    "footer.skills": "Fähigkeiten",
    "footer.browseAll": "Alle Fähigkeiten durchsuchen",
    "footer.formulas": "Formeln",
    "footer.pivotTables": "Pivot-Tabellen",
    "footer.dataAnalysis": "Datenanalyse",
    "footer.courses": "Kurse",
    "footer.allCourses": "Alle Kurse",
    "footer.resources": "Ressourcen",
    "footer.aiAssistant": "KI-Assistent",
    "footer.about": "Über uns",
    "footer.contact": "Kontakt",
    "footer.copyright": "ExcelSkills. Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutz",
    "footer.terms": "AGB",

    // Categories
    "category.formulas": "Formeln",
    "category.dataAnalysis": "Datenanalyse",
    "category.formatting": "Formatierung",
    "category.visualization": "Visualisierung",
    "category.dataManagement": "Datenverwaltung",
    "category.automation": "Automatisierung",
  },
  fr: {
    // Header
    "header.skills": "Compétences",
    "header.courses": "Cours",
    "header.aiAssistant": "Assistant IA",
    "header.getStarted": "Commencer",

    // Home Page
    "home.hero.title": "Maîtrisez Excel avec",
    "home.hero.aiPowered": "l'IA",
    "home.hero.guidance": "Guidée",
    "home.hero.subtitle": "Répertoire complet de compétences, cours interactifs et chatbot intelligent pour vous aider à exceller dans Excel.",
    "home.hero.tryAI": "Essayer l'assistant IA",
    "home.hero.browseSkills": "Parcourir les compétences",

    "home.features.title": "Tout ce dont vous avez besoin pour maîtriser Excel",
    "home.features.skills.title": "Répertoire de compétences",
    "home.features.skills.description": "Catalogue complet de compétences Excel du débutant au avancé, organisé par catégorie et difficulté.",
    "home.features.skills.link": "Explorer les compétences",
    "home.features.courses.title": "Cours interactifs",
    "home.features.courses.description": "Cours étape par étape conçus pour développer votre expertise Excel avec des exercices pratiques et des exemples concrets.",
    "home.features.courses.link": "Voir les cours",
    "home.features.ai.title": "Assistant IA",
    "home.features.ai.description": "Obtenez des réponses instantanées à vos questions Excel avec notre chatbot intelligent alimenté par une IA avancée.",
    "home.features.ai.link": "Commencer à discuter",

    "home.cta.title": "Prêt à améliorer vos compétences Excel?",
    "home.cta.subtitle": "Rejoignez des milliers de professionnels qui maîtrisent Excel avec notre plateforme complète.",
    "home.cta.button": "Commencer gratuitement",

    // Skills Page
    "skills.title": "Répertoire de compétences Excel",
    "skills.subtitle": "Parcourez notre collection complète de compétences Excel. Des fondamentaux pour débutants aux techniques avancées.",
    "skills.category": "Catégorie",
    "skills.difficulty": "Difficulté",
    "skills.all": "Tout",
    "skills.beginner": "Débutant",
    "skills.intermediate": "Intermédiaire",
    "skills.advanced": "Avancé",
    "skills.learnMore": "En savoir plus",
    "skills.cta.title": "Besoin d'aide avec une compétence spécifique?",
    "skills.cta.subtitle": "Demandez à notre assistant IA des conseils personnalisés et des réponses instantanées à vos questions Excel.",
    "skills.cta.button": "Demander à l'assistant IA",

    // Courses Page
    "courses.title": "Cours Excel",
    "courses.subtitle": "Parcours d'apprentissage structurés pour vous faire passer de novice à expert Excel. Apprenez à votre rythme avec des exercices pratiques.",
    "courses.stats.courses": "Cours",
    "courses.stats.lessons": "Leçons",
    "courses.stats.students": "Étudiants",
    "courses.stats.content": "Contenu",
    "courses.level.beginner": "Débutant",
    "courses.level.intermediate": "Intermédiaire",
    "courses.level.advanced": "Avancé",
    "courses.level.title": "Niveau",
    "courses.lessons": "leçons",
    "courses.startCourse": "Commencer le cours",
    "courses.cta.title": "Vous ne savez pas par où commencer?",
    "courses.cta.subtitle": "Notre assistant IA peut vous aider à choisir le bon cours en fonction de votre niveau actuel et de vos objectifs d'apprentissage.",
    "courses.cta.button": "Obtenir des recommandations de cours",

    // Chat Page
    "chat.title": "Assistant IA Excel",
    "chat.subtitle": "Posez des questions, obtenez des formules, apprenez des techniques et résolvez des problèmes Excel instantanément.",
    "chat.placeholder": "Demandez-moi n'importe quoi sur Excel...",
    "chat.send": "Envoyer",
    "chat.inputHint": "Appuyez sur Entrée pour envoyer, Maj+Entrée pour nouvelle ligne",
    "chat.greeting": "Bonjour! Je suis votre assistant IA Excel. Posez-moi des questions sur les formules Excel, les fonctions, l'analyse de données ou les meilleures pratiques. Comment puis-je vous aider aujourd'hui?",
    "chat.placeholderTitle": "Mode d'aperçu",
    "chat.placeholderDescription": "Ceci est un aperçu de l'interface. La fonctionnalité IA complète avec intégration backend et système de paiement sera implémentée dans la prochaine phase.",

    // Footer
    "footer.tagline": "Maîtrisez Excel avec des conseils alimentés par l'IA et un répertoire complet de compétences.",
    "footer.skills": "Compétences",
    "footer.browseAll": "Parcourir toutes les compétences",
    "footer.formulas": "Formules",
    "footer.pivotTables": "Tableaux croisés dynamiques",
    "footer.dataAnalysis": "Analyse de données",
    "footer.courses": "Cours",
    "footer.allCourses": "Tous les cours",
    "footer.resources": "Ressources",
    "footer.aiAssistant": "Assistant IA",
    "footer.about": "À propos",
    "footer.contact": "Contact",
    "footer.copyright": "ExcelSkills. Tous droits réservés.",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",

    // Categories
    "category.formulas": "Formules",
    "category.dataAnalysis": "Analyse de données",
    "category.formatting": "Formatage",
    "category.visualization": "Visualisation",
    "category.dataManagement": "Gestion des données",
    "category.automation": "Automatisation",
  },
  tr: {
    // Header
    "header.skills": "Beceriler",
    "header.courses": "Kurslar",
    "header.aiAssistant": "AI Asistan",
    "header.getStarted": "Başla",

    // Home Page
    "home.hero.title": "Excel'de ustalaşın",
    "home.hero.aiPowered": "AI Destekli",
    "home.hero.guidance": "Rehberlik ile",
    "home.hero.subtitle": "Kapsamlı beceri dizini, interaktif kurslar ve Excel'de başarılı olmanıza yardımcı olacak akıllı sohbet botu.",
    "home.hero.tryAI": "AI Asistanı Dene",
    "home.hero.browseSkills": "Becerilere Göz At",

    "home.features.title": "Excel'de Ustalaşmak İçin İhtiyacınız Olan Her Şey",
    "home.features.skills.title": "Beceri Dizini",
    "home.features.skills.description": "Başlangıç seviyesinden ileri seviyeye kadar Excel becerilerin kapsamlı kataloğu, kategori ve zorluk seviyesine göre düzenlenmiştir.",
    "home.features.skills.link": "Becerileri Keşfet",
    "home.features.courses.title": "İnteraktif Kurslar",
    "home.features.courses.description": "Uygulamalı pratik ve gerçek dünya örnekleriyle Excel uzmanlığınızı geliştirmek için tasarlanmış adım adım kurslar.",
    "home.features.courses.link": "Kursları Görüntüle",
    "home.features.ai.title": "AI Asistan",
    "home.features.ai.description": "Gelişmiş AI tarafından desteklenen akıllı sohbet botumuzla Excel sorularınıza anında yanıtlar alın.",
    "home.features.ai.link": "Sohbete Başla",

    "home.cta.title": "Excel Becerilerinizi Geliştirmeye Hazır mısınız?",
    "home.cta.subtitle": "Kapsamlı platformumuzla Excel'de ustalaşan binlerce profesyonele katılın.",
    "home.cta.button": "Ücretsiz Başlayın",

    // Skills Page
    "skills.title": "Excel Beceri Dizini",
    "skills.subtitle": "Kapsamlı Excel becerileri koleksiyonumuza göz atın. Başlangıç temellerinden ileri tekniklere kadar.",
    "skills.category": "Kategori",
    "skills.difficulty": "Zorluk",
    "skills.all": "Tümü",
    "skills.beginner": "Başlangıç",
    "skills.intermediate": "Orta",
    "skills.advanced": "İleri",
    "skills.learnMore": "Daha Fazla Bilgi",
    "skills.cta.title": "Belirli Bir Beceri İçin Yardıma mı İhtiyacınız Var?",
    "skills.cta.subtitle": "Excel sorularınıza kişiselleştirilmiş rehberlik ve anında yanıtlar için AI asistanımıza sorun.",
    "skills.cta.button": "AI Asistana Sor",

    // Courses Page
    "courses.title": "Excel Kursları",
    "courses.subtitle": "Excel acemisinden uzman seviyesine çıkartan yapılandırılmış öğrenme yolları. Uygulamalı pratikle kendi hızınızda öğrenin.",
    "courses.stats.courses": "Kurs",
    "courses.stats.lessons": "Ders",
    "courses.stats.students": "Öğrenci",
    "courses.stats.content": "İçerik",
    "courses.level.beginner": "Başlangıç",
    "courses.level.intermediate": "Orta",
    "courses.level.advanced": "İleri",
    "courses.level.title": "Seviye",
    "courses.lessons": "ders",
    "courses.startCourse": "Kursa Başla",
    "courses.cta.title": "Nereden Başlayacağınızdan Emin Değil misiniz?",
    "courses.cta.subtitle": "AI asistanımız, mevcut beceri seviyeniz ve öğrenme hedeflerinize göre doğru kursu seçmenize yardımcı olabilir.",
    "courses.cta.button": "Kurs Önerileri Alın",

    // Chat Page
    "chat.title": "Excel AI Asistan",
    "chat.subtitle": "Soru sorun, formüller alın, teknikler öğrenin ve Excel problemlerini anında çözün.",
    "chat.placeholder": "Excel hakkında bana her şeyi sorun...",
    "chat.send": "Gönder",
    "chat.inputHint": "Göndermek için Enter, yeni satır için Shift+Enter",
    "chat.greeting": "Merhaba! Ben Excel AI asistanınızım. Excel formülleri, fonksiyonlar, veri analizi veya en iyi uygulamalar hakkında bana her şeyi sorun. Bugün size nasıl yardımcı olabilirim?",
    "chat.placeholderTitle": "Önizleme Modu",
    "chat.placeholderDescription": "Bu bir UI önizlemesidir. Backend entegrasyonu ve ödeme sistemi ile tam AI işlevselliği bir sonraki aşamada uygulanacaktır.",

    // Footer
    "footer.tagline": "AI destekli rehberlik ve kapsamlı beceri dizini ile Excel'de ustalaşın.",
    "footer.skills": "Beceriler",
    "footer.browseAll": "Tüm Becerilere Göz At",
    "footer.formulas": "Formüller",
    "footer.pivotTables": "Pivot Tablolar",
    "footer.dataAnalysis": "Veri Analizi",
    "footer.courses": "Kurslar",
    "footer.allCourses": "Tüm Kurslar",
    "footer.resources": "Kaynaklar",
    "footer.aiAssistant": "AI Asistan",
    "footer.about": "Hakkında",
    "footer.contact": "İletişim",
    "footer.copyright": "ExcelSkills. Tüm hakları saklıdır.",
    "footer.privacy": "Gizlilik",
    "footer.terms": "Koşullar",

    // Categories
    "category.formulas": "Formüller",
    "category.dataAnalysis": "Veri Analizi",
    "category.formatting": "Biçimlendirme",
    "category.visualization": "Görselleştirme",
    "category.dataManagement": "Veri Yönetimi",
    "category.automation": "Otomasyon",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Language | null;
    const browserLang = navigator.language.split("-")[0];

    if (savedLanguage && ["en", "de", "fr", "tr"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else if (["en", "de", "fr", "tr"].includes(browserLang)) {
      setLanguageState(browserLang as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (mounted) {
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export const languageNames: Record<Language, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  tr: "Türkçe",
};
