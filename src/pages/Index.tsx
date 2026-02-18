"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Loader2, Gift } from "lucide-react";
import Header from "@/components/Header";
import Locker from "./Locker";
import RecentWinners from "@/components/RecentWinners";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

// Define prize data
const prizeData: { [key: string]: { name: string; image: string } } = {
  "13579": { name: "iPhone 16 Pro / Pro Max", image: "/iphones.png" },
};

const Index: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState<boolean>(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] =
    useState<boolean>(false);
  const [winningPrize, setWinningPrize] = useState<{
    name: string;
    image: string;
  } | null>(null);

  const [showLocker, setShowLocker] = useState<boolean>(false);

  const colorOptions = [
    { name: "Black", image: "/black.png", colorClass: "bg-zinc-800" },
    { name: "Green", image: "/green.png", colorClass: "bg-teal-500" },
    { name: "Pink", image: "/pink.png", colorClass: "bg-pink-400" },
  ];

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleCheckCode = () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
    setWinningPrize(null);

    setTimeout(() => {
      setIsLoading(false);
      const prize = prizeData[code];
      if (prize) {
        setWinningPrize(prize);
        setIsSuccessModalOpen(true);
      } else {
        setIsErrorModalOpen(true);
      }
    }, 3000);
  };

  const handleChooseColor = () => {
    setIsSuccessModalOpen(false);
    setIsColorModalOpen(true);
  };

  const handleAgreement = () => {
    setIsColorModalOpen(false);
    setIsAgreementModalOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading) {
      handleCheckCode();
    }
  };

  return (
    <div className="min-h-screen w-full font-poppins flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 animate-bounce">
              <Gift className="h-3 w-3" />
              Exclusive Giveaway
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Claim Your <span className="text-blue-600">iPhone 16</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              If you received a winning code, enter it below to verify your prize and choose your preferred color.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md w-full justify-center">
              <Input
                type="text"
                placeholder="Enter Winning Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-center font-bold tracking-widest uppercase"
                disabled={isLoading}
              />
              <Button
                onClick={handleCheckCode}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:scale-105 active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify Code"}
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 mt-4">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                Secure Verification
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                Instant Approval
              </div>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
          </div>
        </div>

        <HowItWorks />
        
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <RecentWinners />
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <Dialog open={isLoading} onOpenChange={setIsLoading}>
        <DialogContent className="sm:max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center border-none">
          <div className="flex flex-col items-center py-4">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-blue-50 rounded-full"></div>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-800 mt-6">
              Verifying Code
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">
              Connecting to secure database...
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center border-none animate-scale-in">
          <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
            <Gift className="h-8 w-8 text-green-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
              Winner Confirmed! 🎉
            </DialogTitle>
            {winningPrize && (
              <div className="mt-6 mb-6">
                <img
                  src={winningPrize.image}
                  alt={winningPrize.name}
                  className="mx-auto h-48 object-contain mb-4 drop-shadow-2xl"
                />
                <p className="text-xl font-bold text-blue-600">
                  iPhone 16 Pro Max
                </p>
                <p className="text-sm text-gray-500 mt-1">Reserved for: {code}</p>
              </div>
            )}
            <DialogDescription className="text-gray-600 text-lg">
              Your prize is ready. Please select your preferred color to continue.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleChooseColor}
            className="w-full py-6 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-blue-100 transition-all transform hover:scale-105"
          >
            Choose Color & Model
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
        <DialogContent className="sm:max-w-sm bg-white p-8 rounded-2xl shadow-2xl text-center border-none animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Select Your Style
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Choose the color for your new iPhone 16.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-8">
            <img
              src={selectedColor.image}
              alt={selectedColor.name}
              className="h-64 object-contain transition-all duration-500 transform hover:scale-110"
            />
          </div>
          <div className="flex justify-center items-center gap-6 mb-8">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full ${color.colorClass} border-4 transition-all duration-200 ${
                  selectedColor.name === color.name
                    ? "border-blue-500 scale-125 shadow-lg"
                    : "border-white shadow-sm"
                }`}
                aria-label={`Choose ${color.name}`}
              />
            ))}
          </div>
          <div className="text-sm font-bold text-gray-800 mb-6">
            Color: <span className="text-blue-600">{selectedColor.name}</span>
          </div>
          <Button
            onClick={handleAgreement}
            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-blue-100 transition-all transform hover:scale-105"
          >
            Confirm Selection
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAgreementModalOpen}
        onOpenChange={setIsAgreementModalOpen}
      >
        <DialogContent className="sm:max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center border-none animate-scale-in">
          <div className="mx-auto bg-blue-50 p-4 rounded-full w-fit mb-6">
            <ShieldCheck className="h-10 w-10 text-blue-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
              Final Step: Verification
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center leading-relaxed">
              To prevent automated claims and ensure prizes go to real people, you must complete a quick human verification. 
              <br /><br />
              Once verified, your **Digital Pickup Receipt** will be generated instantly.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={() => setShowLocker(true)}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-green-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              Verify & Claim Prize
            </button>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Secure 256-bit Encrypted Connection
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center border-none animate-scale-in">
          <div className="mx-auto bg-red-50 p-4 rounded-full w-fit mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Invalid Code
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-lg">
              The code you entered was not found in our winner database. Please check for typos and try again.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsErrorModalOpen(false)}
            className="w-full py-4 mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-all"
          >
            Try Another Code
          </Button>
        </DialogContent>
      </Dialog>

      {showLocker && <Locker onClose={() => setShowLocker(false)} />}

      <div className="bg-white">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;