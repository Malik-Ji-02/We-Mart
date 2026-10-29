import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { ProductCard } from "../components/ProductCard"
import { SectionTitle } from "../components/SectionTitle"
import { ShopMap } from "../components/ShopMap"
import { useCart } from "../state/CartContext"
import { getShopById, getShops } from "../data/shops"
import { getProductsByShop } from "../data/products"

export function ShopDetailsScreen() {
  const { shopId } = useParams<{ shopId: string }>()
  const navigate = useNavigate()
  const { cart, addItem, removeItem } = useCart()

  const shop = getShopById(shopId || "") || getShops()[0]
  const shopProducts = useMemo(() => getProductsByShop(shop.id), [shop.id])

  const [showMap, setShowMap] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Best sellers", "Dairy", "Staples"]

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return shopProducts
    if (selectedCategory === "Best sellers") return shopProducts.slice(0, 2)
    return shopProducts.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
    )
  }, [shopProducts, selectedCategory])

  return (
    <>
      <section className="shop-hero">
        <img src={shop.image} alt={shop.name} />
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
          <button
            onClick={() => setShowMap((prev) => !prev)}
            aria-label={showMap ? "Hide shop map" : "Show shop map"}
          >
            <Icon name="pin" size={16} />
            {showMap ? "Hide location" : "Shop information"}
          </button>
        </div>
      </section>

      {showMap && <ShopMap shop={shop} />}

      <div className="shop-offer">
        <strong>{shop.offer}</strong>
        <span>Minimum order ₹{shop.min}</span>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
            aria-label={`Filter by ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="screen-section">
        <SectionTitle title="Available now" />
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={() => addItem(product.id)}
                onRemove={() => removeItem(product.id)}
                onOpen={() => navigate(`/product/${product.id}`)}
              />
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1", color: "var(--text-2)", padding: "16px 0" }}>
              No products available in this category for {shop.name}.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default ShopDetailsScreen
