import { useState } from "react"
import ShopMap from "./ShopMap"

type Page = "home" | "categories" | "shops" | "shop" | "search" | "product" | "smart" | "cart" | "checkout" | "tracking" | "account"
type IconName = "home" | "grid" | "store" | "bag" | "user" | "pin" | "chevron" | "search" | "mic" | "clock" | "star" | "shield" | "heart" | "plus" | "minus" | "arrow" | "filter" | "sort" | "back" | "phone" | "help" | "check" | "card" | "cash" | "upi" | "bell" | "list" | "spark" | "close"
type ServiceStatus = "prompt" | "checking" | "available" | "unavailable"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8v10H3Z" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    store: (
      <>
        <path d="M4 10v11h16V10M3 10l2-7h14l2 7" />
        <path d="M3 10c1.5 2.5 4.5 2.5 6 0 1.5 2.5 4.5 2.5 6 0 1.5 2.5 4.5 2.5 6 0" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l2 13H3Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    star: (
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />
    ),
    shield: (
      <>
        <path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    heart: (
      <path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 5 3 11 8 15 5-4 13-10 8-15Z" />
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    sort: <path d="M8 6h12M8 12h8M8 18h4M4 4v16" />,
    back: <path d="m15 5-7 7 7 7" />,
    phone: <path d="M7 3H4c-1 10 7 18 17 17v-3l-5-2-2 3c-4-1-7-4-8-8l3-2Z" />,
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9a3 3 0 1 1 4 3v2m-1 3h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    cash: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    upi: <path d="m7 4 5 8-5 8m5-16 5 8-5 8" />,
    bell: (
      <>
        <path d="M5 17h14l-2-4V9a5 5 0 0 0-10 0v4Z" />
        <path d="M10 21h4" />
      </>
    ),
    list: (
      <>
        <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />
        <path d="M20 2v4M18 4h4" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const images = {
  milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80",
  atta: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=500&q=80",
  banana:
    "https://images.unsplash.com/photo-1635013973792-2d1595bfa0b2?auto=format&fit=crop&w=500&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  bread:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
  tomato:
    "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=80",
  grocery:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=82",
  produce:
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=82",
  bakery:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=82",
}

const shops = [
  {
    id: "sharma",
    name: "Sharma General Store",
    type: "Kirana & daily essentials",
    rating: 4.8,
    distance: "0.4 km",
    eta: "18–25 min",
    fee: 0,
    min: 199,
    image: images.grocery,
    offer: "₹50 OFF above ₹399",
  },
  {
    id: "fresh",
    name: "Fresh Basket",
    type: "Fruits & vegetables",
    rating: 4.7,
    distance: "0.7 km",
    eta: "20–30 min",
    fee: 15,
    min: 149,
    image: images.produce,
    offer: "15% OFF on fresh produce",
  },
  {
    id: "bakery",
    name: "Iyengar's Bakery",
    type: "Bakery & snacks",
    rating: 4.6,
    distance: "1.1 km",
    eta: "25–35 min",
    fee: 20,
    min: 129,
    image: images.bakery,
    offer: "Free delivery above ₹299",
  },
]

const products = [
  {
    id: "milk",
    name: "Amul Taaza Toned Milk",
    unit: "500 ml",
    price: 28,
    mrp: 30,
    image: images.milk,
    shop: "sharma",
    category: "Dairy",
  },
  {
    id: "atta",
    name: "Aashirvaad Shudh Chakki Atta",
    unit: "5 kg",
    price: 245,
    mrp: 285,
    image: images.atta,
    shop: "sharma",
    category: "Staples",
  },
  {
    id: "banana",
    name: "Robusta Banana",
    unit: "6 pcs",
    price: 45,
    mrp: 50,
    image: images.banana,
    shop: "fresh",
    category: "Fruits",
  },
  {
    id: "rice",
    name: "India Gate Basmati Rice",
    unit: "1 kg",
    price: 132,
    mrp: 160,
    image: images.rice,
    shop: "sharma",
    category: "Staples",
  },
  {
    id: "bread",
    name: "Fresh Milk Bread",
    unit: "400 g",
    price: 42,
    mrp: 45,
    image: images.bread,
    shop: "bakery",
    category: "Bakery",
  },
  {
    id: "tomato",
    name: "Farm Fresh Tomato",
    unit: "500 g",
    price: 34,
    mrp: 40,
    image: images.tomato,
    shop: "fresh",
    category: "Vegetables",
  },
]

const categories = [
  ["Fruits", images.banana],
  ["Vegetables", images.tomato],
  ["Dairy", images.milk],
  ["Staples", images.rice],
  ["Bakery", images.bread],
  ["Snacks", images.atta],
]

function QuantityControl({
  value,
  onAdd,
  onRemove,
}: {
  value: number
  onAdd: () => void
  onRemove: () => void
}) {
  if (!value)
    return (
      <button className="add-button" onClick={onAdd}>
        ADD
      </button>
    )
  return (
    <div className="stepper">
      <button aria-label="Remove one" onClick={onRemove}>
        <Icon name="minus" size={16} />
      </button>
      <strong>{value}</strong>
      <button aria-label="Add one" onClick={onAdd}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}

function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
  onOpen,
}: {
  product: typeof products[number]
  quantity: number
  onAdd: () => void
  onRemove: () => void
  onOpen: () => void
}) {
  const shop = shops.find((item) => item.id === product.shop)!
  const discount = Math.round((1 - product.price / product.mrp) * 100)
  return (
    <article className="product-card">
      <button className="product-photo" onClick={onOpen}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount >= 10 && <span>{discount}% OFF</span>}
      </button>
      <button className="product-copy" onClick={onOpen}>
        <small>{product.unit}</small>
        <strong>{product.name}</strong>
        <span className="sold-by">
          <Icon name="store" size={12} />
          {shop.name}
        </span>
      </button>
      <div className="product-action">
        <div>
          <strong>₹{product.price}</strong>
          {product.mrp > product.price && <del>₹{product.mrp}</del>}
        </div>
        <QuantityControl value={quantity} onAdd={onAdd} onRemove={onRemove} />
      </div>
    </article>
  )
}

function ShopCard({
  shop,
  onOpen,
  compact = false,
}: {
  shop: typeof shops[number]
  onOpen: () => void
  compact?: boolean
}) {
  return (
    <button
      className={`shop-card ${compact ? "compact" : ""}`}
      onClick={onOpen}
    >
      <div className="shop-photo">
        <img src={shop.image} alt="" loading="lazy" />
        <span>{shop.eta}</span>
      </div>
      <div className="shop-copy">
        <div className="shop-name">
          <strong>{shop.name}</strong>
          <span>
            <Icon name="shield" size={13} /> Verified
          </span>
        </div>
        <p>{shop.type}</p>
        <div className="shop-meta">
          <span className="rating">
            <Icon name="star" size={12} /> {shop.rating}
          </span>
          <span>{shop.distance}</span>
          <span>{shop.fee ? `₹${shop.fee} delivery` : "Free delivery"}</span>
        </div>
        <small>{shop.offer}</small>
      </div>
    </button>
  )
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && (
        <button onClick={onAction}>
          {action}
          <Icon name="chevron" size={14} />
        </button>
      )}
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [previousPage, setPreviousPage] = useState<Page>("home")
  const [selectedShop, setSelectedShop] = useState(shops[0])
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [query, setQuery] = useState("")
  const [cart, setCart] = useState<Record<string, number>>({})
  const [payment, setPayment] = useState("upi")
  const [toast, setToast] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>("prompt")
  const [locationName, setLocationName] = useState("Select delivery location")
  const [locationError, setLocationError] = useState("")

  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0,
  )
  const cartShopIds = [
    ...new Set(
      products
        .filter((product) => cart[product.id])
        .map((product) => product.shop),
    ),
  ]
  const deliveryFee = cartShopIds.reduce(
    (sum, id) => sum + (shops.find((shop) => shop.id === id)?.fee || 0),
    0,
  )
  const resultProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  const resultShops = shops.filter((shop) =>
    `${shop.name} ${shop.type}`.toLowerCase().includes(query.toLowerCase()),
  )

  function navigate(next: Page) {
    setPreviousPage(page)
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function changeQuantity(id: string, change: number) {
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] || 0) + change),
    }))
  }
  function openShop(shop: typeof shops[number]) {
    setSelectedShop(shop)
    navigate("shop")
  }
  function openProduct(product: typeof products[number]) {
    setSelectedProduct(product)
    navigate("product")
  }
  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(""), 2400)
  }
  function chooseSavedLocation(name: string, available: boolean) {
    setLocationName(name)
    setLocationError("")
    setServiceStatus(available ? "available" : "unavailable")
    if (available) setPage("home")
  }
  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported on this device. Choose a saved address instead.",
      )
      return
    }
    setLocationError("")
    setServiceStatus("checking")
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const isInHaryana =
          coords.latitude >= 27.65 &&
          coords.latitude <= 30.92 &&
          coords.longitude >= 74.45 &&
          coords.longitude <= 77.6
        setLocationName(
          isInHaryana
            ? "Current location · Haryana"
            : "Current location · Outside Haryana",
        )
        setServiceStatus(isInHaryana ? "available" : "unavailable")
        if (isInHaryana) setPage("home")
      },
      () => {
        setServiceStatus("prompt")
        setLocationError(
          "We couldn’t access your location. Check permission settings or choose a saved address.",
        )
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }

  const headerTitle: Partial<Record<Page, string>> = {
    categories: "Shop by category",
    shops: "Nearby shops",
    search: "Search",
    product: "Product details",
    smart: "Smart Basket",
    cart: "Your cart",
    checkout: "Payment",
    tracking: "Track order",
    account: "Account",
  }
  const showBack = ![
    "home",
    "categories",
    "shops",
    "smart",
    "cart",
    "account",
  ].includes(page)

  if (serviceStatus === "unavailable") {
    return (
      <div className="app-shell">
        <UnavailableScreen
          location={locationName}
          onChange={() => setServiceStatus("prompt")}
        />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        {page === "home" ? (
          <>
            <div className="delivery-row">
              <button className="address-button">
                <span className="brand-mark">
                  <Icon name="store" size={20} />
                </span>
                <span>
                  <small>Delivery in 20 minutes</small>
                  <strong>{locationName}</strong>
                </span>
                <Icon name="chevron" size={14} />
              </button>
              <button className="icon-button" aria-label="Notifications">
                <Icon name="bell" />
              </button>
            </div>
          </>
        ) : (
          <div className="title-row">
            {showBack && (
              <button
                className="icon-button"
                aria-label="Go back"
                onClick={() => setPage(previousPage)}
              >
                <Icon name="back" />
              </button>
            )}
            <h1>{page === "shop" ? selectedShop.name : headerTitle[page]}</h1>
            <button
              className="icon-button"
              aria-label="Search"
              onClick={() => navigate("search")}
            >
              <Icon name="search" />
            </button>
          </div>
        )}
        {(page === "home" || page === "search") && (
          <label className="search-bar">
            <Icon name="search" />
            <input
              value={query}
              onFocus={() => page === "home" && navigate("search")}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search milk, atta or a local shop"
            />
            <Icon name="mic" />
          </label>
        )}
      </header>

      <main>
        {page === "home" && (
          <HomeScreen
            cart={cart}
            onAdd={(id) => changeQuantity(id, 1)}
            onRemove={(id) => changeQuantity(id, -1)}
            onShop={openShop}
            onProduct={openProduct}
            navigate={navigate}
          />
        )}
        {page === "categories" && (
          <CategoriesScreen
            onCategory={(category) => {
              setQuery(category)
              navigate("search")
            }}
          />
        )}
        {page === "shops" && <ShopsScreen onShop={openShop} />}
        {page === "shop" && (
          <ShopScreen
            shop={selectedShop}
            cart={cart}
            onAdd={(id) => changeQuantity(id, 1)}
            onRemove={(id) => changeQuantity(id, -1)}
            onProduct={openProduct}
            showMap={showMap}
            onMap={() => setShowMap((value) => !value)}
          />
        )}
        {page === "search" && (
          <SearchScreen
            query={query}
            products={resultProducts}
            shops={resultShops}
            cart={cart}
            onAdd={(id) => changeQuantity(id, 1)}
            onRemove={(id) => changeQuantity(id, -1)}
            onProduct={openProduct}
            onShop={openShop}
          />
        )}
        {page === "product" && (
          <ProductScreen
            product={selectedProduct}
            quantity={cart[selectedProduct.id] || 0}
            onAdd={() => changeQuantity(selectedProduct.id, 1)}
            onRemove={() => changeQuantity(selectedProduct.id, -1)}
            onShop={() =>
              openShop(shops.find((shop) => shop.id === selectedProduct.shop)!)
            }
          />
        )}
        {page === "smart" && (
          <SmartBasketScreen
            onChoose={(productIds) => {
              setCart((current) => {
                const next = { ...current }
                productIds.forEach((id) => {
                  next[id] = Math.max(1, next[id] || 0)
                })
                return next
              })
              notify("Recommended basket added to your cart")
            }}
          />
        )}
        {page === "cart" && (
          <CartScreen
            cart={cart}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            location={locationName}
            onAdd={(id) => changeQuantity(id, 1)}
            onRemove={(id) => changeQuantity(id, -1)}
            onCheckout={() => navigate("checkout")}
            onHome={() => navigate("home")}
          />
        )}
        {page === "checkout" && (
          <CheckoutScreen
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            payment={payment}
            setPayment={setPayment}
            onPlace={() => {
              setCart({})
              navigate("tracking")
              notify("Order placed successfully")
            }}
          />
        )}
        {page === "tracking" && (
          <TrackingScreen
            onHelp={() => notify("Support will call you shortly")}
          />
        )}
        {page === "account" && <AccountScreen navigate={navigate} />}
      </main>

      {count > 0 &&
        page !== "cart" &&
        page !== "checkout" &&
        page !== "tracking" && (
          <button className="cart-bar" onClick={() => navigate("cart")}>
            <span className="cart-bag">
              <Icon name="bag" size={18} />
              {count}
            </span>
            <span>
              <strong>₹{subtotal}</strong>
              <small>
                {cartShopIds.length} local{" "}
                {cartShopIds.length === 1 ? "shop" : "shops"}
              </small>
            </span>
            <b>View cart</b>
            <Icon name="arrow" size={18} />
          </button>
        )}
      {!["product", "shop", "search", "checkout", "tracking"].includes(
        page,
      ) && <BottomNav page={page} navigate={navigate} count={count} />}
      {!["checkout", "tracking"].includes(page) && (
        <button
          className={`assistant-fab ${count > 0 ? "with-cart" : ""}`}
          aria-label="Open Apna Assistant"
          onClick={() => setAssistantOpen(true)}
        >
          <Icon name="spark" size={20} />
          <span>Ask Apna</span>
        </button>
      )}
      {assistantOpen && (
        <AssistantSheet
          onClose={() => setAssistantOpen(false)}
          onSmartBasket={() => {
            setAssistantOpen(false)
            navigate("smart")
          }}
          onSearch={(value) => {
            setQuery(value)
            setAssistantOpen(false)
            navigate("search")
          }}
        />
      )}
      {(serviceStatus === "prompt" || serviceStatus === "checking") && (
        <LocationGate
          status={serviceStatus}
          error={locationError}
          onCurrentLocation={useCurrentLocation}
          onSavedLocation={chooseSavedLocation}
        />
      )}
      {toast && (
        <div className="toast">
          <Icon name="check" size={18} />
          {toast}
        </div>
      )}
    </div>
  )
}

