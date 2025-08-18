import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Loader2 } from "lucide-react";

// Define prize data
const prizeData: { [key: string]: { name: string; image: string } } = {
  "154590": { name: "iPhone 16 Pro / Pro Max", image: "/iphone.png" },
};

// Define color options
const colorOptions = [
  { name: "Black", image: "/black.jpg", colorClass: "bg-zinc-800" },
  { name: "Green", image: "/green.jpg", colorClass: "bg-teal-500" },
  { name: "Pink", image: "/pink.jpg", colorClass: "bg-pink-400" },
];

const Index: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState<boolean>(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState<boolean>(false);
  const [winningPrize, setWinningPrize] = useState<{ name: string; image: string } | null>(null);
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
    }, 2000);
  };

  const handleChooseColor = () => {
    setIsSuccessModalOpen(false);
    setIsColorModalOpen(true);
  };

  const handleAgreement = () => {
    setIsColorModalOpen(false);
    setIsAgreementModalOpen(true);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-4 font-poppins overflow-hidden"
      style={{
        backgroundImage: "url('/iphonebg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`absolute inset-0 transition-all duration-500 ease-in-out bg-black/50 ${
          isSuccessModalOpen || isErrorModalOpen || isLoading || isColorModalOpen || isAgreementModalOpen ? "backdrop-blur-md" : "backdrop-blur-sm"
        }`}
      ></div>

      <div className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Enter Your Winning Code</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Enter your unique code below to see if you've won.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            type="text"
            placeholder="Your Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-blue-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleCheckCode}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10">Check Code</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
          </Button>
        </div>
      </div>

      <Dialog open={isLoading} onOpenChange={setIsLoading}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              Scanning Code...
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300 text-lg">
              Please wait while we verify your code.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Congratulations! 🎉</DialogTitle>
            {winningPrize && (
              <div className="mt-4 mb-6">
                <img src={winningPrize.image} alt={winningPrize.name} className="mx-auto h-32 w-32 object-contain mb-4" />
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">You won an iPhone 16</p>
              </div>
            )}
            <DialogDescription className="text-gray-700 dark:text-gray-300 text-lg">
              You've won! More details to follow.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleChooseColor}
            className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Choose a color
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Choose Your Color</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">Select your preferred color for the new iPhone 16.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-6">
            <img src={selectedColor.image} alt={selectedColor.name} className="h-64 object-contain transition-all duration-300" />
          </div>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color.colorClass} border-2 transition-all duration-200 ${
                    selectedColor.name === color.name ? "ring-2 ring-offset-2 ring-blue-500 border-white" : "border-transparent"
                  }`}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>
          <Button
            onClick={handleAgreement}
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Next
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isAgreementModalOpen} onOpenChange={setIsAgreementModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Final Step</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300 text-left">
              So we can start shipping the iPhone to you, you need to finish the last step. The sponsor of this giveaway (who paid for the iPhones) requests that the winners download and play their game for a short time (15-20 minutes).
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-6">
            <Button
              onClick={() => setIsAgreementModalOpen(false)}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Yes I Agree
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">❌ Invalid Code</DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300 text-lg">
              The code you entered is incorrect. Please try again.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsErrorModalOpen(false)}
            className="w-full py-3 mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
      <MadeWithDyad />
    </div>
  );
};

export default Index;