# ApnaMarket Phase 1: Stabilisation & Architecture Report

**Phase:** Phase 1 — Stabilise (No Visual Changes)  
**Date:** October 29, 2026  
**Status:** Completed & Verified  
**Branch:** `phase1-stabilise`  
**Base Commit:** `0be519e` (`baseline: Figma Make export`)  
**Latest Commit:** `db85b7c` (`refactor: modularize architecture, react-router-dom, state contexts, and connect interactive elements`)  

---

## 1. Summary of Changes per Step

### Step 0: Safety Net
- Initialized clean Git version control repository.
- Captured 18 full reference screenshots at 390×844 (and 360×800) into `/audit/baseline/`.
- Committed baseline state as `0be519e: baseline: Figma Make export`.
- Branched off onto `phase1-stabilise`.

### Step 1: Fix TypeScript Errors
- **Commit:** `cb636f0` (`fix(types): resolve syntax errors and add typecheck script`)
- Fixed syntax errors in `src/App.tsx` near lines 8 and 1911 (missing property delimiters in inline type signatures).
- Added `"typecheck": "tsc --noEmit"` to `package.json`.
- Verified `pnpm typecheck` and `pnpm build` passed cleanly.

### Step 2: Split the God File
- Decomposed monolithic 1,935-line `src/App.tsx` into modular architectural directories:
  - `src/types/` — centralized entity and UI contracts.
  - `src/data/` — mock data and query access layer.
  - `src/icons/` — isolated SVG pattern dispatcher (`Icon.tsx`).
  - `src/config/` — service area bounds and pricing definitions.
  - `src/lib/` — formatting, discounts, and smart basket logic.
  - `src/state/` — focused React context providers.
  - `src/components/` — reusable presentational and layout components.
  - `src/screens/` — dedicated screen files for each page.
- Reduced `src/App.tsx` down to **130 lines** (well under the 150-line ceiling).
- Ensured zero code files exceed 200 lines. All existing CSS class names were kept 100% identical.

### Step 3: Real Routing
- Installed `react-router-dom` (`^7.18.5`).
- Replaced the hand-rolled `useState<Page>` switcher with real declarative client-side routes:
  - `/` -> `HomeScreen`
  - `/categories` -> `CategoriesScreen`
  - `/shops` -> `ShopsScreen`
  - `/shops/:shopId` -> `ShopDetailsScreen`
  - `/search` -> `SearchScreen`
  - `/product/:productId` -> `ProductDetailsScreen`
  - `/smart-basket` -> `SmartBasketScreen`
  - `/cart` -> `CartScreen`
  - `/checkout` -> `CheckoutScreen`
  - `/tracking` and `/tracking/:orderId` -> `TrackingScreen`
  - `/account` -> `AccountScreen`
- Added `<ScrollToTop />` component to reset viewport scroll smoothly upon page transitions.
- Deep links to specific products (e.g. `/product/prod_milk_amul_500ml`) and shops (e.g. `/shops/shop_sharma`) work natively.
- Browser forward/back buttons and URL bookmarking now function properly.

### Step 4: Separate State & Resilience
- **`LocationContext`:** Manages delivery address, service availability status (`prompt | checking | available | unavailable`), and device geolocation. Persisted to `localStorage`.
- **`CartContext`:** Manages cart items, quantities, multi-shop groupings, subtotals, per-shop delivery fees, and notification toasts. Persisted to `localStorage`. Mid-journey page reloads no longer clear the cart.
- **`OrderContext`:** Manages real placed order records, computing item breakdown and merchant details. Tracking receives authentic placed orders. Persisted to `localStorage`.
- **`UIContext`:** Coordinates mobile drawers (Assistant sheet, Location gate, and Coming Soon sheets).
- **`ErrorBoundary`:** Top-level React error boundary guarding the application shell, rendering an accessible fallback with a "Reload" action upon unexpected errors.

### Step 5: Dead Buttons & Honest Interactivity
- Every no-op button identified in the Phase 0 audit was made either fully functional or given an honest "Coming soon" modal sheet using existing styles.
- Connected filter toggles, category tabs, recent search tags, address triggers, and phone links. (See Table in Section 3).

