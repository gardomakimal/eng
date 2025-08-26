import React from "react";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher"; // Import the LanguageSwitcher

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher /> {/* Add the LanguageSwitcher here */}
        <Menu className="h-7 w-7 text-gray-700" />
      </div>
    </header>
  );
};

export default Header;