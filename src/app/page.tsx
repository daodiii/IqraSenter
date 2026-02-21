'use client'

import { useRef } from 'react'
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from 'framer-motion'
import { SectionHeading } from "@/components/SectionHeading";
import { BentoGrid } from "@/components/BentoGrid";
import { StatsBar } from "@/components/StatsBar";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { NewsCard } from "@/components/NewsCard";
import { Footer } from "@/components/Footer";
import ScrollDots from '@/components/ScrollDots';
import { NEWS, STATS } from "@/lib/constants";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const, delay },
    }),
  }

  return (
    <>
      <ScrollDots
        sectionIds={['hero', 'tjenester', 'om-oss', 'aktuelt', 'testimonials', 'cta']}
        containerRef={containerRef}
      />
      <div ref={containerRef} className="snap-container">

        {/* ===== HERO ===== */}
        <section id="hero" className="snap-section relative flex flex-col lg:flex-row overflow-hidden">
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
                {STATS.slice(0, 3).map((stat) => (
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
            <svg viewBox="0 0 64 800" preserveAspectRatio="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
              quality={90}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Subtle vignette on right edge only */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 pointer-events-none" />

            {/* Floating trust card */}
            <div className="absolute bottom-8 right-8 z-10 glass rounded-2xl px-5 py-4 shadow-xl border border-white/30 max-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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

        {/* ===== BENTO GRID — SERVICES ===== */}
        <section id="tjenester" className="snap-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-4 w-full flex flex-col h-full">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionHeading
                badge="Våre tjenester"
                title="Alt du trenger, samlet på ett sted"
                subtitle="Fra helgeskole og fritidsaktiviteter til kurs og lokaler — vi har noe for hele familien."
              />
            </motion.div>
            <motion.div
              className="mt-6 flex-1 min-h-0"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.15}
              viewport={{ once: true, amount: 0.3 }}
            >
              <BentoGrid />
            </motion.div>
          </div>
        </section>

        {/* ===== OM OSS PREVIEW ===== */}
        <section id="om-oss" className="snap-section bg-bg-warm overflow-y-auto" style={{ overflowY: 'auto' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={0}
                viewport={{ once: true, amount: 0.3 }}
              >
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
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
              </motion.div>

              {/* Image stack */}
              <motion.div
                className="relative"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={0.15}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[200px] lg:h-[260px]">
                  <Image
                    src="/images/helgeskole.jpg"
                    alt="Fellesskap hos Iqra Senter"
                    fill
                    className="object-cover"
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              className="mt-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.25}
              viewport={{ once: true, amount: 0.3 }}
            >
              <StatsBar />
            </motion.div>
          </div>
        </section>

        {/* ===== AKTUELT PREVIEW ===== */}
        <section id="aktuelt" className="snap-section flex flex-col justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-6 w-full">
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionHeading
                badge="Aktuelt"
                title="Siste nytt"
                subtitle="Hold deg oppdatert med nyheter og arrangementer fra Iqra Senter."
                centered={false}
              />
              <Link
                href="/aktuelt"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors cursor-pointer shrink-0"
              >
                Se alle nyheter
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NEWS.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={0.15 + i * 0.08}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <NewsCard {...item} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section id="testimonials" className="snap-section bg-bg-warm flex flex-col justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-6 w-full">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionHeading
                badge="Tilbakemeldinger"
                title="Hva medlemmene sier"
                subtitle="Vi er stolte av fellesskapet vi har bygget sammen."
              />
            </motion.div>
            <motion.div
              className="mt-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.15}
              viewport={{ once: true, amount: 0.3 }}
            >
              <TestimonialCarousel />
            </motion.div>
          </div>
        </section>

        {/* ===== CTA BANNER + FOOTER ===== */}
        <section id="cta" className="snap-section flex flex-col" style={{ overflowY: 'auto' }}>
          {/* CTA content */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" />
            <div className="absolute inset-0 pattern-islamic opacity-15" />
            {/* Decorative orbs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary-light/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={0}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6 border border-accent/30">
                  Bli en del av oss
                </span>
              </motion.div>
              <motion.h2
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={0.1}
                viewport={{ once: true, amount: 0.3 }}
              >
                Bli en del av vårt fellesskap
              </motion.h2>
              <motion.p
                className="mt-4 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={0.2}
                viewport={{ once: true, amount: 0.3 }}
              >
                Læring, mestring og moro — sammen. Meld deg inn i dag og gi familien din et fellesskap som varer.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={0.3}
                viewport={{ once: true, amount: 0.3 }}
              >
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
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </section>

      </div>
    </>
  );
}
