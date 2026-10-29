import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import {
  Badge,
  Rating,
  Chip,
  Button,
  IconButton,
  Sheet,
  EmptyState,
  ProductCard,
  ShopAvatar,
} from "../components/ui"
import { ShopMap } from "../components/ShopMap"
import { useCart } from "../state/CartContext"
import { getShopById, getShops } from "../data/shops"
import { getProductsByShop } from "../data/products"
import { isShopOpen, formatPrice } from "../lib/format"

export function ShopDetailsScreen() {
  const { shopId } = useParams<{ shopId: string }>()
  const navigate = useNavigate()
  const { cart, addItem, removeItem } = useCart()

  const shop = getShopById(shopId || "") || getShops()[0]
  const shopProducts = useMemo(() => getProductsByShop(shop.id), [shop.id])
  const isOpen = isShopOpen(shop)

  const [directionsOpen, setDirectionsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Best sellers", "Dairy", "Staples", "Snacks"]

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return shopProducts
    if (selectedCategory === "Best sellers") return shopProducts.slice(0, 2)
    return shopProducts.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
    )
  }, [shopProducts, selectedCategory])

  const freeDeliveryText =
    shop.fee === 0
      ? "Free delivery"
      : shop.min
      ? `Free delivery over ${formatPrice(shop.min)}`
      : `${formatPrice(shop.fee)} delivery fee`

  return (
    <div className="shop-details-screen">
      {/* Compact Header: back, ShopAvatar, name, verified badge, rating, distance, ETA, open hours, free-delivery, Call & Directions */}
      <section className="shop-compact-header">
        <div className="shop-compact-top">
          <IconButton
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="shop-back-btn"
          >
            <Icon name="back" />
          </IconButton>
          <ShopAvatar name={shop.name} size="lg" />
          <div className="shop-compact-info">
            <div className="shop-title-row">
              <h1>{shop.name}</h1>
              <Badge variant="verified">Verified</Badge>
            </div>
            <p className="shop-compact-type">{shop.type}</p>
            <div className="shop-compact-meta">
              <Rating rating={shop.rating} />
              <span>·</span>
              <span>{shop.distance}</span>
              <span>·</span>
              <span>{shop.eta}</span>
            </div>
          </div>
        </div>

        <div className="shop-compact-details-row">
          <Badge
            variant={isOpen ? "open" : "closed"}
            opensAt={shop.opensAt}
          >
            {isOpen ? `Open · Closes ${shop.closesAt}` : `Closed · Opens at ${shop.opensAt}`}
          </Badge>
          <span className="shop-threshold-text">{freeDeliveryText}</span>
        </div>

        {shop.offer && (
          <div className="shop-offer-pill">
            <Icon name="spark" size={14} aria-hidden="true" />
            <span>{shop.offer}</span>
          </div>
        )}

        <div className="shop-header-actions">
          <a
            href={`tel:${shop.phone}`}
            className="ui-btn ui-btn-sm ui-btn-secondary shop-action-link"
            aria-label={`Call ${shop.name} at ${shop.phone}`}
          >
            <Icon name="phone" size={16} aria-hidden="true" />
            <span>Call</span>
          </a>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDirectionsOpen(true)}
            aria-label={`View directions to ${shop.name}`}
            className="shop-action-link"
          >
            <Icon name="pin" size={16} aria-hidden="true" />
            <span>Directions</span>
          </Button>
        </div>
      </section>

      {/* Directions Sheet with OpenStreetMap - only loaded when opened! */}
      <Sheet
        isOpen={directionsOpen}
        onClose={() => setDirectionsOpen(false)}
        title={`Directions: ${shop.name}`}
      >
        <div className="directions-sheet-content">
          <p className="shop-sheet-address">
            <Icon name="pin" size={16} aria-hidden="true" />
            <span>{shop.address}</span>
          </p>
          {directionsOpen && <ShopMap shop={shop} />}
        </div>
      </Sheet>

      {/* Sticky category tabs */}
      <div
        className="shop-sticky-tabs"
        role="tablist"
        aria-label="Product categories"
      >
        <div className="shop-tabs-scroll">
          {categories.map((cat) => (
            <Chip
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              aria-label={`Category ${cat}`}
              role="tab"
            >
              {cat}
            </Chip>
          ))}
        </div>
      </div>

      {/* 2-column product grid; closed shop = ADD disabled with "Opens at h:mm" */}
      <section className="shop-products-section">
        {filteredProducts.length > 0 ? (
          <div className="shop-product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={() => addItem(product.id)}
                onRemove={() => removeItem(product.id)}
                onOpen={() => navigate(`/product/${product.id}`)}
                disabled={!isOpen}
                disabledLabel={!isOpen ? `Opens at ${shop.opensAt}` : undefined}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Icon name="bag" size={32} />}
            title="No items found"
            body={`There are currently no products available in "${selectedCategory}" from ${shop.name}.`}
            actionLabel="View all products"
            onAction={() => setSelectedCategory("All")}
          />
        )}
      </section>
    </div>
  )
}

export default ShopDetailsScreen
