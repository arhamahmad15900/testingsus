/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * AnimatedBackground — Video background with gradient fallback and dynamic overlays
 * Provides responsive background video with animated gradient alternative
 */

import React, { useEffect, useRef, useState } from 'react';

export interface AnimatedBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  gradientColors?: string[];
  overlayOpacity?: number;
  animateGradient?: boolean;
  height?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  videoSrc = '/hero-background.mp4',
  posterSrc = '',
  gradientColors = ['#000000', '#0A0A0A', '#1A1A2E'],
  overlayOpacity = 0.6,
  animateGradient = true,
  height = '100%',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const gradientStyleRef = useRef<CSSStyleDeclaration | null>(null);

  // Animated gradient fallback
  useEffect(() => {
    if (videoLoaded && !videoError) return;

    const gradientStr = gradientColors.join(', ');
    const style = document.documentElement.style;

    if (animateGradient) {
      const keyframes = `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;

      const styleEl = document.createElement('style');
      styleEl.textContent = keyframes;
      document.head.appendChild(styleEl);
    }
  }, [videoLoaded, videoError, animateGradient, gradientColors]);

  const gradientStyle = animateGradient
    ? {
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
      }
    : {
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
      };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ height, zIndex: 0 }}
    >
      {/* Video Background */}
      {videoSrc && !videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            display: videoLoaded ? 'block' : 'none',
          }}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </video>
      )}

      {/* Gradient Fallback */}
      {(!videoLoaded || videoError) && (
        <div
          className="absolute inset-0 w-full h-full"
          style={gradientStyle}
        />
      )}

      {/* Dark Overlay for Readability */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: 1,
        }}
      />

      {/* Subtle Grain/Noise Effect */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3CfeColorMatrix in='noise' type='saturate' values='0' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")
          `,
          zIndex: 2,
          opacity: 0.15,
        }}
      />
    </div>
  );
};
