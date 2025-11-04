"use client";

import Header from "@/components/Header";
import ClientLogos from "@/components/ClientLogos";
import Link from "next/link";
import { projects } from "@/data/projects";
import React, { use, useEffect, useState, useRef } from "react";

// ========================================
// PROJETOS - Para editar, vá em /data/projects.ts
// ========================================

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  // Importação dinâmica do dicionário no cliente
  const [dict, setDict] = React.useState<any>(null);

  React.useEffect(() => {
    const loadDict = async () => {
      try {
        const response = await fetch(`/dictionaries/${locale}.json`);
        const data = await response.json();
        setDict(data);
      } catch (error) {
        console.error('Error loading dictionary:', error);
      }
    };
    loadDict();
  }, [locale]);

  // Scroll to hash section when page loads
  React.useEffect(() => {
    if (!dict) return;

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [dict]);

  // Magnetic effect for social icons and photo
  React.useEffect(() => {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    const photoElements = document.querySelectorAll('[data-magnetic-photo]');
    const handlers: Array<{ wrapper: Element; handleMouseMove: (e: Event) => void; handleMouseLeave: () => void }> = [];

    // Social icons magnetic effect
    magneticElements.forEach((wrapper: any) => {
      const ball = wrapper.querySelector('.icon-inner');
      const logo = ball?.querySelector('.social-icon');

      if (!ball || !logo) return;

      const ballStrength = 28;
      const logoStrength = 18;

      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseEvent.clientX - centerX;
        const deltaY = mouseEvent.clientY - centerY;

        const ballMoveX = (deltaX / rect.width) * ballStrength;
        const ballMoveY = (deltaY / rect.height) * ballStrength;
        ball.style.transform = `translate(${ballMoveX}px, ${ballMoveY}px)`;

        const logoMoveX = (deltaX / rect.width) * logoStrength;
        const logoMoveY = (deltaY / rect.height) * logoStrength;
        logo.style.transform = `translate(${logoMoveX}px, ${logoMoveY}px)`;
      };

      const handleMouseLeave = () => {
        ball.style.transform = 'translate(0, 0)';
        logo.style.transform = 'translate(0, 0)';
      };

      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);

      handlers.push({ wrapper, handleMouseMove, handleMouseLeave });
    });

    // Photo magnetic effect
    photoElements.forEach((photo: any) => {
      const parent = photo.parentElement;
      if (!parent) return;

      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = parent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseEvent.clientX - centerX;
        const deltaY = mouseEvent.clientY - centerY;

        // Calcular rotação baseada na posição do mouse
        const rotateY = (deltaX / rect.width) * 15; // -15 a +15 graus
        const rotateX = -(deltaY / rect.height) * 15; // -15 a +15 graus (invertido)

        photo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
      };

      const handleMouseLeave = () => {
        photo.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.1)';
      };

      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);

      handlers.push({ wrapper: parent, handleMouseMove, handleMouseLeave });
    });

    return () => {
      handlers.forEach(({ wrapper, handleMouseMove, handleMouseLeave }) => {
        wrapper.removeEventListener('mousemove', handleMouseMove);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [dict]);

  if (!dict) return null;

  return (
    <main className="min-h-screen bg-lnx-pure-black text-lnx-snow">
      <Header locale={locale} dict={dict} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end justify-start px-6 pb-20 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/LNX_CENAS_SITE_LOOP_01.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="text-left relative z-10 pl-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-tighter flex flex-col gap-1 italic">
            <span className="inline-block font-light" style={{ animation: 'textHighlightBold 6s ease-in-out infinite', animationDelay: '0s', willChange: 'transform, opacity' }}>
              {dict.hero.text1}
            </span>
            <span className="inline-block font-light" style={{ animation: 'textHighlightBold 6s ease-in-out infinite', animationDelay: '1.5s', willChange: 'transform, opacity' }}>
              {dict.hero.text2}
            </span>
            <span className="inline-block font-light" style={{ animation: 'textHighlightBold 6s ease-in-out infinite', animationDelay: '3s', willChange: 'transform, opacity' }}>
              {dict.hero.text3}
            </span>
            <span className="inline-block font-light" style={{ animation: 'textHighlightBold 6s ease-in-out infinite', animationDelay: '4.5s', willChange: 'transform, opacity' }}>
              {dict.hero.text4}
            </span>
          </h2>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6 border-t border-lnx-charcoal relative overflow-hidden" style={{ display: 'none' }}>
        {/* Retro Pixel Grid Background - 3 tipos de movimento */}
        <div
          className="absolute inset-0 opacity-30 overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 20px)',
            gridTemplateRows: 'repeat(auto-fill, 20px)',
            gap: '4px',
            padding: '0',
            maxHeight: '100%'
          }}
        >
          {[...Array(600)].map((_, i) => {
            // Divide pixels em 3 tipos com cores da bandeira do Brasil
            const type = i % 3;
            let animationType, color;

            if (type === 0) {
              // Floating Point - suave (verde bandeira)
              animationType = 'floatingPoint';
              color = '#009b3a';
            } else if (type === 1) {
              // Fixed Point - travado (azul bandeira mais claro)
              animationType = 'fixedPoint';
              color = '#0066cc';
            } else {
              // Variable - caótico (amarelo mais suave)
              animationType = 'variablePoint';
              color = '#6b5d2f';
            }

            // Use index for consistent values (no Math.random for SSR)
            const binaryValue = (i * 7) % 2 === 0 ? '1' : '0';
            const isVisible = (i * 13) % 5 > 2 ? 1 : 0;

            return (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  animation: `${animationType} ${5 + (i % 4)}s ease-in-out ${(i % 10) * 0.3}s infinite`,
                  opacity: isVisible,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'monospace'
                }}
              >
                {binaryValue}
              </div>
            );
          })}
        </div>

        <div className="text-left relative z-10 pl-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-tighter flex flex-col gap-1 italic">
            <span className="inline-block transition-all duration-1000 font-light" style={{ animation: 'textHighlightBold 12s ease-in-out infinite', animationDelay: '6s' }}>
              {dict.hero.text1}
            </span>
            <span className="inline-block transition-all duration-1000 font-light" style={{ animation: 'textHighlightBold 12s ease-in-out infinite', animationDelay: '0s' }}>
              {dict.hero.text2}
            </span>
            <span className="inline-block transition-all duration-1000 font-light" style={{ animation: 'textHighlightBold 12s ease-in-out infinite', animationDelay: '9s' }}>
              {dict.hero.text3}
            </span>
            <span className="inline-block transition-all duration-1000 font-light" style={{ animation: 'textHighlightBold 12s ease-in-out infinite', animationDelay: '3s' }}>
              {dict.hero.text4}
            </span>
          </h2>
        </div>
      </section>

      {/* About Section - OCULTO - Agora está integrado na seção de Skills */}
      <section id="about" className="hidden py-32 px-6 border-t border-lnx-charcoal">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xs md:text-sm font-light mb-8 text-center tracking-[0.4em] text-lnx-silver uppercase">
            {dict.about.title}
          </h2>

          <h3 className="text-xl md:text-2xl font-light mb-8 text-lnx-platinum">
            {dict.about.subtitle}
          </h3>

          <div className="space-y-6 text-base md:text-lg text-lnx-light-silver leading-relaxed font-light">
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
            <p>{dict.about.p3}</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="works" className="py-20 px-6 border-t border-lnx-charcoal">
        <div className="container mx-auto">
          {/* Logos Carousel */}
          <div className="mb-16 overflow-hidden">
            <div className="relative">
              <div className="flex animate-infinite-scroll" style={{ width: 'max-content' }}>
                {/* Primeiro conjunto de logos */}
                <div className="flex items-center shrink-0 pr-12">
                  {(() => {
                    const brands = [
                      { name: 'Vivo', file: 'vivo.svg', width: 100, brightness: 2.0 },
                      { name: 'Bradesco', file: 'bradesco.svg', width: 100, brightness: 2.0 },
                      { name: 'Itaú', file: 'itau.png', width: 100 },
                      { name: 'Santander', file: 'santander.png', width: 100 },
                      { name: 'Nubank', file: 'nubank.svg', width: 100, brightness: 2.0 },
                      { name: 'Intel', file: 'intel-3.png', width: 100, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
                      { name: 'McDonald\'s', file: 'mcdonalds.svg', width: 100 },
                      { name: 'Natura', file: 'natura.png', width: 100, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
                      { name: 'Jeep', file: 'jeep.png', width: 100, brightness: 2.0 },
                      { name: 'Nivea', file: 'nivea.png', width: 100, brightness: 2.0 },
                      { name: 'Petronas', file: 'petronas.svg', width: 100 },
                      { name: 'iFood', file: 'ifood.svg', width: 100 },
                    ];
                    return brands.map((brand, idx) => (
                      <div
                        key={`logo-set-1-${idx}`}
                        className="flex items-center justify-center mx-8"
                      >
                        <img
                          src={`/logos/${brand.file}`}
                          alt={brand.name}
                          style={{
                            width: `${brand.width}px`,
                            height: 'auto',
                            maxHeight: '80px',
                            filter: brand.customFilter
                              ? brand.customFilter
                              : `grayscale(1) brightness(${brand.brightness || 1.2})`,
                            pointerEvents: 'none',
                            userSelect: 'none'
                          }}
                          className="object-contain opacity-60 hover:opacity-100 transition-all duration-300"
                          draggable="false"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    ));
                  })()}
                </div>

                {/* Segundo conjunto de logos (duplicado) */}
                <div className="flex items-center shrink-0 pr-12" aria-hidden="true">
                  {(() => {
                    const brands = [
                      { name: 'Vivo', file: 'vivo.svg', width: 100, brightness: 2.0 },
                      { name: 'Bradesco', file: 'bradesco.svg', width: 100, brightness: 2.0 },
                      { name: 'Itaú', file: 'itau.png', width: 100 },
                      { name: 'Santander', file: 'santander.png', width: 100 },
                      { name: 'Nubank', file: 'nubank.svg', width: 100, brightness: 2.0 },
                      { name: 'Intel', file: 'intel-3.png', width: 100, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
                      { name: 'McDonald\'s', file: 'mcdonalds.svg', width: 100 },
                      { name: 'Natura', file: 'natura.png', width: 100, customFilter: 'grayscale(1) invert(1) brightness(1.3) contrast(2)' },
                      { name: 'Jeep', file: 'jeep.png', width: 100, brightness: 2.0 },
                      { name: 'Nivea', file: 'nivea.png', width: 100, brightness: 2.0 },
                      { name: 'Petronas', file: 'petronas.svg', width: 100 },
                      { name: 'iFood', file: 'ifood.svg', width: 100 },
                    ];
                    return brands.map((brand, idx) => (
                      <div
                        key={`logo-set-2-${idx}`}
                        className="flex items-center justify-center mx-8"
                      >
                        <img
                          src={`/logos/${brand.file}`}
                          alt={brand.name}
                          style={{
                            width: `${brand.width}px`,
                            height: 'auto',
                            maxHeight: '80px',
                            filter: brand.customFilter
                              ? brand.customFilter
                              : `grayscale(1) brightness(${brand.brightness || 1.2})`,
                            pointerEvents: 'none',
                            userSelect: 'none'
                          }}
                          className="object-contain opacity-60 hover:opacity-100 transition-all duration-300"
                          draggable="false"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="project-card-wrapper group relative">
                <span className="project-border-draw"></span>
                <Link
                  href={`/${locale}/projects/${project.id}`}
                  className="block overflow-hidden transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-lnx-deep-black overflow-hidden rounded-t-lg">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-lnx-deep-black/50">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-lnx-platinum transition-colors">
                      {project.client}
                    </h3>
                    <p className="text-sm text-lnx-silver">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <style jsx>{`
            @keyframes infinite-scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-infinite-scroll {
              display: flex;
              animation: infinite-scroll 30s linear infinite;
            }

            .project-card-wrapper {
              position: relative;
            }

            .project-border-draw {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              pointer-events: none;
              z-index: 10;
            }

            .project-border-draw::before,
            .project-border-draw::after {
              content: '';
              position: absolute;
              background: white;
            }

            /* Top and Bottom */
            .project-border-draw::before {
              top: 0;
              left: 0;
              width: 0;
              height: 4px;
            }

            .project-border-draw::after {
              bottom: 0;
              right: 0;
              width: 0;
              height: 4px;
            }

            /* Left and Right */
            .project-card-wrapper::before,
            .project-card-wrapper::after {
              content: '';
              position: absolute;
              background: white;
              width: 4px;
              height: 0;
              z-index: 10;
            }

            .project-card-wrapper::before {
              top: 0;
              right: 0;
            }

            .project-card-wrapper::after {
              bottom: 0;
              left: 0;
            }

            /* Animation on hover */
            .project-card-wrapper:hover .project-border-draw::before {
              animation: drawTop 0.1s ease-out forwards;
            }

            .project-card-wrapper:hover::before {
              animation: drawRight 0.1s 0.1s ease-out forwards;
            }

            .project-card-wrapper:hover .project-border-draw::after {
              animation: drawBottom 0.1s 0.2s ease-out forwards;
            }

            .project-card-wrapper:hover::after {
              animation: drawLeft 0.1s 0.3s ease-out forwards;
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
        </div>
      </section>

      {/* Skills Section - Inspired Design */}
      <section id="expertise" className="py-8 px-6 bg-black">
        <div className="container mx-auto max-w-[1920px]">
          {/* Grande Marco - cor preta */}
          <div
            className="relative rounded-3xl shadow-2xl overflow-hidden group/photo"
            style={{ minHeight: '950px', backgroundColor: '#000000', perspective: '1000px' }}
            onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector('video.overlay-video') as HTMLVideoElement;
              if (video) video.play();
            }}
            onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector('video.overlay-video') as HTMLVideoElement;
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            }}
          >
            {/* Background Image com efeito magnético */}
            <div
              className="absolute magnetic-photo"
              data-magnetic-photo="true"
              style={{
                top: '-10%',
                left: '-10%',
                right: '-10%',
                bottom: '-10%',
                backgroundImage: 'url(/still/lenox_1920x1080.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center -50px',
                backgroundRepeat: 'no-repeat',
                transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                transform: 'scale(1.1)'
              }}
            />

            {/* Video Overlay - aparece no hover */}
            <video
              loop
              muted
              playsInline
              className="overlay-video absolute inset-0 w-full h-full object-cover opacity-0 group-hover/photo:opacity-60 transition-all duration-500 pointer-events-none"
              style={{
                mixBlendMode: 'screen'
              }}
            >
              <source src="/videos/Lenox_loop_6.mp4" type="video/mp4" />
            </video>

            {/* Conteúdo com padding - reduzido no topo */}
            <div className="relative px-12 md:px-20 py-4">

            {/* Layout: AI ARTIST à direita (altura dos olhos) */}
            <div className="relative z-10 group" style={{ marginTop: '180px' }}>
              {/* Container para AI ARTIST e nome */}
              <div className="flex justify-end">

            {/* Box de texto à direita com hover expandível - altura dos olhos */}
              {/* Texto sobre - à direita com fundo */}
              <div className="flex-shrink-0 lg:max-w-md group/ai">
                {/* Título AI ARTIST - sempre visível sem fundo */}
                <div className="px-6 pb-6 cursor-pointer flex items-center gap-4">
                  <h3 className="text-6xl md:text-7xl font-bold leading-none">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600"
                          style={{
                            WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                            textShadow: '0 0 30px rgba(255,255,255,0.1)'
                          }}>
                      {dict.about.title}
                    </span>
                  </h3>
                  {/* Setas animadas - indicador minimalista */}
                  <div className="flex flex-col gap-1 animate-bounce">
                    <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Box com conteúdo - aparece apenas no hover */}
                <div className="opacity-0 max-h-0 group-hover/ai:opacity-100 group-hover/ai:max-h-[600px] transition-all duration-500 ease-in-out overflow-hidden">
                  <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 space-y-4 leading-relaxed text-left">
                    {/* Nome e Cargo no topo */}
                    <div className="border-b border-white/20 pb-4 mb-4">
                      <p className="text-sm font-light text-white tracking-wide mb-1">FERNANDO LENOX</p>
                      <p className="text-xs text-neutral-400 font-light tracking-tight">Creative Director & AI Pipeline Architect</p>
                    </div>

                    <p className="text-base md:text-lg font-semibold tracking-tight text-white">
                      {dict.about.p1}
                    </p>
                    <p className="text-base md:text-lg font-semibold tracking-tight text-white">
                      {dict.about.p2}
                    </p>
                    {dict.about.p3 && (
                      <p className="text-base md:text-lg font-semibold tracking-tight text-white">
                        {dict.about.p3}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              </div>
            </div>
            </div>

            {/* PARCEIROS & MARCAS - Canto inferior esquerdo */}
            <div className="absolute bottom-8 left-8 z-10 group/partners max-w-md">
              {/* Box com texto - aparece no hover e expande para cima */}
              <div className="flex flex-col">
                {/* Box com conteúdo - aparece apenas no hover e cresce para cima */}
                <div className="opacity-0 max-h-0 group-hover/partners:opacity-100 group-hover/partners:max-h-[400px] transition-all duration-500 ease-in-out overflow-hidden mb-1">
                  <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4">
                    <p className="text-base md:text-lg font-semibold tracking-tight text-white leading-relaxed">
                      Lenox tem orgulho em colaborar com marcas que compartilham sua busca por performance e inovação em diversos segmentos. Com parceiros que caminham ao lado na busca por excelência e impacto real.
                    </p>
                  </div>
                </div>

                {/* Título MARCAS & PARCEIROS - sempre visível */}
                <div className="p-4 cursor-pointer">
                  <div className="flex flex-col leading-none">
                    {/* Primeira linha: MARCAS & e setas */}
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600"
                              style={{
                                WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                                textShadow: '0 0 30px rgba(255,255,255,0.1)',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                fontWeight: '900',
                                letterSpacing: '-0.02em'
                              }}>
                          MARCAS
                        </span>
                      </h3>
                      <span className="text-5xl md:text-6xl text-white/40 font-light"
                            style={{
                              fontFamily: 'Didot, "Bodoni MT", "Playfair Display", serif',
                              fontStyle: 'italic'
                            }}>
                        &
                      </span>
                      {/* Setas indicadoras - apontam para cima */}
                      <div className="flex flex-col gap-0 animate-bounce pb-1">
                        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg className="w-4 h-4 text-white/20 -mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                    {/* Segunda linha: PARCEIROS */}
                    <h3 className="text-4xl md:text-5xl font-light tracking-normal">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-neutral-900"
                            style={{
                              WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
                              textShadow: '0 0 20px rgba(0,0,0,0.3)',
                              fontFamily: 'Didot, "Bodoni MT", "Playfair Display", Georgia, serif',
                              fontWeight: '400'
                            }}>
                        PARCEIROS
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Logotipos de Clientes */}
          <div className="mt-12 mb-3">
            <ClientLogos />
          </div>
        </div>
      </section>

      {/* Contact Section - Agora inclui os Skills */}
      <section id="contact" className="pt-3 pb-20 px-6 bg-black">
        <div className="container mx-auto max-w-[1920px]">
          {/* Boxes de Habilidades - Grid em linha horizontal */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Box 1 - Concept */}
              <div
                className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[550px] bg-gradient-to-br from-neutral-600 to-neutral-700"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play();
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
              >
                {/* Video Background */}
                <video
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/box_liquid_01.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-600/70 to-neutral-700/70 group-hover:from-neutral-600/30 group-hover:to-neutral-700/30 transition-all duration-300"></div>
                {/* Título vertical à esquerda */}
                <div className="absolute left-6 top-6 bottom-6 flex items-end">
                  <h3 className="text-4xl font-black text-white tracking-tighter"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: '900',
                        letterSpacing: '-0.02em'
                      }}>
                    CONCEPT
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 pl-24 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 -mx-2 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-sm text-neutral-200 mb-3 font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Ideias, Testes e Experimentos
                    </p>
                    <p className="text-white text-sm leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Fase de exploração criativa onde ideias ganham forma visual. Testes, estudos e experimentos com IA definem linguagem, estética e direção antes da produção. Cada conceito é um laboratório criativo para encontrar novas soluções visuais.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 2 - Pré-Produção */}
              <div
                className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[550px] bg-gradient-to-br from-neutral-700 to-neutral-800"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play();
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
              >
                {/* Video Background */}
                <video
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/box_liquid_02.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/70 to-neutral-800/70 group-hover:from-neutral-700/30 group-hover:to-neutral-800/30 transition-all duration-300"></div>
                {/* Título vertical à esquerda */}
                <div className="absolute left-6 top-6 bottom-6 flex items-end">
                  <h3 className="text-4xl font-black text-white tracking-tighter"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: '900',
                        letterSpacing: '-0.02em'
                      }}>
                    PRÉ-PRODUÇÃO
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 pl-24 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 -mx-2 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-sm text-neutral-200 mb-3 font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Arquitetura do Fluxo
                    </p>
                    <p className="text-white text-sm leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Desenho técnico e criativo do pipeline: como o projeto será executado, quais ferramentas serão usadas e qual será o caminho da imagem até o resultado final. É aqui que se define o equilíbrio entre arte, eficiência e controle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 3 - Pós-Produção */}
              <div
                className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[550px] bg-gradient-to-br from-neutral-600 to-neutral-800"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play();
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
              >
                {/* Video Background */}
                <video
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/box_liquid_03.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-600/70 to-neutral-800/70 group-hover:from-neutral-600/30 group-hover:to-neutral-800/30 transition-all duration-300"></div>
                {/* Título vertical à esquerda */}
                <div className="absolute left-6 top-6 bottom-6 flex items-end">
                  <h3 className="text-4xl font-black text-white tracking-tighter"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: '900',
                        letterSpacing: '-0.02em'
                      }}>
                    PÓS-PRODUÇÃO
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 pl-24 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 -mx-2 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-sm text-neutral-200 mb-3 font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Execução no Pipeline
                    </p>
                    <p className="text-white text-sm leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Aplicação prática do fluxo criado: composição, refino e integração entre IA, edição, cor e VFX. Cada etapa é conduzida com precisão técnica para garantir consistência estética e fidelidade à visão original.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 4 - Entregas */}
              <div
                className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[550px] bg-gradient-to-br from-neutral-700 to-neutral-900"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play();
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
              >
                {/* Video Background */}
                <video
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/box_liquid_04.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/70 to-neutral-900/70 group-hover:from-neutral-700/30 group-hover:to-neutral-900/30 transition-all duration-300"></div>
                {/* Título vertical à esquerda */}
                <div className="absolute left-6 top-6 bottom-6 flex items-end">
                  <h3 className="text-4xl font-black text-white tracking-tighter"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: '900',
                        letterSpacing: '-0.02em'
                      }}>
                    ENTREGAS
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 pl-24 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 -mx-2 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-sm text-neutral-200 mb-3 font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Formatos e Aplicações
                    </p>
                    <p className="text-white text-sm leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      Finalização e adaptação para múltiplos formatos — imagem, vídeo, motion ou híbridos. O resultado é uma entrega escalável, pronta para campanhas, apresentações ou pós-produção de alto nível.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Photo Gallery Section - Random Layout */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="random-gallery">
            {/* Pilha baguncada de fotos - múltiplas camadas com desfoque */}

            {/* Camada de baixo - bem espalhadas e mais desfocadas */}
            <div className="gallery-item gallery-blur-heavy" style={{ top: '2%', left: '2%', width: '220px', rotate: '-35deg', zIndex: 1 }}>
              <img src="/gallery/1.PNG" alt="Gallery 1" />
            </div>

            <div className="gallery-item gallery-blur-heavy" style={{ top: '10%', left: '25%', width: '240px', rotate: '28deg', zIndex: 2 }}>
              <img src="/gallery/2.png" alt="Gallery 2" />
            </div>

            <div className="gallery-item gallery-blur-heavy" style={{ top: '5%', right: '18%', width: '260px', rotate: '-42deg', zIndex: 3 }}>
              <img src="/gallery/3.png" alt="Gallery 3" />
            </div>

            <div className="gallery-item gallery-blur-heavy" style={{ top: '15%', right: '3%', width: '230px', rotate: '38deg', zIndex: 4 }}>
              <img src="/gallery/4.png" alt="Gallery 4" />
            </div>

            {/* Camada do meio - desfoque médio */}
            <div className="gallery-item gallery-blur-medium" style={{ top: '28%', left: '8%', width: '270px', rotate: '22deg', zIndex: 5 }}>
              <img src="/gallery/5.png" alt="Gallery 5" />
            </div>

            <div className="gallery-item gallery-blur-medium" style={{ top: '38%', left: '32%', width: '125px', rotate: '-31deg', zIndex: 6 }}>
              <img src="/gallery/6.png" alt="Gallery 6" />
            </div>

            <div className="gallery-item gallery-blur-medium" style={{ top: '35%', right: '10%', width: '280px', rotate: '19deg', zIndex: 7 }}>
              <img src="/gallery/1.PNG" alt="Gallery 1" />
            </div>

            <div className="gallery-item gallery-blur-medium" style={{ top: '42%', right: '28%', width: '240px', rotate: '-25deg', zIndex: 8 }}>
              <img src="/gallery/2.png" alt="Gallery 2" />
            </div>

            {/* Camada intermediária - desfoque leve */}
            <div className="gallery-item gallery-blur-light" style={{ bottom: '22%', left: '5%', width: '260px', rotate: '33deg', zIndex: 9 }}>
              <img src="/gallery/3.png" alt="Gallery 3" />
            </div>

            <div className="gallery-item gallery-blur-light" style={{ bottom: '28%', left: '28%', width: '245px', rotate: '-28deg', zIndex: 10 }}>
              <img src="/gallery/4.png" alt="Gallery 4" />
            </div>

            <div className="gallery-item gallery-blur-light" style={{ bottom: '25%', right: '15%', width: '270px', rotate: '17deg', zIndex: 11 }}>
              <img src="/gallery/5.png" alt="Gallery 5" />
            </div>

            <div className="gallery-item gallery-blur-light" style={{ bottom: '30%', right: '2%', width: '118px', rotate: '-36deg', zIndex: 12 }}>
              <img src="/gallery/6.png" alt="Gallery 6" />
            </div>

            {/* Camada de cima - sem desfoque, mais nítidas */}
            <div className="gallery-item" style={{ bottom: '8%', left: '12%', width: '340px', rotate: '12deg', zIndex: 13 }}>
              <img src="/gallery/1.PNG" alt="Gallery 1" />
            </div>

            <div className="gallery-item" style={{ bottom: '15%', left: '38%', width: '320px', rotate: '-21deg', zIndex: 14 }}>
              <img src="/gallery/2.png" alt="Gallery 2" />
            </div>

            <div className="gallery-item" style={{ bottom: '5%', right: '25%', width: '350px', rotate: '27deg', zIndex: 15 }}>
              <img src="/gallery/3.png" alt="Gallery 3" />
            </div>

            <div className="gallery-item" style={{ bottom: '12%', right: '8%', width: '330px', rotate: '-18deg', zIndex: 16 }}>
              <img src="/gallery/4.png" alt="Gallery 4" />
            </div>
          </div>
        </div>

        <style jsx>{`
          .random-gallery {
            position: relative;
            width: 100%;
            height: 800px;
          }

          .gallery-item {
            position: absolute;
            transition: all 0.4s ease-out;
            cursor: pointer;
          }

          .gallery-item img {
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            filter: grayscale(1);
            transition: all 0.4s ease-out;
          }

          /* Desfoque progressivo por camada */
          .gallery-blur-heavy img {
            filter: grayscale(1) blur(4px);
            opacity: 0.7;
          }

          .gallery-blur-medium img {
            filter: grayscale(1) blur(2px);
            opacity: 0.85;
          }

          .gallery-blur-light img {
            filter: grayscale(1) blur(1px);
            opacity: 0.9;
          }

          .gallery-item:hover {
            z-index: 100 !important;
            transform: scale(1.15) !important;
          }

          .gallery-item:hover img {
            filter: grayscale(0) blur(0) !important;
            opacity: 1 !important;
            box-shadow: 0 30px 80px rgba(255, 255, 255, 0.3);
          }

          @media (max-width: 1024px) {
            .random-gallery {
              height: 600px;
            }

            .gallery-item {
              width: 200px !important;
            }
          }

          @media (max-width: 768px) {
            .random-gallery {
              height: 500px;
            }

            .gallery-item {
              width: 150px !important;
            }
          }
        `}</style>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto">
          {/* EMAIL Section - acima dos ícones sociais */}
          <div className="flex flex-col items-center justify-center mb-12">
            {/* Título EMAIL com fonte estilizada e setas */}
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: '900',
                    letterSpacing: '-0.02em'
                  }}>
                EMAIL
              </h3>
              {/* Setas para baixo */}
              <div className="flex flex-col gap-0 animate-bounce">
                <svg className="w-5 h-5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <svg className="w-5 h-5 text-black/25 -mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Email link with hover animation */}
            <div className="relative group">
              <a href="mailto:contact@lnx.art" className="block text-center transition-all duration-300">
                <p className="text-xl md:text-2xl font-light tracking-wide text-black group-hover:text-gray-600"
                   style={{
                     fontFamily: 'Didot, "Bodoni MT", "Playfair Display", Georgia, serif',
                     fontWeight: '400'
                   }}>
                  {dict.contact.email}
                </p>
                <div className="mt-2 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent transition-all duration-500 mx-auto" />
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-3 mb-6">
            {/* Instagram */}
            <a href="https://www.instagram.com/lenoxfernando" target="_blank" rel="noopener noreferrer" className="icon-wrapper" data-magnetic="true">
              <div className="icon-inner">
                <svg viewBox="0 0 19 19" className="social-icon">
                  <path d="M5.76269 0.468336C4.81815 0.512899 4.17312 0.663636 3.60924 0.885212C3.02565 1.11265 2.531 1.41785 2.03885 1.91178C1.54669 2.40571 1.24362 2.90071 1.01779 3.48519C0.799227 4.05032 0.651154 4.69587 0.609431 5.64094C0.567708 6.58602 0.558475 6.8898 0.563091 9.30051C0.567708 11.7112 0.57836 12.0134 0.624167 12.9604C0.669264 13.9048 0.819467 14.5496 1.04104 15.1137C1.26883 15.6973 1.57368 16.1918 2.06779 16.6841C2.5619 17.1764 3.05654 17.4788 3.64244 17.705C4.20703 17.9232 4.85277 18.072 5.79766 18.1133C6.74256 18.1547 7.0467 18.1643 9.4567 18.1597C11.8667 18.1551 12.1701 18.1444 13.117 18.0995C14.0638 18.0546 14.7053 17.9033 15.2695 17.6828C15.8531 17.4545 16.3479 17.1502 16.8399 16.6559C17.3319 16.1616 17.6348 15.6662 17.8605 15.0814C18.0792 14.5168 18.2278 13.8711 18.2688 12.9269C18.3102 11.9793 18.3199 11.6768 18.3153 9.26642C18.3107 6.85607 18.2999 6.55388 18.255 5.60721C18.21 4.66054 18.0597 4.01765 17.8383 3.45323C17.6101 2.86964 17.3056 2.37553 16.8117 1.88284C16.3178 1.39015 15.8221 1.08744 15.2374 0.862309C14.6724 0.64375 14.0271 0.49479 13.0822 0.453954C12.1373 0.413119 11.8331 0.402644 9.42225 0.40726C7.01136 0.411876 6.70954 0.422174 5.76269 0.468336ZM5.86637 16.5163C5.00084 16.4787 4.53088 16.3349 4.21769 16.2145C3.80294 16.0547 3.5075 15.8615 3.19538 15.5524C2.88326 15.2433 2.69151 14.9468 2.52958 14.533C2.40797 14.2198 2.26149 13.7503 2.22101 12.8848C2.17698 11.9493 2.16775 11.6684 2.1626 9.29838C2.15745 6.92833 2.1665 6.64781 2.20752 5.71196C2.24445 4.84714 2.38915 4.37664 2.50934 4.06363C2.66914 3.64835 2.86159 3.35345 3.17141 3.0415C3.48123 2.72955 3.77684 2.53745 4.19105 2.37553C4.50389 2.25338 4.97332 2.10815 5.8385 2.06695C6.7747 2.02257 7.05522 2.01369 9.42492 2.00854C11.7946 2.00339 12.0758 2.01227 13.0124 2.05346C13.8772 2.0911 14.3479 2.23438 14.6606 2.35529C15.0755 2.51508 15.3707 2.70701 15.6827 3.01736C15.9946 3.32771 16.1869 3.62225 16.3488 4.03735C16.4712 4.3493 16.6164 4.81855 16.6572 5.68427C16.7018 6.62046 16.7119 6.90116 16.7162 9.27068C16.7204 11.6402 16.7121 11.9216 16.6711 12.8571C16.6333 13.7226 16.4898 14.1928 16.3693 14.5063C16.2095 14.9209 16.0168 15.2165 15.7068 15.5283C15.3968 15.84 15.1016 16.0321 14.6872 16.1941C14.3747 16.316 13.9047 16.4616 13.0403 16.5028C12.1041 16.5469 11.8236 16.5561 9.45297 16.5612C7.08238 16.5664 6.80275 16.5568 5.86655 16.5163M13.1033 4.53892C13.1037 4.74963 13.1665 4.95549 13.2838 5.13049C13.4012 5.30549 13.5678 5.44175 13.7626 5.52204C13.9574 5.60233 14.1717 5.62305 14.3783 5.58157C14.5849 5.54009 14.7745 5.43829 14.9232 5.28902C15.0719 5.13976 15.173 4.94974 15.2138 4.74301C15.2545 4.53627 15.233 4.32211 15.152 4.1276C15.071 3.93308 14.9341 3.76696 14.7587 3.65024C14.5832 3.53353 14.3772 3.47145 14.1664 3.47187C13.884 3.47244 13.6133 3.58516 13.4139 3.78526C13.2146 3.98536 13.1028 4.25645 13.1033 4.53892ZM4.88117 9.29235C4.88615 11.8099 6.93076 13.8462 9.44782 13.8414C11.9649 13.8366 14.0026 11.7922 13.9978 9.27459C13.993 6.757 11.9478 4.72019 9.43042 4.72517C6.913 4.73014 4.87638 6.77511 4.88117 9.29235ZM6.48015 9.28915C6.47899 8.70389 6.65141 8.13142 6.9756 7.64415C7.29979 7.15688 7.7612 6.77668 8.30147 6.55164C8.84174 6.3266 9.4366 6.26682 10.0108 6.37987C10.5851 6.49291 11.1129 6.7737 11.5276 7.18672C11.9422 7.59975 12.2251 8.12646 12.3404 8.70025C12.4557 9.27404 12.3983 9.86914 12.1754 10.4103C11.9525 10.9515 11.5742 11.4144 11.0882 11.7405C10.6022 12.0666 10.0304 12.2413 9.44516 12.2424C9.05654 12.2433 8.67157 12.1675 8.31224 12.0195C7.9529 11.8715 7.62624 11.6542 7.3509 11.38C7.07556 11.1057 6.85695 10.7799 6.70755 10.4212C6.55814 10.0624 6.48087 9.67776 6.48015 9.28915Z" fill="white"></path>
                </svg>
              </div>
            </a>

            {/* Vimeo */}
            <div className="icon-wrapper" data-magnetic="true">
              <div className="icon-inner">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 0 0 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                </svg>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="icon-wrapper" data-magnetic="true">
              <div className="icon-inner">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-800 text-sm">© <span className="font-bold">2025 LNX Art.</span> ALL rights reserved</p>
          </div>
        </div>

        <style jsx>{`
          .icon-wrapper {
            width: 80px;
            height: 80px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
          }

          a.icon-wrapper {
            display: flex;
          }

          .icon-inner {
            width: 43px;
            height: 43px;
            background: #000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform;
            position: relative;
            overflow: hidden;
          }

          .social-icon {
            width: 19px;
            height: 19px;
            fill: white;
            position: relative;
            z-index: 2;
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform;
          }

          .icon-inner::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }

          .icon-wrapper:hover .icon-inner::before {
            opacity: 1;
          }
        `}</style>
      </footer>
    </main>
  );
}
