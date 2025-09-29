import React from 'react';
import ChatInput from './ui/ChatInput';
import EcoBackground from './EcoBackground';
import SplineBackground from './SplineBackground';
import GlassNavbar from './ui/GlassNavbar';
import AetherFooter from './ui/AetherFooter';
import { SparkleText } from './ui/sparkles';
import AboutUs from './AboutUs';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <EcoBackground animationMode="scroll" />
      </div>
      <SplineBackground />
      <div className="relative z-50 flex flex-col pointer-events-auto">
        <GlassNavbar />
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center mx-auto max-w-7xl px-4">
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold text-center mt-6 relative z-[100] py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 via-white to-white">
              A new era of <SparkleText>intelligent</SparkleText> conversation.
            </h1>
            <p style={{ fontFamily: 'Satoshi, sans-serif' }} className="text-lg md:text-xl text-neutral-300 mt-4 max-w-2xl mx-auto tracking-wide">
              Aether is a demonstration of seamless, intuitive, and beautifully designed user interactions.
              Engage with our AI, and experience the future.
            </p>
          </div>
        </main>
        <AboutUs />
        <div className="fixed bottom-12 left-0 right-0 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <ChatInput />
          </div>
        </div>
        <section className="min-h-[70vh] flex flex-col items-center justify-end">
          <AetherFooter />
        </section>
      </div>
    </div>
  );
};

export default HomePage;