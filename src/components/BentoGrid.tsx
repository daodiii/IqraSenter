import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, GraduationCap, Building, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

type ServiceTitle = (typeof SERVICES)[number]["title"];

const iconMap = { BookOpen, Users, GraduationCap, Building } as const;

const linkMap: Record<ServiceTitle, string> = {
  Helgeskole: "/om-oss",
  Fritidsaktiviteter: "/om-oss",
  "Kurs og opplæring": "/om-oss",
  "Leie rom": "/leie-rom",
};

const categoryMap: Record<ServiceTitle, string> = {
  Helgeskole: "Utdanning",
  Fritidsaktiviteter: "Aktiviteter",
  "Kurs og opplæring": "Kurs",
  "Leie rom": "Lokaler",
};

const colSpanMap: Record<ServiceTitle, string> = {
  Helgeskole: "lg:col-span-2",
  Fritidsaktiviteter: "lg:col-span-1",
  "Kurs og opplæring": "lg:col-span-1",
  "Leie rom": "lg:col-span-2",
};

const heightMap: Record<ServiceTitle, string> = {
  Helgeskole: "min-h-[380px] lg:min-h-[420px]",
  Fritidsaktiviteter: "min-h-[380px] lg:min-h-[420px]",
  "Kurs og opplæring": "min-h-[260px] lg:min-h-[300px]",
  "Leie rom": "min-h-[260px] lg:min-h-[300px]",
};

const sizesMap: Record<ServiceTitle, string> = {
  Helgeskole:           "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw",
  Fritidsaktiviteter:   "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  "Kurs og opplæring":  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  "Leie rom":           "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw",
};

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
      {SERVICES.map((service) => {
        const Icon = iconMap[service.icon];
        return (
          <Link
            key={service.title}
            href={linkMap[service.title]}
            className={`group relative overflow-hidden rounded-3xl cursor-pointer ${colSpanMap[service.title]} ${heightMap[service.title]}`}
          >
            {/* Photo */}
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes={sizesMap[service.title]}
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
