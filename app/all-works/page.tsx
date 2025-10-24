import Link from "next/link";
import Header from "@/components/Header";
import { projects } from "@/data/projects";

export default function AllWorks() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            All Works
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our complete portfolio
          </p>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                    <span className="text-gray-600 text-sm">Project Image</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to home */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
          >
            <img
              src="/icon/icon_back_lnx_5.svg"
              alt="Back"
              className="w-12 h-12 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ filter: 'invert(1) brightness(2)' }}
            />
            <span className="text-lg border-b border-gray-700 pb-1 group-hover:border-white">Back to home</span>
          </Link>
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
              <a href="/#work" className="text-gray-400 hover:text-white transition-colors">Work</a>
              <a href="/#expertise" className="text-gray-400 hover:text-white transition-colors">Skills</a>
              <a href="/#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
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
