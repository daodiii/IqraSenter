# Iqra Homepage Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete visual redesign of the Iqra homepage — spectacular split hero with the children's picnic photo, magazine bento grid, polaroid testimonials, and polished sections throughout.

**Architecture:** All changes are confined to `src/app/page.tsx`, `src/components/`, and `src/app/globals.css`. No new dependencies — uses existing Tailwind CSS v4, Framer Motion, Lucide React, and next/image. The hero becomes a 40/60 split (content left, photo right) with an organic SVG wave divider. Every section gets a visual upgrade while keeping the same data from `src/lib/constants.ts` unchanged.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4 (`@theme inline`), Framer Motion, Lucide React, next/image

---

## Key Files Reference

- `src/app/page.tsx` — Homepage (8 sections, main file)
- `src/app/globals.css` — CSS variables, `.pattern-islamic`, `.glass`, `.gradient-text`
- `src/components/BentoGrid.tsx` — Services grid (complete rewrite)
- `src/components/TestimonialCarousel.tsx` — Testimonials (complete rewrite)
- `src/components/StatsBar.tsx` — Stats section (polish)
- `src/components/NewsCard.tsx` — News cards (polish)
- `src/components/SectionHeading.tsx` — Section headers (keep as-is)
- `src/lib/constants.ts` — All data (DO NOT MODIFY)
- `public/images/hero-children.jpg` — ✅ Already downloaded (849KB outdoor picnic photo)

## Design Tokens (from globals.css)
```
--color-primary: #047857 (dark green)
--color-primary-light: #10B981
--color-primary-dark: #064E3B
--color-accent: #D97706 (amber/orange)
--color-accent-light: #F59E0B
--color-bg: #FAFAF9 (off-white)
--color-bg-warm: #F5F0EB
--color-card: #FFFFFF
--color-text: #1C1917
--color-text-muted: #57534E
--color-border: #E7E5E4
```

## Dev Server
```bash
cd /Users/daodilyas/Desktop/iqra && npm run dev
# Runs on http://localhost:3000
# Check for TypeScript errors: npx tsc --noEmit
```

---

## Task 1: Hero Section — Luminous Split Layout

**Files:**
- Modify: `src/app/page.tsx` (hero section only, lines 15–70)
- Modify: `src/app/globals.css` (add wave clip-path and hero utilities)

**What to build:**
- Left panel (40%): warm off-white bg, Islamic pattern at 4% opacity, badge pill, headline with gradient second line, body copy, two CTA buttons, floating mini-stats strip at bottom
- Right panel (60%): `hero-children.jpg` fills full height, NO dark overlay, organic SVG wave on the left edge creates the divide
- Mobile: photo stacks on top (50vh), content below
- Floating card on photo (bottom-right): *"Et trygt fellesskap ✓"* in a small glass card

**Step 1: Replace the hero section in `src/app/page.tsx`**

Replace lines 15–70 (the entire `{/* ===== HERO ===== */}` section) with:

