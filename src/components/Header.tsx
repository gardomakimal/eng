import React from "react";
import { Menu } from "lucide-react"; // Changed from User to Menu

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <Menu className="h-7 w-7 text-gray-700" /> {/* Replaced User with Menu */}
      </div>
    </header>
  );
};

export default Header;