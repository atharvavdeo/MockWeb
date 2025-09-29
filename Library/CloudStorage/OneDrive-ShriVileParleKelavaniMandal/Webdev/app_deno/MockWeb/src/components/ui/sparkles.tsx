"use client";
import { useId } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

interface SparkleTextProps {
  children: React.ReactNode;
}

const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

const generateSparkle = () => ({
  id: String(randomNumber(0, 100000)),
  createdAt: Date.now(),
  color: 'white',
  size: randomNumber(10, 20),
  style: {
    position: 'absolute' as const,
    top: randomNumber(0, 100) + '%',
    left: randomNumber(0, 100) + '%',
    zIndex: 200
  }
});

const Sparkle = ({ size, color, style }: any) => {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 71 34 71C34 71 35.6061 50.7666 43 43.5C51.6127 34.8574 71 34 71 34C71 34 51.6514 32.8574 43 25.5C35.4484 18.8526 34 0 34 0C34 0 32.6878 19.3415 26.5 25.5Z';

  return (
    <motion.svg
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: [0, 1, 0],
        rotate: [0, 90, 180]
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: randomNumber(0.5, 2)
      }}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 68 68"
      fill="none"
    >
      <path d={path} fill={color} />
    </motion.svg>
  );
};

export const SparkleText: React.FC<SparkleTextProps> = ({ children }) => {
  const [sparkles, setSparkles] = useState(() => {
    return Array.from({ length: 3 }, () => generateSparkle());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt;
        return delta < 1000;
      });
      
      nextSparkles.push(generateSparkle());
      setSparkles(nextSparkles);
    }, 500);

    return () => clearInterval(interval);
  }, [sparkles]);

  return (
    <span className="relative inline-block">
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className="relative inline-block font-bold">{children}</strong>
    </span>
  );
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

const particlesLoaded = async (_container?: Container) => {
    console.log("Particles loaded!");
};  const generatedId = useId();

  return (
    <div className={className}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background || "#0d47a1",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: particleColor || "#ffffff",
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: {
                  min: 0.1,
                  max: 1,
                },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 1,
                },
                animation: {
                  enable: true,
                  speed: speed || 4,
                  sync: false,
                },
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
};