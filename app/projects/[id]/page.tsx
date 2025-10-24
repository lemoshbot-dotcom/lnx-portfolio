import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { projects } from "@/data/projects";

// Gera rotas estáticas para cada projeto
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero com vídeo/imagem */}
      <section className="relative h-screen flex items-center justify-center">
        {project.vimeoId ? (
          // Vimeo embed
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : project.video ? (
          // Vídeo local
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          // Gradiente fallback
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
        )}

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">{project.title}</h1>
          <p className="text-2xl text-gray-300">{project.description}</p>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto max-w-5xl">
          {/* Info Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-12 mb-16">
            {project.client && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Client</p>
                <p className="text-lg">{project.client}</p>
              </div>
            )}

            {project.agency && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Agency</p>
                <p className="text-lg">{project.agency}</p>
              </div>
            )}

            {project.production && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Production</p>
                <p className="text-lg">{project.production}</p>
              </div>
            )}

            {project.duration && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Duration</p>
                <p className="text-lg font-mono">{project.duration}</p>
              </div>
            )}

            {project.year && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Year</p>
                <p className="text-lg">{project.year}</p>
              </div>
            )}

            {project.vimeoId && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Link</p>
                <a
                  href={`https://vimeo.com/${project.vimeoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  title="Watch on Vimeo"
                >
                  <img
                    src="/icon/icon_go_lnx_6.svg"
                    alt="Go"
                    className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ filter: 'invert(1) brightness(2)' }}
                  />
                  <span className="text-lg group-hover:underline">Vimeo</span>
                </a>
              </div>
            )}
          </div>

          {project.fullDescription && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">About the Project</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>
          )}

          {/* Imagens adicionais */}
          {project.images && project.images.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {project.images.map((image, index) => (
                <div key={index} className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Créditos */}
          {project.credits && project.credits.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Credits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.credits.map((credit, index) => (
                  <div key={index}>
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-1">
                      {credit.role}
                    </p>
                    <p className="text-lg">{credit.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Back to projects */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto text-center">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
          >
            <img
              src="/icon/icon_back_lnx_5.svg"
              alt="Back"
              className="w-12 h-12 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ filter: 'invert(1) brightness(2)' }}
            />
            <span className="text-lg border-b border-gray-700 pb-1 group-hover:border-white">Back to all projects</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold">LNX</div>
            <div className="flex gap-8">
              <a href="/#work" className="text-gray-400 hover:text-white transition-colors">Work</a>
              <a href="/#expertise" className="text-gray-400 hover:text-white transition-colors">Skills</a>
              <a href="/#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 LNX. São Paulo, Brazil.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