```tsx
{/* ===== HERO ===== */}
<section className="relative min-h-[100dvh] flex flex-col lg:flex-row overflow-hidden">
  {/* LEFT PANEL — content */}
  <div className="relative z-10 flex flex-col justify-center w-full lg:w-[42%] bg-bg px-8 sm:px-12 lg:px-16 py-24 lg:py-0 min-h-[50dvh] lg:min-h-[100dvh]">
    {/* Subtle Islamic pattern */}
    <div className="absolute inset-0 pattern-islamic opacity-[0.04] pointer-events-none" />

    <div className="relative max-w-lg">
      {/* Badge */}
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-8 border border-accent/20">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        Velkommen til Iqra Senter
      </span>

      {/* Headline */}
      <h1 className="font-heading text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-text leading-[1.08] tracking-tight">
        Læring og aktivitet
        <span className="block gradient-text mt-1">for hele familien</span>
      </h1>

      {/* Body */}
      <p className="mt-6 text-base lg:text-lg text-text-muted leading-relaxed max-w-md">
        Et trygt og inkluderende fellesskap med læring, fritidsaktiviteter og sosialt samvær for barn, unge og familier i Oslo.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/bli-medlem"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer text-base"
        >
          Bli medlem i dag
          <ArrowRight size={18} />
        </Link>
        <Link
          href="/om-oss"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-primary/20 hover:border-primary/40 text-primary font-semibold rounded-xl transition-all duration-200 cursor-pointer text-base hover:bg-primary/5"
        >
          Les mer om oss
        </Link>
      </div>

      {/* Mini stats strip */}
      <div className="mt-10 flex items-center gap-6 pt-8 border-t border-border/60">
        {[
          { value: "200+", label: "Medlemmer" },
          { value: "5+", label: "År aktive" },
          { value: "50+", label: "Arrangementer" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-extrabold text-primary font-heading">{stat.value}</div>
            <div className="text-xs text-text-muted mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* WAVE DIVIDER — sits between panels, z-20 so it's above both */}
  <div className="hidden lg:block absolute left-[40%] top-0 h-full w-16 z-20 pointer-events-none">
    <svg viewBox="0 0 64 800" preserveAspectRatio="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 C32 200, 48 400, 0 800 L64 800 L64 0 Z" fill="var(--color-bg)" />
    </svg>
  </div>

  {/* RIGHT PANEL — photo */}
  <div className="relative w-full lg:w-[60%] min-h-[50dvh] lg:min-h-[100dvh]">
    <Image
      src="/images/hero-children.jpg"
      alt="Barn og unge nyter en herlig dag utendørs med Iqra Senter"
      fill
      className="object-cover object-top"
      priority
      sizes="(max-width: 1024px) 100vw, 60vw"
    />
    {/* Subtle vignette on right edge only */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 pointer-events-none" />

    {/* Floating trust card */}
    <div className="absolute bottom-8 right-8 z-10 glass rounded-2xl px-5 py-4 shadow-xl border border-white/30 max-w-[200px]">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span className="text-sm font-bold text-text">Et trygt fellesskap</span>
      </div>
      <p className="text-xs text-text-muted leading-snug">For barn, unge og familier i Oslo siden 2019.</p>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-6 left-[20%] -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2">
    <span className="text-xs text-text-muted font-medium tracking-widest uppercase">Scroll</span>
    <div className="w-px h-8 bg-gradient-to-b from-text-muted/40 to-transparent" />
  </div>
</section>
```

**Step 2: Verify dev server shows split hero correctly**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: `200`

Check visually: left panel has content, right panel shows the children photo clearly with no dark overlay.

**Step 3: Check TypeScript**

```bash
cd /Users/daodilyas/Desktop/iqra && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

**Step 4: Commit**

```bash
cd /Users/daodilyas/Desktop/iqra
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: luminous split hero with children photo, no dark overlay"
```

---

## Task 2: Magazine Bento Grid (Services)

**Files:**
- Modify: `src/components/BentoGrid.tsx` (complete rewrite)

**What to build:**
An asymmetric 3-column magazine grid replacing the current uniform 4-column grid:
- Row 1: Helgeskole (spans 2 cols, tall ~420px) | Fritidsaktiviteter (1 col, tall ~420px)
- Row 2: Kurs og opplæring (1 col, ~280px) | Leie rom (2 cols, ~280px)

Each card has:
- Full image background with `object-cover`
- Bottom gradient overlay (black/60 → transparent, NOT top-to-bottom killing the photo)
- Icon badge (amber circle, top-left corner)
- Category label (uppercase, white/60, small)
- Title (bold white, bottom)
- Description (white/70, small, line-clamp-2)
- "Les mer →" appears on hover with translate animation
- Scale 1.03 on hover (smooth 500ms)

**Step 1: Rewrite `src/components/BentoGrid.tsx`**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, GraduationCap, Building, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const iconMap = { BookOpen, Users, GraduationCap, Building } as const;

const linkMap: Record<string, string> = {
  Helgeskole: "/om-oss",
  Fritidsaktiviteter: "/om-oss",
  "Kurs og opplæring": "/om-oss",
  "Leie rom": "/leie-rom",
};

const categoryMap: Record<string, string> = {
  Helgeskole: "Utdanning",
  Fritidsaktiviteter: "Aktiviteter",
  "Kurs og opplæring": "Kurs",
  "Leie rom": "Lokaler",
};

// Magazine asymmetric layout:
// Row 1: [Helgeskole lg:col-span-2] [Fritidsaktiviteter lg:col-span-1]
// Row 2: [Kurs lg:col-span-1]       [Leie rom lg:col-span-2]
const colSpanMap: Record<string, string> = {
  Helgeskole: "lg:col-span-2",
  Fritidsaktiviteter: "lg:col-span-1",
  "Kurs og opplæring": "lg:col-span-1",
  "Leie rom": "lg:col-span-2",
};

const heightMap: Record<string, string> = {
  Helgeskole: "min-h-[380px] lg:min-h-[420px]",
  Fritidsaktiviteter: "min-h-[380px] lg:min-h-[420px]",
  "Kurs og opplæring": "min-h-[260px] lg:min-h-[300px]",
  "Leie rom": "min-h-[260px] lg:min-h-[300px]",
};

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
      {SERVICES.map((service) => {
        const Icon = iconMap[service.icon];
        return (
          <Link
            key={service.title}
            href={linkMap[service.title] || "/"}
            className={`group relative overflow-hidden rounded-3xl cursor-pointer ${colSpanMap[service.title]} ${heightMap[service.title]}`}
          >
            {/* Photo */}
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Top-left icon badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Icon size={17} className="text-white" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {categoryMap[service.title]}
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-white leading-tight">
                {service.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/70 leading-relaxed line-clamp-2">
                {service.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-accent font-semibold text-sm opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Les mer
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            {/* Hover border glow */}
            <div className="absolute inset-0 rounded-3xl ring-2 ring-accent/0 group-hover:ring-accent/40 transition-all duration-300 pointer-events-none" />
          </Link>
        );
      })}
    </div>
  );
}
```

