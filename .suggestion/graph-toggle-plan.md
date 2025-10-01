# Mobile/Tablet Graph Toggle – Implementation Plan

## Breakpoint audit

- **Small mobile**: `max-width: 400pt` (≈ 533 px) – from `custom-style.scss`
- **Mobile / tablet**: `max-width: 800px` – dominant in `digital-garden-base.scss`
- **Large desktop guard**: `max-width: 1400px`

We treat ≤ 800 px as mobile/tablet and > 800 px as desktop.

## Desired behaviour by viewport

- **Desktop ( > 800 px)**: keep existing inline/side graph.
- **Mobile & tablet ( ≤ 800 px)**:
  - Graph hidden on initial load.
  - Fixed toggle button at top-right.
  - Tapping button opens graph as full-screen overlay.
  - Same button (or close icon) collapses overlay.

## High-level steps

1. **Markup**
   - Wrap current graph in `<div class="graph-overlay">` (fixed, full-viewport).
   - Add `<button id="graph-toggle">` outside overlay so it’s always reachable.
2. **Initial CSS**
   ```css
   .graph-overlay {
     display: none;
   }
   #graph-toggle {
     display: none;
   }
   @media (max-width: 800px) {
     #graph-toggle {
       display: block;
     }
   }
   ```
3. **Active state CSS**
   ```css
   .is-graph-open .graph-overlay {
     display: block;
     position: fixed;
     inset: 0;
     z-index: 9999;
     background: var(--bg);
   }
   body.is-graph-open {
     overflow: hidden;
   }
   ```
4. **JavaScript** (inside `graphScript.njk` or separate script)
   ```js
   const btn = document.getElementById("graph-toggle");
   btn?.addEventListener("click", () => {
     document.body.classList.toggle("is-graph-open");
     btn.setAttribute(
       "aria-expanded",
       document.body.classList.contains("is-graph-open")
     );
   });
   document.addEventListener("keydown", (e) => {
     if (
       e.key === "Escape" &&
       document.body.classList.contains("is-graph-open")
     ) {
       btn.click();
     }
   });
   ```
5. **Accessibility & UX**
   - Update `aria-expanded` on the button.
   - Trap focus within overlay; return to button on close.
   - Provide smooth entry/exit animations (opacity/scale).
6. **Styling for toggle button**
   ```html
   <button
     id="graph-toggle"
     aria-expanded="false"
     class="fixed top-3 right-3 p-3 rounded-full bg-primary text-white shadow-lg"
   >
     <svg><!-- icon --></svg>
   </button>
   ```
7. **Testing matrix**
   - ≤ 400 pt: button visible, overlay opens/closes, no scroll bleed.
   - 401–800 px: verify both portrait & landscape tablets.
   - ≥ 801 px: button hidden, graph unchanged.

---

This plan hides the graph by default on small viewports and introduces a non-intrusive toggle to access the full-screen graph without affecting desktop behaviour.
