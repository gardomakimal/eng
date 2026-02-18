"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-12 px-4 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <img src="/logo.png" alt="Logo" className="h-8 mb-4 mx-auto md:mx-0" />
          <p className="text-sm text-gray-500">
            The world's largest electronics giveaway platform. Over 10,000 devices delivered worldwide.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
          <ul className="text-sm text-gray-500 space-y-2">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4">Security</h4>
          <p className="text-sm text-gray-500 mb-4">
            All claims are protected by 256-bit SSL encryption and human verification protocols.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">SSL</div>
            <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-gray-400">SECURE</div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} iPhone Giveaway. This promotion is not affiliated with Apple Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;