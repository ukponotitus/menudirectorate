import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#E8E0D4] font-display mb-4">404</div>
        <h1 className="text-3xl font-bold text-[#1A1714] font-display mb-3">Page Not Found</h1>
        <p className="text-[#706860] mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-6 py-3 bg-[#E06000] text-white font-semibold rounded-xl hover:bg-[#C75500] transition-colors text-sm">Go Home</Link>
          <Link to="/meals" className="px-6 py-3 border border-[#E8E0D4] text-[#706860] font-semibold rounded-xl hover:bg-[#F5F0E8] transition-colors text-sm">Explore Meals</Link>
        </div>
      </div>
    </div>
  );
}
