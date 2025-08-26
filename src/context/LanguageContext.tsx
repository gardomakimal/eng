import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'de' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const browserLanguage = navigator.language.split('-')[0]; // Get primary language code (e.g., 'en' from 'en-US')
      const supportedLanguages: Language[] = ['en', 'de', 'fr', 'es'];
      if (supportedLanguages.includes(browserLanguage as Language)) {
        return browserLanguage as Language;
      }
    }
    return 'en'; // Default to English if browser language is not supported or not available
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};