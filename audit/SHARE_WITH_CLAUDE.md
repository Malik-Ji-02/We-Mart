# ApnaMarket Phase 0: Forensic Audit Summary (For Claude)

**Audited Codebase:** `d:/ApnaMarket` (Figma Make React export)  
**Status:** Read-Only Audit Completed | Dev server runs on port 8443  

---

## 1. Stack & Runtime Status
- **Framework & Build:** React 19 (`19.2.4`), Vite 8 (`8.0.5`), TypeScript 5.9.3, `@tailwindcss/vite` 4.2.2.
- **Styling Architecture:** Tailwind CSS v4 installed, but virtually **unused in JSX**. 98% of styles are bespoke BEM-like CSS in `src/index.css` (400 lines).
- **Icons & UI Libs:** Zero external component or icon packages. 29 icons hand-coded as an inline SVG dispatcher in `src/App.tsx:8-140`.
- **Routing & State:** Hand-rolled state router (`const [page, setPage] = useState<Page>("home")` in `src/App.tsx:401`). All application state resides in a single root component `App()` (`src/App.tsx:400-754`).
- **Dev Server:** Runs cleanly on `http://localhost:8443/` via `pnpm dev`.
- **TypeScript Health:** `pnpm tsc --noEmit` **fails with 3 syntax errors** in `src/App.tsx`:
  - `src/App.tsx:8`: Missing delimiter in `{ name: IconName size?: number }`.
  - `src/App.tsx:1911`: Missing delimiters in `{ icon: IconName page: Page label: string }`.

---

## 2. Screens and Routing Inventory

| Screen | Source File & Lines | Trigger / Route | Main Components | Mock Data? |
| :--- | :--- | :--- | :--- | :--- |
| **Location Gate** | `src/App.tsx:1452` | Modal if `serviceStatus === "prompt"` | `LocationSheet`, `SavedAddresses` | Yes (Home, Parents, Work) |
| **Unavailable** | `src/App.tsx:1564` | `serviceStatus === "unavailable"` | `UnavailableScreen`, `CheckedLocation` | Yes (Hardcoded Haryana check) |
| **Home** | `src/App.tsx:756` | `page === "home"` (Default) | `QuickCategories`, `Banners`, `ProductGrid`, `ShopCard` | Yes (`categories`, `shops`, `products`) |
| **Categories** | `src/App.tsx:860` | `page === "categories"` | `CategoryList`, `BottomNav` | Yes (6 categories) |
| **Nearby Shops** | `src/App.tsx:885` | `page === "shops"` | `FilterChips`, `StackedShops` | Yes (3 shops) |
| **Shop Details** | `src/App.tsx:910` | `page === "shop"` | `ShopHero`, `ShopMap` (OSM iframe), `ProductGrid` | Yes |
| **Search** | `src/App.tsx:999` | `page === "search"` | `SearchBar`, `RecentSearches`, `ProductGrid` | Yes |
| **Product Details**| `src/App.tsx:1096`| `page === "product"` | `DetailImage`, `SellerCard`, `DetailCta` (Stepper) | Yes |
| **Smart Basket** | `src/App.tsx:1609`| `page === "smart"` | `SmartList`, `ComparisonResults` (`BasketOption`) | Yes (Synthetic math) |
| **Cart** | `src/App.tsx:1165`| `page === "cart"` | `CartGroup` (per shop), `BillCard`, `CheckoutButton` | Yes |
| **Checkout** | `src/App.tsx:1285`| `page === "checkout"` | `PaymentCard` (UPI/Card/Cash), `BillCard` | Yes |
| **Order Tracking**| `src/App.tsx:1374`| `page === "tracking"` | `EtaCard`, `TrackingMap` (CSS dummy), `StatusCard` | Yes (Hardcoded order AM2841) |
| **Account** | `src/App.tsx:1846`| `page === "account"` | `ProfileCard`, `AccountMenu`, `LocalImpact` | Yes ("Ananya Sharma", 54 orders) |
| **Assistant** | `src/App.tsx:1768`| Modal ("Ask Apna" FAB) | `AssistantHeading`, `AssistantActions` (prompt chips) | Yes |

---

## 3. Local-Shop Concept Check

| Screen | Shop on Items | Open/Closed | Verified | Rating | Delivery Time | Distance | Shop Grouped Cart | Per-Shop Fee |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Home** | **Yes** | **No** | **Yes** | **Yes** | **Yes** | **Yes** | **Partial** | **Yes** |
| **Nearby Shops** | **N/A** | **No** | **Yes** | **Yes** | **Yes** | **Yes** | **N/A** | **Yes** |
| **Shop Details** | **Yes** | **No** | **Yes** | **Yes** | **Yes** | **Yes** | **N/A** | **No** |
| **Product Details**| **Yes** | **No** | **No** | **Yes** | **Yes** | **No** | **N/A** | **No** |
| **Search** | **Yes** | **No** | **Yes** | **Yes** | **Yes** | **Yes** | **N/A** | **Yes** |
| **Cart** | **Yes** | **No** | **Yes** | **No** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Checkout** | **No** | **No** | **Yes** | **No** | **Yes** | **No** | **No** | **Partial** |
| **Tracking** | **Yes** | **No** | **No** | **No** | **Yes** | **No** | **No** (1 shop) | **No** |

