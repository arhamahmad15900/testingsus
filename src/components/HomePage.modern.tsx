/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Modern HomePage — Redesigned landing page for Suspecto
 * Features improved UX, better visual hierarchy, and modern interactions
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Gamepad2, Zap, Users, Target, Sparkles, ArrowRight, Play, Info,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { Logo } from './Logo.js';
import { ThreeHero } from './ThreeHero.js';

gsap.registerPlugin(ScrollTrigger);

export interface HomePageModernProps {
  onOpenHowToPlay: () => void;
  onOpenRules: () => void;
  onOpenHistory: () => void;
  onOpenAuth: (message?: string) => void;
  onOpenProfile: () => void;
  onOpenRegister?: () => void;
  onEnterPicto: () => void;
  onEnterSketchio: () => void;
}

/* ═══════════════ MODERN GAME CARD ═══════════════ */
interface ModernGameCardProps {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  players: string;
  accentColor: string;
  icon: React.ReactNode;
  badge?: string;
  onPlay: () => void;
}

const ModernGameCard: React.FC<ModernGameCardProps> = ({
  name, tagline, description, features, players,
  accentColor, icon, badge, onPlay,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
      const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    };
    const onLeave = () => {
      el.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)';
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group relative card-float rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 28, 53, 0.8) 0%, rgba(42, 40, 72, 0.6) 100%)',
        border: `2px solid ${accentColor}30`,
        backdropFilter: 'blur(12px)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
      onClick={onPlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onPlay(); }}
      aria-label={`Play ${name}`}
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}, ${accentColor}00)`,
        }}
      />

      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
            style={{
              background: `${accentColor}15`,
              border: `1.5px solid ${accentColor}40`,
              color: accentColor,
            }}
          >
            {icon}
          </div>
          {badge && (
            <span
              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: `${accentColor}20`,
                border: `1px solid ${accentColor}40`,
                color: accentColor,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1 group-hover:text-white transition-colors">
            {name}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
            {tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {/* Feature bullets */}
        <div className="space-y-2 mb-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
              {feature}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Users size={14} style={{ color: accentColor }} />
            <span>{players}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
            style={{ color: accentColor }}
            aria-label={`Play ${name} now`}
          >
            Play Now
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════ FEATURE SECTION ═══════════════ */
const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Target size={24} />,
      title: 'Social Deduction',
      description: 'Find the imposter before time runs out in intense, strategy-filled matches.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-Time Action',
      description: 'Draw, bluff, and vote in real-time multiplayer games with instant feedback.',
    },
    {
      icon: <Users size={24} />,
      title: 'Play Together',
      description: 'Host or join rooms with friends. No installation required, instant play.',
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Multiple Modes',
      description: 'Choose from Picto and Sketchio, each with unique gameplay mechanics.',
    },
  ];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from(ref.current.querySelectorAll('.feature-card'), {
      scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section ref={ref} className="w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Suspecto?</h2>
          <p className="text-lg text-gray-400">Experience social deduction gaming redefined</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card group p-6 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 28, 53, 0.6) 0%, rgba(42, 40, 72, 0.4) 100%)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(124, 58, 237, 0.15)',
                  color: '#A78BFA',
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════ MAIN COMPONENT ═══════════════ */
export const HomePageModern: React.FC<HomePageModernProps> = ({
  onOpenHowToPlay,
  onOpenRules,
  onOpenHistory,
  onOpenAuth,
  onOpenRegister,
  onEnterPicto,
  onEnterSketchio,
}) => {
  const { user } = useAuth();
  const heroRef = useRef<HTMLElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* Hero section reveal */
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.2,
      });

      /* 3D model */
      gsap.from('.hero-model', {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.3,
      });

      /* Games section */
      if (gamesRef.current) {
        gsap.from(gamesRef.current.querySelectorAll('.game-card-modern'), {
          scrollTrigger: {
            trigger: gamesRef.current,
            start: 'top 75%',
            once: true,
          },
          opacity: 0,
          y: 40,
          rotateX: 10,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          transformOrigin: 'center bottom',
        });
      }

      /* CTA button */
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            once: true,
          },
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handlePlayPicto = () => {
    if (!user) {
      onOpenAuth('Sign in to play Picto.');
      return;
    }
    onEnterPicto();
  };

  const handlePlaySketchio = () => {
    if (!user) {
      onOpenAuth('Sign in to play Sketchio.');
      return;
    }
    onEnterSketchio();
  };

  const scrollToGames = () => {
    gamesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen lg:min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-20"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.1), transparent 50%), radial-gradient(circle at bottom left, rgba(244, 63, 94, 0.05), transparent 50%)',
          }}
        />

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(124, 58, 237, 0.05) 25%, rgba(124, 58, 237, 0.05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, 0.05) 75%, rgba(124, 58, 237, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(124, 58, 237, 0.05) 25%, rgba(124, 58, 237, 0.05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, 0.05) 75%, rgba(124, 58, 237, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: Text */}
          <div className="flex flex-col justify-center">
            <div className="hero-reveal">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Draw. Bluff.{' '}
                <span style={{ background: 'linear-gradient(135deg, #7C3AED, #F43F5E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Expose.
                </span>
              </h1>
            </div>

            <div className="hero-reveal">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The ultimate multiplayer social deduction game. Find the imposter before time runs out. Real-time drawing, voting, and intense psychological warfare.
              </p>
            </div>

            <div className="hero-reveal flex flex-wrap gap-4">
              <button
                onClick={handlePlayPicto}
                className="btn btn-lg btn-accent flex items-center gap-2 font-semibold"
              >
                <Play size={18} />
                Start Playing
              </button>
              <button
                onClick={scrollToGames}
                className="btn btn-lg btn-outline flex items-center gap-2 font-semibold"
              >
                <Info size={18} />
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="hero-reveal grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-purple-400">2+</div>
                <div className="text-sm text-gray-400">Game Modes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">∞</div>
                <div className="text-sm text-gray-400">Players</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">Instant</div>
                <div className="text-sm text-gray-400">No Install</div>
              </div>
            </div>
          </div>

          {/* Right side: 3D Model */}
          <div className="hero-model hidden lg:flex items-center justify-center">
            <ThreeHero />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400">Scroll to explore</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════════ */}
      <FeatureSection />

      {/* ══════════════════════════════════════
          GAMES SECTION
      ══════════════════════════════════════ */}
      <section ref={gamesRef} className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Choose Your Game</h2>
            <p className="text-lg text-gray-400">Each mode offers a unique gameplay experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="game-card-modern">
              <ModernGameCard
                name="Picto"
                tagline="The Classic"
                description="One word. One imposter. Can you draw convincingly while fooling everyone?"
                features={['Real-time drawing', 'Voting rounds', 'Hidden imposter', 'Social deduction']}
                players="3-8 players"
                accentColor="#7C3AED"
                icon={<Gamepad2 size={24} />}
                onPlay={handlePlayPicto}
              />
            </div>

            <div className="game-card-modern">
              <ModernGameCard
                name="Sketchio"
                tagline="Draw & Guess"
                description="Draw prompts and guess sketches. Fast-paced creativity meets quick thinking."
                features={['Speed drawing', 'Instant guessing', 'Scoring system', 'Continuous rounds']}
                players="2-6 players"
                accentColor="#F43F5E"
                icon={<Sparkles size={24} />}
                onPlay={handlePlaySketchio}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section ref={ctaRef} className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-4xl mx-auto rounded-2xl p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(244, 63, 94, 0.15) 100%)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Jump into a game now and challenge your friends. No signup required for quick matches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePlayPicto}
              className="btn btn-lg btn-accent font-semibold"
            >
              Play Picto
            </button>
            <button
              onClick={handlePlaySketchio}
              className="btn btn-lg btn-primary font-semibold"
            >
              Play Sketchio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
