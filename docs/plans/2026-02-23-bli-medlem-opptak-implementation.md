# Bli medlem / Opptak — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an admission (opptak) interest form alongside the existing membership page, with a new section on the bli-medlem page linking to a dedicated admission form at `/bli-medlem/opptak`.

**Architecture:** Update the existing `/bli-medlem` page to add an admission info section between the membership info and registration form. Create a new `AdmissionForm` client component that submits via Web3Forms with conditional fields (special needs textarea, mother tongue text input). Create a new Next.js page at `/bli-medlem/opptak` that uses the existing editorial layout components.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Web3Forms, Framer Motion (via FadeIn), lucide-react icons

---

### Task 1: Update Nav Label in Constants

**Files:**
- Modify: `src/lib/constants.ts:24`

**Step 1: Update the nav label**

In `src/lib/constants.ts`, change line 24 from:

```typescript
  { label: "Bli medlem", href: "/bli-medlem" },
```

to:

```typescript
  { label: "Bli medlem / Opptak", href: "/bli-medlem" },
```

**Step 2: Verify the build still compiles**

Run: `cd /Users/daodilyas/Desktop/iqra && npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds (the `as const` assertion on NAV_ITEMS should still work fine)

**Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: update nav label to 'Bli medlem / Opptak'"
```

---

### Task 2: Add Admission Section to bli-medlem Page

**Files:**
- Modify: `src/app/bli-medlem/page.tsx`

**Step 1: Update the page header props**

Change the `EditorialPageHeader` at line 65-69 from:

```tsx
<EditorialPageHeader
  label="Bli medlem"
  title="Bli medlem"
  subtitle="Læring, fellesskap og muligheter for hele familien"
/>
```

to:

```tsx
<EditorialPageHeader
  label="Bli medlem / Opptak"
  title="Bli medlem / Opptak"
  subtitle="Læring, fellesskap og muligheter for hele familien"
/>
```

Also update the metadata at line 19-21 from:

```typescript
export const metadata: Metadata = {
  title: "Bli medlem",
};
```

to:

```typescript
export const metadata: Metadata = {
  title: "Bli medlem / Opptak",
};
```

**Step 2: Add the new admission section**

Add this import at the top of the file (after the existing imports):

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
```

Insert a new section between the `{/* ===== MEMBERSHIP INFO ===== */}` section (ends at line 198) and the `{/* ===== REGISTRATION FORM ===== */}` section (starts at line 200). Place this JSX after the closing `</section>` of MEMBERSHIP INFO (after line 198):

```tsx
      {/* ===== ADMISSION / OPPTAK ===== */}
      <section className="py-12 lg:py-16 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <EditorialLabel accent>Opptak</EditorialLabel>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text leading-tight">
                Opptak til Helgeskolen
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-lg text-text-muted leading-relaxed">
                For tiden er opptaket fullt, men vi tar imot interessemeldinger
                fortløpende. Når det blir ledige plasser, kontakter vi deg.
                Fyll ut interesseskjemaet for å vise at du ønsker plass til
                barnet ditt hos oss.
              </p>
              <Link
                href="/bli-medlem/opptak"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Vis interesse for opptak
                <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
```

**Step 3: Verify the build compiles**

Run: `cd /Users/daodilyas/Desktop/iqra && npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/bli-medlem/page.tsx
git commit -m "feat: add admission section and update header on bli-medlem page"
```

---

### Task 3: Create the AdmissionForm Component

**Files:**
- Create: `src/components/AdmissionForm.tsx`

**Step 1: Create the AdmissionForm component**

Create `src/components/AdmissionForm.tsx` with the following content. This component follows the exact same patterns as `MembershipForm.tsx` — same Web3Forms submission, same styling classes, same loading/error/success states — but with admission-specific fields and conditional rendering for special needs and mother tongue.

```tsx
"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

const GRADE_OPTIONS = [
  "1. klasse",
  "2. klasse",
  "3. klasse",
  "4. klasse",
  "5. klasse",
  "6. klasse",
  "7. klasse",
  "8. klasse",
  "9. klasse",
  "10. klasse",
];

