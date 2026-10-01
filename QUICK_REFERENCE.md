# Suspecto Design System - Quick Reference

## 🎨 Colors at a Glance

```css
/* Primary Actions */
--color-primary: #7C3AED        /* Purple - main brand */
--color-primary-light: #A78BFA  /* Hover state */

/* Call-to-Action */
--color-accent: #F43F5E         /* Rose - high attention */
--color-accent-light: #FB7185   /* Hover state */

/* Neutrals */
--color-background: #0F0F23     /* Main background */
--color-card: #1E1C35           /* Card backgrounds */
--color-foreground: #E2E8F0     /* Primary text */
--color-muted: #27273B          /* Secondary elements */
--color-muted-foreground: #94A3B8 /* Secondary text */

/* Status */
--color-success: #10B981        /* Green */
--color-warning: #F59E0B        /* Amber */
--color-destructive: #EF4444    /* Red */
--color-info: #3B82F6           /* Blue */
```

## 🔤 Typography Quick Picks

### Headings (Use `--font-heading`)
```jsx
<h1 className="text-5xl font-bold">Large heading (48px)</h1>
<h2 className="text-4xl font-bold">Medium heading (36px)</h2>
<h3 className="text-3xl font-bold">Small heading (30px)</h3>
```

### Body Text (Use `--font-body`)
```jsx
<p className="text-base">Regular text (16px)</p>
<p className="text-sm text-gray-400">Secondary text (14px)</p>
<p className="text-xs text-gray-500">Small text (12px)</p>
```

## 🔘 Button Styles (Copy & Paste)

### Primary (Blue call-to-action)
```jsx
<button className="btn btn-primary btn-lg">Start Playing</button>
<button className="btn btn-primary">Regular Button</button>
<button className="btn btn-primary btn-sm">Small Button</button>
```

### Accent (Pink highlight)
```jsx
<button className="btn btn-accent btn-lg">Play Now</button>
<button className="btn btn-accent">Important Action</button>
```

### Outline (Secondary)
```jsx
<button className="btn btn-outline">Learn More</button>
```

### Ghost (Minimal)
```jsx
<button className="btn btn-ghost">Cancel</button>
```

### Disabled
```jsx
<button className="btn btn-primary" disabled>Not Available</button>
```

## 📦 Card Styles

### Glass Card (Frosted effect)
```jsx
<div className="glass rounded-xl p-6">
  <h3>Frosted Glass</h3>
  <p>With backdrop blur</p>
</div>
```

### Elevated Card (Solid with shadow)
```jsx
<div className="card rounded-xl p-6">
  <h3>Elevated Card</h3>
  <p>With border and shadow</p>
</div>
```

### 3D Float Card
```jsx
<div className="card-float rounded-2xl p-6">
  3D perspective on hover
</div>
```

## 📏 Spacing Scale

```
4px  → --space-1    (Micro)
8px  → --space-2    (Small)
12px → --space-3    (Tiny)
16px → --space-4    (Standard)
24px → --space-6    (Medium)
32px → --space-8    (Large)
48px → --space-12   (XL)
64px → --space-16   (XXL)
```

### Usage
```jsx
<div style={{ padding: 'var(--space-6)', gap: 'var(--space-4)' }}>
  Consistent spacing
</div>
```

## 🎯 Common Patterns

### Hero Section
```jsx
<section className="relative w-full min-h-screen flex items-center px-4 py-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div>
      <h1 className="text-6xl font-bold mb-4">Title</h1>
      <p className="text-xl text-gray-400 mb-8">Subtitle</p>
      <button className="btn btn-accent btn-lg">CTA</button>
    </div>
    <div>{/* Content */}</div>
  </div>
</section>
```

### Feature Grid
```jsx
<section className="py-20 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-12">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map(f => (
        <div key={f.id} className="card rounded-xl p-6">
          <div className="text-3xl mb-4">{f.icon}</div>
          <h3 className="text-lg font-bold mb-2">{f.title}</h3>
          <p className="text-sm text-gray-400">{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### CTA Section
```jsx
<section className="py-20 px-4">
  <div className="max-w-4xl mx-auto glass rounded-2xl p-12 text-center">
    <h2 className="text-4xl font-bold mb-4">Ready?</h2>
    <p className="text-lg text-gray-300 mb-8">Subtitle</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn btn-accent btn-lg">Primary</button>
      <button className="btn btn-primary btn-lg">Secondary</button>
    </div>
  </div>
