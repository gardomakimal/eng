import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languageNames: { [key: string]: string } = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-28 justify-between"> {/* Adjusted width for full names */}
          {languageNames[language]}
          {/* You can add an icon here, e.g., <ChevronDown className="ml-2 h-4 w-4" /> if you import it */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as 'en' | 'de' | 'fr' | 'es')}
            className={language === code ? 'bg-blue-100 text-blue-700' : ''}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;