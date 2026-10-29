import { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import {
  Price,
  Rating,
  Badge,
  Button,
  IconButton,
  ProductCard,
  ProductImage,
  QuantityControl,
  SectionHeader,
  ShopAvatar,
  StickyActionBar,
} from "../components/ui"
import { useCart } from "../state/CartContext"
import { getProductById, getProducts } from "../data/products"
import { getShopById, getShops } from "../data/shops"
import { calculateDiscount, formatPrice, isShopOpen } from "../lib/format"

export function ProductDetailsScreen() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { cart, addItem, removeItem } = useCart()

  const allProducts = useMemo(() => getProducts(), [])
  const product = getProductById(productId || "") || allProducts[0]
  const shop = getShopById(product.shop) || getShops()[0]

  const quantity = cart[product.id] || 0
  const discount = calculateDiscount(product.price, product.mrp)
  const isShopCurrentlyOpen = isShopOpen(shop)
  const isOutOfStock =
    (product as unknown as { inStock?: boolean }).inStock === false ||
    (product as unknown as { stockCount?: number }).stockCount === 0

  const moreFromShop = useMemo(() => {
    return allProducts.filter(
      (p) => p.shop === shop.id && p.id !== product.id,
    )
  }, [allProducts, shop.id, product.id])

  const productDescription = (
    product as unknown as { description?: string }
  ).description

  return (
    <div className="product-details-screen">
      {/* Back button overlay */}
      <div className="product-top-nav">
        <IconButton
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="product-back-btn"
        >
          <Icon name="back" />
        </IconButton>
      </div>

      {/* 1:1 Aspect Ratio Full Width Product Image */}
      <div className="product-image-container">
        <ProductImage
          src={product.image}
          alt={product.name}
          widthPx={800}
        />
        {discount >= 10 && (
          <span className="product-floating-discount">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Core details: name, unit, price */}
      <section className="product-main-info">
        <small className="product-category-tag">{product.category}</small>
        <h1 className="product-name-title">{product.name}</h1>
        <p className="product-unit-text">{product.unit}</p>

        <div className="product-price-row">
          <Price price={product.price} mrp={product.mrp} size="lg" />
          <span className="product-tax-note">Inclusive of all taxes</span>
        </div>
      </section>

      {/* Seller card: ShopAvatar, shop name, verified, rating, distance, ETA, open status, "View shop" */}
      <section className="product-seller-section">
        <div
          className="seller-card"
          onClick={() => navigate(`/shops/${shop.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(`/shops/${shop.id}`)
            }
          }}
          aria-label={`Sold by ${shop.name}, rating ${shop.rating}, ETA ${shop.eta}. Tap to view shop.`}
        >
          <ShopAvatar name={shop.name} size="md" />
          <div className="seller-card-details">
            <div className="seller-header">
              <strong className="seller-name">{shop.name}</strong>
              <Badge variant="verified">Verified</Badge>
            </div>
            <div className="seller-metrics">
              <Rating rating={shop.rating} />
              <span>·</span>
              <span>{shop.distance}</span>
              <span>·</span>
              <span>{shop.eta}</span>
            </div>
            <div className="seller-status-row">
              <Badge
                variant={isShopCurrentlyOpen ? "open" : "closed"}
                opensAt={shop.opensAt}
              >
                {isShopCurrentlyOpen ? `Open · Closes ${shop.closesAt}` : `Opens at ${shop.opensAt}`}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/shops/${shop.id}`)
            }}
            className="seller-view-btn"
          >
            <span>View shop</span>
            <Icon name="chevron" size={14} aria-hidden="true" />
          </Button>
        </div>
      </section>

      {/* Short description if the data has one (not invented) */}
      {productDescription && (
        <section className="product-description-section">
          <h2>Product description</h2>
          <p>{productDescription}</p>
        </section>
      )}

      {/* Trust & policy attributes */}
      <section className="product-trust-section">
        <div className="trust-item">
          <Icon name="shield" size={16} aria-hidden="true" />
          <span>Local kirana partner verified</span>
        </div>
        <div className="trust-item">
          <Icon name="check" size={16} aria-hidden="true" />
          <span>Quality guaranteed or replacement at door</span>
        </div>
      </section>

      {/* "More from this shop" horizontal row */}
      {moreFromShop.length > 0 && (
        <section className="screen-section more-from-shop-section">
          <SectionHeader
            title={`More from ${shop.name}`}
            actionLabel="See all"
            onAction={() => navigate(`/shops/${shop.id}`)}
          />
          <div className="horizontal-products">
            {moreFromShop.map((item) => (
              <div key={item.id} className="horizontal-product-slot">
                <ProductCard
                  product={item}
                  quantity={cart[item.id] || 0}
                  onAdd={() => addItem(item.id)}
                  onRemove={() => removeItem(item.id)}
                  onOpen={() => navigate(`/product/${item.id}`)}
                  disabled={!isShopCurrentlyOpen}
                  disabledLabel={!isShopCurrentlyOpen ? `Opens at ${shop.opensAt}` : undefined}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* StickyActionBar with ADD / stepper and the price. Disabled if closed or out of stock */}
      <StickyActionBar>
        <div className="product-action-price-block">
          <span className="action-price-label">Price</span>
          <strong className="action-price-val">{formatPrice(product.price)}</strong>
        </div>
        <div className="product-action-btn-block">
          {!isShopCurrentlyOpen ? (
            <Button variant="primary" size="md" disabled fullWidth>
              Opens at {shop.opensAt}
            </Button>
          ) : isOutOfStock ? (
            <Button variant="primary" size="md" disabled fullWidth>
              Out of stock
            </Button>
          ) : quantity === 0 ? (
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => addItem(product.id)}
              aria-label={`Add ${product.name} to cart for ${formatPrice(product.price)}`}
            >
              Add to cart
            </Button>
          ) : (
            <QuantityControl
              quantity={quantity}
              onAdd={() => addItem(product.id)}
              onIncrement={() => addItem(product.id)}
              onDecrement={() => removeItem(product.id)}
              productName={product.name}
            />
          )}
        </div>
      </StickyActionBar>
    </div>
  )
}

export default ProductDetailsScreen
