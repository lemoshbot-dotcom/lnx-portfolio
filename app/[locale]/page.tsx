"use client";

import Header from "@/components/Header";
import ClientLogos from "@/components/ClientLogos";
import Link from "next/link";
import { projects } from "@/data/projects";
import React, { use } from "react";

// ========================================
// PROJETOS - Para editar, vá em /data/projects.ts
// ========================================

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  // Importação dinâmica do dicionário no cliente
  const [dict, setDict] = React.useState<any>(null);

  React.useEffect(() => {
    import(`@/dictionaries/${locale}.json`).then((module) => {
      setDict(module.default);
    });
  }, [locale]);

  if (!dict) return null;

  return (
    <main className="min-h-screen bg-lnx-pure-black text-lnx-snow">
      <Header locale={locale} dict={dict} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <h2 className="text-lg md:text-2xl font-bold tracking-wide">
            <span className="inline-block transition-all duration-1000" style={{ animation: 'textHighlight 9s ease-in-out infinite', animationDelay: '0s' }}>
              {dict.hero.text1}
            </span>
            <span className="mx-3 text-lnx-steel">|</span>
            <span className="inline-block transition-all duration-1000" style={{ animation: 'textHighlight 9s ease-in-out infinite', animationDelay: '3s' }}>
              {dict.hero.text2}
            </span>
            <span className="mx-3 text-lnx-steel">|</span>
            <span className="inline-block transition-all duration-1000" style={{ animation: 'textHighlight 9s ease-in-out infinite', animationDelay: '6s' }}>
              {dict.hero.text3}
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

        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <h2 className="text-lg md:text-2xl font-bold tracking-wide">
            <span className="inline-block transition-all duration-1000" style={{ animation: 'textHighlight 9s ease-in-out infinite', animationDelay: '0s' }}>
              {dict.hero.text1}
            </span>
            <span className="mx-3 text-lnx-steel">|</span>
            <span className="inline-block transition-all duration-1000" style={{ animation: 'textHighlight 9s ease-in-out infinite', animationDelay: '3s' }}>
              {dict.hero.text2}
            </span>
            <span className="mx-3 text-lnx-steel">|</span>
            <span className="inline-block transition-all duration-1000" style={{ animation: 'textHighlight 9s ease-in-out infinite', animationDelay: '6s' }}>
              {dict.hero.text3}
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
          <h2 className="text-xs md:text-sm font-light mb-16 text-center tracking-[0.4em] text-lnx-silver uppercase">
            {dict.works.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.id}`}
                className="group relative overflow-hidden rounded-lg border border-lnx-charcoal hover:border-lnx-steel transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-lnx-deep-black overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Inspired Design */}
      <section id="expertise" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          {/* Grande Marco Cinza Escuro */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl p-12 md:p-20 shadow-2xl">

            {/* Layout Principal: Lateral + Centro */}
            <div className="grid lg:grid-cols-12 gap-16">

              {/* Lateral Esquerda - Título fora, texto em box branco centralizado */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                {/* Título FORA do retângulo - no fundo cinza - CENTRALIZADO */}
                <div className="flex flex-col items-center text-center">
                  {/* Small text on top */}
                  <h2 className="text-sm font-normal mb-6 text-neutral-500">
                    / {dict.skills.title.toLowerCase()} /
                  </h2>

                  {/* Big Title with style */}
                  <h3 className="text-6xl md:text-7xl font-bold mb-6 leading-none">
                    <span className="text-white">Welcome to</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600"
                          style={{
                            WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                            textShadow: '0 0 30px rgba(255,255,255,0.1)'
                          }}>
                      {dict.about.title}
                    </span>
                  </h3>

                  {/* Subtitle/Description */}
                  <p className="text-xl text-neutral-300 mb-6 leading-relaxed max-w-lg">
                    {dict.about.subtitle}
                  </p>
                </div>

                {/* RETÂNGULO BRANCO REFORMATADO - Estilo FaceOnLive */}
                <div className="bg-white rounded-3xl p-12 md:p-16 max-w-2xl mx-auto -mb-96 md:-mb-[500px]">
                  <div className="space-y-5 text-neutral-800 leading-relaxed text-left">
                    <p className="text-xl md:text-2xl font-semibold tracking-tight">
                      {dict.about.p1}
                    </p>
                    <p className="text-xl md:text-2xl font-semibold tracking-tight">
                      {dict.about.p2}
                    </p>
                    <p className="text-xl md:text-2xl font-semibold tracking-tight">
                      {dict.about.p3}
                    </p>
                  </div>
                </div>
              </div>

              {/* Centro/Direita - Grid 2x2 dos Boxes ESTILO CARDS */}
              <div className="lg:col-span-7">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Box 1 - Estilo Card com imagem de fundo */}
                  <div className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-80 bg-gradient-to-br from-neutral-600 to-neutral-700">
                    {/* Imagem de fundo placeholder - OCUPA TODO O BOX */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-600 to-neutral-700 opacity-90"></div>

                    {/* Texto sobreposto na parte inferior */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {dict.skills.skill1.title}
                      </h3>
                      <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
                        {dict.skills.skill1.description}
                      </p>
                    </div>
                  </div>

                  {/* Box 2 - Estilo Card */}
                  <div className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-80 bg-gradient-to-br from-neutral-700 to-neutral-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-800 opacity-90"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {dict.skills.skill2.title}
                      </h3>
                      <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
                        {dict.skills.skill2.description}
                      </p>
                    </div>
                  </div>

                  {/* Box 3 - Estilo Card */}
                  <div className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-80 bg-gradient-to-br from-neutral-600 to-neutral-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-600 to-neutral-800 opacity-90"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {dict.skills.skill3.title}
                      </h3>
                      <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
                        {dict.skills.skill3.description}
                      </p>
                    </div>
                  </div>

                  {/* Box 4 - Estilo Card */}
                  <div className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-80 bg-gradient-to-br from-neutral-700 to-neutral-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900 opacity-90"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {dict.skills.skill4.title}
                      </h3>
                      <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
                        {dict.skills.skill4.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 px-6 border-t border-lnx-charcoal">
        <div className="container mx-auto">
          <h2 className="text-xs md:text-sm font-light mb-16 text-center tracking-[0.4em] text-lnx-silver uppercase">
            {dict.clients.title}
          </h2>
          <ClientLogos />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-lnx-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/30 to-transparent pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col items-center justify-center">
            {/* Email link with hover animation */}
            <div className="relative group">
              <a href="mailto:contact@lnx.art" className="block text-center transition-all duration-300">
                <p className="text-3xl md:text-4xl font-light tracking-wide text-lnx-pure-white group-hover:text-lnx-platinum">
                  {dict.contact.email}
                </p>
                <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent transition-all duration-500 mx-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-lnx-charcoal">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <img src="/logos/LNX_LOGO.png" alt="LNX" className="h-6 w-auto" />
            </div>
            <div className="text-lnx-light-silver text-sm">
              {dict.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
