import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { SectionTitle } from "../components/SectionTitle"
import { ShopCard } from "../components/ShopCard"
import { ProductCard } from "../components/ProductCard"
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

  // Everyday essentials (first 4 products)
  const everydayEssentials = products.slice(0, 4)

  // Fresh from nearby sellers (items 4, 5, 6: bread, tomato, apple)
  const freshItems = products.slice(4)

  return (
    <>
      <section className="quick-categories">
        {categories.map(([name, image]) => (
          <button
            key={name}
            onClick={() => navigate(`/categories`)}
            aria-label={`Category ${name}`}
          >
            <span>
              <img src={image} alt={name} loading="lazy" />
            </span>
            <small>{name}</small>
          </button>
        ))}
      </section>

      <button
        className="smart-basket-banner"
        onClick={() => navigate("/smart-basket")}
        aria-label="Open Smart Basket comparison"
      >
        <span className="smart-icon" aria-hidden="true">
          <Icon name="spark" />
        </span>
        <span>
          <small>SMART BASKET</small>
          <strong>Compare your full list, not just one item</strong>
          <em>See the best local shop combination in seconds</em>
        </span>
        <Icon name="chevron" />
      </button>

      <button
        className="offer-banner"
        onClick={() => navigate(`/shops/${shops[0]?.id || "shop_sharma"}`)}
        aria-label="View offer at Sharma General Store"
      >
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
          onAction={() => navigate("/shops")}
        />
        <div className="horizontal-shops">
          {shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              compact
              onOpen={() => navigate(`/shops/${shop.id}`)}
            />
          ))}
        </div>
      </section>

      <section className="screen-section">
        <SectionTitle
          title="Everyday essentials"
          action="See all"
          onAction={() => navigate("/categories")}
        />
        <div className="product-grid">
          {everydayEssentials.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onAdd={() => addItem(product.id)}
              onRemove={() => removeItem(product.id)}
              onOpen={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </section>

      <section className="screen-section">
        <SectionTitle title="Fresh from nearby sellers" />
        <div className="product-grid">
          {freshItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onAdd={() => addItem(product.id)}
              onRemove={() => removeItem(product.id)}
              onOpen={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default HomeScreen