function HomeScreen({
  cart,
  onAdd,
  onRemove,
  onShop,
  onProduct,
  navigate,
}: {
  cart: Record<string, number>
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onShop: (shop: typeof shops[number]) => void
  onProduct: (product: typeof products[number]) => void
  navigate: (page: Page) => void
}) {
  return (
    <>
      <section className="quick-categories">
        {categories.map(([name, image]) => (
          <button key={name} onClick={() => navigate("categories")}>
            <span>
              <img src={image} alt="" />
            </span>
            <small>{name}</small>
          </button>
        ))}
      </section>
      <button className="smart-basket-banner" onClick={() => navigate("smart")}>
        <span className="smart-icon">
          <Icon name="spark" />
        </span>
        <span>
          <small>SMART BASKET</small>
          <strong>Compare your full list, not just one item</strong>
          <em>See the best local shop combination in seconds</em>
        </span>
        <Icon name="chevron" />
      </button>
      <button className="offer-banner" onClick={() => onShop(shops[0])}>
        <div>
          <small>LOCAL SAVINGS</small>
          <strong>₹50 off at Sharma General Store</strong>
          <span>On orders above ₹399 · Use LOCAL50</span>
        </div>
        <Icon name="arrow" />
      </button>
      <section className="screen-section">
        <SectionTitle
          title="Shops near you"
          action="See all"
          onAction={() => navigate("shops")}
        />
        <div className="horizontal-shops">
          {shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              compact
              onOpen={() => onShop(shop)}
            />
          ))}
        </div>
      </section>
      <section className="screen-section">
        <SectionTitle
          title="Everyday essentials"
          action="See all"
          onAction={() => navigate("categories")}
        />
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onAdd={() => onAdd(product.id)}
              onRemove={() => onRemove(product.id)}
              onOpen={() => onProduct(product)}
            />
          ))}
        </div>
      </section>
      <section className="screen-section">
        <SectionTitle title="Fresh from nearby sellers" />
        <div className="product-grid">
          {products
            .slice(4)
            .concat(products[2])
            .map((product) => (
              <ProductCard
                key={`${product.id}-fresh`}
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={() => onAdd(product.id)}
                onRemove={() => onRemove(product.id)}
                onOpen={() => onProduct(product)}
              />
            ))}
        </div>
      </section>
    </>
  )
}

