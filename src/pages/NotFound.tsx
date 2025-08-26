import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage

// Translations for NotFound page
const translations = {
  en: {
    title: "404",
    message: "Oops! Page not found",
    returnHome: "Return to Homepage",
  },
  de: {
    title: "404",
    message: "Hoppla! Seite nicht gefunden",
    returnHome: "Zur Startseite zurückkehren",
  },
};

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language]; // Get current language translations

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{t.message}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {t.returnHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;