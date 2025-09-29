import React from 'react';

const GlassNavbar: React.FC = () => {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 px-12 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-navbar transition-all duration-500 ease-in-out hover:shadow-navbar-glow z-50 w-auto max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-20">
        {/* Logo */}
        <div>
          <a href="/" className="text-white font-semibold text-lg transition-colors duration-300 hover:text-[#d3dae0]">
            Aether
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <a
            href="#about"
            className="text-neutral-300 transition-colors duration-300 hover:text-[#d3dae0]"
          >
            About Us
          </a>
          <a
            href="#chat"
            className="text-neutral-300 transition-colors duration-300 hover:text-[#d3dae0]"
          >
            Chat
          </a>
          <a
            href="https://github.com/atharvavdeo/MockWeb"
            className="text-neutral-300 transition-colors duration-300 hover:text-[#d3dae0]"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default GlassNavbar;