</section>
```

## 🎬 Animations (GSAP)

### Stagger On Scroll
```javascript
gsap.from('.item', {
  scrollTrigger: { trigger: container, start: 'top 75%', once: true },
  opacity: 0,
  y: 30,
  duration: 0.6,
  stagger: 0.12,
  ease: 'power3.out',
});
```

### Fade In
```javascript
gsap.from('.element', {
  opacity: 0,
  duration: 0.4,
  ease: 'power3.out',
});
```

### Check for Reduced Motion
```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  return; // Skip animation, render final state
}
// Otherwise run GSAP
```

## ♿ Accessibility Checklist

- [ ] Button has `aria-label` if icon-only
- [ ] Interactive elements are ≥ 44×44px
- [ ] Focus ring visible (2px purple outline)
- [ ] Text contrast ≥ 4.5:1
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Images have alt text
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Forms have labels associated with inputs
- [ ] No color-only meaning (use icons + text)

## 🎨 Using CSS Variables

### In Tailwind Classes
```jsx
<div style={{
  backgroundColor: 'var(--color-card)',
  borderColor: 'var(--color-border)',
  padding: 'var(--space-6)',
}}>
  Content
</div>
```

### In CSS
```css
.my-component {
  color: var(--color-foreground);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  transition: all var(--duration-200) var(--easing-out);
}
```

### Define Custom Property
```css
:root {
  --my-custom-color: #7C3AED;
}
```

## 📱 Responsive Helpers

```jsx
{/* 1 col mobile, 2 col tablet, 4 col desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => <div key={item.id}>{item}</div>)}
</div>

{/* Hide on mobile */}
<div className="hidden lg:block">Desktop only</div>

{/* Show only on mobile */}
<div className="lg:hidden">Mobile only</div>

{/* Responsive padding */}
<div className="p-4 md:p-6 lg:p-8">Responsive padding</div>

{/* Responsive text size */}
<h1 className="text-4xl sm:text-5xl lg:text-6xl">Title</h1>
```

## 🔗 Files to Reference

| File | Purpose |
|------|---------|
| `src/design-system.css` | All tokens & component styles |
| `src/components/HomePage.modern.tsx` | Example modern page |
| `src/components/DesignStyleGuide.tsx` | Interactive reference |
| `MODERN_DESIGN_SYSTEM.md` | Full design documentation |
| `MODERN_DESIGN_IMPLEMENTATION.md` | Implementation guide |

## 🚀 Common Tasks

### Add a New Section
1. Use `<section>` with `py-20 px-4`
2. Wrap content in `max-w-6xl mx-auto`
3. Use grid for layout (1/2/4 columns)
4. Apply `.card` or `.glass` for containers
5. Use `.btn` for all buttons

### Create a Modal
1. Use `.glass` background
2. Add `rounded-xl` for radius
3. Use `p-6` or `p-8` for padding
4. Add close button with `aria-label="Close"`
5. Ensure focus trap and keyboard nav

### Style a Game Card
1. Use `.card-float` for 3D effect
2. Add icon with color accent
3. Include feature bullets
4. Put "Play" button in footer
5. Make keyboard accessible with `role="button"` & `onKeyDown`

### Responsive Image/Video
```jsx
<img 
  src="image.webp" 
  alt="Description"
  className="w-full h-auto object-cover rounded-lg"
/>
```

## 🎯 Do's and Don'ts

### DO ✅
- Use CSS variables for all colors
- Apply `.btn` to all buttons
- Use spacing scale (--space-* variables)
- Check `prefers-reduced-motion` before GSAP
- Make all interactive elements ≥ 44×44px
- Use semantic HTML (`<button>`, `<h1>-<h6>`)

### DON'T ❌
- Hardcode hex colors
- Use `px` for sizing (use rem)
- Skip focus rings
- Make hover-only interactions (mobile users can't hover)
- Animate width/height (use scale/transform instead)
- Ignore accessibility requirements

## 📞 Quick Help

**Q: Where's the button style?**  
A: Use `.btn .btn-primary` (or `.btn-accent`, `.btn-outline`, `.btn-ghost`)

**Q: How do I make text gray?**  
A: Use `text-gray-400` (Tailwind) or `color: var(--color-muted-foreground)`

**Q: How do I make a card?**  
A: Use `.card` class or `.glass` for frosted effect

**Q: How do I center content?**  
A: Use `max-w-6xl mx-auto` wrapper (max width + auto margins)

**Q: How do I make animations?**  
A: Use GSAP with ScrollTrigger, check `prefers-reduced-motion` first

**Q: How do I test accessibility?**  
A: Tab through page, use WebAIM contrast checker, test with screen reader

---

**Print this page for desk reference!** 📋