---

## 4. Key Components Inventory

- **`ProductCard` (`src/App.tsx:299`):** Includes image, discount badge (`>=10%`), sold-by seller tag, price/MRP, and embedded `QuantityControl`.
- **`ShopCard` (`src/App.tsx:339`):** Supports `compact` variant for horizontal scroll vs stacked card. Displays ETA, badge, rating, distance, and free delivery threshold.
- **`QuantityControl` (`src/App.tsx:271`):** Dynamic morph between `ADD` button and `- [count] +` stepper. Used in cards, detail screens, and cart items.
- **`ShopMap` (`src/ShopMap.tsx:7`):** OpenStreetMap iframe wrapper with directions link to Google Maps.
- **`BottomNav` (`src/App.tsx:1902`):** 5-tab fixed navigation. Obscured in `CartScreen` by the fixed `checkout-button`.

---

## 5. Design Tokens Actually in Use

### Color Palette (Hex Inventory)
Defined in `:root` (`src/index.css:4-22`):
- Brand Primary: `--primary: #0c831f`, `--primary-dark: #086b18`, `--primary-10: #e7f3e9`, `--primary-20: #cfe7d2`
- Text: `--text: #1c1c1c`, `--text-2: #666666`, `--text-3: #9a9a9a`
- Surface: `--background: #ffffff`, `--surface: #f5f5f5`, `--border: #e8e8e8`
- Functional: `--accent: #f8cb46` (yellow), `--success: #1fa84f`, `--error: #e23744`

**Hardcoded Colors Found in CSS (Token Bypasses):**
- `#d7f0dc` (8x): Mint text on dark green (`src/index.css:60,195,211,257,362`) — **WCAG AA contrast failure (3.8:1)**.
- `#eeeeee` (2x): Viewport background (`src/index.css:26`).
- `#4b3800` (2x): Dark gold text on accent badge (`src/index.css:94,140`).
- `#d8d8d8` (2x): Un-tokenized borders (`src/index.css:47,108`).
- Arbitrary Yellows/Browns: `#705500` & `#fff7d8` (`src/index.css:89`), `#654d00`, `#fff9e5` & `#f0dc9b` (`src/index.css:126-128`).
- Fake Map Colors: `#e8ebe5` & `#d7dbd4` (`src/index.css:214-215`).

### Typography & Spacing
- **Font Family:** `"Inter", sans-serif` via Google Fonts.
- **Font Sizes:** `12px` (heavily overused on 50+ classes), `13px`, `14px`, `16px`, `18px`, `20px`, `24px`.
- **Radii:** `--r-sm: 8px`, `--r-lg: 12px`, with hardcoded `4px`, `6px`, `20px`, and `999px`.
- **Shadow:** `--shadow: 0 4px 16px rgba(28, 28, 28, 0.08)`.

---

## 6. Flow Problems, Dead Ends & "AI-Slop"

### Critical Missing Features
1. **"Delivery vs Visit Store" Toggle: NOT FOUND.** Does not exist anywhere in the project.
2. **Delivery Area & Map Disconnect:** Geolocation validation enforces **Haryana coordinates** (`src/App.tsx:480`), but shop locations in `src/ShopMap.tsx:1-5` are hardcoded to **Koramangala, Bengaluru**.
3. **Multi-Shop Tracking Collapse:** Multi-shop carts correctly compute separate shop fees in `CartScreen`, but checkout unconditionally reduces tracking to a single hardcoded shop ("Sharma General Store").

### Dead Interactive Elements (No-ops)
- `src/App.tsx:540`: `<button className="address-button">` in header has **no `onClick`**.
- `src/App.tsx:550`: Notification bell has **no `onClick`**.
- `src/App.tsx:585`: Search mic icon is non-functional SVG.
- `src/App.tsx:893-900`: Shop filter chips ("Under 30 min", "Free delivery", "Top rated") have **no `onClick`**.
- `src/App.tsx:973-976`: Shop category tabs ("All", "Best sellers", "Dairy", "Staples") have **no `onClick`**.
- `src/App.tsx:1022-1044`: Search filter chips and recent search tags have **no `onClick`**.
- `src/App.tsx:1440`: Order tracking "Call shop" button has **no handler or `tel:` link**.
- `src/App.tsx:1866-1889`: Account menu buttons ("Saved addresses", "Favourites", "Help") have **no `onClick`**.

