import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import {
  Button,
  SearchBar,
  SectionHeader,
  ShopCard,
  ProductCard,
  Skeleton,
} from "../components/ui"
import { useCart } from "../state/CartContext"
import { getShops } from "../data/shops"
import { getProducts } from "../data/products"
import { getCategories } from "../data/categories"

export function HomeScreen() {
  const navigate = useNavigate()
  const { cart, addItem, removeItem } = useCart()

  const shops = getShops()
  const products = getProducts()
  const categories = getCategories()

  // Split products by purpose
  // 1. Popular near you: everyday dairy, staples, snacks
  const popularItems = products.slice(0, 4)
  // 2. Fresh today: fruits, vegetables, artisan bakery
  const freshItems = products.slice(4)

  return (
    <div className="home-screen-content">
      {/* 2. Search bar */}
      <section className="home-search-section">
        <SearchBar
          value=""
          placeholder="Search milk, atta, snacks or local shops"
          onFocus={() => navigate("/search")}
          aria-label="Search products and neighbourhood shops"
        />
      </section>

      {/* 3. Horizontal category shortcuts */}
      <section className="home-category-shortcuts" aria-label="Category shortcuts">
        <div className="category-scroll-track">
          {categories.map(([name, image]) => (
            <button
              key={name}
              className="category-shortcut-chip"
              onClick={() => navigate(`/categories?c=${encodeURIComponent(name.toLowerCase())}`)}
              aria-label={`Category ${name}`}
            >
              <span className="category-shortcut-icon">
                <img src={image} alt="" loading="lazy" />
              </span>
              <span className="category-shortcut-name">{name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. One slim promo banner (maximum 128px tall, one headline, one action, tagline lives here) */}
      <section className="home-promo-section">
        <div
          className="home-slim-promo"
          onClick={() => navigate(`/shops/${shops[0]?.id || "shop_sharma"}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(`/shops/${shops[0]?.id || "shop_sharma"}`)
            }
          }}
          aria-label="Offer: ₹50 off at Sharma General Store. Use code LOCAL50"
        >
          <div className="home-promo-text">
            <span className="home-promo-tagline">Connecting you to neighbourhood shops</span>
            <strong className="home-promo-headline">₹50 off at Sharma Store</strong>
            <span className="home-promo-sub">Orders above ₹399 · Code LOCAL50</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/shops/${shops[0]?.id || "shop_sharma"}`)
            }}
            className="home-promo-button"
          >
            Shop now
          </Button>
        </div>
      </section>

      {/* 5. "Shops near you": horizontal ShopCard compact row with open/closed, ETA, rating, distance */}
      <section className="screen-section">
        <SectionHeader
          title="Shops near you"
          actionLabel="See all"
          onAction={() => navigate("/shops")}
        />
        <div className="horizontal-shops">
          {shops.length === 0 ? (
            <>
              <Skeleton variant="shop-card" />
              <Skeleton variant="shop-card" />
            </>
          ) : (
            shops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                compact
                onOpen={() => navigate(`/shops/${shop.id}`)}
              />
            ))
          )}
        </div>
      </section>

      {/* 6. Smart Basket entry as a slim single-row card (not a large block) */}
      <section className="home-smart-basket-section">
        <button
          className="home-smart-basket-slim"
          onClick={() => navigate("/smart-basket")}
          aria-label="Open Smart Basket: Compare full list across local shops"
        >
          <span className="home-smart-icon" aria-hidden="true">
            <Icon name="spark" size={20} />
          </span>
          <span className="home-smart-body">
            <strong>Smart Basket</strong>
            <span>Compare full list across local shops</span>
          </span>
          <span className="home-smart-tag">
            <span>Compare</span>
            <Icon name="arrow" size={14} aria-hidden="true" />
          </span>
        </button>
      </section>

      {/* 7. Product rows by purpose ("Popular near you", "Fresh today"), horizontal scroll, cards about 140px wide */}
      <section className="screen-section">
        <SectionHeader
          title="Popular near you"
          actionLabel="See all"
          onAction={() => navigate("/categories")}
        />
        <div className="horizontal-products">
          {popularItems.length === 0 ? (
            <>
              <div className="horizontal-product-slot"><Skeleton variant="product-card" /></div>
              <div className="horizontal-product-slot"><Skeleton variant="product-card" /></div>
              <div className="horizontal-product-slot"><Skeleton variant="product-card" /></div>
            </>
          ) : (
            popularItems.map((product) => (
              <div key={product.id} className="horizontal-product-slot">
                <ProductCard
                  product={product}
                  quantity={cart[product.id] || 0}
                  onAdd={() => addItem(product.id)}
                  onRemove={() => removeItem(product.id)}
                  onOpen={() => navigate(`/product/${product.id}`)}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <section className="screen-section">
        <SectionHeader
          title="Fresh today"
          actionLabel="See all"
          onAction={() => navigate("/categories")}
        />
        <div className="horizontal-products">
          {freshItems.length === 0 ? (
            <>
              <div className="horizontal-product-slot"><Skeleton variant="product-card" /></div>
              <div className="horizontal-product-slot"><Skeleton variant="product-card" /></div>
              <div className="horizontal-product-slot"><Skeleton variant="product-card" /></div>
            </>
          ) : (
            freshItems.map((product) => (
              <div key={product.id} className="horizontal-product-slot">
                <ProductCard
                  product={product}
                  quantity={cart[product.id] || 0}
                  onAdd={() => addItem(product.id)}
                  onRemove={() => removeItem(product.id)}
                  onOpen={() => navigate(`/product/${product.id}`)}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default HomeScreen
