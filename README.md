# FallbackJS

FallbackJS is a tiny, zero-configuration JavaScript library that provides
clean, user-friendly fallback pages for common frontend failures.

It works automatically by adding a single script tag.

No setup. No backend. No tracking.

---

## What it does

FallbackJS handles common failure states gracefully:

- Offline / network unavailable
- Broken images
- Runtime JavaScript crashes

Each fallback is:
- Minimal
- Responsive
- Accessible
- Fully client-side

---

## What it does NOT do

FallbackJS does **not**:

- Verify truth, correctness, or security
- Prevent crashes from happening
- Replace proper error handling or monitoring
- Send analytics or logs anywhere

This library is about **presentation**, not prevention.

---

## Installation

Add one script tag to your main HTML file:

```html
<script src="https://fallbackjs.netlify.app/fallback.min.js"></script>
