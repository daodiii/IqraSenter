# Carousel Timer Reset on User Interaction

**Date:** 2026-02-23
**Status:** Approved

## Problem

Both carousels (AnimatedTestimonials and TestimonialCarousel) have a 5-second `setInterval` for auto-advance that never resets when the user manually navigates. If you click next/prev at second 4.8, the timer fires 200ms later and jumps you again unexpectedly.

## Approach

Reset the auto-scroll interval to a fresh 5 seconds whenever the user manually navigates (clicks next, prev, or dots).

## Changes

### AnimatedTestimonials (`src/components/ui/animated-testimonials.tsx`)

Current timer useEffect has `[autoplay]` as its only dependency — it never re-runs when `active` changes.

- Add a `key` counter state: `const [key, setKey] = useState(0)`
- Create wrapped click handlers (`handleUserNext`, `handleUserPrev`) that call the navigation function AND increment `key`
- Wire buttons to the wrapped handlers instead of raw `handleNext`/`handlePrev`
- Add `key` to the useEffect dependency array: `[autoplay, key]`

### TestimonialCarousel (`src/components/TestimonialCarousel.tsx`)

Already restarts interval when `active` changes via `goNext` dependency, but not cleanly on all interactions.

- Add a `key` counter state
- Increment `key` on prev/next button clicks and dot clicks
- Add `key` to the timer useEffect dependency array

### No other changes

- No new dependencies
- No changes to animations, styling, or component API
- The `autoplay` prop contract stays the same
