import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Import Loader2 icon

// Define prize data with codes, names, and image paths
const prizeData: { [key: string]: { name: string; image: string } } = {
  "Win4510": { name: "iPhone 16 Pro / Pro Max", image: "/public/iPhone.png" },
  "Win4520": { name: "Nintendo Switch 2", image: "/public/Nintendo.png" },
  "Win4530": { name: "PlayStation 5 Slim", image: "/public/PlayStation.png" },
  "Win4540": { name: "Robux 100 card", image: "/public/Robux.png" },
  "Win4550": { name: "10000 V-Bucks", image: "/public/VBucks.png" },
  "Win4560": { name: "GTA Shark Cards", image: "/public/GTA.png" },
  "Win4570": { name: "Amazon Gift Card", image: "/public/Amazon.png" },
  "Win4580": { name: "Google Play", image: "/public/Google.png" },
  "Win4590": { name: "Apple Store Credit", image: "/public/Apple.png" },
};

const Index: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [winningPrize, setWinningPrize] = useState<{ name: string; image: string } | null>(null); // New state for winning prize
  const navigate = useNavigate();

  const handleCheckCode = () => {
    setIsLoading(true);
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
    setWinningPrize(null); // Reset prize before checking

    setTimeout(() => {
      setIsLoading(false);
      const prize = prizeData[code]; // Check if the code exists in prizeData
      if (prize) {
        setWinningPrize(prize); // Set the winning prize
        setIsSuccessModalOpen(true);
      } else {
        setIsErrorModalOpen(true);
      }
    }, 2000); // Simulate 2-second scanning time
  };

  const handleClaimPrize = () => {
    setIsSuccessModalOpen(false);
    navigate("/claim-prize");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-4 font-poppins overflow-hidden"
      style={{
        backgroundImage: "url('/public/placeholder.svg')", // Placeholder image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blurred background overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out ${
          isSuccessModalOpen || isErrorModalOpen || isLoading ? "backdrop-blur-md bg-black/60" : "backdrop-blur-sm bg-black/30"
        }`}
        style={{
          backgroundImage: "url('/public/placeholder.svg')", // Same placeholder image for blur
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main content box */}
      <div className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Enter Your Winning Code</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Unlock amazing prizes! Enter your unique code below to see if you've won.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            type="text"
            placeholder="Your Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-blue-400"
            disabled={isLoading} // Disable input during loading
          />
          <Button
            onClick={handleCheckCode}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
            disabled={isLoading} // Disable button during loading
          >
            <span className="relative z-10">Check Code</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
          </Button>
        </div>
      </div>

      {/* Loading Pop-up */}
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

      {/* Success Pop-up */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Congratulations! 🎉</DialogTitle>
            {winningPrize && (
              <div className="mt-4 mb-6">
                <img src={winningPrize.image} alt={winningPrize.name} className="mx-auto h-32 w-32 object-contain mb-4" />
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{winningPrize.name}</p>
              </div>
            )}
            <DialogDescription className="text-gray-700 dark:text-gray-300 text-lg">
              You've won an amazing prize! Click below to claim it now.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleClaimPrize}
            className="w-full py-3 mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Claim Your Prize</span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Pop-up */}
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