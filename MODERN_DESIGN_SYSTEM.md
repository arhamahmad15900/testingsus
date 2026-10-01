---
name: suspecto-design-modern
description: Modern UI/UX redesign for Suspecto multiplayer gaming platform
metadata:
  type: project
  created: 2026-10-01
  version: 2.0
---

# Suspecto Modern Design System v2.0

## Overview

This redesign modernizes Suspecto into a contemporary gaming platform with improved UX patterns, better visual hierarchy, and enhanced accessibility. The design maintains the gaming aesthetic while introducing professional, clean interactions.

## Design Principles

1. **Player-First**: Design for real-time gameplay and instant comprehension
2. **Immersive**: Use depth, 3D effects, and modern visual language
3. **Accessible**: 4.5:1 contrast, keyboard navigation, clear focus states
4. **Performant**: Smooth animations respecting prefers-reduced-motion
5. **Responsive**: Mobile-first, tested at 375px, 768px, 1024px, 1440px

## Color Palette

### Primary Colors
- **Purple Primary**: `#7C3AED` — Primary actions, hero elements
- **Purple Light**: `#A78BFA` — Hover states, secondary accents
- **Purple Dark**: `#5B21B6` — Darker interactions

### Accent Colors
- **Rose/Pink Accent**: `#F43F5E` — CTAs, alerts, high attention
- **Rose Light**: `#FB7185` — Hover states
- **Rose Dark**: `#E11D48` — Pressed states

### Neutral Colors
- **Background**: `#0F0F23` — Main background
- **Card**: `#1E1C35` — Card backgrounds
- **Muted**: `#27273B` — Secondary elements
- **Text**: `#E2E8F0` — Primary text
- **Muted Text**: `#94A3B8` — Secondary text

### Status Colors
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Destructive**: `#EF4444`
- **Info**: `#3B82F6`

## Typography

### Font Stack
- **Headings**: `Russo One`, `Chakra Petch` — Bold, gaming-focused energy
- **Body**: `Plus Jakarta Sans`, `Chakra Petch` — Clean, readable
- **Monospace**: `JetBrains Mono` — Code, technical text

### Scale
| Size | Usage | Weight |
|------|-------|--------|
| 12px | Small text, tags | 400-600 |
| 14px | Secondary copy | 400-500 |
| 16px | Body text | 400-500 |
| 18px | Body large | 400-500 |
| 20px | Subheadings | 600 |
| 24px | Small headings | 700 |
| 30px | Medium headings | 700 |
| 36px | Large headings | 700 |
| 48px | Hero headings | 700 |
| 60px | Mega headings | 700 |

### Line Heights
- **Tight**: 1.2 (headings)
- **Normal**: 1.5 (body)
- **Relaxed**: 1.625 (copy-heavy)
- **Loose**: 2 (spacing-rich)

## Spacing Scale

Standard 4px base unit system:
```
4px (0.25rem)  — Micro spacing
8px (0.5rem)   — Small gaps
12px (0.75rem) — Component padding
16px (1rem)    — Standard spacing
24px (1.5rem)  — Section spacing
32px (2rem)    — Large spacing
48px (3rem)    — XL spacing
64px (4rem)    — Section dividers
```

## Components

### Buttons

#### Primary Button (`.btn-primary`)
- Background: Purple Primary
- Hover: Purple Light + glow effect
- Active: Slight scale down (translateY -2px → 0)
- State: Disabled (opacity 50%, cursor not-allowed)
- Min size: 44×44px (accessible touch target)

#### Accent Button (`.btn-accent`)
- Background: Rose Accent
- Hover: Rose Light + glow effect
- CTA emphasis (highest visual weight)

#### Outline Button (`.btn-outline`)
- Border: 2px Purple Primary
- Hover: Subtle background fill
- Secondary actions

#### Ghost Button (`.btn-ghost`)
- Transparent background
- Hover: Muted background
- Tertiary interactions

### Cards

#### Glass Card (`.glass`)
- Background: `rgba(30, 28, 53, 0.6)` with blur
- Border: 1px `rgba(124, 58, 237, 0.15)`
- Hover: Increased opacity + border brightness
- Use: Modals, overlays, floating containers

#### Elevated Card (`.card`, `.card-elevated`)
- Solid background with shadow
- Border: 1px color-coded
- Hover: Brightness increase + shadow boost

### Game Cards (Modern)

**Features:**
- Gradient background with glass effect
- 3D perspective transforms on hover (6deg rotation)
- Icon badges with color accents
- Feature bullets with accent dots
- Keyboard accessible (role="button", keyboard handlers)
- ARIA labels for screen readers

**Interactive States:**
- Hover: 3D tilt, border brightness, smooth 300ms transition
- Focus: Standard focus ring (2px outline)
- Active: Scale feedback

## Animations

