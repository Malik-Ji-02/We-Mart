import { useParams } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { useOrders } from "../state/OrderContext"
import { useUI } from "../state/UIContext"

export function TrackingScreen() {
  const { orderId } = useParams<{ orderId: string }>()
  const { getOrderById, activeOrder } = useOrders()
  const { openComingSoon } = useUI()

  const order = (orderId ? getOrderById(orderId) : null) || activeOrder

  const primaryShop = order?.shops[0] || {
    name: "Sharma General Store",
    phone: "+919876543210",
  }

  const orderNumber = order ? `#${order.id}` : "#AM2841"
  const itemCount = order ? order.items.reduce((s, i) => s + i.quantity, 0) : 3

  return (
    <div className="tracking-screen">
      <section className="eta-card">
        <small>ARRIVING IN</small>
        <strong>{order?.estimatedArrival || "18–24 min"}</strong>
        <p>Your order is being packed</p>
      </section>

      <section className="tracking-map" aria-label="Order delivery route simulation">
        <div className="map-road road-one" />
        <div className="map-road road-two" />
        <span className="map-shop" aria-label="Shop location">
          <Icon name="store" />
        </span>
        <span className="map-home" aria-label="Home location">
          <Icon name="home" />
        </span>
        <i aria-label="Delivery partner marker" />
      </section>

      <section className="status-card">
        <h2>Order status</h2>
        <div className="status-step complete">
          <span>
            <Icon name="check" size={15} />
          </span>
          <div>
            <strong>Order confirmed</strong>
            <small>{primaryShop.name} accepted your order</small>
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
        <span className="seller-logo" aria-hidden="true">
          <Icon name="store" />
        </span>
        <div>
          <small>ORDER FROM</small>
          <strong>{primaryShop.name}</strong>
          <p>
            Order {orderNumber} · {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <a
          href={`tel:${primaryShop.phone}`}
          aria-label={`Call ${primaryShop.name}`}
          style={{
            width: "44px",
            height: "44px",
            display: "grid",
            placeItems: "center",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            color: "var(--primary)",
            textDecoration: "none",
          }}
        >
          <Icon name="phone" />
        </a>
      </section>

      <button
        className="help-button"
        onClick={() =>
          openComingSoon(
            "Help with Order",
            `Need assistance with order ${orderNumber}? A support agent will call your registered number shortly.`,
          )
        }
        aria-label="Request help with this order"
      >
        <Icon name="help" />
        Need help with this order?
      </button>
    </div>
  )
}

export default TrackingScreen
