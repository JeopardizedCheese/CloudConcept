import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <h1 className="text-xl font-bold text-white">CloudConcept</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Debate</a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
        </nav>
        <button className="px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] rounded-md text-white hover:shadow-lg hover:shadow-[#7c3aed]/20 transition-all">
          Start Debate
        </button>
      </div>
    </header>
  );
};

export default Header