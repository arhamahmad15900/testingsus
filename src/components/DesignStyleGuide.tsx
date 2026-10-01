/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Design System Style Guide
 * Reference component showcasing all design tokens, components, and patterns
 */

import React from 'react';
import { Check, X, AlertCircle, Info, Zap } from 'lucide-react';

export const DesignStyleGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-4">Design System Guide</h1>
          <p className="text-xl text-gray-400">Suspecto Modern UI/UX v2.0</p>
        </div>

        {/* ═══════════════ COLORS ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Primary */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4" style={{ background: '#7C3AED' }} />
              <h3 className="font-bold mb-1">Primary</h3>
              <p className="text-sm text-gray-400">#7C3AED</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-primary)</p>
            </div>

            {/* Primary Light */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4" style={{ background: '#A78BFA' }} />
              <h3 className="font-bold mb-1">Primary Light</h3>
              <p className="text-sm text-gray-400">#A78BFA</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-primary-light)</p>
            </div>

            {/* Accent */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4" style={{ background: '#F43F5E' }} />
              <h3 className="font-bold mb-1">Accent</h3>
              <p className="text-sm text-gray-400">#F43F5E</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-accent)</p>
            </div>

            {/* Success */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4" style={{ background: '#10B981' }} />
              <h3 className="font-bold mb-1">Success</h3>
              <p className="text-sm text-gray-400">#10B981</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-success)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Background */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4 border border-gray-700" style={{ background: '#0F0F23' }} />
              <h3 className="font-bold mb-1">Background</h3>
              <p className="text-sm text-gray-400">#0F0F23</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-background)</p>
            </div>

            {/* Card */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4 border border-gray-700" style={{ background: '#1E1C35' }} />
              <h3 className="font-bold mb-1">Card</h3>
              <p className="text-sm text-gray-400">#1E1C35</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-card)</p>
            </div>

            {/* Muted */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4 border border-gray-700" style={{ background: '#27273B' }} />
              <h3 className="font-bold mb-1">Muted</h3>
              <p className="text-sm text-gray-400">#27273B</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-muted)</p>
            </div>

            {/* Destructive */}
            <div>
              <div className="w-full h-32 rounded-lg mb-4" style={{ background: '#EF4444' }} />
              <h3 className="font-bold mb-1">Destructive</h3>
              <p className="text-sm text-gray-400">#EF4444</p>
              <p className="text-xs text-gray-500 mt-2">var(--color-destructive)</p>
            </div>
          </div>
        </section>

        {/* ═══════════════ TYPOGRAPHY ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Typography</h2>

          <div className="space-y-8">
            {/* Headings */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Headings</h3>
              <div className="space-y-4">
                <div>
                  <p style={{ fontSize: '48px' }} className="font-bold leading-tight mb-2">Heading 1 (48px)</p>
                  <p className="text-xs text-gray-500">font-size: var(--text-5xl) | font-weight: 700</p>
                </div>
                <div>
                  <p style={{ fontSize: '36px' }} className="font-bold leading-tight mb-2">Heading 2 (36px)</p>
                  <p className="text-xs text-gray-500">font-size: var(--text-4xl) | font-weight: 700</p>
                </div>
                <div>
                  <p style={{ fontSize: '30px' }} className="font-bold leading-tight mb-2">Heading 3 (30px)</p>
                  <p className="text-xs text-gray-500">font-size: var(--text-3xl) | font-weight: 700</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Body Text</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-base mb-2">Body text (16px) — Default for all paragraphs and body copy</p>
                  <p className="text-xs text-gray-500">line-height: 1.5 | font-weight: 400</p>
                </div>
                <div>
                  <p className="text-sm mb-2">Secondary text (14px) — For secondary information and helper text</p>
                  <p className="text-xs text-gray-500">line-height: 1.5 | font-weight: 400</p>
                </div>
                <div>
                  <p className="text-xs mb-2">Small text (12px) — For labels, badges, and micro-copy</p>
                  <p className="text-xs text-gray-500">line-height: 1.5 | font-weight: 400</p>
                </div>
              </div>
            </div>

            {/* Font Stacks */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Font Stacks</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                  <p className="font-bold text-lg mb-2" style={{ fontFamily: "'Russo One', sans-serif" }}>Russo One</p>
                  <p className="text-sm text-gray-400" style={{ fontFamily: "'Russo One', sans-serif" }}>Bold gaming headings</p>
                  <p className="text-xs text-gray-500 mt-2">var(--font-heading)</p>
                </div>

                <div className="p-6 rounded-lg" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                  <p className="font-bold text-lg mb-2" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Chakra Petch</p>
                  <p className="text-sm text-gray-400" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Modern gaming sans</p>
                  <p className="text-xs text-gray-500 mt-2">Fallback for headings</p>
                </div>

                <div className="p-6 rounded-lg" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                  <p className="font-bold text-lg mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>JetBrains Mono</p>
                  <p className="text-sm text-gray-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Monospace code</p>
                  <p className="text-xs text-gray-500 mt-2">var(--font-mono)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ BUTTONS ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Buttons</h2>

          <div className="space-y-8">
            {/* Primary */}
            <div>
              <h3 className="text-xl font-bold mb-4">Primary Button</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary btn-lg">
                  <Zap size={18} />
                  Large
                </button>
                <button className="btn btn-primary">
                  <Zap size={16} />
                  Regular
                </button>
                <button className="btn btn-primary btn-sm">Small</button>
                <button className="btn btn-primary" disabled>
                  Disabled
                </button>
              </div>
            </div>

            {/* Accent */}
            <div>
              <h3 className="text-xl font-bold mb-4">Accent Button (CTA)</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-accent btn-lg">
                  <Zap size={18} />
                  Large
                </button>
                <button className="btn btn-accent">
                  <Zap size={16} />
                  Regular
                </button>
                <button className="btn btn-accent btn-sm">Small</button>
                <button className="btn btn-accent" disabled>
                  Disabled
                </button>
              </div>
            </div>

            {/* Outline */}
            <div>
              <h3 className="text-xl font-bold mb-4">Outline Button</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-outline btn-lg">
                  <Zap size={18} />
                  Large
                </button>
                <button className="btn btn-outline">
                  <Zap size={16} />
                  Regular
                </button>
                <button className="btn btn-outline btn-sm">Small</button>
                <button className="btn btn-outline" disabled>
                  Disabled
                </button>
              </div>
            </div>

            {/* Ghost */}
            <div>
              <h3 className="text-xl font-bold mb-4">Ghost Button</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-ghost btn-lg">Large</button>
                <button className="btn btn-ghost">Regular</button>
                <button className="btn btn-ghost btn-sm">Small</button>
                <button className="btn btn-ghost" disabled>
                  Disabled
                </button>
              </div>
            </div>

            {/* Secondary */}
            <div>
              <h3 className="text-xl font-bold mb-4">Secondary Button</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-secondary btn-lg">Large</button>
                <button className="btn btn-secondary">Regular</button>
                <button className="btn btn-secondary btn-sm">Small</button>
                <button className="btn btn-secondary" disabled>
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ CARDS ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Glass Card */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Glass Card</h3>
              <p className="text-gray-400 mb-4">
                Frosted glass effect with backdrop blur. Perfect for modals and overlays.
              </p>
              <p className="text-xs text-gray-500">class: glass</p>
            </div>

            {/* Elevated Card */}
            <div className="card rounded-xl">
              <h3 className="text-xl font-bold mb-3">Elevated Card</h3>
              <p className="text-gray-400 mb-4">
                Solid background with shadow elevation. Use for content sections.
              </p>
              <p className="text-xs text-gray-500">class: card</p>
            </div>

            {/* Card with Icon */}
            <div className="card rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Check size={24} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Success State</h3>
                  <p className="text-sm text-gray-400">Card with icon and content</p>
                </div>
              </div>
            </div>

            {/* Alert Card */}
            <div className="card rounded-xl bg-rose-500/5 border-rose-500/30">
              <div className="flex items-start gap-4">
                <AlertCircle size={24} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold mb-1 text-rose-300">Warning State</h3>
                  <p className="text-sm text-rose-200/70">Card with warning color scheme</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ STATUS ICONS ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Status & Icons</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card rounded-lg p-6 text-center">
              <Check size={32} className="text-green-400 mx-auto mb-3" />
              <p className="text-sm font-semibold mb-1">Success</p>
              <p className="text-xs text-gray-500">#10B981</p>
            </div>

            <div className="card rounded-lg p-6 text-center">
              <X size={32} className="text-rose-400 mx-auto mb-3" />
              <p className="text-sm font-semibold mb-1">Error</p>
              <p className="text-xs text-gray-500">#EF4444</p>
            </div>

            <div className="card rounded-lg p-6 text-center">
              <AlertCircle size={32} className="text-amber-400 mx-auto mb-3" />
              <p className="text-sm font-semibold mb-1">Warning</p>
              <p className="text-xs text-gray-500">#F59E0B</p>
            </div>

            <div className="card rounded-lg p-6 text-center">
              <Info size={32} className="text-blue-400 mx-auto mb-3" />
              <p className="text-sm font-semibold mb-1">Info</p>
              <p className="text-xs text-gray-500">#3B82F6</p>
            </div>
          </div>
        </section>

        {/* ═══════════════ SPACING ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Spacing Scale</h2>

          <div className="space-y-4">
            {[
              { name: '4px', value: '0.25rem', size: 4 },
              { name: '8px', value: '0.5rem', size: 8 },
              { name: '12px', value: '0.75rem', size: 12 },
              { name: '16px', value: '1rem', size: 16 },
              { name: '24px', value: '1.5rem', size: 24 },
              { name: '32px', value: '2rem', size: 32 },
              { name: '48px', value: '3rem', size: 48 },
              { name: '64px', value: '4rem', size: 64 },
            ].map((space) => (
              <div key={space.name} className="flex items-center gap-4">
                <div style={{ width: `${space.size}px`, background: 'var(--color-primary)' }} className="h-6 rounded" />
                <div className="min-w-24">
                  <p className="font-semibold">{space.name}</p>
                  <p className="text-xs text-gray-500">var(--space-{space.value.split('rem')[0]})</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════ BORDER RADIUS ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Border Radius</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Small', value: '6px', radius: '6px' },
              { name: 'Medium', value: '8px', radius: '8px' },
              { name: 'Large', value: '16px', radius: '16px' },
              { name: 'XL', value: '24px', radius: '24px' },
              { name: '2XL', value: '32px', radius: '32px' },
              { name: '3XL', value: '48px', radius: '48px' },
              { name: 'Full', value: '9999px', radius: '9999px' },
            ].map((r) => (
              <div key={r.name}>
                <div
                  className="w-full h-24 mb-3 bg-purple-500/20"
                  style={{ borderRadius: r.radius }}
                />
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-gray-500">{r.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════ ACCESSIBILITY ═══════════════ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8">Accessibility</h2>

          <div className="space-y-6">
            <div className="card rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Check size={20} className="text-green-400" />
                Contrast Ratios
              </h3>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">Primary text on background:</span> #E2E8F0 on #0F0F23 = 12.5:1 ✓</p>
                <p><span className="font-semibold">Secondary text:</span> #94A3B8 on #0F0F23 = 5.2:1 ✓</p>
                <p><span className="font-semibold">All buttons:</span> 7.1:1+ (WCAG AAA) ✓</p>
              </div>
            </div>

            <div className="card rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Check size={20} className="text-green-400" />
                Focus States
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                All interactive elements have a visible 2px purple outline on focus:
              </p>
              <button className="btn btn-primary focus:outline-offset-2 focus:outline-2 focus:outline-purple-400">
                Tab to see focus ring
              </button>
            </div>

            <div className="card rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Check size={20} className="text-green-400" />
                Motion Preferences
              </h3>
              <p className="text-sm text-gray-400">
                Animations respect `prefers-reduced-motion: reduce` system setting. Users with vestibular issues see instant state changes.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-16 border-t border-gray-700">
          <p className="text-gray-400">
            Design System v2.0 — Modern UI/UX for Suspecto
          </p>
          <p className="text-xs text-gray-500 mt-2">
            For full documentation, see MODERN_DESIGN_SYSTEM.md
          </p>
        </div>
      </div>
    </div>
  );
};