function CategoriesScreen({
  onCategory,
}: {
  onCategory: (category: string) => void
}) {
  return (
    <section className="category-list">
      {categories.map(([name, image]) => (
        <button key={name} onClick={() => onCategory(name)}>
          <img src={image} alt="" />
          <span>
            <strong>{name}</strong>
            <small>
              {name === "Fruits" || name === "Vegetables"
                ? "Fresh stock from nearby sellers"
                : "Popular picks from local shops"}
            </small>
          </span>
          <Icon name="chevron" />
        </button>
      ))}
    </section>
  )
}

function ShopsScreen({
  onShop,
}: {
  onShop: (shop: typeof shops[number]) => void
}) {
  return (
    <>
      <div className="filter-chips">
        <button>
          <Icon name="filter" size={16} />
          Filters
        </button>
        <button>Under 30 min</button>
        <button>Free delivery</button>
        <button>Top rated</button>
      </div>
      <div className="stacked-shops">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} onOpen={() => onShop(shop)} />
        ))}
      </div>
    </>
  )
}

function ShopScreen({
  shop,
  cart,
  onAdd,
  onRemove,
  onProduct,
  showMap,
  onMap,
}: {
  shop: typeof shops[number]
  cart: Record<string, number>
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onProduct: (product: typeof products[number]) => void
  showMap: boolean
  onMap: () => void
}) {
  const shopProducts = products.filter((product) => product.shop === shop.id)
  return (
    <>
      <section className="shop-hero">
        <img src={shop.image} alt="" />
        <div>
          <div className="shop-name">
            <h2>{shop.name}</h2>
            <span>
              <Icon name="shield" size={13} /> Verified
            </span>
          </div>
          <p>{shop.type}</p>
          <div className="shop-hero-meta">
            <span>
              <Icon name="star" size={13} />
              {shop.rating}
            </span>
            <span>
              <Icon name="clock" size={13} />
              {shop.eta}
            </span>
            <span>{shop.distance}</span>
          </div>
          <button onClick={onMap}>
            <Icon name="pin" size={16} />
            {showMap ? "Hide location" : "Shop information"}
          </button>
        </div>
      </section>
      {showMap && (
        <ShopMap
          name={
            shop.name === "Fresh Basket"
              ? "Fresh Mart"
              : shop.name === "Iyengar's Bakery"
                ? "Gupta Supermarket"
                : shop.name
          }
        />
      )}
      <div className="shop-offer">
        <strong>{shop.offer}</strong>
        <span>Minimum order ₹{shop.min}</span>
      </div>
      <div className="category-tabs">
        <button className="active">All</button>
        <button>Best sellers</button>
        <button>Dairy</button>
        <button>Staples</button>
      </div>
      <section className="screen-section">
        <SectionTitle title="Available now" />
        <div className="product-grid">
          {(shopProducts.length ? shopProducts : products.slice(0, 4)).map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={() => onAdd(product.id)}
                onRemove={() => onRemove(product.id)}
                onOpen={() => onProduct(product)}
              />
            ),
          )}
        </div>
      </section>
    </>
  )
}

