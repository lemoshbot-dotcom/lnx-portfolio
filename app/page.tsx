export default function Maintenance() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-12">
          <img
            src="/logos/LNX_LOGO.png"
            alt="LNX"
            className="h-24 w-auto mx-auto"
          />
        </div>

        {/* Message */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Under Construction
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          We're working on something amazing.
        </p>
        <p className="text-lg text-gray-500">
          Our new portfolio is coming soon.
        </p>

        {/* Contact */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
            Get in touch
          </p>
          <a
            href="mailto:contact@lnx.art"
            className="text-xl text-gray-300 hover:text-white transition-colors"
          >
            contact@lnx.art
          </a>
        </div>

        {/* Footer */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="text-left">
            <div className="text-white font-light text-sm">Push Beyond</div>
            <div className="text-white font-light text-sm">Creativity</div>
          </div>
        </div>
      </div>
    </main>
  );
}
