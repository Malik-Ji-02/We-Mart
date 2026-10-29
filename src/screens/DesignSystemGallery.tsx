import { useState } from "react"
import {
  Button,
  IconButton,
  Chip,
  QuantityControl,
  Price,
  Badge,
  Rating,
  ProductImage,
  ProductCard,
  ShopCard,
  SearchBar,
  BottomNav,
  Sheet,
  Toast,
  EmptyState,
  Skeleton,
  SectionHeader,
  ShopAvatar,
  ProgressBar,
  StatusTimeline,
  BillRow,
  AddressRow,
  PaymentOption,
} from "../components/ui"
import { Icon } from "../icons/Icon"
import { IconName, Product, Shop } from "../types"

const sampleProduct: Product = {
  id: "ds-prod-1",
  name: "Organic Farm Fresh Milk (A2 Cow)",
  unit: "500 ml",
  price: 38,
  mrp: 45,
  image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
  shop: "s1",
  category: "dairy",
  inStock: true,
  stockCount: 15,
}

const sampleOutOfStockProduct: Product = {
  ...sampleProduct,
  id: "ds-prod-2",
  name: "Artisan Sourdough Loaf",
  unit: "400 g",
  price: 120,
  mrp: 140,
  inStock: false,
  stockCount: 0,
}

const sampleShopOpen: Shop = {
  id: "ds-shop-1",
  name: "Ramesh Kirana & Daily Needs",
  type: "Kirana & Grocery",
  rating: 4.8,
  distance: "0.6 km",
  eta: "10-15 mins",
  fee: 0,
  min: 199,
  image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58",
  offer: "₹50 OFF on ₹299+",
  phone: "9876543210",
  lat: 12.9716,
  lng: 77.5946,
  address: "Shop 4, 1st Cross, Indiranagar",
  opensAt: "07:00",
  closesAt: "22:00",
}

const sampleShopClosed: Shop = {
  ...sampleShopOpen,
  id: "ds-shop-2",
  name: "Sri Krishna Organic Fruits",
  type: "Fresh Produce",
  rating: 4.6,
  distance: "1.2 km",
  eta: "20-25 mins",
  fee: 20,
  min: 149,
  opensAt: "06:30",
  closesAt: "08:00", // Will show closed during typical day
}

const colorTokens = [
  { name: "--primary", role: "Brand Primary Green" },
  { name: "--primary-dark", role: "Active / Pressed State" },
  { name: "--primary-10", role: "Tint Backgrounds & Badges" },
  { name: "--primary-20", role: "Accent Borders" },
  { name: "--text", role: "Primary Headings & Text" },
  { name: "--text-2", role: "Secondary / Metadata Text" },
  { name: "--text-disabled", role: "Disabled Controls Only" },
  { name: "--background", role: "Card & App Canvas" },
  { name: "--surface", role: "Subtle Surface & Image Plh" },
  { name: "--border", role: "Standard Borders" },
  { name: "--border-strong", role: "Inputs & Active Borders" },
  { name: "--viewport-bg", role: "Desktop Backdrop Only" },
  { name: "--success", role: "Success Text (5.45:1 AA)" },
  { name: "--success-icon", role: "Rating Star & UI Icons" },
  { name: "--warning", role: "Warning Text (5.02:1 AA)" },
  { name: "--warning-bg", role: "Warning Chip Background" },
  { name: "--error", role: "Error Text & Badges (5.18:1 AA)" },
  { name: "--accent", role: "Offer & Highlight Yellow" },
  { name: "--accent-soft", role: "Soft Banner Tint" },
  { name: "--on-accent", role: "High Contrast Text on Yellow" },
  { name: "--on-primary", role: "White Text on Primary" },
  { name: "--shop-tint-1", role: "Shop Avatar Tint 1 (Green)" },
  { name: "--shop-tint-2", role: "Shop Avatar Tint 2 (Amber)" },
  { name: "--shop-tint-3", role: "Shop Avatar Tint 3 (Sky)" },
  { name: "--shop-tint-4", role: "Shop Avatar Tint 4 (Purple)" },
  { name: "--shop-tint-5", role: "Shop Avatar Tint 5 (Rose)" },
  { name: "--shop-tint-6", role: "Shop Avatar Tint 6 (Teal)" },
  { name: "--map-land", role: "TEMP Fake Map Land" },
  { name: "--map-road", role: "TEMP Fake Map Road" },
]