function SearchScreen({
  query,
  products: resultProducts,
  shops: resultShops,
  cart,
  onAdd,
  onRemove,
  onProduct,
  onShop,
}: {
  query: string
  products: typeof products
  shops: typeof shops
  cart: Record<string, number>
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onProduct: (product: typeof products[number]) => void
  onShop: (shop: typeof shops[number]) => void
}) {
  const hasResults = resultProducts.length || resultShops.length
  return (
    <>
      <div className="filter-chips">
        <button>
          <Icon name="filter" size={16} />
          Filters
        </button>
        <button>
          <Icon name="sort" size={16} />
          Sort
        </button>
        <button>Under 30 min</button>
        <button>Offers</button>
      </div>
      {!query && (
        <div className="recent-searches">
          <SectionTitle title="Recent searches" />
          <button>
            Milk <Icon name="chevron" size={14} />
          </button>
          <button>
            Fresh Basket <Icon name="chevron" size={14} />
          </button>
          <button>
            Atta 5 kg <Icon name="chevron" size={14} />
          </button>
        </div>
      )}
      {query && hasResults ? (
        <>
          {resultShops.length > 0 && (
            <section className="screen-section">
              <SectionTitle title={`Shops for “${query}”`} />
              <div className="stacked-shops">
                {resultShops.map((shop) => (
                  <ShopCard
                    key={shop.id}
                    shop={shop}
                    onOpen={() => onShop(shop)}
                  />
                ))}
              </div>
            </section>
          )}
          {resultProducts.length > 0 && (
            <section className="screen-section">
              <SectionTitle title={`Products for “${query}”`} />
              <div className="product-grid">
                {resultProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id] || 0}
                    onAdd={() => onAdd(product.id)}
                    onRemove={() => onRemove(product.id)}
                    onOpen={() => onProduct(product)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        query && (
          <div className="empty-state">
            <span>
              <Icon name="search" size={30} />
            </span>
            <h2>No matches nearby</h2>
            <p>Try a product, category, or shop name.</p>
          </div>
        )
      )}
    </>
  )
}

function ProductScreen({
  product,
  quantity,
  onAdd,
  onRemove,
  onShop,
}: {
  product: typeof products[number]
  quantity: number
  onAdd: () => void
  onRemove: () => void
  onShop: () => void
}) {
  const shop = shops.find((item) => item.id === product.shop)!
  return (
    <div className="product-detail">
      <div className="detail-image">
        <img src={product.image} alt={product.name} />
        <span>{Math.round((1 - product.price / product.mrp) * 100)}% OFF</span>
      </div>
      <section>
        <small>{product.category}</small>
        <h1>{product.name}</h1>
        <p>{product.unit}</p>
        <div className="detail-price">
          <strong>₹{product.price}</strong>
          <del>₹{product.mrp}</del>
          <span>Inclusive of all taxes</span>
        </div>
      </section>
      <button className="seller-card" onClick={onShop}>
        <span className="seller-logo">
          <Icon name="store" />
        </span>
        <span>
          <small>Sold by</small>
          <strong>{shop.name}</strong>
          <em>
            <Icon name="star" size={12} /> {shop.rating} · {shop.eta}
          </em>
        </span>
        <Icon name="chevron" />
      </button>
      <section className="detail-info">
        <h2>Product information</h2>
        <div>
          <span>Unit</span>
          <strong>{product.unit}</strong>
        </div>
        <div>
          <span>Country of origin</span>
          <strong>India</strong>
        </div>
        <div>
          <span>Return policy</span>
          <strong>Replace at delivery</strong>
        </div>
      </section>
      <div className="detail-cta">
        <div>
          <strong>₹{product.price}</strong>
          <small>From {shop.name}</small>
        </div>
        <QuantityControl value={quantity} onAdd={onAdd} onRemove={onRemove} />
      </div>
    </div>
  )
}

function CartScreen({
  cart,
  subtotal,
  deliveryFee,
  location,
  onAdd,
  onRemove,
  onCheckout,
  onHome,
}: {
  cart: Record<string, number>
  subtotal: number
  deliveryFee: number
  location: string
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onCheckout: () => void
  onHome: () => void
}) {
  const groups = shops.filter((shop) =>
    products.some((product) => product.shop === shop.id && cart[product.id]),
  )
  if (!groups.length)
    return (
      <div className="empty-state cart-empty">
        <span>
          <Icon name="bag" size={30} />
        </span>
        <h2>Your cart is empty</h2>
        <p>Add everyday essentials from a shop nearby.</p>
        <button className="primary-button" onClick={onHome}>
          Start shopping
        </button>
      </div>
    )
  return (
    <div className="cart-screen">
      <button className="address-card">
        <span>
          <Icon name="pin" />
        </span>
        <span>
          <small>Delivering to Home</small>
          <strong>{location}</strong>
        </span>
        <Icon name="chevron" />
      </button>
      {groups.map((shop) => {
        const shopProducts = products.filter(
          (product) => product.shop === shop.id && cart[product.id],
        )
        const shopTotal = shopProducts.reduce(
          (sum, product) => sum + product.price * cart[product.id],
          0,
        )
        return (
          <section className="cart-group" key={shop.id}>
            <div className="cart-shop">
              <span>
                <Icon name="store" />
              </span>
              <div>
                <strong>{shop.name}</strong>
                <small>
                  {shop.eta} · {shop.distance}
                </small>
              </div>
              <Icon name="shield" size={16} />
            </div>
            {shopProducts.map((product) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <small>{product.unit}</small>
                  <b>₹{product.price * cart[product.id]}</b>
                </div>
                <QuantityControl
                  value={cart[product.id]}
                  onAdd={() => onAdd(product.id)}
                  onRemove={() => onRemove(product.id)}
                />
              </div>
            ))}
            <div className="shop-subtotal">
              <span>Shop subtotal</span>
              <strong>₹{shopTotal}</strong>
              <span>Delivery fee</span>
              <strong>{shop.fee ? `₹${shop.fee}` : "FREE"}</strong>
            </div>
          </section>
        )
      })}
      <section className="bill-card">
        <h2>Bill details</h2>
        <div>
          <span>Item total</span>
          <strong>₹{subtotal}</strong>
        </div>
        <div>
          <span>Delivery fees</span>
          <strong>{deliveryFee ? `₹${deliveryFee}` : "FREE"}</strong>
        </div>
        <div className="bill-total">
          <span>To pay</span>
          <strong>₹{subtotal + deliveryFee}</strong>
        </div>
      </section>
      <button className="checkout-button" onClick={onCheckout}>
        <span>
          <small>TOTAL</small>
          <strong>₹{subtotal + deliveryFee}</strong>
        </span>
        <b>Choose payment</b>
        <Icon name="arrow" />
      </button>
    </div>
  )
}

function CheckoutScreen({
  subtotal,
  deliveryFee,
  payment,
  setPayment,
  onPlace,
}: {
  subtotal: number
  deliveryFee: number
  payment: string
  setPayment: (value: string) => void
  onPlace: () => void
}) {
  const methods = [
    {
      id: "upi",
      icon: "upi" as IconName,
      title: "UPI",
      copy: "Google Pay, PhonePe, Paytm",
    },
    {
      id: "card",
      icon: "card" as IconName,
      title: "Credit or debit card",
      copy: "Visa, Mastercard, RuPay",
    },
    {
      id: "cash",
      icon: "cash" as IconName,
      title: "Cash on delivery",
      copy: "Pay when your order arrives",
    },
  ]
  return (
    <div className="checkout-screen">
      <section className="payment-card">
        <h2>Choose payment method</h2>
        {methods.map((method) => (
          <button
            key={method.id}
            className={payment === method.id ? "selected" : ""}
            onClick={() => setPayment(method.id)}
          >
            <span className="payment-icon">
              <Icon name={method.icon} />
            </span>
            <span>
              <strong>{method.title}</strong>
              <small>{method.copy}</small>
            </span>
            <i />
          </button>
        ))}
      </section>
      <section className="secure-note">
        <Icon name="shield" />
        <span>
          <strong>Payments are protected</strong>
          <small>This prototype will not collect payment details.</small>
        </span>
      </section>
      <section className="bill-card">
        <div>
          <span>Order total</span>
          <strong>₹{subtotal + deliveryFee}</strong>
        </div>
        <div>
          <span>Deliver to</span>
          <strong>Home</strong>
        </div>
        <div>
          <span>Estimated arrival</span>
          <strong>20–30 min</strong>
        </div>
      </section>
      <button className="checkout-button" onClick={onPlace}>
        <span>
          <small>PAYMENT</small>
          <strong>
            {payment === "upi" ? "UPI" : payment === "card" ? "Card" : "Cash"}
          </strong>
        </span>
        <b>Place order · ₹{subtotal + deliveryFee}</b>
        <Icon name="arrow" />
      </button>
    </div>
  )
}

function TrackingScreen({ onHelp }: { onHelp: () => void }) {
  return (
    <div className="tracking-screen">
      <section className="eta-card">
        <small>ARRIVING IN</small>
        <strong>18–24 min</strong>
        <p>Your order is being packed</p>
      </section>
      <section className="tracking-map">
        <div className="map-road road-one" />
        <div className="map-road road-two" />
        <span className="map-shop">
          <Icon name="store" />
        </span>
        <span className="map-home">
          <Icon name="home" />
        </span>
        <i />
      </section>
      <section className="status-card">
        <h2>Order status</h2>
        <div className="status-step complete">
          <span>
            <Icon name="check" size={15} />
          </span>
          <div>
            <strong>Order confirmed</strong>
            <small>Sharma General Store accepted your order</small>
          </div>
        </div>
        <div className="status-step active">
          <span>
            <Icon name="bag" size={15} />
          </span>
          <div>
            <strong>Packing your items</strong>
            <small>Fresh items are being checked</small>
          </div>
        </div>
        <div className="status-step">
          <span>
            <Icon name="store" size={15} />
          </span>
          <div>
            <strong>Out for delivery</strong>
            <small>We’ll share partner details soon</small>
          </div>
        </div>
        <div className="status-step">
          <span>
            <Icon name="home" size={15} />
          </span>
          <div>
            <strong>Delivered</strong>
          </div>
        </div>
      </section>
      <section className="order-contact">
        <span className="seller-logo">
          <Icon name="store" />
        </span>
        <div>
          <small>ORDER FROM</small>
          <strong>Sharma General Store</strong>
          <p>Order #AM2841 · 3 items</p>
        </div>
        <button aria-label="Call shop">
          <Icon name="phone" />
        </button>
      </section>
      <button className="help-button" onClick={onHelp}>
        <Icon name="help" />
        Need help with this order?
      </button>
    </div>
  )
}

function LocationGate({
  status,
  error,
  onCurrentLocation,
  onSavedLocation,
}: {
  status: ServiceStatus
  error: string
  onCurrentLocation: () => void
  onSavedLocation: (name: string, available: boolean) => void
}) {
  const savedAddresses = [
    {
      label: "Home",
      address: "Sector 43, Gurugram, Haryana",
      available: true,
    },
    {
      label: "Parents’ home",
      address: "Sector 15, Faridabad, Haryana",
      available: true,
    },
    {
      label: "Work",
      address: "Connaught Place, New Delhi",
      available: false,
    },
  ]

  return (
    <div className="location-backdrop">
      <section
        className="location-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-title"
      >
        <div className="location-brand">
          <span>
            <Icon name="store" />
          </span>
          <strong>
            apna<span>market</span>
          </strong>
        </div>
        <div className="location-intro">
          <span>
            <Icon name="pin" size={26} />
          </span>
          <h1 id="location-title">Where should we deliver?</h1>
          <p>
            Choose a saved address or share your current location to check if
            ApnaMarket serves your area.
          </p>
        </div>
        <button
          className="current-location-button"
          onClick={onCurrentLocation}
          disabled={status === "checking"}
        >
          <span>
            <Icon name={status === "checking" ? "clock" : "pin"} />
          </span>
          <span>
            <strong>
              {status === "checking"
                ? "Checking your location…"
                : "Use current location"}
            </strong>
            <small>
              {status === "checking"
                ? "This may take a few seconds"
                : "Enable device location access"}
            </small>
          </span>
          {status !== "checking" && <Icon name="chevron" />}
        </button>
        {error && <p className="location-error">{error}</p>}
        <div className="saved-address-title">
          <span>Saved addresses</span>
        </div>
        <div className="saved-addresses">
          {savedAddresses.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                onSavedLocation(
                  `${item.label} · ${item.address}`,
                  item.available,
                )
              }
            >
              <span>
                <Icon name={item.label === "Work" ? "store" : "home"} />
              </span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.address}</small>
              </span>
              <Icon name="chevron" />
            </button>
          ))}
        </div>
        <p className="coverage-copy">
          <Icon name="shield" size={16} />
          Currently delivering across selected areas in Haryana.
        </p>
      </section>
    </div>
  )
}

