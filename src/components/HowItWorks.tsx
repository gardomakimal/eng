"use client";

import React from "react";
import { Ticket, Palette, ShieldCheck, Package } from "lucide-react";

const steps = [
  {
    icon: <Ticket className="h-6 w-6 text-blue-600" />,
    title: "Enter Code",
    description: "Input your unique winning code received via email or SMS."
  },
  {
    icon: <Palette className="h-6 w-6 text-purple-600" />,
    title: "Choose Color",
    description: "Select your favorite iPhone 16 color and model specifications."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
    title: "Verify",
    description: "Complete a quick human verification to secure your claim."
  },
  {
    icon: <Package className="h-6 w-6 text-orange-600" />,
    title: "Get Receipt",
    description: "Receive your digital receipt to pick up your device at any store."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">How to Claim Your Prize</h2>
        <p className="text-gray-600 mt-2">Follow these simple steps to get your new iPhone 16.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;