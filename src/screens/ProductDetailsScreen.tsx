import { useParams, useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { QuantityControl } from "../components/QuantityControl"
import { useCart } from "../state/CartContext"
import { getProductById, getProducts } from "../data/products"
import { getShopById, getShops } from "../data/shops"
import { calculateDiscount, formatPrice } from "../lib/format"

export function ProductDetailsScreen() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { cart, addItem, removeItem } = useCart()

  const product = getProductById(productId || "") || getProducts()[0]
  const shop = getShopById(product.shop) || getShops()[0]

  const quantity = cart[product.id] || 0
  const discount = calculateDiscount(product.price, product.mrp)

  return (
    <div className="product-detail">
      <div className="detail-image">
        <img src={product.image} alt={product.name} />
        {discount > 0 && <span>{discount}% OFF</span>}
      </div>

      <section>
        <small>{product.category}</small>
        <h1>{product.name}</h1>
        <p>{product.unit}</p>
        <div className="detail-price">
          <strong>{formatPrice(product.price)}</strong>
          {product.mrp > product.price && <del>{formatPrice(product.mrp)}</del>}
          <span>Inclusive of all taxes</span>
        </div>
      </section>

      <button
        className="seller-card"
        onClick={() => navigate(`/shops/${shop.id}`)}
        aria-label={`View shop ${shop.name}`}
      >
        <span className="seller-logo" aria-hidden="true">
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
          <strong>{formatPrice(product.price)}</strong>
          <small>From {shop.name}</small>
        </div>
        <QuantityControl
          value={quantity}
          onAdd={() => addItem(product.id)}
          onRemove={() => removeItem(product.id)}
        />
      </div>
    </div>
  )
}

export default ProductDetailsScreen
