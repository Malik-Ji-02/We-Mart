# ApnaMarket Phase 3 Screen Redesign Report (Run Mode A: Steps 0–4)

**Date:** October 29, 2026  
**Branch:** `phase3-screens`  
**Run Mode:** Mode A (Steps 0–4: Launch Area, New Shared Pieces, Home, Shops & Shop Details, Search & Product Details)  
**Launch Area:** Koramangala, Bengaluru  
**Stack:** React 19, Vite 8, TypeScript 5.7, pnpm, plain CSS with Phase 2 Design Tokens  

---

## 1. Executive Summary & Git Commit Log

Phase 3 (Mode A) successfully redesigns the core discovery and browsing journey of ApnaMarket using the Phase 2 design system. The visual experience is now crisp, dense, breathable, and honest. Shop identity is clearly prioritized across all item displays with accessible shop avatar monograms, real ratings, ETAs, and verified status.

All changes strictly conform to WCAG 2.1 AA contrast requirements ($\ge$ 4.5:1), touch targets meet or exceed 44×44px, and zero hardcoded tokens exist outside `src/styles/tokens.css`.

### Git Commit Log (Mode A)

| Commit Hash | Step / Phase | Description |
|:---|:---|:---|
| `b124bf5` | Step 0 | feat(location): align service area and mock data to Koramangala Bengaluru launch area; remove Haryana checks |
| `2f6330b` | Step 1 | feat(components): implement Phase 3 shared pieces (`ShopAvatar`, `ProgressBar`, `StatusTimeline`, `BillRow`, `AddressRow`, `PaymentOption`, `StickyActionBar`) and accessible shop-tints |
| `4432ee2` | Step 2 | feat(home): redesign HomeScreen with compact header, search bar, shortcuts, slim banner, compact shop cards, and horizontal product rows |
| `e63e901` | Step 3 | feat(shops): redesign Shops and Shop Details with compact header, directions sheet, and closed state sorting |
| `e580b2a` | Step 4 | feat(search-product): redesign Search with debounced bar and Product Details with full-width image, seller card, and sticky CTA |
| `120b421` | Chore | chore(audit): expand `check:tap-targets` to cover all Phase 3 interactive elements |
| `f230ff4` | Refinement | refactor(home-search): tighten Home screen density for 390×844 fold visibility; remove duplicate search bar on `/search` |

---

## 2. Step 0: Launch Area Unification (Koramangala, Bengaluru)

