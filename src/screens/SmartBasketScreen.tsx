import { useState, useMemo } from "react"
import { Icon } from "../icons/Icon"
import { useCart } from "../state/CartContext"
import { getProducts } from "../data/products"
import { calculateSmartBasketComparison } from "../lib/smartBasket"
import { formatPrice } from "../lib/format"

export function SmartBasketScreen() {
  const { addMultipleItems } = useCart()
  const allProducts = useMemo(() => getProducts(), [])

  const [selected, setSelected] = useState<string[]>(() =>
    allProducts.slice(0, 4).map((item) => item.id),
  )
  const [compared, setCompared] = useState(false)

  const selectedProducts = useMemo(
    () => allProducts.filter((product) => selected.includes(product.id)),
    [allProducts, selected],
  )

  const comparison = useMemo(
    () => calculateSmartBasketComparison(selectedProducts),
    [selectedProducts],
  )

  function toggleProduct(id: string) {
    setCompared(false)
    setSelected((current) =>
      current.includes(id)
        ? current.filter((productId) => productId !== id)
        : [...current, id],
    )
  }

  return (
    <div className="smart-screen">
      <section className="smart-intro">
        <span>
          <Icon name="spark" size={24} />
        </span>
        <div>
          <small>APNAMARKET SMART BASKET</small>
          <h2>Your list. The best local value.</h2>
          <p>
            We compare prices, availability and delivery fees across nearby
            shops.
          </p>
        </div>
      </section>

      <section className="smart-list">
        <div className="smart-section-heading">
          <div>
            <h2>Your shopping list</h2>
            <p>{selected.length} items selected</p>
          </div>
          <button
            onClick={() => setSelected(allProducts.map((p) => p.id))}
            aria-label="Select all products"
          >
            Select all
          </button>
        </div>

        {allProducts.map((product) => {
          const isSelected = selected.includes(product.id)
          return (
            <button
              className={`smart-list-item ${isSelected ? "selected" : ""}`}
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              aria-label={`Toggle ${product.name} in shopping list`}
            >
              <span className="smart-check">
                {isSelected && <Icon name="check" size={14} />}
              </span>
              <img src={product.image} alt={product.name} />
              <span>
                <strong>{product.name}</strong>
                <small>{product.unit}</small>
              </span>
              <b>{formatPrice(product.price)}</b>
            </button>
          )
        })}

        <button
          className="compare-button"
          disabled={!selected.length}
          onClick={() => setCompared(true)}
          aria-label="Compare selected items across shops"
        >
          <Icon name="spark" size={18} />
          Compare {selected.length} {selected.length === 1 ? "item" : "items"}
        </button>
      </section>

      {compared && (
        <section className="comparison-results">
          <div className="smart-section-heading">
            <div>
              <h2>Best ways to buy</h2>
              <p>Prices include delivery</p>
            </div>
            <span className="comparison-saving">
              Save {formatPrice(comparison.savings)}
            </span>
          </div>

          <article className="basket-option recommended-option">
            <span className="best-badge">
              <Icon name="spark" size={14} />
              Best overall value
            </span>
            <div className="basket-option-title">
              <div>
                <h3>Split between 2 local shops</h3>
                <p>Sharma General Store + Fresh Basket</p>
              </div>
              <strong>{formatPrice(comparison.splitTotal)}</strong>
            </div>
            <ul>
              <li>
                <Icon name="check" size={15} />
                All {selected.length} items available
              </li>
              <li>
                <Icon name="clock" size={15} />
                Arrives in 25–35 min
              </li>
              <li>
                <Icon name="shield" size={15} />
                Save {formatPrice(comparison.savings)} vs one-shop basket
              </li>
            </ul>
            <button
              onClick={() => addMultipleItems(selected)}
              aria-label="Add recommended basket to cart"
            >
              Add recommended basket
            </button>
          </article>

          <article className="basket-option">
            <div className="basket-option-title">
              <div>
                <h3>Everything from one shop</h3>
                <p>Sharma General Store</p>
              </div>
              <strong>{formatPrice(comparison.oneShopTotal)}</strong>
            </div>
            <ul>
              <li>
                <Icon name="check" size={15} />
                One delivery, less coordination
              </li>
              <li>
                <Icon name="clock" size={15} />
                Arrives in 18–25 min
              </li>
            </ul>
            <button
              onClick={() => addMultipleItems(selected)}
              aria-label="Choose one shop basket"
            >
              Choose one shop
            </button>
          </article>

          <p className="comparison-note">
            Comparison uses current sample prices and listed availability. Final
            totals may change if stock changes.
          </p>
        </section>
      )}
    </div>
  )
}

export default SmartBasketScreen