### Easing Functions
- **Spring**: `cubic-bezier(0.23, 1, 0.32, 1)` — Playful, bouncy
- **Out**: `cubic-bezier(0, 0, 0.2, 1)` — Exit smoothly
- **In**: `cubic-bezier(0.4, 0, 1, 1)` — Enter sharp
- **In-Out**: `cubic-bezier(0.4, 0, 0.2, 1)` — Balanced

### Timing
- **100ms**: Quick, micro-interactions
- **150ms**: Hover feedback
- **200ms**: Button transitions
- **300ms**: Component reveals
- **400-500ms**: Page transitions

### Preset Animations

#### Stagger Grid (Standard Motion)
```javascript
gsap.from('.grid-item', {
  opacity: 0,
  scale: 0.92,
  y: 16,
  duration: 0.4,
  stagger: { each: 0.06, from: 'start', grid: 'auto' },
  ease: 'back.out(1.4)',
});
```
**Use**: Game cards on load, feature lists, game mode cards

#### Scroll Reveal
```javascript
gsap.from(selector, {
  scrollTrigger: { trigger: container, start: 'top 75%', once: true },
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: 'power3.out',
  stagger: 0.12,
});
```
**Use**: Sections appearing on scroll, lazy reveal patterns

#### Fade In (No Motion)
```javascript
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
**Use**: Instant reveals for prefers-reduced-motion users

## Responsive Breakpoints

| Breakpoint | Width | Use Case |
|-----------|-------|----------|
| Mobile | 320-640px | Single column, large touch targets |
| Tablet | 641-1024px | 2-column grids, tablet layouts |
| Desktop | 1025-1440px | 3-4 column grids, full layouts |
| Wide | 1441px+ | Max container width (1280px) |

### Mobile-First Approach
- Design for 375px first
- Layer complexity at tablet+ sizes
- Test horizontal scroll avoidance
- Ensure all interactive elements ≥ 44×44px

## Accessibility Checklist

- [x] **Contrast**: All text 4.5:1 minimum (WCAG AA)
- [x] **Focus**: Visible 2px purple ring outline
- [x] **Keyboard**: Tab, Enter, Escape work on all interactive elements
- [x] **ARIA**: Labels on icon-only buttons, roles on custom buttons
- [x] **Motion**: `prefers-reduced-motion: reduce` respected
- [x] **Images**: Alt text on all non-decorative media
- [x] **Forms**: Associated labels, error messages near fields
- [x] **Touch**: 44×44px minimum hit targets

## Dark Mode

Default dark theme with high contrast:
- Foreground: `#E2E8F0` (light gray)
- Background: `#0F0F23` (very dark purple-gray)
- Ensures natural eye comfort in gaming contexts

## Performance Optimization

### Code Splitting
- HomePage uses React.lazy for game components
- Routes load on demand via ScrollTrigger

### Animation Performance
- Use `will-change: transform` on 3D cards
- `transform-style: preserve-3d` for perspective
- Skip animations via `prefers-reduced-motion` check
- Debounce mousemove listeners

### Image Optimization
- Lazy load hero background videos
- Use WebP/AVIF with fallbacks
- Reserve space (prevent CLS) with aspect-ratio CSS

### Asset Loading
- Hero assets load on interaction, not on page load
- Cards stagger load via GSAP ScrollTrigger
- Light DOM tree (no unused elements)

## Implementation Files

- `design-system.css` — Global tokens, button/card styles, animations
- `HomePage.modern.tsx` — Hero, features, game cards, CTA
- `index.css` — Imports both Tailwind and design system
- Tailwind config: Extends with custom colors and spacing

## Migration Path

### Phase 1 (Current)
- Replace HomePage with HomePageModern
- Import design-system.css globally
- Test responsive and accessibility

### Phase 2
- Refactor PictoPage, SketchioPage with same patterns
- Update modals (AuthModal, ProfileModal, etc.)
- Consistent button/card usage

### Phase 3
- In-game UI refresh (DrawingCanvas, VotingView, etc.)
- Consistent hover/focus feedback
- Motion refinement based on user feedback

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Fallbacks
- `backdrop-filter` → solid background
- `@supports (backdrop-filter)` for progressive enhancement
- CSS Grid fallback to flex

## Notes for Developers

1. **Button Sizing**: Always use `.btn` classes; manually sized buttons are accessibility risks
2. **Color Tokens**: Reference CSS variables, never hardcode hex values
3. **Animations**: Check `prefers-reduced-motion` before GSAP calls
4. **Responsive**: Test at 375px, 768px, 1024px, 1440px; no fixed widths
5. **Focus**: All interactive elements must have visible focus state
6. **Touch**: Test on real devices; hover-only interactions fail on mobile

## References

- Color system: Based on modern gaming UI patterns (3D & Hyperrealism style)
- Typography: Gaming-focused (Russo One + modern sans-serif blend)
- Motion: Smooth, contextual, respects user preferences
- UX patterns: Feature-rich showcase with clear CTAs and hierarchy
