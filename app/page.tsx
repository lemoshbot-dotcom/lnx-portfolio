import Header from "@/components/Header";
import ClientLogos from "@/components/ClientLogos";
import Link from "next/link";
import { projects } from "@/data/projects";

// ========================================
// PROJETOS - Para editar, vá em /data/projects.ts
// ========================================

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Push Beyond Creativity
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            AI Artist. Advanced Post-Production. Custom Solutions for premium brands and agencies.
          </p>
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all">
            Watch Showreel
          </button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6 border-t border-gray-900 relative overflow-hidden">
        {/* Retro Pixel Grid Background - 3 tipos de movimento */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 20px)',
            gridTemplateRows: 'repeat(auto-fill, 20px)',
            gap: '4px',
            padding: '20px'
          }}
        >
          {[...Array(500)].map((_, i) => {
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
              color = '#ffd966';
            }

            const binaryValue = Math.random() > 0.5 ? '1' : '0';

            return (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  animation: `${animationType} ${5 + (i % 4)}s ease-in-out ${(i % 10) * 0.3}s infinite`,
                  opacity: Math.random() > 0.6 ? 1 : 0,
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

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            AI Artist. Custom Solutions.
          </h2>
        </div>
      </section>

      {/* Projects Grid - ComfyUI Style */}
      <section id="work" className="py-20 px-6 border-t border-gray-900 relative overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center gap-3 mb-16">
            <div className="text-xs tracking-[0.3em] text-gray-600 animate-pulse">WORKFLOW</div>
            <div className="flex flex-col gap-1">
              <div className="w-px h-4 bg-gray-600 animate-[slideDown_1.5s_ease-in-out_infinite]"></div>
              <div className="w-px h-4 bg-gray-600 animate-[slideDown_1.5s_ease-in-out_0.3s_infinite]"></div>
              <div className="w-px h-4 bg-gray-600 animate-[slideDown_1.5s_ease-in-out_0.6s_infinite]"></div>
            </div>
          </div>

          {/* Workflow Lines */}
          <div className="space-y-32">
            {projects.slice(0, 3).map((project, idx) => (
              <div key={project.id} className="relative">
                {/* SVG Connection Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <marker id={`arrow-${idx}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#555" />
                    </marker>
                  </defs>
                  {/* Line: Load → Skills */}
                  <line x1="32%" y1="50%" x2="40%" y2="50%" stroke="#555" strokeWidth="2" markerEnd={`url(#arrow-${idx})`} />
                  {/* Connection dot at Load */}
                  <circle cx="32%" cy="50%" r="4" fill="#666" />
                  {/* Connection dot at Skills input */}
                  <circle cx="40%" cy="50%" r="4" fill="#666" />

                  {/* Line: Skills → Video */}
                  <line x1="60%" y1="50%" x2="68%" y2="50%" stroke="#555" strokeWidth="2" markerEnd={`url(#arrow-${idx})`} />
                  {/* Connection dot at Skills output */}
                  <circle cx="60%" cy="50%" r="4" fill="#666" />
                  {/* Connection dot at Video input */}
                  <circle cx="68%" cy="50%" r="4" fill="#666" />
                </svg>

                <div className="flex items-center justify-between gap-8 relative z-10">
                  {/* Load Work Node */}
                  <div className="w-[28%]">
                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4">
                      <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Load Work</h3>
                      <div className="space-y-2 text-sm">
                        {project.client && (
                          <div>
                            <span className="text-gray-500">Client:</span>{' '}
                            <span className="text-gray-300">{project.client}</span>
                          </div>
                        )}
                        {project.agency && (
                          <div>
                            <span className="text-gray-500">Agency:</span>{' '}
                            <span className="text-gray-300">{project.agency}</span>
                          </div>
                        )}
                        {project.year && (
                          <div>
                            <span className="text-gray-500">Year:</span>{' '}
                            <span className="text-gray-300">{project.year}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills Node */}
                  <div className="w-[28%]">
                    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4">
                      <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Skills</h3>
                      <div className="space-y-1 text-xs">
                        <div className="text-gray-300">• AI Art Direction</div>
                        <div className="text-gray-300">• Post-Production</div>
                        <div className="text-gray-300">• Custom Solutions</div>
                      </div>
                    </div>
                  </div>

                  {/* Video/Output Node */}
                  <div className="w-[28%]">
                    <Link href={`/projects/${project.id}`} className="block group">
                      <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-all">
                        <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Video</h3>
                        <div className="aspect-[16/9] bg-gray-800 rounded overflow-hidden mb-3">
                          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                            <span className="text-gray-600 text-xs">Play</span>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold mb-1">{project.title}</h4>
                        <p className="text-xs text-gray-400">{project.description}</p>
                        {project.vimeoId && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                            <img
                              src="/icon/icon_go_lnx_6.svg"
                              alt="Link"
                              className="w-3 h-3 opacity-60"
                              style={{ filter: 'invert(1) brightness(2)' }}
                            />
                            <span>View on Vimeo</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/all-works" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
              <span className="text-sm uppercase tracking-[0.3em]">ALL WORKS</span>
              <img
                src="/icon/icon_go_lnx_6.svg"
                alt="Go"
                className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ filter: 'invert(1) brightness(2)' }}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="expertise" className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Skills</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-sm text-gray-500 mb-4">01</div>
              <h3 className="text-2xl font-bold mb-4">AI Art Direction</h3>
              <p className="text-gray-400 leading-relaxed">
                Specialized AI artistry pushing creative boundaries with cutting-edge tools for premium brands.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-sm text-gray-500 mb-4">02</div>
              <h3 className="text-2xl font-bold mb-4">Advanced Post-Production</h3>
              <p className="text-gray-400 leading-relaxed">
                Industry-leading post-production techniques combining traditional expertise with innovative AI workflows.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-sm text-gray-500 mb-4">03</div>
              <h3 className="text-2xl font-bold mb-4">Custom Solutions</h3>
              <p className="text-gray-400 leading-relaxed">
                Tailored creative and technical solutions designed specifically for each brand's unique challenges.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-sm text-gray-500 mb-4">04</div>
              <h3 className="text-2xl font-bold mb-4">Agency Workflows</h3>
              <p className="text-gray-400 leading-relaxed">
                Complex workflow development for advertising agencies, optimizing production pipelines with AI integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Trusted by Leading Brands</h2>
          <ClientLogos />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 border-t border-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Based in São Paulo, Brazil
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            Specialized AI Artist creating custom solutions for top advertising agencies and international brands.
            Each project is uniquely crafted to solve specific creative and technical challenges.
          </p>
          <p className="text-xl text-gray-400 leading-relaxed">
            Combining advanced post-production expertise with cutting-edge AI tools to deliver
            personalized workflows and innovative visual solutions for high-end advertising in São Paulo, Brazil.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Create Together</h2>
          <p className="text-xl text-gray-400 mb-12">
            Ready to push your project beyond creativity?
          </p>
          <a
            href="mailto:contact@lnx.art"
            className="inline-block text-white hover:text-gray-300 transition-colors"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Email</p>
            <p className="text-2xl tracking-wider">contact@lnx.art</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              © 2025 LNX. São Paulo, Brazil.
            </div>
            <div className="flex gap-8">
              <a href="#work" className="text-gray-400 hover:text-white transition-colors">Work</a>
              <a href="#expertise" className="text-gray-400 hover:text-white transition-colors">Skills</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <img src="/logos/LNX_LOGO.png" alt="LNX" className="h-8 w-auto" />
              <div className="text-left">
                <div className="text-white font-light text-sm">Push Beyond</div>
                <div className="text-white font-light text-sm">Creativity</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
