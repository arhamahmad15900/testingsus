/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * HeroBackgroundEnhanced — Composite background component combining video, particles, and effects
 * Provides a complete enhanced hero section background with all visual effects
 */

import React, { useEffect, useState } from 'react';
import { AnimatedBackground } from './AnimatedBackground.js';
import { ParticleBackground } from './ParticleBackground.js';

export interface HeroBackgroundEnhancedProps {
  videoSrc?: string;
  posterSrc?: string;
  particleCount?: number;
  particleColors?: string[];
  enableParticles?: boolean;
  overlayOpacity?: number;
  height?: string;
  className?: string;
}

export const HeroBackgroundEnhanced: React.FC<HeroBackgroundEnhancedProps> = ({
  videoSrc = '/hero-background.mp4',
  posterSrc = '',
  particleCount = 60,
  particleColors = ['#00FF00', '#00FFFF', '#0F8E3E', '#1ABC9C'],
  enableParticles = true,
  overlayOpacity = 0.5,
  height = '100%',
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to reduce particle count
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust particle count for performance on mobile
  const adjustedParticleCount = isMobile ? particleCount / 2 : particleCount;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Animated gradient + video background */}
      <AnimatedBackground
        videoSrc={videoSrc}
        posterSrc={posterSrc}
        gradientColors={['#000000', '#0A0A0A', '#1A1A2E', '#0F3460']}
        overlayOpacity={overlayOpacity}
        animateGradient={true}
        height="100%"
      />

      {/* Particle system overlay */}
      {enableParticles && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <ParticleBackground
            colors={particleColors}
            particleCount={Math.floor(adjustedParticleCount)}
            speed={0.3}
            parallaxIntensity={1.2}
            opacity={0.4}
          />
        </div>
      )}

      {/* Subtle radial gradient vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%),
            radial-gradient(circle at top right, rgba(0, 255, 255, 0.05), transparent 40%),
            radial-gradient(circle at bottom left, rgba(0, 255, 0, 0.05), transparent 40%)
          `,
          zIndex: 3,
        }}
      />

      {/* Scanline effect for digital aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03),
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          zIndex: 4,
          animation: 'scanline-scroll 8s linear infinite',
        }}
      />

      {/* Inject scanline animation */}
      <style>{`
        @keyframes scanline-scroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 4px;
          }
        }
      `}</style>
    </div>
  );
};