**Step 2: Check TypeScript**

```bash
cd /Users/daodilyas/Desktop/iqra && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

**Step 3: Commit**

```bash
cd /Users/daodilyas/Desktop/iqra
git add src/components/BentoGrid.tsx
git commit -m "feat: magazine asymmetric bento grid with hover animations"
```

---

## Task 3: Polaroid Testimonials

**Files:**
- Modify: `src/components/TestimonialCarousel.tsx` (complete rewrite)

**What to build:**
Replace the flat uniform card grid with "polaroid-style" testimonial cards:
- Each card: white bg, generous padding, large decorative serif quote mark (green, top-left), quote text, colored bottom accent bar (alternating green/amber), author name + age + star rating (5 stars, gold)
- Desktop: 4-column grid with slight stagger (alternating `mt-0` / `mt-6` on even cards for visual rhythm)
- Mobile: single carousel (keep existing prev/next logic)
- Cards have subtle drop shadow + hover lift (`hover:-translate-y-1 hover:shadow-lg`)

**Step 1: Rewrite `src/components/TestimonialCarousel.tsx`**

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

const accentColors = [
  "bg-primary",
  "bg-accent",
  "bg-primary-light",
  "bg-accent-light",
] as const;

function TestimonialCard({
  testimonial,
  staggered = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  staggered?: boolean;
}) {
  const idx = TESTIMONIALS.indexOf(testimonial);
  const accent = accentColors[idx % accentColors.length];

  return (
    <div
      className={`bg-card rounded-3xl p-7 shadow-md border border-border/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col ${staggered ? "mt-6" : ""}`}
    >
      {/* Large decorative quote mark */}
      <div className="font-heading text-7xl leading-none text-primary/10 font-extrabold select-none -mt-2 -ml-1 mb-2">
        "
      </div>

      {/* Quote */}
      <p className="text-text text-sm leading-relaxed flex-1">
        {testimonial.quote}
      </p>

      {/* Stars */}
      <div className="flex gap-0.5 mt-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="text-accent fill-accent" />
        ))}
      </div>

      {/* Author */}
      <div className="mt-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary">{testimonial.initials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">{testimonial.name}</p>
          <p className="text-xs text-text-muted">{testimonial.age} år</p>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className={`mt-5 h-1 w-12 rounded-full ${accent}`} />
    </div>
  );
}

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      {/* Desktop staggered grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} staggered={i % 2 === 1} />
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <TestimonialCard testimonial={TESTIMONIALS[active]} />
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer"
            aria-label="Forrige"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${i === active ? "bg-primary w-6" : "bg-border w-2 hover:bg-text-muted"}`}
                aria-label={`Gå til tilbakemelding ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActive((p) => (p + 1) % TESTIMONIALS.length)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer"
            aria-label="Neste"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Check TypeScript**

```bash
cd /Users/daodilyas/Desktop/iqra && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

**Step 3: Commit**

```bash
cd /Users/daodilyas/Desktop/iqra
git add src/components/TestimonialCarousel.tsx
git commit -m "feat: polaroid-style testimonials with stagger and star ratings"
```

---

## Task 4: News Cards Polish

**Files:**
- Modify: `src/components/NewsCard.tsx`

**What to build:**
Enhance existing news cards with:
- Rounded-3xl corners (up from rounded-2xl)
- Image zoom on hover (scale-105, 500ms)
- Date formatted nicely (e.g. "20. januar 2025")
- Category badge on image (top-left, amber pill "Nyhet")
- Title with hover color transition to primary
- Subtle "Les mer →" link at bottom
- `overflow-hidden` shadow-md → hover:shadow-lg lift

**Step 1: Read current NewsCard.tsx**

```bash
cat /Users/daodilyas/Desktop/iqra/src/components/NewsCard.tsx
```

**Step 2: Rewrite `src/components/NewsCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

function formatDate(dateStr: string): string {
  const months = [
    "januar","februar","mars","april","mai","juni",
    "juli","august","september","oktober","november","desember",
  ];
  const d = new Date(dateStr);
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function NewsCard({ title, excerpt, date, image }: NewsCardProps) {
  return (
    <article className="group bg-card rounded-3xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-md">
            Nyhet
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <time className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {formatDate(date)}
        </time>
        <h3 className="mt-2 font-heading text-base font-bold text-text leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1 text-primary font-semibold text-sm">
          Les mer
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
```

**Step 3: Check TypeScript**

```bash
cd /Users/daodilyas/Desktop/iqra && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

**Step 4: Commit**

```bash
cd /Users/daodilyas/Desktop/iqra
git add src/components/NewsCard.tsx
git commit -m "feat: polished news cards with date formatting and hover effects"
```

---

## Task 5: Stats Bar Polish + CTA Banner Enhancement

**Files:**
- Modify: `src/components/StatsBar.tsx`
- Modify: `src/app/page.tsx` (CTA Banner section only, lines ~262–289)

**What to build for StatsBar:**
- Replace the existing grid with a more dramatic layout: each stat in its own "pill" card
- Large number in `gradient-text`, label below in muted
- Horizontal dividers between stats on desktop
- Keep IntersectionObserver animation (check current implementation and preserve it)

**Step 1: Read current StatsBar.tsx**

```bash
cat /Users/daodilyas/Desktop/iqra/src/components/StatsBar.tsx
```

**Step 2: Rewrite `src/components/StatsBar.tsx`**

Replace the entire file with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-border/60"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center py-6 px-4 rounded-2xl lg:rounded-none transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          <span className="font-heading text-4xl lg:text-5xl font-extrabold gradient-text leading-none">
            {stat.value}
          </span>
          <span className="mt-2 text-sm font-medium text-text-muted text-center">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
```

**Step 3: Enhance CTA Banner in `src/app/page.tsx`**

Replace the `{/* ===== CTA BANNER ===== */}` section (lines ~262–289) with:

```tsx
{/* ===== CTA BANNER ===== */}
<section className="relative py-28 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" />
  <div className="absolute inset-0 pattern-islamic opacity-15" />
  {/* Decorative orbs */}
  <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
  <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary-light/10 blur-3xl pointer-events-none" />

  <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6 border border-accent/30">
      Bli en del av oss
    </span>
    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
      Bli en del av vårt fellesskap
    </h2>
    <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
      Læring, mestring og moro — sammen. Meld deg inn i dag og gi familien din et fellesskap som varer.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/bli-medlem"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer text-base"
      >
        Meld deg inn nå
        <ArrowRight size={18} />
      </Link>
      <Link
        href="/stott-oss"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 cursor-pointer text-base border border-white/20"
      >
        Støtt oss
      </Link>
    </div>
  </div>
</section>
```

**Step 4: Check TypeScript**

```bash
cd /Users/daodilyas/Desktop/iqra && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

**Step 5: Commit**

```bash
cd /Users/daodilyas/Desktop/iqra
git add src/components/StatsBar.tsx src/app/page.tsx
git commit -m "feat: polished stats bar with stagger animation and enhanced CTA banner"
```

---

## Task 6: Om Oss Section Polish + Final Globals CSS Additions

**Files:**
- Modify: `src/app/page.tsx` (Om Oss section, lines ~86–141)
- Modify: `src/app/globals.css` (add any missing utilities)

**What to build for Om Oss:**
- Add a styled pull-quote block inside the text area: a green left-border blockquote with italic text
- Add a subtle "verified badge" row below the text (3 small green checkmark pills: "Islamsk miljø ✓", "Familievennlig ✓", "Inkluderende ✓")
- The image card: add a second overlapping card (bottom-left) showing the Iqra logo or a stat — this creates the "layered depth" effect
- Tighten decorative elements: make them more visible (increase bg-accent/20 and bg-primary/20)

**Step 1: Replace Om Oss section in `src/app/page.tsx`**

Replace the `{/* ===== OM OSS PREVIEW ===== */}` section (lines ~86–141) with:

```tsx
{/* ===== OM OSS PREVIEW ===== */}
<section className="py-24 lg:py-32 bg-bg-warm">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Text */}
      <div>
        <SectionHeading
          badge="Om oss"
          title="Mer enn en utdanningsinstitusjon"
          subtitle="Iqra Læring og Aktivitetssenter er et samlingspunkt for hele familien — der kunnskap og glede møtes."
          centered={false}
        />
        <div className="mt-8 space-y-4 text-text-muted leading-relaxed">
          <p>
            Vi ligger sentralt i Oslo, i Ryenstubben 2, og tilbyr et unikt læringsmiljø for hele familien. Hos oss finner du islamske studier, språkopplæring, kulturelle aktiviteter og familievennlige arrangementer.
          </p>
          {/* Pull-quote */}
          <blockquote className="border-l-4 border-primary pl-5 py-1 my-6 italic text-text font-medium">
            "Vårt mål er å bygge et sterkt, inkluderende fellesskap der alle føler seg velkomne — uansett bakgrunn og alder."
          </blockquote>
        </div>
        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 mt-6">
          {["Islamsk miljø", "Familievennlig", "Inkluderende"].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {badge}
            </span>
          ))}
        </div>
        <Link
          href="/om-oss"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          Les mer om oss
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Image stack */}
      <div className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/helgeskole.jpg"
            alt="Fellesskap hos Iqra Senter"
            width={600}
            height={500}
            className="object-cover w-full h-[400px] lg:h-[480px]"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent" />
        </div>
        {/* Decorative corners */}
        <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-3xl bg-accent/20 -z-10" />
        <div className="absolute -top-5 -left-5 w-20 h-20 rounded-3xl bg-primary/20 -z-10" />
        {/* Floating stat card */}
        <div className="absolute -bottom-4 -left-4 z-10 glass rounded-2xl px-5 py-4 shadow-xl border border-white/40">
          <div className="text-2xl font-extrabold font-heading gradient-text">200+</div>
          <div className="text-xs text-text-muted mt-0.5">Aktive medlemmer</div>
        </div>
      </div>
    </div>

    {/* Stats bar */}
    <div className="mt-20">
      <StatsBar />
    </div>
  </div>
</section>
```

**Step 2: Check TypeScript**

```bash
cd /Users/daodilyas/Desktop/iqra && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

**Step 3: Final visual check — curl all pages**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: `200`

**Step 4: Commit**

```bash
cd /Users/daodilyas/Desktop/iqra
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: om oss section with pull-quote, trust badges, and layered image card"
```

---

## Final Verification

After all 6 tasks:

```bash
cd /Users/daodilyas/Desktop/iqra
npx tsc --noEmit 2>&1
git log --oneline -8
```

Expected: clean TypeScript, 6 new commits on top of initial commit.

Visual checklist:
- [ ] Hero: photo fully visible, no dark green overlay, split layout on desktop
- [ ] Hero: left panel has badge, headline with gradient, two CTAs, mini stats strip
- [ ] Bento: asymmetric magazine grid, hover scale + amber glow ring
- [ ] Testimonials: polaroid cards, staggered heights, stars, colored accent bars
- [ ] News cards: amber "Nyhet" badge, date formatted in Norwegian, hover lift
- [ ] Stats bar: gradient numbers, stagger animation on scroll
- [ ] Om Oss: pull-quote, trust badges, floating "200+" card
- [ ] CTA Banner: gradient bg, decorative orbs, amber badge
