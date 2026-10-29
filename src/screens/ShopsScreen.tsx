import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { ShopCard } from "../components/ShopCard"
import { getShops } from "../data/shops"

export function ShopsScreen() {
  const navigate = useNavigate()
  const allShops = useMemo(() => getShops(), [])

  const [under30Only, setUnder30Only] = useState(false)
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false)
  const [topRatedOnly, setTopRatedOnly] = useState(false)

  const hasAnyFilter = under30Only || freeDeliveryOnly || topRatedOnly

  const filteredShops = useMemo(() => {
    return allShops.filter((shop) => {
      if (under30Only && (shop.eta.includes("35") || shop.eta.includes("40"))) {
        return false
      }
      if (freeDeliveryOnly && shop.fee > 0) {
        return false
      }
      if (topRatedOnly && shop.rating < 4.7) {
        return false
      }
      return true
    })
  }, [allShops, under30Only, freeDeliveryOnly, topRatedOnly])

  function resetFilters() {
    setUnder30Only(false)
    setFreeDeliveryOnly(false)
    setTopRatedOnly(false)
  }

  return (
    <>
      <div className="filter-chips">
        <button
          className={hasAnyFilter ? "active" : ""}
          onClick={() => (hasAnyFilter ? resetFilters() : setUnder30Only(true))}
          aria-label="Toggle all filters"
        >
          <Icon name="filter" size={16} />
          {hasAnyFilter ? "Clear filters" : "Filters"}
        </button>
        <button
          className={under30Only ? "active" : ""}
          onClick={() => setUnder30Only((prev) => !prev)}
          aria-label="Filter shops under 30 minutes delivery"
        >
          Under 30 min
        </button>
        <button
          className={freeDeliveryOnly ? "active" : ""}
          onClick={() => setFreeDeliveryOnly((prev) => !prev)}
          aria-label="Filter shops with free delivery"
        >
          Free delivery
        </button>
        <button
          className={topRatedOnly ? "active" : ""}
          onClick={() => setTopRatedOnly((prev) => !prev)}
          aria-label="Filter top rated shops"
        >
          Top rated
        </button>
      </div>

      <div className="stacked-shops">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onOpen={() => navigate(`/shops/${shop.id}`)}
            />
          ))
        ) : (
          <div className="empty-state">
            <span>
              <Icon name="store" size={30} />
            </span>
            <h2>No shops match these filters</h2>
            <p>Try clearing your active filters to see all nearby shops.</p>
            <button className="primary-button" onClick={resetFilters}>
              Reset filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default ShopsScreen