### Step 6: Data Layer Normalization
- Assigned stable semantic string IDs to all entities (e.g. `shop_sharma`, `prod_milk_amul_500ml`).
- Added non-UI operational fields: `phone`, `lat`, `lng`, `address`, `opensAt`, `closesAt`, `inStock`, `stockCount`, and an `isShopOpen()` calculation helper.
- Eliminated the shop-name alias hack (`"Fresh Basket" -> "Fresh Mart" / "Gupta Supermarket"`) in `ShopMap`. Coordinates now bind directly to `shop.lat` and `shop.lng`.
- Eliminated product array slice-padding hacks (`products.slice(4).concat(products[2])`) by adding authentic mock fresh produce (`prod_apple_himachal_4pcs`).
- Encapsulated data behind query functions (`getShops()`, `getShopById()`, `getProductsByShop()`, `searchProducts()`).
- Extracted synthetic Smart Basket math into `src/lib/smartBasket.ts` with an explicit `TODO: replace with real price comparison algorithm` flag.

### Step 7: Centralized Configuration
- Created `src/config/serviceArea.ts` exporting bounding box coordinates for service eligibility.
- Created `src/config/pricing.ts` defining platform delivery rules and currency standards.
- Pointed `ShopMap` to shop entity data rather than hardcoded internal records.

### Step 8: Allowed Non-Visual Enhancements
- Added descriptive `alt` attributes to product and merchant images (`alt={product.name}`, `alt={shop.name}`).
- Added accessible `aria-label` tags to icon-only buttons (back, close, notifications, call, cart).
- Added `aria-current="page"` to active bottom navigation tabs.
- Added `loading="lazy"` across catalogue image elements.
- Deleted empty stub file `src/mobile.css` and removed its import from `src/main.tsx`.
- Configured ESLint flat config (`eslint.config.js`) and added `"lint": "eslint ."` script. All lint checks pass with 0 errors and 0 warnings.

---

## 2. New Folder Structure & Largest Files

### Three-Level Folder Tree
```
D:\ApnaMarket\
├── .figma/                     # Figma Make export scripts
│   ├── README.md
│   └── make/
├── audit/                      # Audit documentation and screenshots
│   ├── after/                  # Post-refactor verification screenshots (18 captures)
│   ├── baseline/               # Baseline reference screenshots (18 captures)
│   ├── screenshots/            # Initial audit screenshots
│   ├── PHASE0_REPORT.md        # Discovery & audit report
│   ├── PHASE1_REPORT.md        # Current Phase 1 stabilization report
│   └── SHARE_WITH_CLAUDE.md    # Condensed chat summary
├── public/                     # Static assets
│   └── favicon.svg
├── src/                        # Modular application code
│   ├── components/             # Reusable UI & layout components (13 files)
│   │   ├── AppHeader.tsx
│   │   ├── AssistantFab.tsx
│   │   ├── AssistantSheet.tsx
│   │   ├── BottomNav.tsx
│   │   ├── CartBar.tsx
│   │   ├── ComingSoonSheet.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── LocationGate.tsx
│   │   ├── ProductCard.tsx
│   │   ├── QuantityControl.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ShopCard.tsx
│   │   └── ShopMap.tsx
│   ├── config/                 # Platform configuration & rules (2 files)
│   │   ├── pricing.ts
│   │   └── serviceArea.ts
│   ├── data/                   # Normalized mock data & access layer (5 files)
│   │   ├── categories.ts
│   │   ├── index.ts
│   │   ├── products.ts
│   │   ├── shops.ts
│   │   └── user.ts
│   ├── icons/                  # SVG icon library (1 file)
│   │   └── Icon.tsx
│   ├── lib/                    # Shared utilities & calculators (3 files)
│   │   ├── format.ts
│   │   └── smartBasket.ts
│   ├── screens/                # Route screens (12 files)
│   │   ├── AccountScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── CategoriesScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ProductDetailsScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── ShopDetailsScreen.tsx
│   │   ├── ShopsScreen.tsx
│   │   ├── SmartBasketScreen.tsx
│   │   ├── TrackingScreen.tsx
│   │   └── UnavailableScreen.tsx
│   ├── state/                  # React Context providers & hooks (5 files)
│   │   ├── CartContext.tsx
│   │   ├── index.ts
│   │   ├── LocationContext.tsx
│   │   ├── OrderContext.tsx
│   │   └── UIContext.tsx
│   ├── types/                  # Centralized TypeScript definitions (1 file)
│   │   └── index.ts
│   ├── App.tsx                 # Core shell, router, and layout (130 lines)
│   ├── index.css               # Styling tokens and CSS classes (399 lines)
│   ├── main.tsx                # App root entrypoint (10 lines)
│   └── vite-env.d.ts           # Ambient type declarations
├── eslint.config.js            # ESLint flat configuration
├── index.html                  # HTML shell
├── package.json                # Dependencies and project scripts
├── pnpm-lock.yaml              # Lockfile
├── tsconfig.json               # TypeScript config
└── vite.config.ts              # Vite build setup
```

