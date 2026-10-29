import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { getCurrentUser } from "../data/user"
import { useOrders } from "../state/OrderContext"
import { useUI } from "../state/UIContext"

export function AccountScreen() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const { activeOrder } = useOrders()
  const { openComingSoon } = useUI()

  return (
    <div className="account-screen">
      <section className="profile-card">
        <span>{user.avatar}</span>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <Icon name="chevron" />
      </section>

      <section className="account-menu">
        <button
          onClick={() =>
            navigate(activeOrder ? `/tracking/${activeOrder.id}` : "/tracking")
          }
          aria-label="View your orders"
        >
          <Icon name="bag" />
          <span>
            <strong>Your orders</strong>
            <small>Track or reorder</small>
          </span>
          <Icon name="chevron" />
        </button>

        <button
          onClick={() =>
            openComingSoon(
              "Saved Addresses",
              "Manage your saved delivery locations, door numbers, and delivery instructions.",
            )
          }
          aria-label="View saved addresses"
        >
          <Icon name="pin" />
          <span>
            <strong>Saved addresses</strong>
            <small>Home · Gurugram, Haryana</small>
          </span>
          <Icon name="chevron" />
        </button>

        <button
          onClick={() =>
            openComingSoon(
              "Favourites",
              "Easily access and reorder your favorite local stores and daily essentials.",
            )
          }
          aria-label="View favourite shops and items"
        >
          <Icon name="heart" />
          <span>
            <strong>Favourites</strong>
            <small>Products and local shops</small>
          </span>
          <Icon name="chevron" />
        </button>

        <button
          onClick={() =>
            openComingSoon(
              "Help & Support",
              "Get quick answers, return requests, and contact support representatives.",
            )
          }
          aria-label="Open help and support"
        >
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
          <strong>{user.orderCount} local orders</strong>
          <p>You’ve supported neighbourhood businesses.</p>
        </div>
      </section>
    </div>
  )
}

export default AccountScreen
