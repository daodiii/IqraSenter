import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { BentoGrid } from "@/components/BentoGrid";
import { StatsBar } from "@/components/StatsBar";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { NewsCard } from "@/components/NewsCard";
import { ContactForm } from "@/components/ContactForm";
import { SITE, NEWS, STATS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
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
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Våre tjenester"
            title="Alt du trenger, samlet på ett sted"
            subtitle="Fra helgeskole og fritidsaktiviteter til kurs og lokaler — vi har noe for hele familien."
          />
          <div className="mt-14">
            <BentoGrid />
          </div>
        </div>
      </section>

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
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true"><path d="M1 4L3.5 6.5L9 1" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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

      {/* ===== AKTUELT PREVIEW ===== */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS.map((item) => (
              <NewsCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 lg:py-32 bg-bg-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tilbakemeldinger"
            title="Hva medlemmene sier"
            subtitle="Vi er stolte av fellesskapet vi har bygget sammen."
          />
          <div className="mt-14">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div>
              <SectionHeading
                badge="Kontakt"
                title="Har du spørsmål?"
                subtitle="Vi svarer gjerne! Send oss en melding, så hører du fra oss så raskt som mulig."
                centered={false}
              />
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            {/* Map & info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-border/50 h-64 lg:h-80">
                <iframe
                  src={SITE.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Iqra Senter lokasjon"
                />
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Adresse
                    </p>
                    <p className="mt-1 text-sm text-text">{SITE.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <Mail size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      E-post
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 text-sm text-text hover:text-primary transition-colors cursor-pointer block"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <Phone size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Telefon
                    </p>
                    <a
                      href={`tel:${SITE.phoneRaw}`}
                      className="mt-1 text-sm text-text hover:text-primary transition-colors cursor-pointer block"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}
