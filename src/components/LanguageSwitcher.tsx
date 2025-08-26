import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
      >
        EN
      </Button>
      <Button
        variant={language === 'de' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('de')}
        className={language === 'de' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
      >
        DE
      </Button>
    </div>
  );
};

export default LanguageSwitcher;