function UnavailableScreen({
  location,
  onChange,
}: {
  location: string
  onChange: () => void
}) {
  return (
    <main className="unavailable-screen">
      <div className="unavailable-brand">
        <span>
          <Icon name="store" size={22} />
        </span>
        <strong>
          apna<span>market</span>
        </strong>
      </div>
      <section>
        <span className="unavailable-icon">
          <Icon name="pin" size={34} />
        </span>
        <small>DELIVERY AREA CHECK</small>
        <h1>We’re not in your area yet</h1>
        <p>
          ApnaMarket currently delivers only in selected areas of Haryana. We’re
          working to reach more neighbourhoods soon.
        </p>
        <div className="checked-location">
          <Icon name="pin" size={18} />
          <span>
            <small>LOCATION CHECKED</small>
            <strong>{location}</strong>
          </span>
        </div>
        <button className="primary-button" onClick={onChange}>
          Choose another location
        </button>
      </section>
      <p className="availability-footnote">
        Local shops, coming closer to more communities.
      </p>
    </main>
  )
}

function SmartBasketScreen({
  onChoose,
}: {
  onChoose: (productIds: string[]) => void
}) {
  const [selected, setSelected] = useState(
    products.slice(0, 4).map((item) => item.id),
  )
  const [compared, setCompared] = useState(false)
  const selectedProducts = products.filter((product) =>
    selected.includes(product.id),
  )
  const selectedTotal = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  )
  const splitTotal = Math.max(
    selectedTotal,
    Math.round(selectedTotal + 15 - Math.min(20, selectedTotal * 0.05)),
  )
  const oneShopTotal = splitTotal + 37

  function toggleProduct(id: string) {
    setCompared(false)
    setSelected((current) =>
      current.includes(id)
        ? current.filter((productId) => productId !== id)
        : [...current, id],
    )
  }

  return (
    <div className="smart-screen">
      <section className="smart-intro">
        <span>
          <Icon name="spark" size={24} />
        </span>
        <div>
          <small>APNAMARKET SMART BASKET</small>
          <h2>Your list. The best local value.</h2>
          <p>
            We compare prices, availability and delivery fees across nearby
            shops.
          </p>
        </div>
      </section>

      <section className="smart-list">
        <div className="smart-section-heading">
          <div>
            <h2>Your shopping list</h2>
            <p>{selected.length} items selected</p>
          </div>
          <button
            onClick={() => setSelected(products.map((product) => product.id))}
          >
            Select all
          </button>
        </div>
        {products.map((product) => (
          <button
            className={`smart-list-item ${
              selected.includes(product.id) ? "selected" : ""
            }`}
            key={product.id}
            onClick={() => toggleProduct(product.id)}
          >
            <span className="smart-check">
              {selected.includes(product.id) && <Icon name="check" size={14} />}
            </span>
            <img src={product.image} alt="" />
            <span>
              <strong>{product.name}</strong>
              <small>{product.unit}</small>
            </span>
            <b>₹{product.price}</b>
          </button>
        ))}
        <button
          className="compare-button"
          disabled={!selected.length}
          onClick={() => setCompared(true)}
        >
          <Icon name="spark" size={18} />
          Compare {selected.length} {selected.length === 1 ? "item" : "items"}
        </button>
      </section>

      {compared && (
        <section className="comparison-results">
          <div className="smart-section-heading">
            <div>
              <h2>Best ways to buy</h2>
              <p>Prices include delivery</p>
            </div>
            <span className="comparison-saving">
              Save ₹{oneShopTotal - splitTotal}
            </span>
          </div>
          <article className="basket-option recommended-option">
            <span className="best-badge">
              <Icon name="spark" size={14} />
              Best overall value
            </span>
            <div className="basket-option-title">
              <div>
                <h3>Split between 2 local shops</h3>
                <p>Sharma General Store + Fresh Basket</p>
              </div>
              <strong>₹{splitTotal}</strong>
            </div>
            <ul>
              <li>
                <Icon name="check" size={15} />
                All {selected.length} items available
              </li>
              <li>
                <Icon name="clock" size={15} />
                Arrives in 25–35 min
              </li>
              <li>
                <Icon name="shield" size={15} />
                Save ₹{oneShopTotal - splitTotal} vs one-shop basket
              </li>
            </ul>
            <button onClick={() => onChoose(selected)}>
              Add recommended basket
            </button>
          </article>
          <article className="basket-option">
            <div className="basket-option-title">
              <div>
                <h3>Everything from one shop</h3>
                <p>Sharma General Store</p>
              </div>
              <strong>₹{oneShopTotal}</strong>
            </div>
            <ul>
              <li>
                <Icon name="check" size={15} />
                One delivery, less coordination
              </li>
              <li>
                <Icon name="clock" size={15} />
                Arrives in 18–25 min
              </li>
            </ul>
            <button onClick={() => onChoose(selected)}>Choose one shop</button>
          </article>
          <p className="comparison-note">
            Comparison uses current sample prices and listed availability. Final
            totals may change if stock changes.
          </p>
        </section>
      )}
    </div>
  )
}

