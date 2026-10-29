import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { QuantityControl } from "../components/QuantityControl"
import { useCart } from "../state/CartContext"
import { useLocation } from "../state/LocationContext"
import { formatPrice } from "../lib/format"

export function CartScreen() {
  const navigate = useNavigate()
  const {
    cartGroups,
    subtotal,
    deliveryFee,
    total,
    addItem,
    removeItem,
  } = useCart()

  const { locationName, openLocationGate } = useLocation()

  if (cartGroups.length === 0) {
    return (
      <div className="empty-state cart-empty">
        <span>
          <Icon name="bag" size={30} />
        </span>
        <h2>Your cart is empty</h2>
        <p>Add everyday essentials from a shop nearby.</p>
        <button
          className="primary-button"
          onClick={() => navigate("/")}
          aria-label="Start shopping"
        >
          Start shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart-screen">
      <button
        className="address-card"
        onClick={openLocationGate}
        aria-label="Change delivery address"
      >
        <span>
          <Icon name="pin" />
        </span>
        <span>
          <small>Delivering to Home</small>
          <strong>{locationName}</strong>
        </span>
        <Icon name="chevron" />
      </button>

      {cartGroups.map((group) => (
        <section className="cart-group" key={group.shop.id}>
          <div className="cart-shop">
            <span>
              <Icon name="store" />
            </span>
            <div>
              <strong>{group.shop.name}</strong>
              <small>
                {group.shop.eta} · {group.shop.distance}
              </small>
            </div>
            <Icon name="shield" size={16} />
          </div>

          {group.items.map(({ product, quantity }) => (
            <div className="cart-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <small>{product.unit}</small>
                <b>{formatPrice(product.price * quantity)}</b>
              </div>
              <QuantityControl
                value={quantity}
                onAdd={() => addItem(product.id)}
                onRemove={() => removeItem(product.id)}
              />
            </div>
          ))}

          <div className="shop-subtotal">
            <span>Shop subtotal</span>
            <strong>{formatPrice(group.shopSubtotal)}</strong>
            <span>Delivery fee</span>
            <strong>
              {group.deliveryFee ? formatPrice(group.deliveryFee) : "FREE"}
            </strong>
          </div>
        </section>
      ))}

      <section className="bill-card">
        <h2>Bill details</h2>
        <div>
          <span>Item total</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div>
          <span>Delivery fees</span>
          <strong>{deliveryFee ? formatPrice(deliveryFee) : "FREE"}</strong>
        </div>
        <div className="bill-total">
          <span>To pay</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </section>

      <button
        className="checkout-button"
        onClick={() => navigate("/checkout")}
        aria-label={`Proceed to payment: ${formatPrice(total)}`}
      >
        <span>
          <small>TOTAL</small>
          <strong>{formatPrice(total)}</strong>
        </span>
        <b>Choose payment</b>
        <Icon name="arrow" />
      </button>
    </div>
  )
}

export default CartScreen
