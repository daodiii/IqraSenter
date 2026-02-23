import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { EditorialPageHeader } from "@/components/EditorialPageHeader";
import { EditorialLabel } from "@/components/EditorialLabel";
import { FadeIn } from "@/components/FadeIn";
import { AdmissionForm } from "@/components/AdmissionForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Opptak — Interesseskjema",
};

export default function OpptakPage() {
  return (
    <>
      <EditorialPageHeader
        label="Opptak"
        title="Interesseskjema for opptak"
        subtitle="Fyll ut skjemaet for å vise interesse for opptak til Iqra Senter"
      />

      {/* ===== ADMISSION FORM ===== */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — Form */}
            <div className="lg:col-span-7">
              <FadeIn>
                <EditorialLabel accent>Interessemelding</EditorialLabel>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text mb-3">
                  Meld din interesse
                </h2>
                <p className="text-text-muted mb-8">
                  Opptaket er for tiden fullt. Fyll ut skjemaet under, så
                  kontakter vi deg når det blir ledige plasser.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <AdmissionForm />
              </FadeIn>
            </div>

            {/* Right — Contact Info */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.15}>
                <div className="rounded-2xl border border-border bg-white p-8">
                  <h3 className="font-heading text-xl font-bold text-text mb-6">
                    Foretrekker du å kontakte oss direkte?
                  </h3>
                  <div className="space-y-5">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="flex items-center gap-4 text-text hover:text-primary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                        <Mail size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          E-post
                        </p>
                        <p className="font-medium">{SITE.email}</p>
                      </div>
                    </a>
                    <a
                      href={`tel:${SITE.phoneRaw}`}
                      className="flex items-center gap-4 text-text hover:text-primary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                          Telefon
                        </p>
                        <p className="font-medium">{SITE.phone}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