function AssistantSheet({
  onClose,
  onSmartBasket,
  onSearch,
}: {
  onClose: () => void
  onSmartBasket: () => void
  onSearch: (value: string) => void
}) {
  return (
    <div className="assistant-backdrop" onClick={onClose}>
      <section
        className="assistant-sheet"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />
        <div className="assistant-heading">
          <span>
            <Icon name="spark" size={22} />
          </span>
          <div>
            <h2>Apna Assistant</h2>
            <p>Your shortcut to smarter local shopping</p>
          </div>
          <button aria-label="Close assistant" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="assistant-message">
          <p>
            Hi Ananya. I can compare a shopping list, find an item nearby, or
            help with your order.
          </p>
        </div>
        <div className="assistant-actions">
          <button onClick={onSmartBasket}>
            <span>
              <Icon name="spark" />
            </span>
            <span>
              <strong>Compare my weekly list</strong>
              <small>Find the best local basket</small>
            </span>
            <Icon name="chevron" />
          </button>
          <button onClick={() => onSearch("milk")}>
            <span>
              <Icon name="search" />
            </span>
            <span>
              <strong>Find milk under ₹30</strong>
              <small>Search nearby shops</small>
            </span>
            <Icon name="chevron" />
          </button>
          <button onClick={() => onSearch("fresh vegetables")}>
            <span>
              <Icon name="store" />
            </span>
            <span>
              <strong>Show fresh vegetables</strong>
              <small>From sellers near you</small>
            </span>
            <Icon name="chevron" />
          </button>
        </div>
        <button className="assistant-input" onClick={onSmartBasket}>
          <span>Ask about products, shops or savings</span>
          <Icon name="arrow" />
        </button>
        <small className="assistant-disclaimer">
          Suggestions use sample catalogue data in this prototype.
        </small>
      </section>
    </div>
  )
}

