"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, ShieldCheck } from "lucide-react";

interface Offer {
  name: string;
  link: string;
  payout: string;
  image: string;
}

interface LockerProps {
  onClose: () => void;
}

const USER_ID = "319070";
const API_KEY = "3585ee70b06a7d74d5b8877f63d87db3";
const BASE_URL = "https://d1y3y09sav47f5.cloudfront.net";
const FEED_URL = `${BASE_URL}/public/offers/feed.php?user_id=${USER_ID}&api_key=${API_KEY}&s1=&s2=`;

const Locker: React.FC<LockerProps> = ({ onClose }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await fetch(FEED_URL);
        if (!response.ok) throw new Error("Failed to fetch offers");
        
        const data = await response.json();
        
        const mappedOffers = (data.offers || data || []).map((offer: any) => ({
          name: offer.name || offer.title || "Special Offer",
          link: offer.link || offer.url,
          payout: offer.payout || "Free",
          image: offer.image || offer.icon || "/placeholder.svg"
        }));

        setOffers(mappedOffers.slice(0, 5));
      } catch (err) {
        console.error("Error fetching offers:", err);
        setError("Could not load offers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white p-6 rounded-3xl shadow-2xl animate-scale-in border-none">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Human Verification
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Complete one of the offers below to verify you are human and receive your iPhone 16 receipt.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-2" />
              <p className="text-sm text-gray-500">Loading available offers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={onClose} variant="outline" className="rounded-xl">Close</Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {offers.length > 0 ? (
                offers.map((offer, index) => (
                  <a
                    key={index}
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-all group"
                  >
                    <img 
                      src={offer.image} 
                      alt="" 
                      className="w-12 h-12 rounded-xl object-cover mr-4 bg-gray-100"
                      onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 text-sm">
                        {offer.name}
                      </h4>
                      <p className="text-xs text-green-600 font-medium">Status: Available</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                  </a>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No offers available in your region.</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Secure Verification System
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Locker;