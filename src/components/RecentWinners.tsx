"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const winners = [
  { name: "Sarah J.", location: "London, UK", prize: "iPhone 16 Pro", time: "2 mins ago", avatar: "SJ" },
  { name: "Michael R.", location: "New York, USA", prize: "iPhone 16", time: "5 mins ago", avatar: "MR" },
  { name: "Elena D.", location: "Madrid, Spain", prize: "iPhone 16 Pro Max", time: "12 mins ago", avatar: "ED" },
  { name: "David K.", location: "Berlin, Germany", prize: "iPhone 16", time: "15 mins ago", avatar: "DK" },
];

const RecentWinners: React.FC = () => {
  const [visibleWinners, setVisibleWinners] = useState(winners);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new winners appearing
      setVisibleWinners((prev) => {
        const last = prev[prev.length - 1];
        return [last, ...prev.slice(0, prev.length - 1)];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
        Live Winners Feed
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleWinners.map((winner, idx) => (
          <div 
            key={`${winner.name}-${idx}`} 
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100 animate-fade-in"
          >
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                {winner.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-800 text-sm">{winner.name}</p>
                <span className="text-[10px] text-gray-400 uppercase">{winner.time}</span>
              </div>
              <p className="text-xs text-gray-500">{winner.location}</p>
              <p className="text-xs font-medium text-green-600 mt-1">Won: {winner.prize}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentWinners;