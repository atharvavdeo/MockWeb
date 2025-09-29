import React from 'react';

const AetherFooter: React.FC = () => {
  return (
    <footer className="w-full overflow-hidden bg-aether-dark-blue py-24 px-8 box-border opacity-0 [mask-image:linear-gradient(to_top,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_85%,transparent_100%)] bg-[length:300%_300%] animate-[footer-fade-in_1.5s_ease-in-out_0.5s_forwards,footer-glow_25s_ease_infinite] mt-auto">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 w-[140%] h-[90%] bg-glow-sapphire rounded-[30%] blur-[80px] pointer-events-none animate-ripple opacity-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[120%] h-[80%] bg-glow-cream rounded-[40%] blur-[60px] pointer-events-none animate-ripple-delay opacity-0"></div>
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative text-center z-10">
        <h1 className="font-['EB_Garamond'] font-normal text-[clamp(80px,15vw,250px)] leading-none tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Aether
          <span className="absolute text-[clamp(24px,4vw,60px)] text-white -top-[0.1em] -right-[0.3em]">©</span>
        </h1>

        {/* Sub-Footer Section */}
        <div className="mt-16 container mx-auto">
          <hr className="border-0 border-t border-footer-divider m-0" />
          
          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 gap-x-8 pt-8 text-left">
            <a 
              href="#" 
              className="text-footer-text no-underline font-sans text-sm pb-0.5 border-b border-transparent w-fit transition-all duration-300 ease-in-out hover:text-white hover:border-white/50"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-footer-text no-underline font-sans text-sm pb-0.5 border-b border-transparent w-fit transition-all duration-300 ease-in-out hover:text-white hover:border-white/50"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-footer-text no-underline font-sans text-sm pb-0.5 border-b border-transparent w-fit transition-all duration-300 ease-in-out hover:text-white hover:border-white/50"
            >
              Contact Us
            </a>
            <a 
              href="#" 
              className="text-footer-text no-underline font-sans text-sm pb-0.5 border-b border-transparent w-fit transition-all duration-300 ease-in-out hover:text-white hover:border-white/50"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AetherFooter;