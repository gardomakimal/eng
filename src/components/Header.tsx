import React from "react";
import { Menu } from "lucide-react"; // Menu icon is no longer used, but keeping import for now in case it's needed elsewhere.
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Left section: Logo */}
      <div className="flex items-center space-x-2 w-1/3">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      
      {/* Middle section: Empty or can be removed if not needed */}
      <div className="flex justify-center flex-grow">
        {/* This section is now empty, as LanguageSwitcher moves right */}
      </div>
      
      {/* Right section: Language Switcher */}
      <div className="flex items-center justify-end space-x-4 w-1/3">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;