### 10 Largest Source Files (Excluding Dependencies & Lockfile)
| Rank | File Path | Lines | Size (Bytes) | Role |
| :--- | :--- | :---: | :---: | :--- |
| 1 | `vite.config.ts` | 451 | 15,504 | Vite build configuration & Figma Make plugins |
| 2 | `src/index.css` | 399 | 39,070 | Global CSS styles and design tokens |
| 3 | `src/state/CartContext.tsx` | 191 | 4,698 | Cart calculations, multi-shop groups, storage persistence |
| 4 | `src/screens/SearchScreen.tsx` | 184 | 5,889 | Search input, filter chips, recent search tags |
| 5 | `src/screens/SmartBasketScreen.tsx` | 181 | 5,751 | Checklist and multi-shop savings comparison screen |
| 6 | `.gitattributes` | 146 | 7,728 | Git line-ending configuration |
| 7 | `src/icons/Icon.tsx` | 138 | 3,363 | 29 inline SVG icon paths |
| 8 | `src/screens/CartScreen.tsx` | 131 | 3,745 | Cart view with per-shop groupings and bill details |
| 9 | `src/App.tsx` | 130 | 3,755 | Core application router and provider shell |
| 10 | `src/screens/TrackingScreen.tsx` | 129 | 3,936 | Real order tracking timeline and phone call link |

---

## 3. Previously Dead Elements & Current Behavior

| Element | Previous Location | What It Does Now | Status |
| :--- | :--- | :--- | :---: |
| **Header Address Button** | `src/App.tsx:540` | Opens `LocationGate` modal so user can change delivery location at any time. | **Working** |
| **Notification Bell** | `src/App.tsx:550` | Opens `ComingSoonSheet` explaining order notifications and deals are coming soon. | **Honest Sheet** |
| **Search Mic Icon** | `src/App.tsx:585` | Kept visually intact; marked `aria-hidden="true"` and non-interactive. | **Compliant** |
| **Shop Filter Chips** | `src/App.tsx:893-900` | Real filter toggles ("Under 30 min", "Free delivery", "Top rated") that filter shop cards with active styling. | **Working** |
| **Shop Category Tabs** | `src/App.tsx:973-976` | Real tabs ("All", "Best sellers", "Dairy", "Staples") that filter items in `ShopDetailsScreen`. | **Working** |
| **Search Filter Chips** | `src/App.tsx:1022-1032`| Filters search results by ETA, offers, and toggles price sorting (Low/High). | **Working** |
| **Recent Search Chips** | `src/App.tsx:1036-1044`| Clicking "Milk", "Fresh Basket", or "Atta 5 kg" immediately populates and runs that query. | **Working** |
| **Cart Address Card** | `src/App.tsx:1202` | Opens `LocationGate` modal to switch delivery address directly from Cart. | **Working** |
| **Tracking "Call Shop"** | `src/App.tsx:1440` | `<a>` link with `href="tel:{shop.phone}"` opening device dialer with the merchant's real phone. | **Working** |
| **Account Menu Items** | `src/App.tsx:1866-1889`| "Saved addresses", "Favourites", and "Help and support" open descriptive `ComingSoonSheet` modals. | **Honest Sheet** |