export function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSpecialNeeds, setHasSpecialNeeds] = useState(false);
  const [motherTongue, setMotherTongue] = useState<"somali" | "other">("somali");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "Nytt interesseskjema for opptak — Iqra Senter");
    data.append("from_name", "Iqra Senter Nettside");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError("Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.");
      }
    } catch {
      setError("Kunne ikke sende skjemaet. Sjekk internettforbindelsen din og prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle size={48} className="text-primary mb-4" />
        <h3 className="font-heading text-xl font-bold text-text">
          Takk for din interesse!
        </h3>
        <p className="mt-2 text-text-muted">
          Vi har registrert interessen din og kontakter deg når det blir ledige plasser.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot for spam */}
      <input type="checkbox" name="botcheck" className="hidden" />

      {/* Child's full name */}
      <div>
        <label htmlFor="admission-child-name" className="block text-sm font-medium text-text mb-1.5">
          Barnets fulle navn
        </label>
        <input
          type="text"
          id="admission-child-name"
          name="child_name"
          required
          className={inputClass}
          placeholder="Barnets fulle navn"
        />
      </div>

      {/* Date of birth + Grade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="admission-dob" className="block text-sm font-medium text-text mb-1.5">
            Fødselsdato
          </label>
          <input
            type="date"
            id="admission-dob"
            name="date_of_birth"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="admission-grade" className="block text-sm font-medium text-text mb-1.5">
            Klassetrinn
          </label>
          <select
            id="admission-grade"
            name="grade"
            required
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Velg klassetrinn
            </option>
            {GRADE_OPTIONS.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Parent email + phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="admission-email" className="block text-sm font-medium text-text mb-1.5">
            Foresattes e-post
          </label>
          <input
            type="email"
            id="admission-email"
            name="parent_email"
            required
            className={inputClass}
            placeholder="forelder@epost.no"
          />
        </div>
        <div>
          <label htmlFor="admission-phone" className="block text-sm font-medium text-text mb-1.5">
            Foresattes telefon
          </label>
          <input
            type="tel"
            id="admission-phone"
            name="parent_phone"
            required
            className={inputClass}
            placeholder="+47 XXX XX XXX"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="admission-address" className="block text-sm font-medium text-text mb-1.5">
          Adresse
        </label>
        <input
          type="text"
          id="admission-address"
          name="address"
          required
          className={inputClass}
          placeholder="Gateadresse, postnummer og sted"
        />
      </div>

      {/* Photo/video consent */}
      <fieldset>
        <legend className="block text-sm font-medium text-text mb-2">
          Samtykker du til at barnet ditt kan bli fotografert eller filmet?
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="photo_consent"
              value="Ja"
              required
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Ja</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="photo_consent"
              value="Nei"
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Nei</span>
          </label>
        </div>
      </fieldset>

      {/* Special needs */}
      <fieldset>
        <legend className="block text-sm font-medium text-text mb-2">
          Har barnet ditt noen spesielle behov vi bør vite om?
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="has_special_needs"
              value="Ja"
              onChange={() => setHasSpecialNeeds(true)}
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Ja</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="has_special_needs"
              value="Nei"
              defaultChecked
              onChange={() => setHasSpecialNeeds(false)}
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Nei</span>
          </label>
        </div>
        {hasSpecialNeeds && (
          <textarea
            name="special_needs_details"
            rows={3}
            className={`${inputClass} mt-3 resize-none`}
            placeholder="Beskriv eventuelle behov her..."
          />
        )}
      </fieldset>

      {/* Fluent Arabic */}
      <fieldset>
        <legend className="block text-sm font-medium text-text mb-2">
          Kan barnet ditt flytende arabisk?
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="fluent_arabic"
              value="Ja"
              required
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Ja</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="fluent_arabic"
              value="Nei"
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Nei</span>
          </label>
        </div>
      </fieldset>

      {/* Mother tongue */}
      <fieldset>
        <legend className="block text-sm font-medium text-text mb-2">
          Hva er morsmålet?
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mother_tongue_type"
              value="Somali"
              defaultChecked
              onChange={() => setMotherTongue("somali")}
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Somali</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mother_tongue_type"
              value="Annet"
              onChange={() => setMotherTongue("other")}
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="text-sm text-text">Annet</span>
          </label>
        </div>
        {motherTongue === "other" && (
          <input
            type="text"
            name="mother_tongue_other"
            className={`${inputClass} mt-3`}
            placeholder="Skriv morsmålet her..."
          />
        )}
      </fieldset>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={18} />
            Send interessemelding
          </>
        )}
      </button>
    </form>
  );
}
```

**Step 2: Verify the build compiles**

Run: `cd /Users/daodilyas/Desktop/iqra && npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds (component isn't imported yet, but should compile on its own)

**Step 3: Commit**

```bash
git add src/components/AdmissionForm.tsx
git commit -m "feat: create AdmissionForm component with conditional fields"
```

---

### Task 4: Create the Opptak Page

**Files:**
- Create: `src/app/bli-medlem/opptak/page.tsx`

**Step 1: Create the opptak page**

Create `src/app/bli-medlem/opptak/page.tsx` with the following content. This follows the exact same layout pattern as `src/app/bli-medlem/page.tsx` — uses `EditorialPageHeader`, `EditorialLabel`, `FadeIn`, and the same 7/5 grid for form + contact sidebar.

```tsx
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
```

**Step 2: Verify the full build compiles**

Run: `cd /Users/daodilyas/Desktop/iqra && npx next build --no-lint 2>&1 | tail -10`
Expected: Build succeeds with the new `/bli-medlem/opptak` route visible in output

**Step 3: Commit**

```bash
git add src/app/bli-medlem/opptak/page.tsx
git commit -m "feat: create opptak page with admission interest form"
```

---

### Task 5: Smoke Test

**Step 1: Run the dev server and verify all pages load**

Run: `cd /Users/daodilyas/Desktop/iqra && npx next dev &`

Then verify these URLs render without errors:
- `http://localhost:3000/bli-medlem` — should show updated header "Bli medlem / Opptak", the new admission section with link, and the existing membership form
- `http://localhost:3000/bli-medlem/opptak` — should show the admission interest form with all fields
- `http://localhost:3000` — navbar should show "Bli medlem / Opptak" label

**Step 2: Verify conditional form fields work**

On `/bli-medlem/opptak`:
- Click "Ja" on special needs → textarea should appear
- Click "Nei" on special needs → textarea should disappear
- Click "Annet" on mother tongue → text input should appear
- Click "Somali" on mother tongue → text input should disappear

**Step 3: Stop the dev server**

Kill the background process.
