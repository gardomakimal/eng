import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Loader2,
  ChevronRight,
  Lock,
  CheckCircle2,
  Info
} from "lucide-react";

const USER_ID = "319070";
const API_KEY = "3585ee70b06a7d74d5b8877f63d87db3";
// Updated Domain from your example
const BASE_URL = "https://d2xohqmdyl2cj3.cloudfront.net";

const App = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchOffersJSONP = () => {
      setLoading(true);
      const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      
      // Create the script tag for JSONP
      const script = document.createElement('script');
      script.src = `${BASE_URL}/public/offers/feed.php?user_id=${USER_ID}&api_key=${API_KEY}&s1=&s2=&callback=${callbackName}`;
      script.async = true;

      // Handle the response
      window[callbackName] = (data) => {
        try {
          const rawOffers = Array.isArray(data) ? data : (data.offers || []);
          
          const mappedOffers = rawOffers.map((offer) => ({
            // Based on your example code: offer.anchor is the title
            name: offer.anchor || offer.name || "Premium Offer",
            // Based on your example: offer.conversion often contains the description/requirement
            description: offer.conversion || offer.adcopy || "Complete this simple step to verify.",
            // Based on your example: offer.url is the link
            link: offer.url || offer.link,
            payout: offer.payout || "Free",
            // Fallback for image as some JSONP feeds omit it
            image: offer.image || offer.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.anchor || 'O')}&background=0D8ABC&color=fff`
          }));

          setOffers(mappedOffers.slice(0, 5));
          setLoading(false);
        } catch (err) {
          setError("Error processing verification tasks.");
          setLoading(false);
        }
        
        // Cleanup
        delete window[callbackName];
        document.body.removeChild(script);
      };

      // Handle script errors
      script.onerror = () => {
        setError("Network security block. Please try again.");
        setLoading(false);
        if (document.body.contains(script)) document.body.removeChild(script);
      };

      document.body.appendChild(script);
    };

    fetchOffersJSONP();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="relative p-8 pb-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
          <div className="absolute top-6 right-8 flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
            <Lock className="w-3 h-3" /> Encrypted
          </div>

          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200 transform -rotate-3 transition-transform duration-300">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            Human Verification
          </h1>
          <p className="max-w-xs mx-auto mt-3 text-sm leading-relaxed text-slate-500 font-medium">
            Perform <span className="text-blue-600 font-bold underline decoration-blue-200 decoration-2 underline-offset-4">one task</span> below to unlock the destination.
          </p>
        </div>

        {/* Offers List */}
        <div className="px-8 pb-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                Fetching Secure Feed...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center rounded-3xl bg-red-50 border border-red-100">
              <Info className="w-10 h-10 mx-auto mb-3 text-red-500" />
              <p className="text-sm font-semibold text-red-800 leading-tight">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-5 px-6 py-2 bg-red-100 rounded-full text-xs font-bold text-red-700 uppercase hover:bg-red-200 transition-colors"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.length > 0 ? (
                offers.map((offer, index) => (
                  <a
                    key={index}
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-4 transition-all border border-slate-100 bg-white rounded-3xl hover:border-blue-500 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1"
                  >
                    {/* Offer Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <img 
                          src={offer.image} 
                          alt="" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.name)}&background=f1f5f9&color=64748b&size=128&bold=true`;
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full border-4 border-white shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Offer Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {offer.name}
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {offer.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                          AVAILABLE
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          Instant Credit
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="py-12 text-center rounded-3xl border-2 border-dashed border-slate-100">
                  <p className="text-sm font-medium text-slate-400 px-6">
                    No verification tasks currently available in your region.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Active</span>
          </div>
          <div className="text-[10px] font-bold text-slate-400 text-right">
             WAITING FOR COMPLETION...
          </div>
        </div>

      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;