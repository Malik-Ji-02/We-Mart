# ApnaMarket Phase 0: Discovery & Forensic Audit Report

**Date of Audit:** October 29, 2026  
**Auditor:** Senior Engineer & Product Designer  
**Repository:** `d:/ApnaMarket`  
**Status:** READ-ONLY Forensic Audit Completed  

---

## A. Stack and Setup

### 1. Technology Matrix
- **Runtime Environment:** Node.js `v24.20.0`, PNPM `10.33.3`, NPM `11.19.0` (tested on Windows).
- **Core Framework:** React 19 (`react` `^19.0.0` / installed `19.2.4`, `react-dom` `^19.0.0` / installed `19.2.4` in [package.json](file:///d:/ApnaMarket/package.json#L12-L15)).
- **Build Tooling:** Vite 8 (`vite` `^8.0.5` / installed `8.0.5`, `@vitejs/plugin-react` `^6.0.0` / installed `6.0.1` in [package.json](file:///d:/ApnaMarket/package.json#L20-L25)).
- **Language:** TypeScript 5.9.3 (`typescript` `^5.7.0` in [package.json](file:///d:/ApnaMarket/package.json#L24), configured via [tsconfig.json](file:///d:/ApnaMarket/tsconfig.json)).
- **Styling Pipeline:** Tailwind CSS v4 (`tailwindcss` `^4.0.0` / installed `4.2.2`, `@tailwindcss/vite` `^4.0.0` / installed `4.2.2` in [package.json](file:///d:/ApnaMarket/package.json#L21-L22) & [vite.config.ts](file:///d:/ApnaMarket/vite.config.ts#L3-L23)) together with 400 lines of custom CSS in [src/index.css](file:///d:/ApnaMarket/src/index.css).
- **UI & Icon Libraries:** No external UI component or icon libraries (e.g. Radix, Lucide, Heroicons) are installed. Icons are implemented entirely as an inline SVG pattern matching component inside [src/App.tsx:8-140](file:///d:/ApnaMarket/src/App.tsx#L8-L140).
- **Typography:** Inter imported from Google Fonts CDN (`https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap` in [src/index.css:1](file:///d:/ApnaMarket/src/index.css#L1)).
- **Routing:** No router package (`react-router-dom` or similar) is present. Navigation is handled via internal React state: `const [page, setPage] = useState<Page>("home")` in [src/App.tsx:401](file:///d:/ApnaMarket/src/App.tsx#L401).
- **State Management:** Local React component state (`useState`) concentrated in the root `App` component in [src/App.tsx:401-413](file:///d:/ApnaMarket/src/App.tsx#L401-L413). No Redux, Zustand, or React Context.
- **Code Formatter:** `oxfmt` `^0.2.0` in [package.json:10,23](file:///d:/ApnaMarket/package.json#L10-L23).

### 2. Missing Setup Files
- **Tailwind Config:** `tailwind.config.js` or `tailwind.config.ts` is **not found** (Tailwind v4 is wired through `@tailwindcss/vite`, but no design token configuration file exists).
- **Linter Config:** ESLint (`eslint.config.js` or `.eslintrc`) is **not found**.
- **Formatter Config:** `.prettierrc` or `.oxfmtrc` is **not found**.

### 3. Execution Verification
- **Install Command:** `pnpm install`  
  *Result:* Exited 0 in 12.4s. Added 43 packages without dependency resolution errors.
- **Dev Server Command:** `pnpm dev` (`vite`)  
  *Result:* Exited 0, ready in 962ms on `http://localhost:8443/`. Hot reload active.
- **TypeScript Check Command:** `pnpm tsc --noEmit`  
  *Result:* **Failed with Exit Code 1**. Found 3 syntax errors in [src/App.tsx](file:///d:/ApnaMarket/src/App.tsx) due to missing delimiters in type definitions:
  - `src/App.tsx(8,53): error TS1005: ';' expected.` (`{ name: IconName size?: number }`)
  - `src/App.tsx(1911,33): error TS1005: ';' expected.` (`{ icon: IconName page: Page label: string }`)
  - `src/App.tsx(1911,44): error TS1005: ';' expected.`

---

## B. File Structure

### 1. Folder Tree (3 Levels)
```
D:\ApnaMarket\
├── .figma/                     # Figma Make export metadata and lifecycle automation
│   ├── README.md               # Overview of Figma Make configuration files
│   └── make/                   # Lifecycle scripts (dev, build, preview, deploy)
│       ├── analyze-routes      # Route analysis hook
│       ├── deploy              # Deployment hook
│       ├── deploy-preview      # Preview deployment script
│       ├── dev                 # Local dev launch command
│       ├── dev.json            # Dev server port and proxy configuration
│       ├── format              # Formatting command definition
│       ├── install             # Dependency installation command
│       ├── langserver          # Language server configuration
│       └── site.json           # Document shell metadata (title, icons, lang)
├── audit/                      # Phase 0 discovery artifacts
│   ├── screenshots/            # 18 mobile audit captures across 390x844 and 360x800
│   ├── PHASE0_REPORT.md        # Comprehensive technical audit report
│   └── SHARE_WITH_CLAUDE.md    # Condensed chat summary under 2,500 words
├── public/                     # Static public web assets
│   └── favicon.svg             # SVG favicon with store glyph
├── src/                        # Core application source code
│   ├── App.tsx                 # Monolithic main application (state, logic, all screens)
│   ├── ShopMap.tsx             # Embed OpenStreetMap iframe for shop coordinates
│   ├── index.css               # Design system tokens, element resets, and component CSS
│   ├── main.tsx                # React DOM 19 application root entrypoint
│   ├── mobile.css              # Empty stub referencing index.css
│   └── vite-env.d.ts           # Vite client TypeScript ambient declarations
├── .gitattributes              # Git line ending attributes
├── .gitignore                  # Git untracked path specifications
├── .mise.toml                  # Mise toolchain version locks (Node 22, pnpm 10.34.3)
├── AGENTS.md                   # Project conventions and server configuration guide
├── CLAUDE.md                   # Reference pointer to AGENTS.md
├── index.html                  # HTML5 document shell with meta tags and root mount
├── package.json                # Project dependencies, devDependencies, and npm scripts
├── pnpm-lock.yaml              # PNPM deterministic dependency resolution tree
├── tsconfig.json               # TypeScript compiler target and module resolution config
└── vite.config.ts              # Vite server, plugins, alias, and Figma integration
```

### 2. The 10 Largest Files
| Rank | File Path | Total Lines | File Size (Bytes) | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [src/App.tsx](file:///d:/ApnaMarket/src/App.tsx) | 1,935 | 54,713 | Monolithic god-component containing all state, screens, and components |
| 2 | [pnpm-lock.yaml](file:///d:/ApnaMarket/pnpm-lock.yaml) | 907 | 29,458 | Dependency lockfile |
| 3 | [vite.config.ts](file:///d:/ApnaMarket/vite.config.ts) | 451 | 15,504 | Vite configuration and custom inline Figma Make plugins |
| 4 | [src/index.css](file:///d:/ApnaMarket/src/index.css) | 399 | 39,070 | Global CSS design tokens, layout styles, and component classes |
| 5 | [.gitattributes](file:///d:/ApnaMarket/.gitattributes) | 146 | 7,728 | Git attributes |
| 6 | [src/mobile.css](file:///d:/ApnaMarket/src/mobile.css) | 56 | 57 | Empty comment stub (`/* Mobile layout rules are consolidated... */`) |
| 7 | [AGENTS.md](file:///d:/ApnaMarket/AGENTS.md) | 43 | 2,798 | IDE development and styling instructions |
| 8 | [src/vite-env.d.ts](file:///d:/ApnaMarket/src/vite-env.d.ts) | 37 | 38 | Vite ambient types |
| 9 | [src/ShopMap.tsx](file:///d:/ApnaMarket/src/ShopMap.tsx) | 29 | 1,927 | OpenStreetMap iframe renderer for shop locations |
| 10 | [package.json](file:///d:/ApnaMarket/package.json) | 27 | 585 | NPM package manifest |

---

## C. Screens and Routes

| Screen Name | File & Lines | Route / Trigger | Main Subcomponents Rendered | Mock Data? |
| :--- | :--- | :--- | :--- | :--- |
| **Location Gate** | [src/App.tsx:1452-1562](file:///d:/ApnaMarket/src/App.tsx#L1452-L1562) | Startup modal when `serviceStatus === "prompt"` | `LocationSheet`, `CurrentLocationButton`, `SavedAddresses` | **Y** (`savedAddresses` in [App.tsx:1463](file:///d:/ApnaMarket/src/App.tsx#L1463)) |
| **Location Unavailable** | [src/App.tsx:1564-1607](file:///d:/ApnaMarket/src/App.tsx#L1564-L1607) | Full screen when `serviceStatus === "unavailable"` | `UnavailableScreen`, `CheckedLocation`, `PrimaryButton` | **Y** (Hardcoded Haryana check in [App.tsx:480](file:///d:/ApnaMarket/src/App.tsx#L480)) |
| **Home** | [src/App.tsx:756-858](file:///d:/ApnaMarket/src/App.tsx#L756-L858) | `page === "home"` (Default) | `Header` (delivery-row, search-bar), `QuickCategories`, `SmartBasketBanner`, `OfferBanner`, `SectionTitle`, `ShopCard` (compact), `ProductCard`, `CartBar`, `BottomNav`, `AssistantFab` | **Y** (`categories`, `shops`, `products`) |
| **Categories** | [src/App.tsx:860-883](file:///d:/ApnaMarket/src/App.tsx#L860-L883) | `page === "categories"` (Bottom Nav or See All) | `TitleRow`, `CategoryList`, `BottomNav`, `AssistantFab` | **Y** (`categories` in [App.tsx:262](file:///d:/ApnaMarket/src/App.tsx#L262)) |
| **Nearby Shops** | [src/App.tsx:885-908](file:///d:/ApnaMarket/src/App.tsx#L885-L908) | `page === "shops"` (Home "See all" shops) | `TitleRow`, `FilterChips`, `StackedShops` (`ShopCard`), `BottomNav`, `AssistantFab` | **Y** (`shops` in [App.tsx:160](file:///d:/ApnaMarket/src/App.tsx#L160)) |
| **Shop Details** | [src/App.tsx:910-997](file:///d:/ApnaMarket/src/App.tsx#L910-L997) | `page === "shop"` (Clicking any shop card) | `TitleRow`, `ShopHero`, `ShopMap` (toggle), `ShopOffer`, `CategoryTabs`, `ProductGrid` (`ProductCard`), `CartBar`, `AssistantFab` | **Y** (`shops`, `products`) |
| **Search & Discovery** | [src/App.tsx:999-1094](file:///d:/ApnaMarket/src/App.tsx#L999-L1094) | `page === "search"` (Search bar focus / icon) | `SearchBar`, `FilterChips`, `RecentSearches`, `StackedShops`, `ProductGrid`, `EmptyState`, `CartBar`, `AssistantFab` | **Y** (`products`, `shops`) |
| **Product Details** | [src/App.tsx:1096-1163](file:///d:/ApnaMarket/src/App.tsx#L1096-L1163) | `page === "product"` (Clicking product card) | `TitleRow`, `DetailImage`, `PriceSection`, `SellerCard`, `DetailInfo`, `DetailCta` (`QuantityControl`), `AssistantFab` | **Y** (`products`, `shops`) |
| **Smart Basket** | [src/App.tsx:1609-1766](file:///d:/ApnaMarket/src/App.tsx#L1609-L1766) | `page === "smart"` (Bottom Nav, Home banner, Assistant) | `TitleRow`, `SmartIntro`, `SmartList` (`SmartListItem`, compare-button), `ComparisonResults` (`BasketOption`), `BottomNav`, `AssistantFab` | **Y** (`products`, synthetic pricing math in [App.tsx:1625-1629](file:///d:/ApnaMarket/src/App.tsx#L1625-L1629)) |
| **Cart** | [src/App.tsx:1165-1283](file:///d:/ApnaMarket/src/App.tsx#L1165-L1283) | `page === "cart"` (Bottom Nav or floating CartBar) | `TitleRow`, `AddressCard`, `CartGroup` (`CartShop`, `CartItem`, `ShopSubtotal`), `BillCard`, `CheckoutButton`, `BottomNav` | **Y** (`cart`, `products`, `shops`) |
| **Checkout & Payment** | [src/App.tsx:1285-1372](file:///d:/ApnaMarket/src/App.tsx#L1285-L1372) | `page === "checkout"` ("Choose payment" on Cart) | `TitleRow`, `PaymentCard` (UPI, Card, Cash radio buttons), `SecureNote`, `BillCard` summary, `CheckoutButton` | **Y** (`payment`, `subtotal`, `deliveryFee`) |
| **Order Tracking** | [src/App.tsx:1374-1450](file:///d:/ApnaMarket/src/App.tsx#L1374-L1450) | `page === "tracking"` ("Place order" or "Your orders") | `TitleRow`, `EtaCard`, `TrackingMap` (CSS simulated map), `StatusCard` (timeline), `OrderContact`, `HelpButton` | **Y** (Hardcoded Order #AM2841, Sharma General Store) |
| **Account** | [src/App.tsx:1846-1900](file:///d:/ApnaMarket/src/App.tsx#L1846-L1900) | `page === "account"` (Bottom Nav) | `TitleRow`, `ProfileCard`, `AccountMenu`, `LocalImpactCard`, `BottomNav`, `AssistantFab` | **Y** (Hardcoded "Ananya Sharma", 54 orders) |
| **Assistant Sheet** | [src/App.tsx:1768-1844](file:///d:/ApnaMarket/src/App.tsx#L1768-L1844) | Bottom sheet modal ("Ask Apna" FAB) | `AssistantHeading`, `AssistantMessage`, `AssistantActions` (prompt chips), `AssistantInput` button | **Y** (Hardcoded prompts) |

---

## D. User Flows & Interaction Audit

### 1. The Core Customer Journey: Home to Placed Order
*Measured tap count: **5 taps** from cold launch.*
1. **Tap 1 (Location Selection):** Tap "Home · Sector 43, Gurugram, Haryana" on the initial `LocationGate` modal ([src/App.tsx:1535](file:///d:/ApnaMarket/src/App.tsx#L1535)). The modal dismisses and `HomeScreen` renders.
2. **Tap 2 (Item Selection):** On "Everyday essentials", tap "ADD" on *Amul Taaza Toned Milk* ([src/App.tsx:831](file:///d:/ApnaMarket/src/App.tsx#L831)). The button morphs into a quantity stepper (`1`), and a floating sticky `cart-bar` pops up at the bottom: `"₹28 · 1 local shop · View cart"`.
3. **Tap 3 (Open Cart):** Tap the floating `cart-bar` ([src/App.tsx:695](file:///d:/ApnaMarket/src/App.tsx#L695)). App smoothly navigates to `CartScreen` showing Sharma General Store with the item, shop subtotal ₹28, delivery fee FREE, and bill total ₹28.
4. **Tap 4 (Proceed to Payment):** Tap the fixed bottom button "Choose payment" ([src/App.tsx:1273](file:///d:/ApnaMarket/src/App.tsx#L1273)). App navigates to `CheckoutScreen`.
5. **Tap 5 (Place Order):** Tap the fixed bottom button "Place order · ₹28" ([src/App.tsx:1360](file:///d:/ApnaMarket/src/App.tsx#L1360)). Cart state is cleared (`setCart({})`), a toast appears `"Order placed successfully"`, and the app navigates to `TrackingScreen`.

### 2. Multi-Shop Cart Flow
1. Add *Amul Taaza Toned Milk* (₹28, Sharma General Store, delivery fee ₹0).
2. Navigate to *Fresh Basket* via "Shops" tab and add *Robusta Banana* (₹45, Fresh Basket, delivery fee ₹15).
3. The floating cart-bar reflects multi-shop state: `"₹73 · 2 local shops · View cart"`.
4. Inside `CartScreen`:
   - Items are rendered in distinct `<section className="cart-group">` cards per shop.
   - Group 1 (Sharma General Store): Subtotal ₹28, Delivery fee FREE.
   - Group 2 (Fresh Basket): Subtotal ₹45, Delivery fee ₹15.
   - Bill details correctly compute: Item total ₹73 + Delivery fees ₹15 = Total to pay ₹88.
5. In `CheckoutScreen`, the combined ₹88 total carries over accurately.
6. *Limitation / Flaw:* Upon placing the order, `TrackingScreen` only displays a single hardcoded shop ("Sharma General Store accepted your order") and completely drops the second shop!

### 3. Smart Basket Flow
1. Navigated via bottom nav "Smart Basket", Home banner, or "Ask Apna" prompt.
2. Shows a pre-selected checklist of 4 default grocery products.
3. User toggles checkboxes; total dynamically computes.
4. Tapping "Compare 4 items" reveals the comparison view:
   - **Option 1 (Recommended):** "Split between 2 local shops" (Sharma General Store + Fresh Basket) — ₹347.
   - **Option 2:** "Everything from one shop" (Sharma General Store) — ₹384 (Save ₹37).
5. *Interaction Bug:* Tapping "Add recommended basket" updates cart quantities and shows a toast `"Recommended basket added to your cart"`, but **does NOT navigate to the cart**. The user remains on the Smart Basket screen without visual confirmation other than the toast and the cart badge count.

### 4. Delivery vs. Visit Store Toggle
- **STATUS: NOT FOUND / DOES NOT EXIST.**
- There is no toggle, pill, or switch anywhere in the codebase for "Delivery vs Visit store".

### 5. Shop Map Flow
1. Home -> Tap *Sharma General Store* -> `ShopScreen`.
2. Tap "Shop information" ([src/App.tsx:951](file:///d:/ApnaMarket/src/App.tsx#L951)).
3. An OpenStreetMap `<iframe>` expands inline with a marker.
4. Tapping "Get directions ↗" opens Google Maps in a new browser tab with coordinates `12.9346, 77.6195` (Koramangala, Bengaluru).

### 6. Dead Ends and Buttons That Do Nothing
The codebase contains numerous non-functional interactive elements:
1. [src/App.tsx:540](file:///d:/ApnaMarket/src/App.tsx#L540): `<button className="address-button">` in the home header has **no `onClick` handler**. Users cannot change their address once selected.
2. [src/App.tsx:550](file:///d:/ApnaMarket/src/App.tsx#L550): `<button className="icon-button" aria-label="Notifications">` in the home header has **no `onClick` handler**.
3. [src/App.tsx:585](file:///d:/ApnaMarket/src/App.tsx#L585): `<Icon name="mic" />` inside the search bar is non-clickable decorative SVG.
4. [src/App.tsx:893-900](file:///d:/ApnaMarket/src/App.tsx#L893-L900): Filter chips in `ShopsScreen` ("Filters", "Under 30 min", "Free delivery", "Top rated") have **no `onClick` handlers**.
5. [src/App.tsx:973-976](file:///d:/ApnaMarket/src/App.tsx#L973-L976): Category tabs in `ShopScreen` ("All", "Best sellers", "Dairy", "Staples") have **no `onClick` handlers**.
6. [src/App.tsx:1022-1032](file:///d:/ApnaMarket/src/App.tsx#L1022-L1032): Filter chips in `SearchScreen` ("Filters", "Sort", "Under 30 min", "Offers") have **no `onClick` handlers**.
7. [src/App.tsx:1036-1044](file:///d:/ApnaMarket/src/App.tsx#L1036-L1044): Recent searches chips ("Milk", "Fresh Basket", "Atta 5 kg") have **no `onClick` handlers** and do not populate the search query.
8. [src/App.tsx:1202](file:///d:/ApnaMarket/src/App.tsx#L1202): `<button className="address-card">` in `CartScreen` has **no `onClick` handler**.
9. [src/App.tsx:1440](file:///d:/ApnaMarket/src/App.tsx#L1440): `<button aria-label="Call shop">` in `TrackingScreen` has **no `onClick` handler** or `tel:` anchor.
10. [src/App.tsx:1866-1889](file:///d:/ApnaMarket/src/App.tsx#L1866-L1889): In `AccountScreen`, "Saved addresses", "Favourites", and "Help and support" have **no `onClick` handlers**.

---

## E. Components Inventory

| Component | File & Lines | Where Used | Variants & States | Duplicate or Redundant Code? |
| :--- | :--- | :--- | :--- | :--- |
| **`Icon`** | [src/App.tsx:8-140](file:///d:/ApnaMarket/src/App.tsx#L8-L140) | Every screen and button | 29 icon types (`home`, `store`, `bag`, `spark`, etc.), custom `size` prop | Monolithic 130-line SVG switch; duplicates standard Lucide/Heroicon icon sets. |
| **`QuantityControl`** | [src/App.tsx:271-297](file:///d:/ApnaMarket/src/App.tsx#L271-L297) | `ProductCard`, `ProductScreen` (bottom CTA), `CartScreen` | 2 states: `ADD` button (when `value === 0`) vs Stepper (`-`, count, `+`) | Reused properly across product cards and cart items. |
| **`ProductCard`** | [src/App.tsx:299-337](file:///d:/ApnaMarket/src/App.tsx#L299-L337) | `HomeScreen`, `ShopScreen`, `SearchScreen` | Standard grid card with discount pill (`>=10%`), sold-by shop name, price/MRP, and stepper | No component duplicates, but contains nested interactive `<button>` elements (`product-photo` & `product-copy`). |
| **`ShopCard`** | [src/App.tsx:339-376](file:///d:/ApnaMarket/src/App.tsx#L339-L376) | `HomeScreen`, `ShopsScreen`, `SearchScreen` | `compact={true}` (horizontal scroller) vs `compact={false}` (vertical stacked) | Good reusability. |
| **`SectionTitle`** | [src/App.tsx:378-398](file:///d:/ApnaMarket/src/App.tsx#L378-L398) | `HomeScreen`, `SearchScreen` | Title with optional right action link (`action`, `onAction`) | Reused cleanly. |
| **`ShopMap`** | [src/ShopMap.tsx:7-29](file:///d:/ApnaMarket/src/ShopMap.tsx#L7-L29) | `ShopScreen` | OpenStreetMap iframe with hardcoded coordinates record | Standalone component; only handles 3 hardcoded shops. |
| **`Header` (Global)** | [src/App.tsx:536-588](file:///d:/ApnaMarket/src/App.tsx#L536-L588) | Top of `App` shell across all pages | 2 variants: Home delivery header (`delivery-row`) vs Detail title header (`title-row` with back button) | Inline JSX inside `App()`; `LocationGate` and `UnavailableScreen` duplicate separate brand headers. |
| **`BottomNav`** | [src/App.tsx:1902-1935](file:///d:/ApnaMarket/src/App.tsx#L1902-L1935) | Bottom of `App` shell | 5 tabs (`Home`, `Categories`, `Smart Basket`, `Cart`, `Account`) with badge count | Hidden on detail screens, but in `CartScreen` the fixed `checkout-button` renders right on top of it. |
| **`AssistantSheet`** | [src/App.tsx:1768-1844](file:///d:/ApnaMarket/src/App.tsx#L1768-L1844) | Overlay modal triggered by floating FAB | Bottom drawer sheet with prompt chips and search triggers | Custom modal; backdrop click closes it. |
| **`LocationGate`** | [src/App.tsx:1452-1562](file:///d:/ApnaMarket/src/App.tsx#L1452-L1562) | Startup modal overlay | Saved address buttons, GPS trigger button with checking state | Custom sheet overlay. |

---

## F. Design Tokens in Use

### 1. Color Inventory & Usage Breakdown
The application defines 14 CSS custom properties in `:root` ([src/index.css:4-22](file:///d:/ApnaMarket/src/index.css#L4-L22)), yet simultaneously uses **13 hardcoded hexadecimal values** directly in CSS declarations:

| Hex Value | Token / CSS Variable | Occurrences | Example Rule / File:Line | Role & Notes |
| :--- | :--- | :--- | :--- | :--- |
| `#0c831f` | `--primary` | 1 in `:root` + var refs | [src/index.css:5](file:///d:/ApnaMarket/src/index.css#L5) | Primary brand green (Blinkit-style) |
| `#086b18` | `--primary-dark` | 1 in `:root` + var refs | [src/index.css:6](file:///d:/ApnaMarket/src/index.css#L6) | Dark green for headings & active states |
| `#e7f3e9` | `--primary-10` | 1 in `:root` + var refs | [src/index.css:7](file:///d:/ApnaMarket/src/index.css#L7) | 10% tint green for backgrounds |
| `#cfe7d2` | `--primary-20` | 1 in `:root` + var refs | [src/index.css:8](file:///d:/ApnaMarket/src/index.css#L8) | 20% tint green for borders |
| `#f8cb46` | `--accent` | 1 in `:root` + var refs | [src/index.css:9](file:///d:/ApnaMarket/src/index.css#L9) | Yellow discount pill background |
| `#1c1c1c` | `--text` | 1 in `:root` + var refs | [src/index.css:10](file:///d:/ApnaMarket/src/index.css#L10) | Primary dark text |
| `#666666` | `--text-2` | 1 in `:root` + var refs | [src/index.css:11](file:///d:/ApnaMarket/src/index.css#L11) | Secondary body text |
| `#9a9a9a` | `--text-3` | 1 in `:root` + var refs | [src/index.css:12](file:///d:/ApnaMarket/src/index.css#L12) | Tertiary placeholder & strike-through text |
| `#ffffff` | `--background` | 1 in `:root` + var refs | [src/index.css:13](file:///d:/ApnaMarket/src/index.css#L13) | Pure white card & shell background |
| `#f5f5f5` | `--surface` | 1 in `:root` + var refs | [src/index.css:14](file:///d:/ApnaMarket/src/index.css#L14) | Gray screen background & image skeletons |
| `#e8e8e8` | `--border` | 1 in `:root` + var refs | [src/index.css:15](file:///d:/ApnaMarket/src/index.css#L15) | Standard divider & card border |
| `#1fa84f` | `--success` | 1 in `:root` + var refs | [src/index.css:16](file:///d:/ApnaMarket/src/index.css#L16) | Star rating stroke/fill |
| `#d77b00` | `--warning` | 1 in `:root` + var refs | [src/index.css:17](file:///d:/ApnaMarket/src/index.css#L17) | Unused token |
| `#e23744` | `--error` | 1 in `:root` + var refs | [src/index.css:18](file:///d:/ApnaMarket/src/index.css#L18) | Cart badge & error text |
| **`#d7f0dc`** | **HARDCODED** | **8 occurrences** | [src/index.css:60,62,195,211,213,257,259,362](file:///d:/ApnaMarket/src/index.css#L60) | Mint text on green banners (WCAG contrast fail) |
| **`#eeeeee`** | **HARDCODED** | **2 occurrences** | [src/index.css:26,27](file:///d:/ApnaMarket/src/index.css#L26-L27) | Desktop viewport backdrop |
| **`#4b3800`** | **HARDCODED** | **2 occurrences** | [src/index.css:94,140](file:///d:/ApnaMarket/src/index.css#L94) | Dark gold text on discount badges |
| **`#d8d8d8`** | **HARDCODED** | **2 occurrences** | [src/index.css:47,108](file:///d:/ApnaMarket/src/index.css#L47) | Search bar border, filter chip borders |
| **`#fff7d8`** | **HARDCODED** | **1 occurrence** | [src/index.css:89](file:///d:/ApnaMarket/src/index.css#L89) | Shop offer badge background |
| **`#705500`** | **HARDCODED** | **1 occurrence** | [src/index.css:89](file:///d:/ApnaMarket/src/index.css#L89) | Shop offer badge text |
| **`#654d00`** | **HARDCODED** | **1 occurrence** | [src/index.css:128](file:///d:/ApnaMarket/src/index.css#L128) | Shop hero offer strong text |
| **`#fff9e5`** | **HARDCODED** | **1 occurrence** | [src/index.css:126](file:///d:/ApnaMarket/src/index.css#L126) | Shop hero offer background |
| **`#f0dc9b`** | **HARDCODED** | **1 occurrence** | [src/index.css:126](file:///d:/ApnaMarket/src/index.css#L126) | Shop hero offer border |
| **`#e8ebe5`** | **HARDCODED** | **1 occurrence** | [src/index.css:214](file:///d:/ApnaMarket/src/index.css#L214) | Fake tracking map canvas background |
| **`#d7dbd4`** | **HARDCODED** | **1 occurrence** | [src/index.css:215](file:///d:/ApnaMarket/src/index.css#L215) | Fake tracking map road border |
| **`#f7fff8`** | **HARDCODED** | **1 occurrence** | [src/index.css:103](file:///d:/ApnaMarket/src/index.css#L103) | Add button background |
| **`#fff0f1`** | **HARDCODED** | **1 occurrence** | [src/index.css:332](file:///d:/ApnaMarket/src/index.css#L332) | Location error banner background |

*Near-Duplicate Color Analysis:*
- **3 near-duplicate yellow/brown text colors:** `#4b3800` vs `#705500` vs `#654d00` used across badges and offers.
- **2 near-duplicate pale yellow backgrounds:** `#fff7d8` vs `#fff9e5`.
- **4 near-duplicate border greys:** `--border` (`#e8e8e8`) vs `#d8d8d8` vs `#d7dbd4` vs `#eeeeee`.

### 2. Typography Tokens
- **Font Family:** `font-family: "Inter", sans-serif;` ([src/index.css:27](file:///d:/ApnaMarket/src/index.css#L27)).
- **Font Weights:** `400` (Regular), `600` (Semi-bold), `700` (Bold).
- **Font Sizes:**
  - `12px` (Massively overused across 50+ classes: `.shop-meta`, `.sold-by`, `.cart-item small`, `.status-step small`, nav labels).
  - `13px` (`.product-copy > strong`, `.shop-location-heading h3`, `.address-button strong`).
  - `14px` (`body`, `.search-bar input`, `.product-action strong`, `.shop-name > strong`).
  - `16px` (`.section-title h2`, `.bill-card h2`, `.payment-card h2`, `.status-card h2`).
  - `18px` (`.location-brand > strong`, `.detail-price strong`).
  - `20px` (`.title-row h1`, `.shop-hero h2`, `.smart-intro h2`, `.empty-state h2`).
  - `24px` (`.eta-card strong`, `.location-intro h1`, `.unavailable-screen h1`).

### 3. Spacing, Radii, and Shadows
- **Spacing:** No spacing scale or tokens. Hardcoded pixel margins and paddings: `2px`, `3px`, `4px`, `6px`, `7px`, `8px`, `10px`, `12px`, `14px`, `16px`, `18px`, `20px`, `24px`, `28px`, `72px`, `84px`, `104px`.
- **Corner Radii:**
  - `--r-sm`: `8px` ([src/index.css:19](file:///d:/ApnaMarket/src/index.css#L19))
  - `--r-lg`: `12px` ([src/index.css:20](file:///d:/ApnaMarket/src/index.css#L20))
  - Hardcoded `4px` ([src/index.css:89,140,301](file:///d:/ApnaMarket/src/index.css#L89))
  - Hardcoded `6px` ([src/index.css:94,272](file:///d:/ApnaMarket/src/index.css#L94))
  - Hardcoded `20px` ([src/index.css:293,316](file:///d:/ApnaMarket/src/index.css#L293))
  - Pills: `999px` and `50%`
- **Shadows:**
  - `--shadow`: `0 4px 16px rgba(28, 28, 28, 0.08)` ([src/index.css:21](file:///d:/ApnaMarket/src/index.css#L21))
  - Hardcoded: `0 4px 12px rgba(12, 131, 31, .24)` (Center nav button in [src/index.css:370](file:///d:/ApnaMarket/src/index.css#L370))
  - Hardcoded: `0 0 32px rgba(28, 28, 28, .12)` (Desktop shell container in [src/index.css:398](file:///d:/ApnaMarket/src/index.css#L398))

---

## G. Data and Content Audit

### 1. Mock Data Architecture
All mock data is hardcoded statically across two files:
- **Products & Shops:** [src/App.tsx:160-270](file:///d:/ApnaMarket/src/App.tsx#L160-L270)
  - `shops`: 3 items (*Sharma General Store*, *Fresh Basket*, *Iyengar's Bakery*).
  - `products`: 6 items (*Amul Taaza Toned Milk*, *Aashirvaad Shudh Chakki Atta*, *Robusta Banana*, *India Gate Basmati Rice*, *Fresh Milk Bread*, *Farm Fresh Tomato*).
  - `categories`: 6 items (*Fruits*, *Vegetables*, *Dairy*, *Staples*, *Bakery*, *Snacks*).
- **Map Locations:** [src/ShopMap.tsx:1-5](file:///d:/ApnaMarket/src/ShopMap.tsx#L1-L5)
  - 3 items (*Sharma General Store*, *Fresh Mart*, *Gupta Supermarket*).

### 2. Image Sources
- All images are hotlinked from `images.unsplash.com` with URL parameters like `?auto=format&fit=crop&w=500&q=80` ([src/App.tsx:142-158](file:///d:/ApnaMarket/src/App.tsx#L142-L158)).
- No local fallback images or WebP optimizations exist. If internet connectivity drops or Unsplash throttles requests, the entire catalogue renders blank boxes.

### 3. Copy & Marketing Filler
- Heavy generic marketing phrases:
  - `"Compare your full list, not just one item"` ([src/App.tsx:789](file:///d:/ApnaMarket/src/App.tsx#L789))
  - `"Your list. The best local value."` ([src/App.tsx:1648](file:///d:/ApnaMarket/src/App.tsx#L1648))
  - `"Your shortcut to smarter local shopping"` ([src/App.tsx:1790](file:///d:/ApnaMarket/src/App.tsx#L1790))
  - `"Local shops, coming closer to more communities."` ([src/App.tsx:1603](file:///d:/ApnaMarket/src/App.tsx#L1603))
  - `"54 local orders / You’ve supported neighbourhood businesses."` ([src/App.tsx:1894](file:///d:/ApnaMarket/src/App.tsx#L1894))

### 4. Backend Connection Blockers
1. **Lack of Entity IDs:** IDs are informal string slugs (`"milk"`, `"atta"`, `"sharma"`).
2. **Missing Normalization:** Shops and products have no foreign key relationships or variant structures (e.g. weights, sizes, brands).
3. **No State Persistence:** Refreshing the browser instantly wipes the cart and resets `serviceStatus` back to `"prompt"`, forcing the user to pick an address every single reload.
4. **Geographic Inconsistency Blocker:** The service area gate strictly enforces **Haryana coordinates** (`27.65 <= lat <= 30.92`, `74.45 <= lng <= 77.6` in [src/App.tsx:481-484](file:///d:/ApnaMarket/src/App.tsx#L481-L484)), whereas all shop map pins are situated in **Koramangala, Bengaluru** (`12.9346, 77.6195` in [src/ShopMap.tsx:2](file:///d:/ApnaMarket/src/ShopMap.tsx#L2))!

---

## H. Responsiveness and Accessibility

### 1. Viewport Testing (390x844 vs 360x800)
- **At 390x844 (iPhone 12/13/14):** Layout renders as intended within the `.app-shell` 480px frame. Sticky bottom elements crowd together (floating `cart-bar` at `bottom: 72px` and `assistant-fab` stacked at `bottom: 148px`).
- **At 360x800 (Low-end Android):**
  - Media query `@media (max-width: 370px)` in [src/index.css:385-395](file:///d:/ApnaMarket/src/index.css#L385-L395) slightly shrinks the quick category buttons from `52px` to `48px`, reduces product photo height from `142px` to `128px`, and cuts add-button width to `58px`.
  - Product grid cards shrink to ~156px width, forcing 2-line title wrapping and text clipping.
  - In `CartScreen`, the fixed checkout bar (`z-index: 45`) completely obscures the bottom navigation bar (`z-index: 40`), causing interactive collision.

### 2. Tap Targets Under 44x44px (WCAG 2.5.5 Failures)
- `.stepper`: height `36px`; individual stepper buttons are **`32px x 36px`** ([src/index.css:104-105](file:///d:/ApnaMarket/src/index.css#L104-L105)).
- `.add-button`: height **`36px`**, min-width `64px` ([src/index.css:103](file:///d:/ApnaMarket/src/index.css#L103)).
- `.filter-chips button`, `.category-tabs button`: height **`36px`** ([src/index.css:108](file:///d:/ApnaMarket/src/index.css#L108)).
- `.brand-mark`: **`36px x 36px`** ([src/index.css:43](file:///d:/ApnaMarket/src/index.css#L43)).
- `.status-step > span`: **`28px x 28px`** ([src/index.css:227](file:///d:/ApnaMarket/src/index.css#L227)).
- `.smart-check`: **`22px x 22px`** ([src/index.css:272](file:///d:/ApnaMarket/src/index.css#L272)).

### 3. Contrast Ratio Failures (WCAG 2.1 AA)
- `#d7f0dc` on `#0c831f` (Mint text on primary green banner in `.offer-banner small`, `.eta-card small`, `.checkout-button small`): **Contrast ratio is 3.8:1** (Fails WCAG AA 4.5:1 requirement for small text).
- `--text-3` (`#9a9a9a`) on `#ffffff` (Discount `<del>` text, search placeholder, radio circles): **Contrast ratio is 2.7:1** (Severe WCAG AA failure).

### 4. Accessibility & Semantics
- **Missing `alt` text:** Every single `<img>` tag in the product cards, shop cards, categories, cart items, and smart basket has `alt=""` ([src/App.tsx:777, 869, 931, 1236, 1679](file:///d:/ApnaMarket/src/App.tsx#L777)).
- **Missing Accessible Names:** `<button className="address-button">` has no `aria-label` or role description.
- **Search input:** Uses an unlinked icon within `<label className="search-bar">` without an `id` or accessible label.

---

## I. Performance Feel

- **Network Dependency Jank:** Loading all visual assets from external Unsplash servers creates noticeable initial latency and cumulative layout shifts (CLS) on slow 3G/4G cellular connections.
- **Heavy Iframe Overhead:** Embedding raw OpenStreetMap iframes in [src/ShopMap.tsx:21](file:///d:/ApnaMarket/src/ShopMap.tsx#L21) pulls external JS bundles and styles into the main mobile frame, stalling frame rates.
- **Monolithic Component Re-renders:** Because all application state is maintained in a single root component `App()` ([src/App.tsx:400](file:///d:/ApnaMarket/src/App.tsx#L400)), adding or removing a single item from the cart forces the entire DOM tree (including the sticky header, category scroll, and shop lists) to re-evaluate and re-render.

---

## J. "AI-Slop" Evidence

1. **Monolithic 1,935-line Single File:** [src/App.tsx](file:///d:/ApnaMarket/src/App.tsx) houses 13 separate screens, navigation routing, cart state, geolocation checkers, inline SVG icons, and mock data into one massive dump.
2. **Faux "AI" Smart Basket Arithmetic:** In [src/App.tsx:1625-1629](file:///d:/ApnaMarket/src/App.tsx#L1625-L1629), the "AI comparison engine" is literally fake math:
   ```typescript
   const splitTotal = Math.max(selectedTotal, Math.round(selectedTotal + 15 - Math.min(20, selectedTotal * 0.05)))
   const oneShopTotal = splitTotal + 37
   ```
   It does not compare prices, check shop inventories, or evaluate multi-store stock; it simply generates a fabricated ₹37 savings number.
3. **Absurd Shop Name Alias Hack:** In [src/App.tsx:959-965](file:///d:/ApnaMarket/src/App.tsx#L959-L965), to reconcile mismatching mock shop names between `shops` and `ShopMap.tsx`, the code uses an inline ternary hack:
   ```typescript
   name={
     shop.name === "Fresh Basket"
       ? "Fresh Mart"
       : shop.name === "Iyengar's Bakery"
         ? "Gupta Supermarket"
         : shop.name
   }
   ```
4. **Simulated CSS "Road Map":** In [src/index.css:214-221](file:///d:/ApnaMarket/src/index.css#L214-L221) and [src/App.tsx:1382-1392](file:///d:/ApnaMarket/src/App.tsx#L1382-L1392), the "Live Delivery Tracking" map is two rotated white CSS rectangles (`rotate(-18deg)` and `rotate(22deg)`) on a gray box with a pulsing green dot, pretending to be real-time GPS tracking.
5. **Array Concatenation Padding:** In [src/App.tsx:841-844](file:///d:/ApnaMarket/src/App.tsx#L841-L844), because the generator ran out of mock products, it padded the "Fresh from nearby sellers" section by slicing and appending duplicate items: `products.slice(4).concat(products[2])`.
6. **Dead Interactive Elements:** Over 10 buttons and filter chips across the app are styled as interactive controls with hover/active states, but contain zero `onClick` handlers or underlying logic.
7. **Phantom `mobile.css` File:** [src/mobile.css](file:///d:/ApnaMarket/src/mobile.css) is 56 blank lines with a single comment: `/* Mobile layout rules are consolidated in index.css. */`.
8. **Unused Tailwind CSS Installation:** `@tailwindcss/vite` and `tailwindcss` are installed in `package.json`, yet the code almost exclusively uses manual custom CSS classes in `index.css`. Tailwind is configured as dead overhead.
9. **Fake Geographic Geolocation Gate:** In [src/App.tsx:480-489](file:///d:/ApnaMarket/src/App.tsx#L480-L489), user geolocation is strictly bounded to Haryana, yet the shop map data in [src/ShopMap.tsx](file:///d:/ApnaMarket/src/ShopMap.tsx) points to Bangalore.

---

## K. Local-Shop Concept Check

| Screen | Shop Name on Items | Open / Closed Status | Verified Badge | Rating | Delivery Time / ETA | Distance | Cart Grouped by Shop | Per-Shop Delivery Fee |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Home** | **Yes** (`.sold-by`) | **No** (Not found) | **Yes** (On `ShopCard`) | **Yes** (`4.8`, `4.7`, `4.6`) | **Yes** (`18–25 min`, Header `20 min`) | **Yes** (`0.4 km`, `0.7 km`) | **Partial** (Cart bar says "N shops") | **Yes** (`₹15 delivery` / `Free`) |
| **Nearby Shops** | **N/A** (Only shops) | **No** (Not found) | **Yes** | **Yes** | **Yes** | **Yes** | **N/A** | **Yes** |
| **Shop Details** | **Yes** (Hero title) | **No** (Not found) | **Yes** (Hero badge) | **Yes** | **Yes** | **Yes** | **N/A** | **No** (Only min order) |
| **Product Details** | **Yes** ("Sold by...") | **No** (Not found) | **No** | **Yes** (In seller card) | **Yes** (In seller card) | **No** | **N/A** | **No** |
| **Search & Discovery**| **Yes** | **No** (Not found) | **Yes** (On shop results) | **Yes** | **Yes** | **Yes** | **N/A** | **Yes** (On shop results) |
| **Cart** | **Yes** (Group header)| **No** (Not found) | **Yes** (Shield icon) | **No** | **Yes** (In group header) | **Yes** (In group header) | **Yes** (`cart-group` per shop) | **Yes** (`₹15` / `FREE` per shop) |
| **Checkout** | **No** | **No** (Not found) | **Yes** (In secure note) | **No** | **Yes** (`20–30 min`) | **No** | **No** | **Partial** (Fee in total bill) |
| **Order Tracking** | **Yes** (`ORDER FROM`)| **No** (Not found) | **No** | **No** | **Yes** (`18–24 min`) | **No** | **No** (Hardcoded to 1 shop) | **No** |

---

## L. Code Health

### 1. TypeScript Syntax Errors
Running `pnpm tsc --noEmit` yields **3 syntax errors**:
- `src/App.tsx(8,53)`: `function Icon({ name, size = 20 }: { name: IconName size?: number })` -> missing delimiter between type properties.
- `src/App.tsx(1911,33)` & `(1911,44)`: `const items: { icon: IconName page: Page label: string }[]` -> missing delimiters between type properties.

### 2. Formatting & Linter Errors
- Running `pnpm run format` (`oxfmt`) fails on `node_modules` syntax because no ignore path is configured.
- No ESLint config exists in the repository.

### 3. Duplication and Oversized Modules
- [src/App.tsx](file:///d:/ApnaMarket/src/App.tsx) is 1,935 lines. All 13 application screens and 29 SVG paths are bundled into this single file.
- Bill total and delivery calculations are duplicated across `App()`, `CartScreen`, and `CheckoutScreen`.
- [src/index.css](file:///d:/ApnaMarket/src/index.css) contains 400 lines of manual CSS with 13 un-tokenized color hexes and no CSS modules.

---

## M. Summary & Recommendations

### 1. The 10 Strongest Things
1. **Clean Visual Baseline:** Attractive typography (Inter) and curated Blinkit-style green color palette (`#0c831f`) that feels pleasant on first glance.
2. **Accurate Per-Shop Cart Grouping:** The multi-shop cart concept is genuinely modeled, correctly separating items by shop and computing individual shop delivery fees.
3. **Instant Startup & Hot Reload:** Vite 8 and React 19 load and refresh changes in under a second.
4. **Zero Heavy External UI Dependencies:** Zero bulky component libraries (MUI, AntD, Chakra) to purge or decouple.
5. **Compact Customer Purchase Path:** Only 5 taps required from opening the app to placing an order.
6. **Detailed Product Card Specs:** Product cards correctly highlight local seller name, unit weight/volume, and MRP discounts.
7. **Semantic HTML Foundations:** Use of proper HTML elements (`<article>`, `<header>`, `<main>`, `<nav>`, `<button>`).
8. **Interactive Stepper Architecture:** Intuitive `ADD` button to stepper morphing across products, details, and cart.
9. **Responsive Mobile Shell:** Built-in `max-width: 480px` constraint with desktop centering.
10. **Rich Local Commerce Concepts:** Features like neighborhood shop maps, local impact counters, and smart basket bundling align directly with quick-commerce user needs.

### 2. The 10 Weakest Things
1. **Monolithic 1,935-Line God File:** Entire application is jammed into [src/App.tsx](file:///d:/ApnaMarket/src/App.tsx).
2. **Missing "Delivery vs. Visit Store" Toggle:** The promised core feature is completely absent from the code.
3. **Rampant Dead UI Elements:** Over 10 buttons, tabs, filters, and chips have no `onClick` handlers.
4. **Fake "AI" Smart Basket:** The smart basket calculation is purely dummy math (`splitTotal + 37`), not real optimization.
5. **Severe Geographic Disconnect:** Enforces Haryana geolocation while hardcoding shop pins in Bangalore.
6. **TypeScript Compilation Failures:** `tsc` fails with 3 syntax errors out of the box.
7. **Fake Tracking Map:** Tracking map is a simulated CSS drawing with two rotated white boxes instead of a real map.
8. **Broken Order Tracking for Multi-Shop Orders:** Multi-shop carts collapse into a single hardcoded shop upon checkout.
9. **Accessibility Violations:** Every single `<img>` tag lacks alt text, and interactive stepper buttons fail the 44px touch target standard.
10. **Hotlinked Unsplash Images:** Reliance on unoptimized external image URLs leads to mobile network lag and CLS.

### 3. Top 5 Architectural Risks for Rebuilding the UI
1. **State Entanglement in `App.tsx`:** Rewriting the UI requires completely extracting routing, cart state, location state, and modals into modular context/store providers before any screen refactoring can occur safely.
2. **Mobile Overlap Collisions:** Fixed-position elements (`cart-bar`, `assistant-fab`, `checkout-button`, `BottomNav`) have conflicting `z-index` and `bottom` coordinates that clash and obscure one another.
3. **Data Model Deficits:** Mock data lacks real database IDs, inventory status, shop open/close hours, and geographic distance math.
4. **Tailwind v4 vs. Custom CSS Mismatch:** Project currently has Tailwind v4 installed but styles everything with manual CSS classes in `index.css`. Deciding whether to migrate to pure Tailwind utility classes or maintain CSS modules is a pivotal architectural choice.
5. **Lack of Persistence & Error Boundaries:** Zero local storage caching and zero error boundaries mean any unhandled runtime glitch immediately wipes user state.

---

## Visual Audit Artifacts Index

All 18 mobile audit captures have been saved to `d:/ApnaMarket/audit/screenshots/`:
1. `01_location_gate.png` — Initial delivery location selection sheet modal.
2. `02_home.png` — Main home feed at 390x844 viewport.
3. `03_home_360.png` — Main home feed at 360x800 viewport.
4. `04_categories.png` — Category listing screen.
5. `05_shops.png` — Nearby shops directory with filter chips.
6. `06_shop_details.png` — Sharma General Store details and catalogue.
7. `07_shop_map.png` — Embedded OpenStreetMap iframe and directions button.
8. `08_product_detail.png` — Amul Taaza product detail screen with seller card.
9. `09_search_initial.png` — Search screen with recent search tags.
10. `10_search_results.png` — Search results for "milk" with filtered products.
11. `11_smart_basket_initial.png` — Smart basket checklist selection screen.
12. `12_smart_basket_compared.png` — Smart basket price comparison and multi-shop split recommendation.
13. `13_cart_multi_shop.png` — Multi-shop grouped cart (Sharma General Store + Fresh Basket).
14. `14_checkout.png` — Payment method selection screen.
15. `15_order_tracking.png` — Real-time order tracking with status timeline and CSS map.
16. `16_account.png` — User profile, order history entry, and local impact card.
17. `17_ask_apna_assistant.png` — "Ask Apna" AI shopping assistant bottom drawer.
18. `18_unavailable_screen.png` — Location unavailable blocker screen when selecting New Delhi.
