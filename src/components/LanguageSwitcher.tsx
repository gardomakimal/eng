import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react'; // Importing ChevronDown icon

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languageNames: { [key: string]: string } = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
  };

  // Map language codes to flag image paths (assuming flags are in /public/flags folder)
  const flagPaths: { [key: string]: string } = {
    en: '/flags/en.svg',
    de: '/flags/de.svg',
    fr: '/flags/fr.svg',
    es: '/flags/es.svg',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-32 justify-between pr-2"> {/* Adjusted width and padding */}
          <div className="flex items-center gap-2">
            {flagPaths[language] && (
              <img
                src={flagPaths[language]}
                alt={`${languageNames[language]} flag`}
                className="h-4 w-4 rounded-full object-cover"
              />
            )}
            <span>{languageNames[language]}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"> {/* Changed align to 'end' for better positioning */}
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as 'en' | 'de' | 'fr' | 'es')}
            className={`flex items-center gap-2 ${language === code ? 'bg-blue-100 text-blue-700' : ''}`}
          >
            {flagPaths[code] && (
              <img
                src={flagPaths[code]}
                alt={`${name} flag`}
                className="h-4 w-4 rounded-full object-cover"
              />
            )}
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;