export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Bem-vindo ao{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              LNX
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Portfólio profissional em construção
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#sobre"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Sobre Mim
            </a>
            <a
              href="#projetos"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              Projetos
            </a>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Sobre</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <p className="text-gray-300 text-lg leading-relaxed">
              Este é o início do seu portfólio profissional. Aqui você poderá
              compartilhar seus projetos, experiências e habilidades de forma
              elegante e moderna.
            </p>
          </div>
        </div>
      </section>

      {/* Projetos Section */}
      <section id="projetos" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Projetos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Exemplo 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Projeto 1</h3>
              <p className="text-gray-400 mb-4">
                Descrição do seu primeiro projeto incrível.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                  Tag 1
                </span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  Tag 2
                </span>
              </div>
            </div>

            {/* Card Exemplo 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Projeto 2</h3>
              <p className="text-gray-400 mb-4">
                Descrição do seu segundo projeto incrível.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                  Tag 1
                </span>
              </div>
            </div>

            {/* Card Exemplo 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Projeto 3</h3>
              <p className="text-gray-400 mb-4">
                Descrição do seu terceiro projeto incrível.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm">
                  Tag 1
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-800">
        <div className="text-center text-gray-400">
          <p>&copy; 2025 LNX. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
