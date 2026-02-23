# Bli medlem / Opptak — Design

**Date:** 2026-02-23
**Status:** Approved

## Summary

Add an admission (opptak) concept alongside the existing membership page. Rename the section to "Bli medlem / Opptak", add a short paragraph explaining enrollment is currently full with a link to express interest, and create a new dedicated admission form page at `/bli-medlem/opptak`.

## Changes

### 1. Nav Label Update

In `constants.ts`, change `"Bli medlem"` → `"Bli medlem / Opptak"`.

### 2. Page Header Update (`/bli-medlem`)

- Label: "Bli medlem / Opptak"
- Title: "Bli medlem / Opptak"
- Subtitle remains the same

### 3. New Admission Section on `/bli-medlem`

Inserted between the Membership Info section and the Registration Form section.

- **Label:** "Opptak" (EditorialLabel)
- **Heading:** "Opptak til Helgeskolen"
- **Paragraph:** Explains enrollment is currently full. When spots open, Iqra will contact interested families. Use the form to express interest.
- **CTA:** Link button to `/bli-medlem/opptak` — "Vis interesse for opptak"

Uses same editorial styling (FadeIn, border-top, consistent spacing).

### 4. New Page: `/bli-medlem/opptak`

A standalone admission interest form page.

**Header:**
- Label: "Opptak"
- Title: "Interesseskjema for opptak"
- Subtitle: "Fyll ut skjemaet for å vise interesse for opptak til Iqra Senter"

**Form fields:**
1. Child's full name — text input
2. Date of birth — date input
3. School grade — dropdown (1. klasse – 10. klasse)
4. Parent's email — email input
5. Parent's phone — tel input
6. Address — text input
7. Photo/video consent — "Samtykker du til at barnet ditt kan bli fotografert eller filmet?" — Yes/No radio
8. Special needs — "Har barnet ditt noen spesielle behov vi bør vite om?" — Yes/No radio → if Yes, textarea appears
9. Fluent Arabic — "Kan barnet ditt flytende arabisk?" — Yes/No radio
10. Mother tongue — "Hva er morsmålet?" — Radio: "Somali" / "Annet" → if Annet, text input appears

**Submission:** Web3Forms with subject line "Nytt interesseskjema for opptak — Iqra Senter"

**Success state:** Thank you message confirming interest has been registered and they will be contacted when enrollment opens.

## Files Affected

- `src/lib/constants.ts` — nav label
- `src/app/bli-medlem/page.tsx` — header + new admission section
- `src/app/bli-medlem/opptak/page.tsx` — new page (created)
- `src/components/AdmissionForm.tsx` — new form component (created)