---

## 4. Architectural Decisions Made

1. **Routing Strategy:**
   - Client screens utilize `react-router-dom` URL paths (`/`, `/shops/:shopId`, `/product/:productId`, `/cart`, etc.) to support native back/forward browser navigation, page reloads, and deep links.
   - Transient modals (`LocationGate`, `AssistantSheet`, `ComingSoonSheet`) remain state-driven via dedicated React Contexts (`LocationContext`, `UIContext`), preventing route clutter while allowing seamless invocation from any screen.
2. **Persistence Storage Strategy:**
   - Both cart contents and chosen delivery location are synchronized to `localStorage` wrapped in protective `try/catch` blocks. If storage is blocked or quota exceeded, the app falls back gracefully to in-memory state without crashing.
3. **Data Access Normalization:**
   - All mock data access is wrapped in pure getter functions (`getShops()`, `getShopById()`, `getProductsByShop()`). This establishes an API boundary where an HTTP client (e.g. TanStack Query or Axios) can drop in later without touching UI screen code.
4. **Order Tracking Realism:**
   - When an order is placed, `OrderContext` captures the real items, quantities, and merchant contact information. The tracking screen directly renders the authentic placed order rather than dummy mock AM2841 data.
5. **Reverts:** None required. All refactoring steps compiled and built successfully on the first pass.

---

## 5. Visual Regression & Comparison Verification

- Verified against all 18 baseline captures stored in `/audit/baseline/`.
- Captured 18 after-refactor screenshots into `/audit/after/`.
- **Visual Differences Found:** **NONE.**
  - Layout geometry, colors, fonts, margins, paddings, borders, icons, and typography remain **100% identical** to the baseline.
  - Active states on previously dead filter chips and category tabs use pre-existing CSS rules (`.active` in `src/index.css:109`).
  - Placeholder sheets for unbuilt features utilize pre-existing drawer CSS (`.assistant-backdrop`, `.assistant-sheet`).

---

## 6. Known Issues and Deferred Items

The following items are intentionally deferred to Phases 2–4 per project rules:
1. **Simulated Smart Basket Engine:** `src/lib/smartBasket.ts` continues using the synthetic arithmetic formula (`splitTotal + 37`) pending real multi-merchant pricing optimization in Phase 4.
2. **Fake Delivery Tracking Canvas:** The delivery map continues rendering the CSS rotated white rectangles (`rotate(-18deg)`). Real map rendering (e.g. Mapbox / Leaflet) deferred to Phase 3.
3. **Regional Geolocation Disconnect:** Service area validation remains bounded to Haryana coordinates (`src/config/serviceArea.ts`), while demo shop coordinates remain in Koramangala, Bengaluru. Launch city alignment deferred to Phase 2/3.
4. **Touch Target Sizing:** Stepper buttons (`32×36px`) and category tabs (`36px` height) still violate the WCAG 44×44px touch guideline.
5. **Contrast Deficits:** Small mint text (`#d7f0dc`) on green banners (`3.8:1`) and placeholder text (`#9a9a9a`) on white (`2.7:1`) remain unchanged to avoid visual design edits in this phase.
6. **Mobile Fixed Element Stacking:** The fixed checkout bar (`z-index: 45`), floating cart bar (`z-index: 42`), assistant FAB, and bottom navigation continue to compete for bottom viewport space on small Android viewports.
7. **Tailwind CSS Utility Adoption:** `@tailwindcss/vite` remains installed while all styling continues in `src/index.css`. Migration to Tailwind utility classes deferred to Phase 2.

---

## 7. Commands to Run, Test, and Verify

```bash
# 1. Install dependencies
pnpm install

# 2. Run TypeScript strict typecheck (zero errors)
pnpm typecheck

# 3. Run ESLint code inspection (zero errors, zero warnings)
pnpm lint

# 4. Build production bundle (verified build in under 900ms)
pnpm build

# 5. Start development server
pnpm dev
```
