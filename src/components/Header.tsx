import React from "react";
import { Menu } from "lucide-react"; 

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Left section: Logo */}
      <div className="flex items-center space-x-2 w-1/3">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      
      {/* Middle section: Empty or can be removed if not needed */}
      <div className="flex justify-center flex-grow">
        {/* This section is now empty */}
      </div>
      
      {/* Right section: Empty, as LanguageSwitcher is removed */}
      <div className="flex items-center justify-end space-x-4 w-1/3">
        {/* LanguageSwitcher was here */}
      </div>
    </header>
  );
};

export default Header;