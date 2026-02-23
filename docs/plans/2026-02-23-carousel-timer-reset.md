# Carousel Timer Reset Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reset the auto-scroll interval to a fresh 5 seconds whenever the user manually navigates either carousel.

**Architecture:** Add a `resetKey` counter state to each carousel. Increment it on every user-initiated navigation. Include it in the timer useEffect's dependency array so the interval restarts.

**Tech Stack:** React (useState, useEffect), Next.js, TypeScript

---

### Task 1: Fix AnimatedTestimonials timer reset

**Files:**
- Modify: `src/components/ui/animated-testimonials.tsx:24-43` (state + handlers + useEffect)
- Modify: `src/components/ui/animated-testimonials.tsx:157-168` (button onClick wiring)

**Step 1: Add resetKey state and wrapped handlers**

In `animated-testimonials.tsx`, after `const [active, setActive] = useState(0);` (line 24), add:

```tsx
const [resetKey, setResetKey] = useState(0);
```

Then after `handlePrev` (after line 32), add wrapped handlers:

```tsx
const handleUserNext = () => {
  handleNext();
  setResetKey((k) => k + 1);
};

const handleUserPrev = () => {
  handlePrev();
  setResetKey((k) => k + 1);
};
```

**Step 2: Update useEffect dependency array**

Change the autoplay useEffect (lines 38-43) from:

```tsx
useEffect(() => {
  if (autoplay) {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }
}, [autoplay]);
```

To:

```tsx
useEffect(() => {
  if (autoplay) {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }
}, [autoplay, resetKey]);
```

**Step 3: Wire buttons to wrapped handlers**

Change the prev button onClick (line 158) from `onClick={handlePrev}` to `onClick={handleUserPrev}`.

Change the next button onClick (line 163) from `onClick={handleNext}` to `onClick={handleUserNext}`.

**Step 4: Verify in browser**

Run: `npm run dev`

Go to the Teachers section. Click next/prev. Confirm the auto-advance waits a full 5 seconds after your click instead of jumping immediately.

**Step 5: Commit**

```bash
git add src/components/ui/animated-testimonials.tsx
git commit -m "fix: reset auto-scroll timer on user interaction in AnimatedTestimonials"
```

---

### Task 2: Fix TestimonialCarousel timer reset

**Files:**
- Modify: `src/components/TestimonialCarousel.tsx:11-38` (state + useEffect)
- Modify: `src/components/TestimonialCarousel.tsx:87-99` (button/dot onClick wiring)

**Step 1: Add resetKey state**

In `TestimonialCarousel.tsx`, after `const [paused, setPaused] = useState(false);` (line 13), add:

```tsx
const [resetKey, setResetKey] = useState(0);
```

**Step 2: Update useEffect dependency array**

Change the timer useEffect (lines 34-38) from:

```tsx
useEffect(() => {
  if (paused) return;
  const timer = setInterval(goNext, AUTO_INTERVAL);
  return () => clearInterval(timer);
}, [goNext, paused]);
```

To:

```tsx
useEffect(() => {
  if (paused) return;
  const timer = setInterval(goNext, AUTO_INTERVAL);
  return () => clearInterval(timer);
}, [goNext, paused, resetKey]);
```

**Step 3: Wire buttons and dots to also increment resetKey**

Change the prev button onClick (line 88) from:

```tsx
onClick={goPrev}
```

To:

```tsx
onClick={() => { goPrev(); setResetKey((k) => k + 1); }}
```

Change the next button onClick (line 110) from:

```tsx
onClick={goNext}
```

To:

```tsx
onClick={() => { goNext(); setResetKey((k) => k + 1); }}
```

Change the dot button onClick (line 99) from:

```tsx
onClick={() => goTo(i, i > active ? 1 : -1)}
```

To:

```tsx
onClick={() => { goTo(i, i > active ? 1 : -1); setResetKey((k) => k + 1); }}
```

**Step 4: Verify in browser**

Go to the Testimonials section. Click next/prev/dots. Confirm the auto-advance waits a full 5 seconds after your click.

**Step 5: Commit**

```bash
git add src/components/TestimonialCarousel.tsx
git commit -m "fix: reset auto-scroll timer on user interaction in TestimonialCarousel"
```
