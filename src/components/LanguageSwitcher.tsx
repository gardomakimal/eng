import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-1"> {/* Reduced space-x for smaller buttons */}
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="xs" // Made buttons smaller
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
      >
        EN
      </Button>
      <Button
        variant={language === 'de' ? 'default' : 'outline'}
        size="xs" // Made buttons smaller
        onClick={() => setLanguage('de')}
        className={language === 'de' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
      >
        DE
      </Button>
      <Button
        variant={language === 'fr' ? 'default' : 'outline'}
        size="xs" // Made buttons smaller
        onClick={() => setLanguage('fr')}
        className={language === 'fr' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
      >
        FR
      </Button>
      <Button
        variant={language === 'es' ? 'default' : 'outline'}
        size="xs" // Made buttons smaller
        onClick={() => setLanguage('es')}
        className={language === 'es' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
      >
        ES
      </Button>
    </div>
  );
};

export default LanguageSwitcher;