const contrastPairs = [
  { fg: "--text", bg: "--background", ratio: "17.04:1", req: "4.5:1", role: "Primary text on white" },
  { fg: "--text", bg: "--surface", ratio: "15.63:1", req: "4.5:1", role: "Primary text on surface" },
  { fg: "--text-2", bg: "--background", ratio: "5.74:1", req: "4.5:1", role: "Secondary text on white" },
  { fg: "--text-2", bg: "--surface", ratio: "5.27:1", req: "4.5:1", role: "Secondary text on surface" },
  { fg: "--on-primary", bg: "--primary", ratio: "4.90:1", req: "4.5:1", role: "White text on green button" },
  { fg: "--on-primary", bg: "--primary-dark", ratio: "6.72:1", req: "4.5:1", role: "White text on pressed green" },
  { fg: "--on-accent", bg: "--accent", ratio: "7.30:1", req: "4.5:1", role: "Brown text on yellow badge" },
  { fg: "--on-accent", bg: "--accent-soft", ratio: "10.60:1", req: "4.5:1", role: "Brown text on soft yellow banner" },
  { fg: "--error", bg: "--background", ratio: "5.18:1", req: "4.5:1", role: "Error text on white" },
  { fg: "--success", bg: "--background", ratio: "5.45:1", req: "4.5:1", role: "Success text on white" },
  { fg: "--warning", bg: "--background", ratio: "5.02:1", req: "4.5:1", role: "Warning text on white" },
  { fg: "--success-icon", bg: "--background", ratio: "3.10:1", req: "3.0:1", role: "Rating star icon on white" },
  { fg: "--on-shop-tint-1", bg: "--shop-tint-1", ratio: "5.97:1", req: "4.5:1", role: "Shop avatar tint 1 (green)" },
  { fg: "--on-shop-tint-2", bg: "--shop-tint-2", ratio: "8.15:1", req: "4.5:1", role: "Shop avatar tint 2 (amber)" },
  { fg: "--on-shop-tint-3", bg: "--shop-tint-3", ratio: "6.59:1", req: "4.5:1", role: "Shop avatar tint 3 (sky)" },
  { fg: "--on-shop-tint-4", bg: "--shop-tint-4", ratio: "7.39:1", req: "4.5:1", role: "Shop avatar tint 4 (purple)" },
  { fg: "--on-shop-tint-5", bg: "--shop-tint-5", ratio: "6.68:1", req: "4.5:1", role: "Shop avatar tint 5 (rose)" },
  { fg: "--on-shop-tint-6", bg: "--shop-tint-6", ratio: "6.73:1", req: "4.5:1", role: "Shop avatar tint 6 (teal)" },
]

const iconList: IconName[] = [
  "home", "grid", "store", "bag", "user", "pin", "chevron", "search",
  "mic", "clock", "star", "shield", "heart", "plus", "minus", "arrow",
  "filter", "sort", "back", "phone", "help", "check", "card", "cash",
  "upi", "bell", "list", "spark", "close",
]

function getInitialTokenColors(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const styles = getComputedStyle(document.documentElement)
  const map: Record<string, string> = {}
  colorTokens.forEach((t) => {
    map[t.name] = styles.getPropertyValue(t.name).trim()
  })
  return map
}

