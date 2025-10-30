"use client";

import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter, usePathname } from "next/navigation";

export default function Header({ locale, dict }: { locale: string; dict: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    // Se não estiver na home, navega primeiro
    if (!pathname.endsWith(locale) && !pathname.endsWith(`${locale}/`)) {
      router.push(`/${locale}`);
      // Aguarda navegação e então faz scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Já está na home, só faz scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <a href={`/${locale}`} className="flex items-center">
            <img src="/logos/LNX_LOGO.png" alt="LNX" className="h-8 w-auto" />
          </a>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors">
              {dict.nav.about}
            </button>
            <button onClick={() => scrollToSection('works')} className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors">
              {dict.nav.works}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors">
              {dict.nav.contact}
            </button>
          </nav>

          {/* Right: Language Switcher */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>

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
              <button onClick={() => scrollToSection('about')} className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors text-left">
                {dict.nav.about}
              </button>
              <button onClick={() => scrollToSection('works')} className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors text-left">
                {dict.nav.works}
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors text-left">
                {dict.nav.contact}
              </button>
              <div className="pt-4 border-t border-gray-800">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
