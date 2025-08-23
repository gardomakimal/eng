import React from "react";
import { User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center border border-gray-400 rounded-md px-3 py-1 text-gray-700 font-semibold text-lg">
          Card
        </div>
        <User className="h-7 w-7 text-gray-700" />
      </div>
    </header>
  );
};

export default Header;