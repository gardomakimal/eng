import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react'; // Importing ChevronDown for the dropdown indicator

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languageData: { [key: string]: { name: string; flag: string } } = {
    en: { name: 'English', flag: '/flags/en.svg' },
    de: { name: 'Deutsch', flag: '/flags/de.svg' },
    fr: { name: 'Français', flag: '/flags/fr.svg' },
    es: { name: 'Español', flag: '/flags/es.svg' },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-36 justify-between pr-2"> {/* Adjusted width and padding */}
          <div className="flex items-center">
            <img 
              src={languageData[language].flag} 
              alt={`${languageData[language].name} flag`} 
              className="h-4 w-4 mr-2 rounded-sm" // Added rounded-sm for a slightly softer look
            />
            {languageData[language].name}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36"> {/* Align to end and match width */}
        {Object.entries(languageData).map(([code, data]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as 'en' | 'de' | 'fr' | 'es')}
            className={`flex items-center ${language === code ? 'bg-blue-100 text-blue-700' : ''}`}
          >
            <img 
              src={data.flag} 
              alt={`${data.name} flag`} 
              className="h-4 w-4 mr-2 rounded-sm"
            />
            {data.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;