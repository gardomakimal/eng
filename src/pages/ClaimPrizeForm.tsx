import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MadeWithDyad } from "@/components/made-with-dyad";

// Declare _GK on the Window interface to avoid TypeScript errors
declare global {
  interface Window {
    _GK: () => void;
  }
}

const ClaimPrizeForm: React.FC = () => {
  const handleNextClick = () => {
    if (typeof window !== 'undefined' && window._GK) {
      window._GK();
    } else {
      console.warn("Locker function _GK not found. Make sure the locker script is loaded.");
      // Optionally, navigate or show a message if the locker isn't loaded
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 font-poppins">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Claim Your Prize!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Please enter your details to claim your reward.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-left block mb-2 text-gray-700 dark:text-gray-200">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-left block mb-2 text-gray-700 dark:text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button
            onClick={handleNextClick}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Next</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
          </Button>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default ClaimPrizeForm;