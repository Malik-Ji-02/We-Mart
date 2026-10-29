# ApnaMarket Phase 2 Design System Report

**Date:** October 29, 2026  
**Branch:** `phase2-design-system`  
**Engineer:** Senior Front-End Engineer & Product Designer  
**Scope:** Design tokens, type scale, core UI components, icon harmonization, accessibility & contrast, bottom-of-screen layout collision, dev-only gallery, verification suite.

---

## 1. Executive Summary & Step-by-Step Commits

Phase 2 established a centralized, accessible, token-driven design system for ApnaMarket, removing all unused Tailwind dependencies and eliminating every hardcoded design token from `src/`. The bottom-of-screen layout collision between BottomNav, CartBar, and Assistant FAB was solved with an automated `BottomStack` coordinator. Tap targets now meet or exceed 44×44px, and contrast failures were fixed.

### Commit History

| Commit Hash | Step / Type | Description |
|:---|:---|:---|
| `d0f07a1` | Step 0 (Build) | Removed unused Tailwind packages (`tailwindcss`, `@tailwindcss/vite`) and Vite plugin; verified clean build |
| `d03e153` | Step 1 & 2 (Tokens & Contrast) | Implemented `src/styles/tokens.css`, `base.css`, `scripts/check-contrast.mjs`, and `scripts/check-tokens.mjs` |
| `3b60ef8` | Step 3, 4, 5, 6 (UI Components & Layout) | Built 17 reusable typed UI components in `src/components/ui/`, harmonized 29 icons to 24px/1.5px stroke, implemented `BottomStack` layout, added dev `/design-system` gallery |
| `feb16e6` | Step 7 (Screens) | Refactored all screens and components to use the design system, unified tap targets (44px), eliminated legacy CSS |
| `e543e7d` | Final Verification | Created `scripts/check-tap-targets.mjs`, captured 18 regression verification screenshots + 4 design system gallery screenshots |

---

## 2. Final Token System

