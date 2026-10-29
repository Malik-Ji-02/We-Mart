import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { ShopCard } from "../components/ShopCard"
import { Chip, EmptyState } from "../components/ui"
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
        <Chip
          active={hasAnyFilter}
          onClick={() => (hasAnyFilter ? resetFilters() : setUnder30Only(true))}
          icon={<Icon name="filter" size={16} />}
          aria-label="Toggle all filters"
        >
          {hasAnyFilter ? "Clear filters" : "Filters"}
        </Chip>
        <Chip
          active={under30Only}
          onClick={() => setUnder30Only((prev) => !prev)}
          aria-label="Filter shops under 30 minutes delivery"
        >
          Under 30 min
        </Chip>
        <Chip
          active={freeDeliveryOnly}
          onClick={() => setFreeDeliveryOnly((prev) => !prev)}
          aria-label="Filter shops with free delivery"
        >
          Free delivery
        </Chip>
        <Chip
          active={topRatedOnly}
          onClick={() => setTopRatedOnly((prev) => !prev)}
          aria-label="Filter top rated shops"
        >
          Top rated
        </Chip>
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
          <EmptyState
            icon={<Icon name="store" size={32} />}
            title="No shops match these filters"
            body="Try clearing your active filters to see all nearby shops."
            actionLabel="Reset filters"
            onAction={resetFilters}
          />
        )}
      </div>
    </>
  )
}

export default ShopsScreen