function AccountScreen({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <div className="account-screen">
      <section className="profile-card">
        <span>AS</span>
        <div>
          <h2>Ananya Sharma</h2>
          <p>ananya@example.com</p>
        </div>
        <Icon name="chevron" />
      </section>
      <section className="account-menu">
        <button onClick={() => navigate("tracking")}>
          <Icon name="bag" />
          <span>
            <strong>Your orders</strong>
            <small>Track or reorder</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button>
          <Icon name="pin" />
          <span>
            <strong>Saved addresses</strong>
            <small>Home · Gurugram, Haryana</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button>
          <Icon name="heart" />
          <span>
            <strong>Favourites</strong>
            <small>Products and local shops</small>
          </span>
          <Icon name="chevron" />
        </button>
        <button>
          <Icon name="help" />
          <span>
            <strong>Help and support</strong>
            <small>Orders, refunds and more</small>
          </span>
          <Icon name="chevron" />
        </button>
      </section>
      <section className="local-impact">
        <Icon name="store" />
        <div>
          <strong>54 local orders</strong>
          <p>You’ve supported neighbourhood businesses.</p>
        </div>
      </section>
    </div>
  )
}

function BottomNav({
  page,
  navigate,
  count,
}: {
  page: Page
  navigate: (page: Page) => void
  count: number
}) {
  const items: { icon: IconName; page: Page; label: string }[] = [
    { icon: "home", page: "home", label: "Home" },
    { icon: "grid", page: "categories", label: "Categories" },
    { icon: "spark", page: "smart", label: "Smart Basket" },
    { icon: "bag", page: "cart", label: "Cart" },
    { icon: "user", page: "account", label: "Account" },
  ]
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.page}
          className={page === item.page ? "active" : ""}
          onClick={() => navigate(item.page)}
        >
          <span>
            <Icon name={item.icon} />
            {item.page === "cart" && count > 0 && <i>{count}</i>}
          </span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  )
}