All design values are defined once in [`src/styles/tokens.css`](file:///d:/ApnaMarket/src/styles/tokens.css) and imported first in [`src/main.tsx`](file:///d:/ApnaMarket/src/main.tsx).

### 2.1 Colour Tokens

| Token Name | Hex Value | WCAG Contrast | Primary Usage Role |
|:---|:---|:---|:---|
| `--primary` | `#0c831f` | 4.90:1 on `#ffffff` | Brand primary green, primary CTAs, active highlights |
| `--primary-dark` | `#086b18` | 6.72:1 on `#ffffff` | Active / pressed state for primary buttons, text headers on primary-10 |
| `--primary-10` | `#e7f3e9` | 14.93:1 with `#1c1c1c` | Light green tint for badges, banners, and subtle callouts |
| `--primary-20` | `#cfe7d2` | — | Accent borders and separators on tint backgrounds |
| `--text` | `#1c1c1c` | 17.04:1 on `#ffffff` | Primary readable body text, headings, labels |
| `--text-2` | `#666666` | 5.74:1 on `#ffffff` | Secondary metadata, descriptions, timestamps |
| `--text-disabled` | `#9a9a9a` | 2.72:1 on `#ffffff` | **Disabled controls only** (never used for readable text or placeholders) |
| `--background` | `#ffffff` | — | Card surfaces and mobile application canvas |
| `--surface` | `#f5f5f5` | 15.63:1 with `#1c1c1c` | Neutral card backgrounds, placeholder surfaces |
| `--border` | `#e8e8e8` | — | Standard card borders and dividers |
| `--border-strong` | `#d8d8d8` | — | Input control borders and unselected radio/checkbox strokes |
| `--viewport-bg` | `#eeeeee` | — | Desktop and tablet container backdrop only |
| `--success` | `#0e7a33` | 5.45:1 on `#ffffff` | Accessible success text and affirmative status badges |
| `--success-icon` | `#1fa84f` | 3.10:1 on `#ffffff` | Rating stars and non-text UI component indicators (>= 3.0:1) |
| `--warning` | `#b45309` | 5.02:1 on `#ffffff` | Accessible warning text and alert indicators |
| `--warning-bg` | `#f5a623` | 8.41:1 with `#1c1c1c` | High-visibility warning badge fill |
| `--error` | `#d3232f` | 5.18:1 on `#ffffff` | Form errors, out-of-stock notices, destructive buttons |
| `--accent` | `#f8cb46` | 7.30:1 with `--on-accent` | Discount badges, promotional highlights |
| `--accent-soft` | `#fff8e1` | 10.60:1 with `--on-accent` | Soft promo banners and offer highlights |
| `--on-accent` | `#4b3800` | 7.30:1 on `--accent` | Deep brown text on yellow surfaces (replaces 6 stray yellow/browns) |
| `--on-primary` | `#ffffff` | 4.90:1 on `--primary` | White text on primary green buttons and banners |
| `--map-land` | `#e8ebe5` | — | **TEMP (removed in Phase 4)**: Fake tracking map land background |
| `--map-road` | `#d7dbd4` | — | **TEMP (removed in Phase 4)**: Fake tracking map road stroke |

### 2.2 Typography Scale

Loaded via Google Fonts in [`src/styles/base.css`](file:///d:/ApnaMarket/src/styles/base.css) with `display=swap`: **Inter**, **Noto Sans Devanagari**, and **Noto Sans Kannada** (weights: 400, 500, 600, 700).

| Token | Size | Line Height | Weight | Rules & Usage |
|:---|:---|:---|:---|:---|
| `--fs-caption` | 12px | 16px (`--lh-caption`) | 400 / 600 | **Tertiary metadata only** (e.g. tax notices, image units). Never for prices, shops, or CTAs. |
| `--fs-label` | 13px | 18px (`--lh-label`) | 500 / 600 | Button text (sm), badges, ETA labels, filter chips, secondary CTAs |
| `--fs-body` | 14px | 20px (`--lh-body`) | 400 / 500 | Default body text, card titles, standard button text (md), input values |
| `--fs-heading` | 16px | 24px (`--lh-heading`) | 600 / 700 | Section headers, card section titles, bottom sheet headers |
| `--fs-title` | 20px | 28px (`--lh-title`) | 700 | Screen headers, product detail titles, empty state headings |
| `--fs-display` | 24px | 32px (`--lh-display`) | 700 | ETA display countdown, location gate hero title |

*Note: All arbitrary font sizes (e.g., 18px) have been mapped to the official type scale.*

### 2.3 Spacing (4px Grid), Radius, Elevation & Motion

- **Spacing Scale:** `--sp-1: 4px`, `--sp-2: 8px`, `--sp-3: 12px`, `--sp-4: 16px`, `--sp-5: 24px`, `--sp-6: 32px`. Screen side padding is strictly `--sp-4` (16px).
- **Radius Scale:** `--r-xs: 4px` (badges), `--r-sm: 8px` (inputs, small cards), `--r-md: 12px` (standard cards), `--r-lg: 16px` (sheets, large surfaces), `--r-pill: 999px` (chips, search bars).
- **Elevation:** Cards use a crisp `1px solid var(--border)`. Shadows are reserved exclusively for floating surfaces using `--shadow-float: 0 4px 16px rgba(28, 28, 28, 0.12)`.
- **Layout & Z-Index:**
  - `--app-max-w: 480px`, `--nav-h: 64px`, `--cart-bar-h: 56px`, `--bottom-stack-h: 76px` (dynamically updated)
  - Z-Index Scale: `--z-base: 0`, `--z-sticky: 10`, `--z-nav: 20`, `--z-cart-bar: 30`, `--z-fab: 40`, `--z-sheet: 50`, `--z-toast: 60`.
- **Motion:** `--dur-fast: 120ms`, `--dur-base: 200ms`, `--ease: cubic-bezier(0.2, 0, 0, 1)`, with non-essential animation disabled via `@media (prefers-reduced-motion: reduce)`.

---

## 3. WCAG 2.1 AA Contrast Compliance Report

Generated by [`scripts/check-contrast.mjs`](file:///d:/ApnaMarket/scripts/check-contrast.mjs) (`pnpm check:contrast`):

| Foreground Token | Background Token | Ratio | Required | Status | Role Tested |
|:---|:---|:---:|:---:|:---:|:---|
| `text` (`#1c1c1c`) | `background` (`#ffffff`) | **17.04:1** | $\ge$ 4.5:1 | **PASS** | Primary text on white canvas |
| `text` (`#1c1c1c`) | `surface` (`#f5f5f5`) | **15.63:1** | $\ge$ 4.5:1 | **PASS** | Primary text on neutral surface |
| `text` (`#1c1c1c`) | `primary10` (`#e7f3e9`) | **14.93:1** | $\ge$ 4.5:1 | **PASS** | Primary text on green tint background |
| `text` (`#1c1c1c`) | `accentSoft` (`#fff8e1`) | **16.04:1** | $\ge$ 4.5:1 | **PASS** | Primary text on soft accent banner |
| `text2` (`#666666`) | `background` (`#ffffff`) | **5.74:1** | $\ge$ 4.5:1 | **PASS** | Secondary text on white |
| `text2` (`#666666`) | `surface` (`#f5f5f5`) | **5.27:1** | $\ge$ 4.5:1 | **PASS** | Secondary text on neutral surface |
| `text2` (`#666666`) | `primary10` (`#e7f3e9`) | **5.03:1** | $\ge$ 4.5:1 | **PASS** | Secondary text on primary-10 tint |
| `onPrimary` (`#ffffff`) | `primary` (`#0c831f`) | **4.90:1** | $\ge$ 4.5:1 | **PASS** | Button text on primary green |
| `onPrimary` (`#ffffff`) | `primaryDark` (`#086b18`) | **6.72:1** | $\ge$ 4.5:1 | **PASS** | Button text on pressed green state |
| `mintOnDarkGreen` (`#d7f0dc`) | `primaryDark` (`#086b18`) | **5.56:1** | $\ge$ 4.5:1 | **PASS** | Mint accent text on primary dark green |
| `onAccent` (`#4b3800`) | `accent` (`#f8cb46`) | **7.30:1** | $\ge$ 4.5:1 | **PASS** | Brown text on yellow discount badge |
| `onAccent` (`#4b3800`) | `accentSoft` (`#fff8e1`) | **10.60:1** | $\ge$ 4.5:1 | **PASS** | Brown text on soft yellow banner |
| `error` (`#d3232f`) | `background` (`#ffffff`) | **5.18:1** | $\ge$ 4.5:1 | **PASS** | Error messaging on white canvas |
| `error` (`#d3232f`) | `surface` (`#f5f5f5`) | **4.75:1** | $\ge$ 4.5:1 | **PASS** | Error messaging on neutral surface |
| `success` (`#0e7a33`) | `background` (`#ffffff`) | **5.45:1** | $\ge$ 4.5:1 | **PASS** | Success text on white |
| `success` (`#0e7a33`) | `surface` (`#f5f5f5`) | **5.00:1** | $\ge$ 4.5:1 | **PASS** | Success text on neutral surface |
| `warning` (`#b45309`) | `background` (`#ffffff`) | **5.02:1** | $\ge$ 4.5:1 | **PASS** | Warning text on white |
| `text` (`#1c1c1c`) | `warningBg` (`#f5a623`) | **8.41:1** | $\ge$ 4.5:1 | **PASS** | Dark text on orange-yellow warning chip |
| `primary` (`#0c831f`) | `background` (`#ffffff`) | **4.90:1** | $\ge$ 4.5:1 | **PASS** | Primary green link/button text on white |
| `primaryDark` (`#086b18`) | `primary10` (`#e7f3e9`) | **5.88:1** | $\ge$ 4.5:1 | **PASS** | Primary dark text on primary-10 badge |
| `successIcon` (`#1fa84f`) | `background` (`#ffffff`) | **3.10:1** | $\ge$ 3.0:1 | **PASS** | Rating star icon on white (UI component standard) |

**Result:** 21/21 checks passed (0 failures).

---

## 4. Component Library Implementation (`src/components/ui/`)

| Component | Variants / Sizes | Supported States | Accessibility & Hit Target Features |
|:---|:---|:---|:---|
| [`Button`](file:///d:/ApnaMarket/src/components/ui/Button.tsx) | `primary`, `secondary` (outline), `ghost`, `destructive` · `md` (48px), `sm` (40px) | default, pressed, focus, disabled, loading | Stable width during loading spinner, `ui-btn-sm` features a `::after` expander guaranteeing $\ge$ 44px hit target |
| [`IconButton`](file:///d:/ApnaMarket/src/components/ui/IconButton.tsx) | `ghost`, `bordered` · standard | default, pressed, focus, disabled | Minimum 44×44px hit area enforced, required `aria-label` |
| [`Chip` / `Tab`](file:///d:/ApnaMarket/src/components/ui/Chip.tsx) | default with optional icon · 40px visual | default, active, disabled | Pseudo-element expander provides 44px hit area, `aria-pressed` / `role="tab"` |
| [`QuantityControl`](file:///d:/ApnaMarket/src/components/ui/QuantityControl.tsx) | ADD button, `- n +` stepper | ADD state (0), in-cart (1-9), max-reached (10), out-of-stock | Stepper buttons are 44×44px, adjacent button hit areas do not overlap, quantity updates announced via `aria-live="polite"` |
| [`Price`](file:///d:/ApnaMarket/src/components/ui/Price.tsx) | `sm` (13px), `md` (14px), `lg` (20px) | default, discounted | Strikethrough MRP and discount badge only display when real (`mrp > price`) |
| [`Badge`](file:///d:/ApnaMarket/src/components/ui/Badge.tsx) | `verified`, `discount`, `open`, `closed`, `closing-soon` | static semantic states | Semantic colors only (`--success`, `--error`, `--primary`, `--on-accent`) |
| [`Rating`](file:///d:/ApnaMarket/src/components/ui/Rating.tsx) | standard star + value + count | default | Uses filled 24px star (`--success-icon`), comprehensive `aria-label` |
| [`ProductImage`](file:///d:/ApnaMarket/src/components/ui/ProductImage.tsx) | 1:1 aspect ratio | loading, loaded | Fixed 1:1 aspect ratio, `--surface` background placeholder, lazy loading, Unsplash URL payload optimizer (`w=400&q=70&auto=format`) |
| [`ProductCard`](file:///d:/ApnaMarket/src/components/ui/ProductCard.tsx) | grid card | default, discounted, in-cart, out-of-stock | Out-of-stock items dimmed (0.65 opacity) with disabled ADD button, shop name always visible, buttons $\ge$ 44px |
| [`ShopCard`](file:///d:/ApnaMarket/src/components/ui/ShopCard.tsx) | `compact` (horizontal scroll), `stacked` (list) | open, closed | Displays name, verified badge, rating, distance, ETA, free-delivery threshold, open/closed status from `isShopOpen` |
| [`SearchBar`](file:///d:/ApnaMarket/src/components/ui/SearchBar.tsx) | standard (48px) | default, focused, with-query | Integrated search icon and 44×44px clear button when query is present |
| [`BottomNav`](file:///d:/ApnaMarket/src/components/ui/BottomNav.tsx) | 5 tabs: Home, Categories, Smart Basket, Cart, Account | default, active | Tap height 56px+ (64px standard), active tab signaled by colour AND filled icon + indicator bar, `aria-current="page"` |
| [`Sheet`](file:///d:/ApnaMarket/src/components/ui/Sheet.tsx) | bottom sheet | open, closing | Draggable handle, title, 44×44px close button, full keyboard focus trap, Escape key and backdrop dismissal, uses `--z-sheet` |
| [`Toast`](file:///d:/ApnaMarket/src/components/ui/Toast.tsx) | floating toast bar | visible | Floating elevation (`--shadow-float`), `--z-toast`, `role="status"` |
| [`EmptyState`](file:///d:/ApnaMarket/src/components/ui/EmptyState.tsx) | standard | default | Centered icon, heading, descriptive body, optional 48px CTA button |
| [`Skeleton`](file:///d:/ApnaMarket/src/components/ui/Skeleton.tsx) | `product-card`, `shop-card`, `rect`, `circle`, `text` | loading shimmer | Accessible (`aria-busy="true"`), smooth shimmer with `prefers-reduced-motion` static fallback |
| [`SectionHeader`](file:///d:/ApnaMarket/src/components/ui/SectionHeader.tsx) | standard | default, with-action | Heading + action button with 44px minimum tap target |

---

## 5. Icon Harmonization Audit (29 Inline Icons)

All 29 inline icons in [`src/icons/Icon.tsx`](file:///d:/ApnaMarket/src/icons/Icon.tsx) were normalized into a single, cohesive set:
- **ViewBox:** 24×24 (`viewBox="0 0 24 24"`)
- **Stroke Width:** Exactly `1.5px` (standardized from legacy 1.7px)
- **Stroke Caps & Joins:** `strokeLinecap="round"`, `strokeLinejoin="round"`
- **Colour:** Strictly `currentColor`
- **Fills:** `none` by default; supports optional `filled` prop for active navigation and rating star
- **Accessibility:** Default `aria-hidden="true"`; supports `aria-label` with `role="img"` for icon-only buttons
- **Cleaned Icons:** `home`, `grid`, `store`, `bag`, `user`, `pin`, `chevron`, `search`, `mic`, `clock`, `star`, `shield`, `heart`, `plus`, `minus`, `arrow`, `filter`, `sort`, `back`, `phone`, `help`, `check`, `card`, `cash`, `upi`, `bell`, `list`, `spark`, `close`.
- **Eliminated stray SVGs:** Replaced hardcoded inline SVG in [`src/components/ShopMap.tsx`](file:///d:/ApnaMarket/src/components/ShopMap.tsx) with `<Icon name="pin" size={20} />`.

---

## 6. Bottom-of-Screen Collision Resolution (`BottomStack`)

### Problem
Previously, when the cart contained items, the floating cart bar and the "Ask Apna" assistant FAB collided with the `BottomNav` and page content, obscuring interactive elements and overlapping buttons.

### Solution
Created [`src/components/BottomStack.tsx`](file:///d:/ApnaMarket/src/components/BottomStack.tsx):
1. **Vertical Stacking:** BottomNav is pinned to `bottom: 0` (64px + safe-area). When the cart has items, CartBar floats above BottomNav (`bottom: calc(var(--nav-h) + var(--safe-bottom) + 8px)`). The Assistant FAB floats strictly above the highest bottom element.
2. **Screen-Specific Rules:**
   - **Cart & Checkout Screens:** `BottomNav` is completely hidden; the primary screen CTA bar is pinned to the bottom with `--safe-bottom`. Assistant FAB is hidden so it never competes with the primary checkout conversion action.
   - **Product Details:** BottomNav is hidden; FAB sits comfortably above the sticky Add-to-Cart bar.
3. **Dynamic Padding:** The live stack height is exposed as `--bottom-stack-h` on `:root` and `.app-shell`, giving all scrollable page content matching bottom padding so no content is ever obscured.

---

## 7. Dev-Only Design System Gallery (`/design-system`)

Created [`src/screens/DesignSystemGallery.tsx`](file:///d:/ApnaMarket/src/screens/DesignSystemGallery.tsx), conditionally loaded only when `import.meta.env.DEV`:
- **Color Swatches & Contrast Table:** Live display of all 23 color tokens with computed hex values and WCAG compliance ratios.
- **Multilingual Typography Scale:** Full type scale preview rendered with real-world copy in **English**, **Hindi (Devanagari)**, and **Kannada**.
- **Interactive Component Playground:** Every UI component demonstrated in all supported states (active, pressed, disabled, loading, out-of-stock).
- **360px Frame Toggle:** Quick-switch button toggling between responsive full-width and 360px Android phone simulation.
- **Harmonized Icon Matrix:** All 29 icons displayed with names.

Captured gallery screenshots in [`audit/phase2-after/design-system/`](file:///d:/ApnaMarket/audit/phase2-after/design-system/):
1. `01_tokens_contrast.png` (Color tokens & WCAG table)
2. `02_typography_spacing.png` (Multilingual type scale & spacing grid)
3. `03_components.png` (Buttons, chips, quantity stepper, cards, and bottom nav)
4. `04_360_frame.png` (360px mobile preview mode)

---

## 8. Before & After Screen Audit (18 Baseline Comparison)

All 18 baseline journey screenshots in [`audit/phase2-before/`](file:///d:/ApnaMarket/audit/phase2-before/) were re-captured under identical conditions into [`audit/phase2-after/`](file:///d:/ApnaMarket/audit/phase2-after/):

| Screenshot | Screen & Journey Step | Intentional Visual Improvements | Unexpected Regressions |
|:---|:---|:---|:---|
| `01_location_gate.png` | Delivery location gate | Crisp 24px icons, standard `--r-md` radius, 68px/70px tap targets | None |
| `02_home.png` | Home screen (390×844) | Inter font loaded with swap, harmonized type scale (no 18px), white text on primary green banner (fixed mint contrast) | None |
| `03_home_360.png` | Home screen (360×800) | Flawless responsive layout on narrow 360px viewport, quick category buttons scale cleanly | None |
| `04_categories.png` | Categories list | 76px item tap targets, unified 1.5px stroke chevron icons | None |
| `05_shops.png` | Nearby shops directory | Filter chips use unified `--r-pill` and 44px hit areas, `ShopCard` includes verified badge & rating | None |
| `06_shop_details.png` | Shop details view | Verified badge, rating component, chip filters, unified 13px label typography | None |
| `07_shop_map.png` | Shop location map | OpenStreetMap embed with unified 20px pin icon, 44px direction link | None |
| `08_product_detail.png` | Product detail view | Optimized 1:1 image, large price display, rating star, sticky CTA bar sits cleanly at bottom | None |
| `09_search_initial.png` | Search empty state | Search input box with clear focus ring, 48px recent search rows | None |
| `10_search_results.png` | Search results for "milk" | Filter chips, unified product cards with shop names, zero token violations | None |
| `11_smart_basket_initial.png` | Smart basket list | 22px visual checkboxes with 44×44px hit targets, compare CTA meets 48px height | None |
| `12_smart_basket_compared.png` | Smart basket comparison | Verified comparison cards, accessible savings badge, 44px CTA buttons | None |
| `13_cart_multi_shop.png` | Multi-shop cart | Stepper buttons are 44×44px, shop groups use `--r-md`, bill breakdown uses 14px body | None |
| `14_checkout.png` | Checkout & payment | 72px payment option rows, radio indicators 22px, BottomNav hidden, checkout CTA pinned with `--safe-bottom` | None |
| `15_order_tracking.png` | Order tracking screen | Arriving ETA card uses accessible white text, status step icons unified, call button 44×44px | None |
| `16_account.png` | User profile & account | 68px menu tap targets, unified chevron and store icons | None |
| `17_ask_apna_assistant.png` | Assistant bottom sheet | Focus trap enabled, Escape key dismissal, 44×44px close icon button | None |
| `18_unavailable_screen.png` | Service unavailable gate | Accessible typography and 48px primary action button | None |

---

## 9. Decisions Made

1. **Mint on Green Contrast Resolution:**
   - Text using mint `#d7f0dc` on `--primary` (`#0c831f`) had a 4.06:1 contrast ratio (failing WCAG AA).
   - In accordance with the prompt specification, all 8 occurrences of mint text on `--primary` banners and buttons were replaced with `--on-primary` (`#ffffff`, 4.90:1).
   - `#d7f0dc` is reserved exclusively for `--primary-dark` (`#086b18`) where its contrast ratio is 5.56:1 (verified by contrast script).
2. **Yellow & Brown Accent Consolidation:**
   - Six stray yellow/brown literals (`#4b3800`, `#705500`, `#fff7d8`, `#654d00`, `#fff9e5`, `#f0dc9b`) were collapsed into three semantic tokens:
     - `--accent`: `#f8cb46`
     - `--accent-soft`: `#fff8e1`
     - `--on-accent`: `#4b3800`
   - Yields 7.30:1 on `--accent` and 10.60:1 on `--accent-soft` (both exceed WCAG AA 4.5:1).
3. **Small Button & Chip Hit Areas:**
   - Visually dense buttons (e.g. `ui-btn-sm`, `ui-chip`, `ui-add-btn`) maintain a compact 40px visual height for information density on mobile screens, but incorporate an absolute `::after` pseudo-element extending 2px above and below, guaranteeing a 44px tap target without layout distortion.
4. **BottomStack Architecture:**
   - Rather than relying on separate inline CSS calculations across components, `BottomStack` calculates live screen requirements and sets `--bottom-stack-h` dynamically on `:root`, guaranteeing synchronized bottom padding across all 13 screens.

---

## 10. Skipped or Deferred Items (Out of Scope for Phase 2)

- **Layout redesigns & copy changes:** Preserved existing screen structure and copy per Hard Rules.
- **Hero banner redesign:** Deferred to Phase 3.
- **Smart Basket arithmetic & multi-store optimization:** Kept existing mock arithmetic per scope boundary.
- **Fake tracking map OpenStreetMap integration:** Map road simulation preserved using `--map-land` and `--map-road`; full map integration deferred to Phase 4.
- **Closed shop ordering restrictions:** `ShopCard` now displays "Closed, opens h:mm", but blocking item additions from closed shops is deferred to Phase 3.

---

## 11. Known Issues & Non-Blocking Observations

- **Fake tracking map road rotations:** The road simulation on the tracking screen uses CSS transforms on static div elements. This is marked `TEMP, removed in Phase 4` when real map routes will be implemented.
- **Browser environment in CI/PowerShell:** PowerShell statement separators require `;` or `if ($?)` rather than bash `&&`. Automated npm scripts in `package.json` use standard node runners and execute cleanly across all platforms.

---

## 12. Verification Checklist

- [x] `pnpm check:tokens` passes (0 raw hex, font-size, border-radius, or z-index literals in `src/` outside `tokens.css`)
- [x] `pnpm check:contrast` passes (21/21 color pairs meet WCAG AA)
- [x] `pnpm typecheck` passes (0 TypeScript errors)
- [x] `pnpm lint` passes (0 ESLint errors, 0 warnings)
- [x] `pnpm build` passes (production bundle built in 707ms)
- [x] `node scripts/check-tap-targets.mjs` passes (29/29 interactive selectors $\ge$ 44×44px)
- [x] All 18 regression screenshots captured into `audit/phase2-after/`
- [x] Design system gallery screenshots captured into `audit/phase2-after/design-system/`
