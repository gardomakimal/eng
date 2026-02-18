"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Loader2, ChevronRight, Info, X, Star } from "lucide-react";

const USER_ID = "319070";
const API_KEY = "3585ee70b06a7d74d5b8877f63d87db3";
const BASE_URL = "https://d1y3y09sav47f5.cloudfront.net";
const FEED_URL = `${BASE_URL}/public/offers/feed.php?user_id=${USER_ID}&api_key=${API_KEY}&s1=&s2=`;

const Locker = ({ onClose }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffersJSONP = () => {
      setLoading(true);
      const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
      const script = document.createElement("script");
      script.src = `${FEED_URL}&callback=${callbackName}`;
      script.async = true;

      window[callbackName] = (data) => {
        try {
          const rawOffers = Array.isArray(data) ? data : data.offers || [];
          const mappedOffers = rawOffers.map((offer, index) => {
            let imgUrl = offer.network_icon || offer.image || offer.icon || offer.picture || offer.image_url || offer.icon_url || "";
            if (imgUrl && !imgUrl.startsWith("http")) {
              imgUrl = `${BASE_URL}${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;
            }

            const difficulties = ["Easy", "Medium", "Hard"];
            const colors = {
              Easy: "bg-[#00c9a7]",
              Medium: "bg-[#ff9f43]",
              Hard: "bg-[#ee5253]"
            };

            // Rating logic: 1st=5, 2nd=4, 3rd=3
            const ratings = [5, 4, 3];

            return {
              name: offer.anchor || offer.name || "Verification Task",
              description: offer.conversion || offer.adcopy || "Complete with valid information",
              link: offer.url || offer.link,
              image: imgUrl,
              difficulty: difficulties[index % 3],
              badgeColor: colors[difficulties[index % 3]],
              rating: ratings[index % 3] || 3
            };
          });

          setOffers(mappedOffers.slice(0, 3));
          setLoading(false);
        } catch (err) {
          setError("Error processing verification tasks.");
          setLoading(false);
        }
        delete window[callbackName];
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
            Age Verification
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium px-4">
            Please complete one tasks below to verify your age and follow the
            instruction bellow each task to pass it successfully to receive your
            reward.
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
                    className="group relative flex items-start gap-4 p-4 transition-all border-2 border-slate-200 bg-slate-50/50 rounded-2xl hover:border-blue-500 hover:bg-white hover:shadow-xl hover:shadow-blue-50/50 overflow-hidden"
                  >
                    {/* Difficulty Badge */}
                    <div className={`absolute top-0 right-0 px-5 py-1.5 rounded-bl-2xl text-[11px] font-black text-white shadow-sm z-10 tracking-wide ${offer.badgeColor}`}>
                      {offer.difficulty}
                    </div>

                    <div className="flex flex-col items-center flex-shrink-0 mt-1">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        {offer.image ? (
                          <img
                            src={offer.image}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offer.name)}&background=f1f5f9&color=64748b&size=128&bold=true`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold text-xl">
                            {offer.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      {/* Star Rating based on specific requirements */}
                      <div className="flex mt-2 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-2.5 h-2.5 ${i < offer.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex-grow min-w-0 pr-12">
                      <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                        {offer.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-1">
                        {offer.description}
                      </p>
                    </div>

                    <div className="absolute bottom-4 right-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                      <ChevronRight className="w-4 h-4" />
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