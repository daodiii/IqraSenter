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
        &ldquo;
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
