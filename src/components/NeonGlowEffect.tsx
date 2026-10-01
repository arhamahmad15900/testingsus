/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NeonGlowEffect — Utility component for creating neon glow effects on cards and buttons
 * Provides dynamic hover glows with configurable colors and animations
 */

import React, { useRef, useEffect } from 'react';

export interface NeonGlowEffectProps {
  color?: string;
  intensity?: number;
  children: React.ReactNode;
  className?: string;
  variant?: 'glow' | 'pulse' | 'breathe';
}

export const NeonGlowEffect: React.FC<NeonGlowEffectProps> = ({
  color = '#00FF00',
  intensity = 0.5,
  children,
  className = '',
  variant = 'glow',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Skip on touch devices or reduced motion preference
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let glowIntensity = intensity;

    const handleMouseEnter = () => {
      el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.boxShadow = `
        0 0 10px ${color}40,
        0 0 20px ${color}60,
        0 0 30px ${color}40,
        inset 0 0 10px ${color}20
      `;
      glowIntensity = intensity + 0.3;
    };

    const handleMouseLeave = () => {
      el.style.boxShadow = `
        0 0 5px ${color}20,
        0 0 10px ${color}30
      `;
      glowIntensity = intensity;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from edges
      const distX = Math.min(x, rect.width - x);
      const distY = Math.min(y, rect.height - y);
      const distance = Math.min(distX, distY, 100) / 100;

      // Update glow based on proximity to edge
      const edgeGlow = Math.max(0, 1 - distance * 0.5);
      el.style.boxShadow = `
        0 0 ${10 + edgeGlow * 20}px ${color}${Math.round(40 + edgeGlow * 60).toString(16)},
        0 0 ${20 + edgeGlow * 40}px ${color}${Math.round(60 + edgeGlow * 60).toString(16)},
        0 0 ${30 + edgeGlow * 50}px ${color}${Math.round(40 + edgeGlow * 60).toString(16)},
        inset 0 0 10px ${color}${Math.round(20 + edgeGlow * 40).toString(16)}
      `;
    };

    el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    el.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initial glow state
    el.style.boxShadow = `
      0 0 5px ${color}${Math.round(20 * intensity).toString(16)},
      0 0 10px ${color}${Math.round(30 * intensity).toString(16)}
    `;

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color, intensity]);

  // Animation styles based on variant
  const animationStyle: React.CSSProperties = {
    animation:
      variant === 'pulse'
        ? 'neon-pulse 2s ease-in-out infinite'
        : variant === 'breathe'
          ? 'neon-breathe 3s ease-in-out infinite'
          : 'none',
  };

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes neon-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 2px ${color}40);
          }
          50% {
            filter: drop-shadow(0 0 8px ${color}80);
          }
        }

        @keyframes neon-breathe {
          0%, 100% {
            filter: drop-shadow(0 0 5px ${color}40);
          }
          50% {
            filter: drop-shadow(0 0 15px ${color}60);
          }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`transition-all duration-300 ${className}`}
        style={animationStyle}
      >
        {children}
      </div>
    </>
  );
};
