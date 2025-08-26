import React from "react";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Left section: Logo */}
      <div className="flex items-center space-x-2 w-1/3">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      
      {/* Middle section: Language Switcher, centered */}
      <div className="flex justify-center flex-grow">
        <LanguageSwitcher />
      </div>
      
      {/* Right section: Menu icon */}
      <div className="flex items-center justify-end space-x-4 w-1/3">
        <Menu className="h-7 w-7 text-gray-700" />
      </div>
    </header>
  );
};

export default Header;