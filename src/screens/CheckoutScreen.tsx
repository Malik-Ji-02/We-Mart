import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { IconName } from "../types"
import { useCart } from "../state/CartContext"
import { useLocation } from "../state/LocationContext"
import { useOrders } from "../state/OrderContext"
import { formatPrice } from "../lib/format"

export function CheckoutScreen() {
  const navigate = useNavigate()
  const { subtotal, deliveryFee, total, cartGroups, clearCart, notify } = useCart()
  const { locationName } = useLocation()
  const { placeOrder } = useOrders()

  const [payment, setPayment] = useState("upi")

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

  function handlePlaceOrder() {
    const order = placeOrder({
      cartGroups,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress: locationName,
      paymentMethod: payment === "upi" ? "UPI" : payment === "card" ? "Card" : "Cash",
    })

    clearCart()
    notify("Order placed successfully")
    navigate(`/tracking/${order.id}`)
  }

  return (
    <div className="checkout-screen">
      <section className="payment-card">
        <h2>Choose payment method</h2>
        {methods.map((method) => (
          <button
            key={method.id}
            className={payment === method.id ? "selected" : ""}
            onClick={() => setPayment(method.id)}
            aria-label={`Select payment method ${method.title}`}
          >
            <span className="payment-icon" aria-hidden="true">
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
          <strong>{formatPrice(total)}</strong>
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

      <button
        className="checkout-button"
        onClick={handlePlaceOrder}
        aria-label={`Place order for ${formatPrice(total)}`}
      >
        <span>
          <small>PAYMENT</small>
          <strong>
            {payment === "upi" ? "UPI" : payment === "card" ? "Card" : "Cash"}
          </strong>
        </span>
        <b>Place order · {formatPrice(total)}</b>
        <Icon name="arrow" />
      </button>
    </div>
  )
}

export default CheckoutScreen