- **Service Area Configuration:** Updated [`src/config/serviceArea.ts`](file:///d:/ApnaMarket/src/config/serviceArea.ts) to define `KORAMANGALA_SERVICE_AREA` with approximate mock bounds (`minLat: 12.915`, `maxLat: 12.955`, `minLng: 77.605`, `maxLng: 77.645`).
- **Mock Addresses Aligned:**
  - `Home`: 4th Block, Koramangala, Bengaluru (`lat: 12.9352, lng: 77.6245`) — within service area.
  - `Parents`: 5th Block, Koramangala, Bengaluru (`lat: 12.9340, lng: 77.6210`) — within service area.
  - `Work`: 100ft Road, Indiranagar, Bengaluru (`lat: 12.9716, lng: 77.6412`) — outside service area (triggers `UnavailableScreen`).
- **Complete Removal of Haryana References:** Removed hardcoded Gurugram/Haryana checks in `LocationGate.tsx`, `LocationContext.tsx`, `UnavailableScreen.tsx`, `AccountScreen.tsx`, and `user.ts`.
- **Shop Coordinates Marked:** All shops in [`src/data/shops.ts`](file:///d:/ApnaMarket/src/data/shops.ts) now feature Koramangala neighborhood addresses and explicit `// MOCK approximate coordinates` annotations.

---

## 3. Step 1: New Shared UI Components

Seven reusable shared components were constructed in `src/components/ui/` with typed interfaces and exported via `src/components/ui/index.ts`. All components are documented and visually verified in Section 14 of [`/design-system`](http://localhost:8443/design-system).

### 3.1 Component Specifications

| Component | File Path | Props & Variants | Touch Target / Density Role |
|:---|:---|:---|:---|
| **`ShopAvatar`** | [`src/components/ui/ShopAvatar.tsx`](file:///d:/ApnaMarket/src/components/ui/ShopAvatar.tsx) | `name`, `size?: "sm" \| "md" \| "lg"`, `tintIndex?: 1..6` | Deterministic 2-letter monogram on accessible soft tint (`--shop-tint-1` to `--shop-tint-6`). Sizes: 28px, 40px, 48px. |
| **`ProgressBar`** | [`src/components/ui/ProgressBar.tsx`](file:///d:/ApnaMarket/src/components/ui/ProgressBar.tsx) | `value: number`, `max: number`, `label?: string` | Accessible progress indicator (`role="progressbar"`) for free-delivery thresholds. |
| **`StatusTimeline`** | [`src/components/ui/StatusTimeline.tsx`](file:///d:/ApnaMarket/src/components/ui/StatusTimeline.tsx) | `steps: TimelineStep[]`, `currentStep: number` | 4-step vertical delivery stepper with checkmarks, active pulse, and pending states. |
| **`BillRow`** | [`src/components/ui/BillRow.tsx`](file:///d:/ApnaMarket/src/components/ui/BillRow.tsx) | `label`, `value`, `isTotal?`, `isDiscount?`, `helperText?` | Standardized key-value billing line item with rupee symbol formatting. |
| **`AddressRow`** | [`src/components/ui/AddressRow.tsx`](file:///d:/ApnaMarket/src/components/ui/AddressRow.tsx) | `title`, `address`, `selected`, `onSelect`, `tag?: "Home" \| "Work" \| "Other"` | 56px+ selectable address tile with custom radio indicator and location pin. |
| **`PaymentOption`** | [`src/components/ui/PaymentOption.tsx`](file:///d:/ApnaMarket/src/components/ui/PaymentOption.tsx) | `id`, `title`, `subtitle?`, `icon`, `selected`, `onSelect`, `badge?` | 56px+ payment selection row with radio button and clear non-color visual active state. |
| **`StickyActionBar`** | [`src/components/ui/StickyActionBar.tsx`](file:///d:/ApnaMarket/src/components/ui/StickyActionBar.tsx) | `primaryAction: { label, onClick, disabled?, loading? }`, `secondaryInfo?` | Pinned bottom action bar with safe area padding (`env(safe-area-inset-bottom)`), 48px primary button. |

---

## 4. Design Tokens & WCAG Contrast Audit

### 4.1 Token Additions (`src/styles/tokens.css`)

Per the prompt specification, six accessible shop avatar tints and corresponding text tokens were added:

```css
/* Accessible Shop Avatar Tints (WCAG AA >= 4.5:1) */
--shop-tint-1: #e8f5e9;
--on-shop-tint-1: #1b5e20; /* 5.97:1 PASS */
--shop-tint-2: #fff8e1;
--on-shop-tint-2: #5d4037; /* 8.15:1 PASS */
--shop-tint-3: #e1f5fe;
--on-shop-tint-3: #01579b; /* 6.59:1 PASS */
--shop-tint-4: #f3e5f5;
--on-shop-tint-4: #4a148c; /* 7.39:1 PASS */
--shop-tint-5: #fce4ec;
--on-shop-tint-5: #880e4f; /* 6.68:1 PASS */
--shop-tint-6: #e0f2f1;
--on-shop-tint-6: #004d40; /* 6.73:1 PASS */
```

### 4.2 WCAG 2.1 AA Contrast Compliance (27 / 27 PASS)

Verified automatically via `pnpm check:contrast` ([`scripts/check-contrast.mjs`](file:///d:/ApnaMarket/scripts/check-contrast.mjs)):

| Foreground | Background | Contrast Ratio | Minimum Required | Status | Role |
|:---|:---|:---:|:---:|:---:|:---|
| `text` (`#1c1c1c`) | `background` (`#ffffff`) | **17.04:1** | $\ge$ 4.5:1 | **PASS** | Primary text on white canvas |
| `text` (`#1c1c1c`) | `surface` (`#f5f5f5`) | **15.63:1** | $\ge$ 4.5:1 | **PASS** | Primary text on surface |
| `text` (`#1c1c1c`) | `primary10` (`#e7f3e9`) | **14.93:1** | $\ge$ 4.5:1 | **PASS** | Primary text on tint background |
| `text` (`#1c1c1c`) | `accentSoft` (`#fff8e1`) | **16.04:1** | $\ge$ 4.5:1 | **PASS** | Primary text on accent soft |
| `text2` (`#666666`) | `background` (`#ffffff`) | **5.74:1** | $\ge$ 4.5:1 | **PASS** | Secondary text on white |
| `text2` (`#666666`) | `surface` (`#f5f5f5`) | **5.27:1** | $\ge$ 4.5:1 | **PASS** | Secondary text on surface |
| `text2` (`#666666`) | `primary10` (`#e7f3e9`) | **5.03:1** | $\ge$ 4.5:1 | **PASS** | Secondary text on primary-10 |
| `onPrimary` (`#ffffff`) | `primary` (`#0c831f`) | **4.90:1** | $\ge$ 4.5:1 | **PASS** | On-primary on primary green |
| `onPrimary` (`#ffffff`) | `primaryDark` (`#086b18`) | **6.72:1** | $\ge$ 4.5:1 | **PASS** | On-primary on primary dark |
| `mintOnDarkGreen` (`#d7f0dc`) | `primaryDark` (`#086b18`) | **5.56:1** | $\ge$ 4.5:1 | **PASS** | Mint text on primary dark green |
| `onAccent` (`#4b3800`) | `accent` (`#f8cb46`) | **7.30:1** | $\ge$ 4.5:1 | **PASS** | On-accent on accent yellow |
| `onAccent` (`#4b3800`) | `accentSoft` (`#fff8e1`) | **10.60:1** | $\ge$ 4.5:1 | **PASS** | On-accent on accent soft |
| `error` (`#d3232f`) | `background` (`#ffffff`) | **5.18:1** | $\ge$ 4.5:1 | **PASS** | Error text on white |
| `error` (`#d3232f`) | `surface` (`#f5f5f5`) | **4.75:1** | $\ge$ 4.5:1 | **PASS** | Error text on surface |
| `success` (`#0e7a33`) | `background` (`#ffffff`) | **5.45:1** | $\ge$ 4.5:1 | **PASS** | Success text on white |
| `success` (`#0e7a33`) | `surface` (`#f5f5f5`) | **5.00:1** | $\ge$ 4.5:1 | **PASS** | Success text on surface |
| `warning` (`#b45309`) | `background` (`#ffffff`) | **5.02:1** | $\ge$ 4.5:1 | **PASS** | Warning text on white |
| `text` (`#1c1c1c`) | `warningBg` (`#f5a623`) | **8.41:1** | $\ge$ 4.5:1 | **PASS** | Dark text on warning chip |
| `primary` (`#0c831f`) | `background` (`#ffffff`) | **4.90:1** | $\ge$ 4.5:1 | **PASS** | Primary green button text on white |
| `primaryDark` (`#086b18`) | `primary10` (`#e7f3e9`) | **5.88:1** | $\ge$ 4.5:1 | **PASS** | Primary dark on primary-10 |
| `successIcon` (`#1fa84f`) | `background` (`#ffffff`) | **3.10:1** | $\ge$ 3:1 | **PASS** | Rating star icon on white (UI component) |
| `onShopTint1` (`#1b5e20`) | `shopTint1` (`#e8f5e9`) | **5.97:1** | $\ge$ 4.5:1 | **PASS** | Shop avatar tint 1 (green) |
| `onShopTint2` (`#5d4037`) | `shopTint2` (`#fff8e1`) | **8.15:1** | $\ge$ 4.5:1 | **PASS** | Shop avatar tint 2 (amber) |
| `onShopTint3` (`#01579b`) | `shopTint3` (`#e1f5fe`) | **6.59:1** | $\ge$ 4.5:1 | **PASS** | Shop avatar tint 3 (sky) |
| `onShopTint4` (`#4a148c`) | `shopTint4` (`#f3e5f5`) | **7.39:1** | $\ge$ 4.5:1 | **PASS** | Shop avatar tint 4 (purple) |
| `onShopTint5` (`#880e4f`) | `shopTint5` (`#fce4ec`) | **6.68:1** | $\ge$ 4.5:1 | **PASS** | Shop avatar tint 5 (rose) |
| `onShopTint6` (`#004d40`) | `shopTint6` (`#e0f2f1`) | **6.73:1** | $\ge$ 4.5:1 | **PASS** | Shop avatar tint 6 (teal) |

---

## 5. Screen Redesign Details (Steps 2–4)

### 5.1 Step 2: HomeScreen Redesign

- **Exact Top-to-Bottom Layout:**
  1. **Compact Header (~56px):** Single-line delivery location + 20 min ETA (`button.address-button-compact`), notification bell button (44×44px), and 44px account avatar. Tap opens the Location Gate bottom sheet.
  2. **Search Bar:** Input with search icon and placeholder *"Search milk, atta, snacks or local shops"*. Clicking transitions directly to `/search`.
  3. **Horizontal Category Shortcuts:** 6 category shortcut tiles (48×48px icon with rounded corners + label) with smooth snap scrolling.
  4. **Slim Promo Banner ($\le$ 128px tall):** 56px height primary green banner displaying the tagline *"Connecting you to neighbourhood shops"*, headline *"₹50 off at Sharma Store"*, and a 44px touch-target *"Shop now"* button. The oversized legacy hero is completely eliminated.
  5. **"Shops Near You":** Horizontal scroll of compact `ShopCard` items (96px photo, verified badge, rating, distance, free delivery status). Skeletons display while shops load.
  6. **Smart Basket Slim Row Card:** 48px slim single-row entry with sparkle icon, title, description *"Compare full list across local shops"*, and arrow affordance.
  7. **Purpose-Driven Product Rows:** Two horizontal scroll rows (*"Popular near you"* and *"Fresh today"*). Cards are ~144px wide, clearly displaying the selling shop's name, unit, price with strike-through MRP, and a 44px ADD/stepper button.
- **Above-the-Fold Target:** Total height of all elements above products is ~416px, guaranteeing that the first product row is 100% visible above the fold on 390×844 and 360×800 screens without requiring any scroll.

### 5.2 Step 3: Shops and Shop Details Redesign

- **Shops List Screen:**
  - Preserved filter chips (*"All"*, *"Near me"*, *"Top rated"*, *"Free delivery"*).
  - Open shops displayed first; closed shops sorted strictly to the bottom of the list.
  - Closed shops rendered with muted opacity, grayscale imagery, and a prominent badge: *"Opens at 9:00 AM"*.
- **Shop Details Screen:**
  - **Compact Header:** Back button, `ShopAvatar` monogram, shop name, verified badge, rating, distance, ETA, open hours, and free delivery threshold.
  - **Phone & Directions CTAs:** 44px touch targets. *"Call"* uses semantic `tel:` link; *"Directions"* triggers a bottom `Sheet`.
  - **Performance Optimization (Iframe Lazy Loading):** The OpenStreetMap iframe is no longer rendered on initial screen load. It is mounted exclusively inside the Directions `Sheet` when the user clicks *"Directions"*, eliminating wasteful network overhead and blocking.
  - **Sticky Category Tabs:** Horizontal scrollable category tabs stick beneath the header while scrolling.
  - **2-Column Product Grid:** Responsive 2-column layout with product photo, unit, name, shop attribution, price, and ADD button.
  - **Closed Shop Logic:** If the shop is closed, all ADD buttons are disabled with *"Opens at h:mm"*.
  - **Empty State:** `EmptyState` component displayed if a selected category contains no products.

### 5.3 Step 4: Search and Product Details Redesign

- **Search Screen:**
  - **Autofocused SearchBar:** 250ms debounced input to prevent laggy multi-render cycles.
  - **Initial State:** Displays recent search history chips (*"Milk"*, *"Fresh Basket"*, *"Atta 5 kg"*, *"Bread"*) and category shortcut tiles.
  - **Results State:** Filter chips (*"Under ₹30"*, *"Has offers"*, *"Price sort"*). Results are cleanly grouped into **"Shops"** (using `ShopCard`) and **"Products"** (using `ProductCard`).
  - **Empty State:** `EmptyState` with a helpful explanation, clear filters button, and 3 quick search suggestion chips.
  - **Header Cleanup:** Removed duplicate legacy search input from `AppHeader`, ensuring only the dedicated, debounced SearchBar is rendered.
- **Product Details Screen:**
  - **1:1 Full-Width Image:** Hero product photo with optional discount badge.
  - **Product Typography:** Category breadcrumb badge, product title, unit, and `Price` component with MRP and savings badge (rendered only when genuine discount exists).
  - **Seller Card:** Features `ShopAvatar`, shop name, verified badge, rating, distance, ETA, open status, and an explicit *"View shop"* action.
  - **Description & Trust Badges:** Plain description from product data (no invented marketing filler), plus authentic trust tags (*"Local kirana sourcing"*, *"Easy replacement at store"*).
  - **"More from this shop":** Horizontal product shelf highlighting additional catalog items from the same store.
  - **Sticky Action Bar:** Pinned above the safe area, presenting current item price and a 48px ADD CTA / Stepper. Disabled automatically if the item is out of stock or the shop is closed.

---

## 6. Tap-Target Size Audit (31 / 31 PASS)

All interactive elements meet the WCAG 2.5.5 / 2.5.8 minimum dimension of 44×44px, verified by `pnpm check:tap-targets`:

```
==========================================================================================
                      APNAMARKET TAP TARGET SIZE AUDIT                                    
==========================================================================================
| Interactive Selector           | Min Height |  Min Width | Status | Description               |
------------------------------------------------------------------------------------------
| button.address-button          |       44px |       44px | PASS   | Header location button    |
| button.icon-button             |       44px |       44px | PASS   | Circular 44x44 header icon buttons |
| label.search-bar / input       |       48px |       44px | PASS   | Search input box (48px height) |
| .quick-categories button       |       70px |       52px | PASS   | Categories with 52px image + label |
| .home-promo-banner button      |       44px |       80px | PASS   | Promo banner CTA button   |
| .home-smart-basket-banner      |       48px |       100% | PASS   | Slim single-row smart basket card |
| .section-title button          |       44px |       44px | PASS   | Section header action     |
| .shop-card                     |      150px |      274px | PASS   | Shop card button          |
| .product-photo                 |      142px |      100px | PASS   | Product card image button |
| .product-copy                  |       56px |      100px | PASS   | Product title button      |
| .ui-btn-md                     |       48px |       44px | PASS   | Primary/secondary medium button |
| .ui-btn-sm                     |       44px |       44px | PASS   | Small button (40px visual + 44px ::after hit area) |
| .ui-icon-btn                   |       44px |       44px | PASS   | Circular icon button      |
| .ui-chip                       |       44px |       44px | PASS   | Chip / Tab (40px visual + 44px ::after hit area) |
| .ui-add-btn                    |       44px |       68px | PASS   | ADD to cart button (40px visual + 44px ::after hit area) |
| .ui-stepper-btn                |       44px |       44px | PASS   | Stepper increment/decrement buttons (44x44px) |
| .sticky-action-bar button      |       48px |      120px | PASS   | Sticky action bar primary CTA |
| .address-row                   |       56px |       100% | PASS   | Address selection row     |
| .payment-option                |       56px |       100% | PASS   | Payment radio option row  |
| .shop-detail-action            |       44px |      100px | PASS   | Shop call and directions buttons |
| .search-suggest-chip           |       44px |       60px | PASS   | Search suggestion chips   |
| .smart-check                   |       44px |       44px | PASS   | Checkbox (22px visual + 44px ::after hit area) |
| .smart-list-item               |       72px |       100% | PASS   | Shopping list selectable item row |
| .compare-button                |       48px |       100% | PASS   | Smart basket compare CTA  |
| .bottom-nav button             |       56px |       48px | PASS   | Bottom navigation tabs (56px+ height) |
| .assistant-fab                 |       44px |       44px | PASS   | Floating action button (44px height) |
| .current-location-button       |       68px |       100% | PASS   | Device location permission button |
| .saved-addresses button        |       70px |       100% | PASS   | Saved address item button |
| .order-contact a               |       44px |       44px | PASS   | Call shop telephone button |
| .help-button                   |       48px |       100% | PASS   | Support assistance button |
| .account-menu button           |       68px |       100% | PASS   | Account settings row buttons |
==========================================================================================
Audit result: 31/31 interactive elements meet or exceed 44x44px. Zero exceptions.
```

---

## 7. Before vs. After Screenshot Catalog (Mode A)

Screenshots captured directly from the live application running on the Vite development server into `/audit/phase3-after/` comparing against `/audit/phase3-before/`:

| Screen | Phase 3 Before | Phase 3 After | Key Improvements |
|:---|:---|:---|:---|
| **01 Location Gate** | `01_location_gate.png` | `01_location_gate.png` | Koramangala addresses unified; Haryana check removed |
| **02 Home (390×844)** | `02_home.png` | `02_home.png` | Compact 56px header; slim 56px promo; product rows above fold |
| **03 Home (360×800)** | `03_home_360.png` | `03_home_360.png` | 360px viewport responsiveness; no text clipping or overlap |
| **05 Shops** | `05_shops.png` | `05_shops.png` | Closed shops sorted last with muted opacity and "Opens at 9:00 AM" |
| **06 Shop Details** | `06_shop_details.png` | `06_shop_details.png` | Compact header, `ShopAvatar`, 44px Call & Directions actions |
| **07 Directions Sheet** | `07_shop_map.png` | `07_shop_directions_sheet.png` | Map iframe moved behind sheet; loaded on demand only |
| **08 Product Detail** | `08_product_detail.png` | `08_product_detail.png` | 1:1 image, seller card with `ShopAvatar`, StickyActionBar CTA |
| **09 Search Initial** | `09_search_initial.png` | `09_search_initial.png` | Autofocused bar, recent searches, category tiles, no duplicate inputs |
| **10 Search Results** | `10_search_results.png` | `10_search_results.png` | Debounced typing, filter chips, grouped Shops and Products |
| **18 Unavailable** | `18_unavailable_screen.png` | `18_unavailable_screen.png` | Updated text: "Currently serving Koramangala, Bengaluru" |
| **Design Gallery** | `design-system/` | `design-system/phase3_components.png` | Section 14 showcasing all 7 Phase 3 shared components |

---

## 8. Deferred Items for Run Mode B (Steps 5–8)

In strict compliance with **RUN MODE: A**, the following steps are deferred to Run Mode B:
- **Step 5 (Categories & Cart):**
  - Categories: 3-column icon-tile grid screen redesign.
  - Cart: Multi-shop grouping with shop headers (`ShopAvatar`, name, ETA, open status), per-shop `ProgressBar` for free delivery, closed shop warning row with *"Remove items"*, Place order blocking logic, bill summary, and `AddressRow`.
- **Step 6 (Checkout):**
  - PaymentOption radio rows in order: UPI, Card, Cash on delivery. Collapsed order summary with always-visible total.
- **Step 7 (Order Tracking):**
  - Replacing simulated fake map with real route visualization and `StatusTimeline`.
- **Step 8 (Account):**
  - Profile header, saved addresses list with `AddressRow`, orders list.

---

## 9. Final Verification Checklist

- [x] **Tokens Audit (`pnpm check:tokens`):** 0 hardcoded colors, font-sizes, radii, or z-indices in `src/` outside `tokens.css`.
- [x] **Contrast Audit (`pnpm check:contrast`):** 27/27 pairs PASS (all $\ge$ 4.5:1 for text, $\ge$ 3:1 for graphical icons).
- [x] **Tap Target Audit (`pnpm check:tap-targets`):** 31/31 interactive selectors meet or exceed 44×44px.
- [x] **TypeScript Validation (`pnpm typecheck`):** 0 errors (`tsc --noEmit` clean).
- [x] **ESLint (`pnpm lint`):** 0 errors, 0 warnings.
- [x] **Production Bundle (`pnpm build`):** Succeeded in 659ms without warnings.
- [x] **Screenshots Captured:** All Mode A screens captured and verified in `/audit/phase3-after/`.