export function DesignSystemGallery() {
  const [is360Frame, setIs360Frame] = useState(false)
  const [searchVal, setSearchVal] = useState("Fresh Mangoes")
  const [qty, setQty] = useState(2)
  const [chipActive, setChipActive] = useState("all")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("upi")
  const [computedColors] = useState<Record<string, string>>(getInitialTokenColors)

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: is360Frame ? 360 : "var(--app-max-w)",
        padding: "var(--sp-4)",
        background: "var(--background)",
        minHeight: "100vh",
        transition: "max-width var(--dur-base) var(--ease)",
      }}
    >
      {/* Top Banner & 360px Toggle */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          paddingBottom: "var(--sp-4)",
          marginBottom: "var(--sp-5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--sp-2)" }}>
          <div>
            <h1 style={{ fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)", fontWeight: "var(--fw-bold)" }}>
              ApnaMarket Design System
            </h1>
            <p style={{ color: "var(--text-2)", fontSize: "var(--fs-label)", marginTop: "var(--sp-1)" }}>
              Phase 2 Design System Gallery (Dev-Only)
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIs360Frame((prev) => !prev)}
            aria-label="Toggle 360px viewport preview"
          >
            {is360Frame ? "Reset Width" : "360px Frame"}
          </Button>
        </div>
      </div>

      {/* 1. Colour Tokens & Contrast */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="1. Colour Tokens" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "var(--sp-3)" }}>
          {colorTokens.map((t) => (
            <div
              key={t.name}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--r-sm)",
                padding: "var(--sp-2)",
                background: "var(--background)",
              }}
            >
              <div
                style={{
                  height: 36,
                  borderRadius: "var(--r-xs)",
                  backgroundColor: `var(${t.name})`,
                  border: "1px solid var(--border)",
                  marginBottom: "var(--sp-2)",
                }}
              />
              <strong style={{ display: "block", fontSize: "var(--fs-caption)", lineHeight: "var(--lh-caption)" }}>
                {t.name}
              </strong>
              <small style={{ display: "block", color: "var(--text-2)", fontSize: "var(--fs-caption)" }}>
                {computedColors[t.name] || t.role}
              </small>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "var(--sp-4)", overflowX: "auto" }}>
          <h3 style={{ fontSize: "var(--fs-heading)", marginBottom: "var(--sp-2)" }}>
            WCAG 2.1 AA Contrast Compliance Matrix
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--fs-caption)", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-strong)" }}>
                <th style={{ padding: "var(--sp-2)" }}>Foreground</th>
                <th style={{ padding: "var(--sp-2)" }}>Background</th>
                <th style={{ padding: "var(--sp-2)" }}>Ratio</th>
                <th style={{ padding: "var(--sp-2)" }}>Required</th>
                <th style={{ padding: "var(--sp-2)" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {contrastPairs.map((cp, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "var(--sp-2)" }}>{cp.fg}</td>
                  <td style={{ padding: "var(--sp-2)" }}>{cp.bg}</td>
                  <td style={{ padding: "var(--sp-2)", fontWeight: "var(--fw-bold)" }}>{cp.ratio}</td>
                  <td style={{ padding: "var(--sp-2)" }}>{cp.req}</td>
                  <td style={{ padding: "var(--sp-2)", color: "var(--success)", fontWeight: "var(--fw-bold)" }}>PASS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="2. Typography Scale (Inter + Devanagari + Kannada)" />
        <div style={{ display: "grid", gap: "var(--sp-4)" }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "var(--sp-3)" }}>
            <small style={{ color: "var(--text-2)", fontSize: "var(--fs-caption)" }}>
              --fs-display (24px / 32px line-height, bold)
            </small>
            <div style={{ fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)", fontWeight: "var(--fw-bold)" }}>
              ApnaMarket Neighbourhood Stores
            </div>
            <div style={{ fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)", fontWeight: "var(--fw-bold)" }}>
              अपनामार्केट पड़ोस की दुकानें
            </div>
            <div style={{ fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)", fontWeight: "var(--fw-bold)" }}>
              ಅಪ್ನಾಮಾರ್ಕೆಟ್ ನೆರೆಹೊರೆಯ ಅಂಗಡಿಗಳು
            </div>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "var(--sp-3)" }}>
            <small style={{ color: "var(--text-2)", fontSize: "var(--fs-caption)" }}>
              --fs-title (20px / 28px line-height, bold)
            </small>
            <div style={{ fontSize: "var(--fs-title)", lineHeight: "var(--lh-title)", fontWeight: "var(--fw-bold)" }}>
              Fresh Mangoes in 12 Mins
            </div>
            <div style={{ fontSize: "var(--fs-title)", lineHeight: "var(--lh-title)", fontWeight: "var(--fw-bold)" }}>
              12 मिनट में ताज़ा आम
            </div>
            <div style={{ fontSize: "var(--fs-title)", lineHeight: "var(--lh-title)", fontWeight: "var(--fw-bold)" }}>
              12 ನಿಮಿಷಗಳಲ್ಲಿ ತಾಜಾ ಮಾವಿನಹಣ್ಣು
            </div>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "var(--sp-3)" }}>
            <small style={{ color: "var(--text-2)", fontSize: "var(--fs-caption)" }}>
              --fs-heading (16px / 24px line-height, semibold)
            </small>
            <div style={{ fontSize: "var(--fs-heading)", lineHeight: "var(--lh-heading)", fontWeight: "var(--fw-semibold)" }}>
              Order Summary & Delivery Address
            </div>
            <div style={{ fontSize: "var(--fs-heading)", lineHeight: "var(--lh-heading)", fontWeight: "var(--fw-semibold)" }}>
              ऑर्डर विवरण और डिलीवरी का पता
            </div>
            <div style={{ fontSize: "var(--fs-heading)", lineHeight: "var(--lh-heading)", fontWeight: "var(--fw-semibold)" }}>
              ಆರ್ಡರ್ ವಿವರಗಳು ಮತ್ತು ವಿಳಾಸ
            </div>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "var(--sp-3)" }}>
            <small style={{ color: "var(--text-2)", fontSize: "var(--fs-caption)" }}>
              --fs-body (14px / 20px line-height, regular & medium)
            </small>
            <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              Supporting your local kirana stores with instant delivery and zero dark store markup.
            </div>
            <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              अपने स्थानीय किराना स्टोर से तुरंत डिलीवरी पाएं और मोहल्ले की दुकानों का समर्थन करें।
            </div>
            <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
              ನಿಮ್ಮ ಸ್ಥಳೀಯ ಕಿರಾಣಿ ಅಂಗಡಿಗಳಿಂದ ತಕ್ಷಣದ ವಿತರಣೆ ಪಡೆಯಿರಿ.
            </div>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "var(--sp-3)" }}>
            <small style={{ color: "var(--text-2)", fontSize: "var(--fs-caption)" }}>
              --fs-label (13px / 18px line-height, medium)
            </small>
            <div style={{ fontSize: "var(--fs-label)", lineHeight: "var(--lh-label)", fontWeight: "var(--fw-medium)" }}>
              Free delivery over ₹199 · Delivery in 15 mins
            </div>
            <div style={{ fontSize: "var(--fs-label)", lineHeight: "var(--lh-label)", fontWeight: "var(--fw-medium)" }}>
              ₹199 से अधिक पर मुफ्त डिलीवरी · 15 मिनट में
            </div>
            <div style={{ fontSize: "var(--fs-label)", lineHeight: "var(--lh-label)", fontWeight: "var(--fw-medium)" }}>
              ₹199 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಉಚಿತ ವಿತರಣೆ · 15 ನಿಮಿಷಗಳಲ್ಲಿ
            </div>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "var(--sp-3)" }}>
            <small style={{ color: "var(--text-2)", fontSize: "var(--fs-caption)" }}>
              --fs-caption (12px / 16px line-height, tertiary metadata only)
            </small>
            <div style={{ fontSize: "var(--fs-caption)", lineHeight: "var(--lh-caption)", color: "var(--text-2)" }}>
              Prices inclusive of all taxes · 500 ml
            </div>
            <div style={{ fontSize: "var(--fs-caption)", lineHeight: "var(--lh-caption)", color: "var(--text-2)" }}>
              सभी कर शामिल · 500 मिलीलीटर
            </div>
            <div style={{ fontSize: "var(--fs-caption)", lineHeight: "var(--lh-caption)", color: "var(--text-2)" }}>
              ಎಲ್ಲಾ ತೆರಿಗೆಗಳು ಸೇರಿವೆ · 500 ಮಿಲಿ
            </div>
          </div>
        </div>
      </section>

      {/* 3. Spacing & Radius */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="3. Spacing & Border Radii" />
        <div style={{ display: "grid", gap: "var(--sp-3)" }}>
          <div style={{ display: "flex", gap: "var(--sp-2)", alignItems: "center", flexWrap: "wrap" }}>
            {[
              { token: "--sp-1", px: "4px" },
              { token: "--sp-2", px: "8px" },
              { token: "--sp-3", px: "12px" },
              { token: "--sp-4", px: "16px" },
              { token: "--sp-5", px: "24px" },
              { token: "--sp-6", px: "32px" },
            ].map((s) => (
              <div key={s.token} style={{ border: "1px solid var(--border)", padding: "var(--sp-2)", borderRadius: "var(--r-xs)" }}>
                <span style={{ fontSize: "var(--fs-caption)", fontWeight: "var(--fw-bold)" }}>{s.token} ({s.px})</span>
                <div style={{ width: `var(${s.token})`, height: 8, background: "var(--primary)", marginTop: "var(--sp-1)" }} />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "var(--sp-2)", alignItems: "center", flexWrap: "wrap", marginTop: "var(--sp-2)" }}>
            {[
              { token: "--r-xs", px: "4px (badges)" },
              { token: "--r-sm", px: "8px (inputs, cards)" },
              { token: "--r-md", px: "12px (cards)" },
              { token: "--r-lg", px: "16px (sheets)" },
              { token: "--r-pill", px: "999px (chips)" },
            ].map((r) => (
              <div
                key={r.token}
                style={{
                  border: "2px solid var(--primary)",
                  borderRadius: `var(${r.token})`,
                  padding: "var(--sp-2) var(--sp-3)",
                  fontSize: "var(--fs-caption)",
                  background: "var(--primary-10)",
                }}
              >
                {r.token} ({r.px})
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Button & IconButton */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="4. Button & IconButton (44px+ hit targets)" />
        <div style={{ display: "grid", gap: "var(--sp-3)" }}>
          <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="primary" size="md">Primary (48px)</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="ghost" size="md">Ghost</Button>
            <Button variant="destructive" size="md">Destructive</Button>
            <Button variant="primary" size="md" disabled>Disabled</Button>
            <Button variant="primary" size="md" loading>Loading</Button>
          </div>

          <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="primary" size="sm">Primary Sm (40px)</Button>
            <Button variant="secondary" size="sm">Secondary Sm</Button>
            <Button variant="ghost" size="sm">Ghost Sm</Button>
            <Button variant="destructive" size="sm">Destructive Sm</Button>
          </div>

          <div style={{ display: "flex", gap: "var(--sp-2)", alignItems: "center" }}>
            <IconButton aria-label="Search items">
              <Icon name="search" size={20} />
            </IconButton>
            <IconButton aria-label="View notifications" bordered>
              <Icon name="bell" size={20} />
            </IconButton>
            <IconButton aria-label="Favorite item" bordered>
              <Icon name="heart" size={20} />
            </IconButton>
            <IconButton aria-label="Back to home" disabled>
              <Icon name="back" size={20} />
            </IconButton>
          </div>
        </div>
      </section>

      {/* 5. Chips, Badges & Rating */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="5. Chips, Badges & Rating" />
        <div style={{ display: "grid", gap: "var(--sp-3)" }}>
          <div style={{ display: "flex", gap: "var(--sp-2)", overflowX: "auto", paddingBottom: "var(--sp-1)" }}>
            <Chip active={chipActive === "all"} onClick={() => setChipActive("all")}>All (40px hit 44px)</Chip>
            <Chip active={chipActive === "grocery"} onClick={() => setChipActive("grocery")} icon={<Icon name="store" size={16} />}>Grocery</Chip>
            <Chip active={chipActive === "dairy"} onClick={() => setChipActive("dairy")}>Dairy & Eggs</Chip>
            <Chip disabled>Out of Stock</Chip>
          </div>

          <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap", alignItems: "center" }}>
            <Badge variant="verified" />
            <Badge variant="discount">₹50 OFF</Badge>
            <Badge variant="open" />
            <Badge variant="closed" opensAt="07:00 AM" />
            <Badge variant="closing-soon" />
          </div>

          <div style={{ display: "flex", gap: "var(--sp-4)", alignItems: "center" }}>
            <Rating rating={4.8} count="1.2k" />
            <Rating rating={4.5} count={86} />
            <Rating rating={5.0} />
          </div>
        </div>
      </section>

      {/* 6. QuantityControl & Price */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="6. QuantityControl & Price" />
        <div style={{ display: "grid", gap: "var(--sp-3)" }}>
          <div style={{ display: "flex", gap: "var(--sp-4)", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>ADD state</small>
              <QuantityControl
                quantity={0}
                onAdd={() => setQty(1)}
                onIncrement={() => {}}
                onDecrement={() => {}}
              />
            </div>
            <div>
              <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>Stepper (- n +)</small>
              <QuantityControl
                quantity={qty}
                onAdd={() => setQty(1)}
                onIncrement={() => setQty((q) => q + 1)}
                onDecrement={() => setQty((q) => Math.max(0, q - 1))}
              />
            </div>
            <div>
              <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>Max Reached (10)</small>
              <QuantityControl
                quantity={10}
                max={10}
                onAdd={() => {}}
                onIncrement={() => {}}
                onDecrement={() => {}}
              />
            </div>
            <div>
              <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>Out of Stock</small>
              <QuantityControl
                quantity={0}
                outOfStock
                onAdd={() => {}}
                onIncrement={() => {}}
                onDecrement={() => {}}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "var(--sp-4)", alignItems: "baseline", flexWrap: "wrap", marginTop: "var(--sp-2)" }}>
            <Price price={38} mrp={45} size="sm" showDiscount />
            <Price price={85} mrp={110} size="md" showDiscount />
            <Price price={299} mrp={399} size="lg" showDiscount />
            <Price price={50} size="md" />
          </div>
        </div>
      </section>

      {/* 7. SearchBar */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="7. SearchBar" />
        <SearchBar
          value={searchVal}
          onChange={setSearchVal}
          onClear={() => setSearchVal("")}
        />
      </section>

      {/* 8. ProductImage & ProductCard States */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="8. ProductImage & ProductCard States" />
        <div style={{ display: "flex", gap: "var(--sp-3)", alignItems: "center", marginBottom: "var(--sp-3)" }}>
          <div style={{ width: 90 }}>
            <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>1:1 Image</small>
            <ProductImage src={sampleProduct.image} alt={sampleProduct.name} widthPx={200} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "var(--text-2)", fontSize: "var(--fs-caption)", lineHeight: "var(--lh-caption)" }}>
              Fixed 1:1 aspect ratio, --surface placeholder, lazy loading, and Unsplash URL payload optimizer (w=400&q=70&auto=format).
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-3)" }}>
          <div>
            <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>Default / In-Cart</small>
            <ProductCard
              product={sampleProduct}
              quantity={qty}
              onAdd={() => setQty((q) => q + 1)}
              onRemove={() => setQty((q) => Math.max(0, q - 1))}
              onOpen={() => {}}
            />
          </div>
          <div>
            <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>Out of Stock State</small>
            <ProductCard
              product={sampleOutOfStockProduct}
              quantity={0}
              onAdd={() => {}}
              onRemove={() => {}}
              onOpen={() => {}}
              outOfStock
            />
          </div>
        </div>
      </section>

      {/* 9. ShopCard (Compact & Stacked) */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="9. ShopCard (Compact & Stacked)" />
        <div style={{ display: "grid", gap: "var(--sp-4)" }}>
          <div>
            <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>Stacked Variant (Open)</small>
            <ShopCard shop={sampleShopOpen} onOpen={() => {}} />
          </div>
          <div>
            <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-1)" }}>Compact Variant (Closed state)</small>
            <ShopCard shop={sampleShopClosed} onOpen={() => {}} compact />
          </div>
        </div>
      </section>

      {/* 10. Sheet & Toast & EmptyState */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="10. Sheet, Toast & EmptyState" />
        <div style={{ display: "grid", gap: "var(--sp-3)" }}>
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>
            Open Bottom Sheet Preview
          </Button>

          <Sheet
            isOpen={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Design System Sheet Preview"
          >
            <div style={{ padding: "var(--sp-3) 0" }}>
              <p style={{ color: "var(--text-2)", fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
                This is a reusable bottom sheet with a draggable handle, title, close button, focus trap, and Escape key dismissal.
              </p>
              <div style={{ marginTop: "var(--sp-4)" }}>
                <Button variant="primary" fullWidth onClick={() => setSheetOpen(false)}>
                  Dismiss Sheet
                </Button>
              </div>
            </div>
          </Sheet>

          <Toast message="Item added to cart successfully" />

          <EmptyState
            icon={<Icon name="bag" size={32} />}
            title="Your cart is empty"
            body="Explore neighbourhood kirana shops and fresh farm produce nearby."
            actionLabel="Browse Shops"
            onAction={() => {}}
          />
        </div>
      </section>

      {/* 11. Skeletons */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="11. Skeletons" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-3)" }}>
          <Skeleton variant="product-card" />
          <Skeleton variant="shop-card" />
        </div>
      </section>

      {/* 12. 29 Consistent Inline Icons */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="12. All 29 Harmonized Icons (24px viewBox, 1.5px stroke)" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "var(--sp-2)", textAlign: "center" }}>
          {iconList.map((iconName) => (
            <div
              key={iconName}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--r-sm)",
                padding: "var(--sp-2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--sp-1)",
              }}
            >
              <Icon name={iconName} size={22} />
              <small style={{ fontSize: "var(--fs-caption)", color: "var(--text-2)" }}>{iconName}</small>
            </div>
          ))}
        </div>
      </section>

      {/* 13. BottomNav Preview */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="13. Bottom Navigation (5 Tabs, 56px+ tap height)" />
        <div style={{ position: "relative", height: 76, border: "1px solid var(--border)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
          <BottomNav />
        </div>
      </section>

      {/* 14. Phase 3 Shared Pieces */}
      <section style={{ marginBottom: "var(--sp-6)" }}>
        <SectionHeader title="14. Phase 3 Shared Components" />

        {/* ShopAvatar sizes & tints */}
        <div style={{ marginBottom: "var(--sp-4)" }}>
          <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-2)", fontWeight: "var(--fw-semibold)" }}>
            ShopAvatar (Sizes: sm, md, lg and Tints 1-6)
          </small>
          <div style={{ display: "flex", gap: "var(--sp-3)", alignItems: "center", flexWrap: "wrap", marginBottom: "var(--sp-3)" }}>
            <ShopAvatar name="Sharma General Store" size="sm" tint={1} />
            <ShopAvatar name="Fresh Basket" size="md" tint={2} />
            <ShopAvatar name="Iyengar's Bakery" size="lg" tint={3} />
            <ShopAvatar name="Apollo Pharmacy" size="md" tint={4} />
            <ShopAvatar name="Karnataka Fruits" size="md" tint={5} />
            <ShopAvatar name="Quick Kirana" size="md" tint={6} />
          </div>
        </div>

        {/* ProgressBar */}
        <div style={{ marginBottom: "var(--sp-4)" }}>
          <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-2)", fontWeight: "var(--fw-semibold)" }}>
            ProgressBar (Free delivery threshold)
          </small>
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: "var(--sp-3)", background: "var(--background)" }}>
            <ProgressBar value={149} max={199} label="Add ₹50 more for free delivery" subtitle="₹149 / ₹199" />
          </div>
        </div>

        {/* StatusTimeline */}
        <div style={{ marginBottom: "var(--sp-4)" }}>
          <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-2)", fontWeight: "var(--fw-semibold)" }}>
            StatusTimeline (4-step vertical stepper)
          </small>
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: "var(--sp-4)", background: "var(--background)" }}>
            <StatusTimeline
              steps={[
                { title: "Order confirmed", subtitle: "Sent to Sharma General Store", status: "completed", time: "18:42" },
                { title: "Items packed", subtitle: "Kirana partner has packed 4 items", status: "completed", time: "18:48" },
                { title: "Out for delivery", subtitle: "Rider assigned · 1.2 km away", status: "current", time: "18:52" },
                { title: "Delivered", subtitle: "Estimated by 19:05", status: "upcoming" },
              ]}
            />
          </div>
        </div>

        {/* BillRow */}
        <div style={{ marginBottom: "var(--sp-4)" }}>
          <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-2)", fontWeight: "var(--fw-semibold)" }}>
            BillRow (Breakdown & totals)
          </small>
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: "var(--sp-3)", background: "var(--background)" }}>
            <BillRow label="Item total" value="₹342" strikethrough="₹390" />
            <BillRow label="Delivery partner fee" value="₹15" />
            <BillRow label="Shop offer discount" value="-₹48" variant="discount" />
            <BillRow label="To pay" value="₹309" variant="total" />
          </div>
        </div>

        {/* AddressRow */}
        <div style={{ marginBottom: "var(--sp-4)" }}>
          <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-2)", fontWeight: "var(--fw-semibold)" }}>
            AddressRow
          </small>
          <AddressRow
            label="Home"
            address="5th Block, Koramangala, Bengaluru"
            eta="18–25 min"
            onChange={() => {}}
          />
        </div>

        {/* PaymentOption */}
        <div style={{ marginBottom: "var(--sp-4)" }}>
          <small style={{ display: "block", color: "var(--text-2)", marginBottom: "var(--sp-2)", fontWeight: "var(--fw-semibold)" }}>
            PaymentOption (Radio rows with non-color cue)
          </small>
          <div style={{ display: "grid", gap: "var(--sp-2)" }}>
            <PaymentOption
              id="pay-upi"
              label="UPI (Google Pay, PhonePe, Paytm)"
              description="Instant refund directly to account"
              iconName="upi"
              badge="Fastest"
              selected={selectedPayment === "upi"}
              onSelect={() => setSelectedPayment("upi")}
            />
            <PaymentOption
              id="pay-card"
              label="Credit / Debit Card"
              description="Visa, Mastercard, RuPay"
              iconName="card"
              selected={selectedPayment === "card"}
              onSelect={() => setSelectedPayment("card")}
            />
            <PaymentOption
              id="pay-cash"
              label="Cash on Delivery"
              description="Pay cash or UPI at doorstep"
              iconName="cash"
              selected={selectedPayment === "cash"}
              onSelect={() => setSelectedPayment("cash")}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default DesignSystemGallery
