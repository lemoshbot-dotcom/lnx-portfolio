"use client";

import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-white tracking-tight">
            LNX
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-gray-300 hover:text-white transition-colors">
              Work
            </a>
            <a href="#expertise" className="text-gray-300 hover:text-white transition-colors">
              Skills
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <a href="#work" className="text-gray-300 hover:text-white transition-colors">
                Work
              </a>
              <a href="#expertise" className="text-gray-300 hover:text-white transition-colors">
                Skills
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
