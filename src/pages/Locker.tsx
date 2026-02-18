"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Loader2,
  ChevronRight,
  Info,
  X
} from "lucide-react";

const USER_ID = "319070";
const API_KEY = "3585ee70b06a7d74d5b8877f63d87db3";
const BASE_URL = "https://d1y3y09sav47f5.cloudfront.net";
const FEED_URL = `${BASE_URL}/public/offers/feed.php?user_id=${USER_ID}&api_key=${API_KEY}&s1=&s2=`;

interface Offer {
  name: string;
  link: string;
  image: string;
  description: string;
}

interface LockerProps {
  onClose: () => void;
}

const Locker: React.FC<LockerProps> = ({ onClose }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffersJSONP = () => {
      setLoading(true);
      const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      
      const script = document.createElement('script');
      script.src = `${FEED_URL}&callback=${callbackName}`;
      script.async = true;

      (window as any)[callbackName] = (data: any) => {
        try {
          const rawOffers = Array.isArray(data) ? data : (data.offers || []);
          
          const mappedOffers = rawOffers.map((offer: any) => {
            // Prioritize network_icon as discovered, then fallback to other common fields
            let imgUrl = offer.network_icon || offer.image || offer.icon || offer.picture || offer.image_url || offer.icon_url || "";
            
            // If it's a relative path, prepend the base URL
            if (imgUrl && !imgUrl.startsWith('http')) {
              imgUrl = `${BASE_URL}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`;
            }

            return {
              name: offer.anchor || offer.name || "Verification Task",
              description: offer.conversion || offer.adcopy || "Complete this step to verify.",
              link: offer.url || offer.link,
              image: imgUrl
            };
          });

          // Limit to 3 offers
          setOffers(mappedOffers.slice(0, 3));
          setLoading(false);
        } catch (err) {
          setError("Error processing verification tasks.");
          setLoading(false);
        }
        
        delete (window as any)[callbackName];
        if (document.body.contains(script)) document.body.removeChild(script);
      };

      script.onerror = () => {
        setError("Network security block. Please try again.");
        setLoading(false);
        if (document.body.contains(script)) document.body.removeChild(script);
      };

      document.body.appendChild(script);
    };

    fetchOffersJSONP();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-[2.5rem] animate-in zoom-in-95 duration-300 border border-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="relative p-8 pb-6 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Human Verification
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium px-4">
            Please complete one of the tasks below to verify you are human and receive your reward.
          </p>
        </div>

        {/* Offers List */}
        <div className="px-6 pb-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                Loading secure tasks...
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center rounded-3xl bg-red-50 border border-red-100">
              <Info className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <p className="text-sm font-semibold text-red-800">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-5 py-2 bg-white border border-red-200 rounded-full text-xs font-bold text-red-600 uppercase hover:bg-red-50 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {offers.length > 0 ? (
                offers.map((offer, index) => (
                  <a
                    key={index}
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 transition-all border border-slate-100 bg-slate-50/50 rounded-2xl hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-50/50"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        {offer.image ? (
                          <img 
                            src={offer.image} 
                            alt="" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.name)}&background=f1f5f9&color=64748b&size=128&bold=true`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold text-xl">
                            {offer.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {offer.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                        {offer.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 w-9 h-9 mt-2.5 flex items-center justify-center rounded-full bg-white text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="py-12 text-center rounded-3xl border-2 border-dashed border-slate-100">
                  <p className="text-sm font-medium text-slate-400 px-6">
                    No verification tasks available at this moment.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Live Status: Waiting for completion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locker;