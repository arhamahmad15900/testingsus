/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ParticleBackground — Canvas-based particle system for ambient visual effects
 * Features interactive particles with parallax and configurable colors
 */

import React, { useEffect, useRef, useState } from 'react';

export interface ParticleBackgroundProps {
  colors?: string[];
  particleCount?: number;
  speed?: number;
  parallaxIntensity?: number;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  colors = ['#00FF00', '#00FFFF', '#0F8E3E'],
  particleCount = 50,
  speed = 0.5,
  parallaxIntensity = 1,
  opacity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };
    initParticles();

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Magnetic effect toward mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const pullStrength = 0.0002 * parallaxIntensity;

        if (distance < 300) {
          particle.vx += (dx * pullStrength);
          particle.vy += (dy * pullStrength);
        }

        // Dampen velocity
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity * opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [colors, particleCount, speed, parallaxIntensity, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, mixBlendMode: 'screen' }}
    />
  );
};
