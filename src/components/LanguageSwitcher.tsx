import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const buttonClasses = (langCode: string) =>
    `h-7 px-2 py-1 text-xs rounded-md font-medium transition-colors ${
      language === langCode
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="flex space-x-1"> {/* Reduced space between buttons */}
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        className={buttonClasses('en')}
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <Button
        variant={language === 'de' ? 'default' : 'outline'}
        className={buttonClasses('de')}
        onClick={() => setLanguage('de')}
      >
        DE
      </Button>
      <Button
        variant={language === 'fr' ? 'default' : 'outline'}
        className={buttonClasses('fr')}
        onClick={() => setLanguage('fr')}
      >
        FR
      </Button>
      <Button
        variant={language === 'es' ? 'default' : 'outline'}
        className={buttonClasses('es')}
        onClick={() => setLanguage('es')}
      >
        ES
      </Button>
    </div>
  );
};

export default LanguageSwitcher;