### "AI-Slop" Evidence
- `src/App.tsx:1625`: Fake Smart Basket arithmetic: `splitTotal = Math.max(...)`, `oneShopTotal = splitTotal + 37`. Fabricated savings without real pricing logic.
- `src/App.tsx:959`: Shop name alias hack: `shop.name === "Fresh Basket" ? "Fresh Mart" : "Gupta Supermarket"`.
- `src/index.css:214`: Delivery map is two rotated white CSS rectangles simulating roads.
- `src/App.tsx:841`: Slicing and concatenating duplicate products (`products.slice(4).concat(products[2])`) to fake inventory depth.
- `src/mobile.css`: 56 blank lines with a 1-line comment.

---

## 7. Responsiveness & Accessibility Audit

- **Touch Targets Under 44px:**
  - Stepper buttons: `32px x 36px` (`src/index.css:104`).
  - Add button: `36px` height (`src/index.css:103`).
  - Filter and Category tabs: `36px` height (`src/index.css:108`).
  - Checklist checkboxes: `22px x 22px` (`src/index.css:272`).
- **Contrast Failures:** `#d7f0dc` on green (`3.8:1`) and `#9a9a9a` on white (`2.7:1`) fail WCAG AA.
- **Images:** Every single `<img>` tag in the catalogue has `alt=""`.
- **Viewport at 360x800:** Grid cards shrink to ~156px width, causing multi-line header wrapping; checkout bar obscures the bottom navigation bar.

---

## 8. Summary & Rebuild Priorities

### The 10 Strongest Foundations
1. Cohesive, pleasant visual direction (Inter font + Blinkit-inspired green palette).
2. Genuine multi-shop cart data modeling with per-shop delivery fees and subtotals.
3. Sub-second build and HMR speed with Vite 8 + React 19.
4. Zero bloated third-party UI framework dependencies.
5. 5-tap frictionless purchase journey from cold launch to placed order.
6. Product cards accurately represent unit metrics, MRP, and local merchant branding.
7. Clean semantic HTML foundations (`<article>`, `<header>`, `<main>`, `<nav>`).
8. Well-designed interactive stepper component (`QuantityControl`).
9. Mobile-first shell constrained to 480px with desktop centering.
10. Authentic hyperlocal feature concepts (shop verification, local impact counter).

### The 10 Weakest Deficits
1. Monolithic 1,935-line god file in `src/App.tsx`.
2. Total absence of the promised "Delivery vs Visit Store" toggle.
3. 10+ dead buttons, filters, and chips lacking interaction handlers.
4. Faux "AI" Smart Basket based on dummy constant math.
5. Severe regional disconnect (Haryana gate vs Bangalore map coordinates).
6. TypeScript compilation errors (`pnpm tsc` fails with 3 syntax errors).
7. Fake CSS rotated-rectangle tracking map.
8. Order tracking drops multi-shop orders down to 1 hardcoded shop.
9. Multiple WCAG 2.1 touch target and contrast violations.
10. Unoptimized Unsplash images causing bandwidth and layout shift issues.

### Top 5 Risks for Rebuilding
1. **State Spaghetti:** Routing, cart, modals, and geolocation are tightly coupled inside `App()`. Must be separated into modular contexts/stores before any UI work starts.
2. **Fixed Element Clashes:** Floating cart bars, assistant FAB, checkout buttons, and bottom nav collide across mobile viewports.
3. **Data Model Gaps:** Mock entities lack real UUIDs, store hours, stock indicators, and real distance metrics.
4. **Tailwind Migration Overhead:** Reconciling the unused Tailwind v4 installation with the existing 400 lines of custom CSS.
5. **No Persistence or Error Boundaries:** Page refreshes wipe state completely; any uncaught exception crashes the whole app.

---

## 9. Captured Audit Screenshots Index
All 18 mobile audit screenshots are stored in `/audit/screenshots/`:
- `01_location_gate.png`: Location selection modal
- `02_home.png`: Main feed (390x844)
- `03_home_360.png`: Main feed (360x800)
- `04_categories.png`: Category browser
- `05_shops.png`: Nearby shops directory
- `06_shop_details.png`: Sharma General Store view
- `07_shop_map.png`: OpenStreetMap embed
- `08_product_detail.png`: Product view with seller card
- `09_search_initial.png`: Search view with recent tags
- `10_search_results.png`: Filtered search results
- `11_smart_basket_initial.png`: Smart basket checklist
- `12_smart_basket_compared.png`: AI savings comparison
- `13_cart_multi_shop.png`: Multi-shop grouped cart
- `14_checkout.png`: Payment options
- `15_order_tracking.png`: Order tracking & status
- `16_account.png`: Profile & impact metrics
- `17_ask_apna_assistant.png`: Assistant bottom drawer
- `18_unavailable_screen.png`: Location blocker screen
