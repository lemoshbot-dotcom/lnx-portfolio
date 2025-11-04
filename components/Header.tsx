"use client";

import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter, usePathname } from "next/navigation";

export default function Header({ locale, dict }: { locale: string; dict: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter" style={{ '--i': index } as React.CSSProperties}>
        {char}
      </span>
    ));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
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
            <button onClick={() => scrollToSection('expertise')} className={`nav-item-spiral nav-item-border relative text-xs uppercase tracking-tight text-gray-300 hover:text-white hover:font-black transition-all duration-300 hover:scale-110 px-1 py-1 ${activeSection === 'expertise' ? 'font-black !text-white scale-110 active' : 'font-light'}`}>
              <span className="border-draw"></span>
              {splitText(dict.nav.about)}
            </button>
            <button onClick={() => scrollToSection('works')} className={`nav-item-spiral nav-item-border relative text-xs uppercase tracking-tight text-gray-300 hover:text-white hover:font-black transition-all duration-300 hover:scale-110 px-1 py-1 ${activeSection === 'works' ? 'font-black !text-white scale-110 active' : 'font-light'}`}>
              <span className="border-draw"></span>
              {splitText(dict.nav.works)}
            </button>
            <button onClick={() => scrollToSection('contact')} className={`nav-item-spiral nav-item-border relative text-xs uppercase tracking-tight text-gray-300 hover:text-white hover:font-black transition-all duration-300 hover:scale-110 px-1 py-1 ${activeSection === 'contact' ? 'font-black !text-white scale-110 active' : 'font-light'}`}>
              <span className="border-draw"></span>
              {splitText(dict.nav.contact)}
            </button>
          </nav>

          <style jsx>{`
            .nav-item-border {
              position: relative;
              overflow: hidden;
            }

            .border-draw {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              pointer-events: none;
            }

            .border-draw::before,
            .border-draw::after {
              content: '';
              position: absolute;
              background: white;
            }

            /* Top and Bottom */
            .border-draw::before {
              top: 0;
              left: 0;
              width: 0;
              height: 1px;
            }

            .border-draw::after {
              bottom: 0;
              right: 0;
              width: 0;
              height: 1px;
            }

            /* Left and Right (using box-shadow trick) */
            .nav-item-border::before,
            .nav-item-border::after {
              content: '';
              position: absolute;
              background: white;
              width: 1px;
              height: 0;
            }

            .nav-item-border::before {
              top: 0;
              right: 0;
            }

            .nav-item-border::after {
              bottom: 0;
              left: 0;
            }

            /* Animation on hover */
            .nav-item-border:hover .border-draw::before,
            .nav-item-border.active .border-draw::before {
              animation: drawTop 0.15s ease-out forwards;
            }

            .nav-item-border:hover::before,
            .nav-item-border.active::before {
              animation: drawRight 0.15s 0.15s ease-out forwards;
            }

            .nav-item-border:hover .border-draw::after,
            .nav-item-border.active .border-draw::after {
              animation: drawBottom 0.15s 0.3s ease-out forwards;
            }

            .nav-item-border:hover::after,
            .nav-item-border.active::after {
              animation: drawLeft 0.15s 0.45s ease-out forwards;
            }

            @keyframes drawTop {
              to { width: 100%; }
            }

            @keyframes drawRight {
              to { height: 100%; }
            }

            @keyframes drawBottom {
              to { width: 100%; }
            }

            @keyframes drawLeft {
              to { height: 100%; }
            }
          `}</style>

          {/* Right: Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher currentLocale={locale} />
            </div>

            {/* Mobile: Language + Hamburger */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageSwitcher currentLocale={locale} />

              {/* Mobile Menu Button */}
              <button
                className="text-white p-2"
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
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('expertise')} className={`text-sm uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-all duration-300 text-left py-2 ${activeSection === 'expertise' ? 'font-bold !text-white' : ''}`}>
                {dict.nav.about}
              </button>
              <button onClick={() => scrollToSection('works')} className={`text-sm uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-all duration-300 text-left py-2 ${activeSection === 'works' ? 'font-bold !text-white' : ''}`}>
                {dict.nav.works}
              </button>
              <button onClick={() => scrollToSection('contact')} className={`text-sm uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-all duration-300 text-left py-2 ${activeSection === 'contact' ? 'font-bold !text-white' : ''}`}>
                {dict.nav.contact}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
