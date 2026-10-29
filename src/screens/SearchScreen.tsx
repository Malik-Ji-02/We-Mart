import { useState, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { ProductCard } from "../components/ProductCard"
import { ShopCard } from "../components/ShopCard"
import { SectionTitle } from "../components/SectionTitle"
import { Chip, EmptyState } from "../components/ui"
import { useCart } from "../state/CartContext"
import { getProducts } from "../data/products"
import { getShops } from "../data/shops"

export function SearchScreen() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { cart, addItem, removeItem } = useCart()

  const allProducts = useMemo(() => getProducts(), [])
  const allShops = useMemo(() => getShops(), [])

  const query = searchParams.get("q") || searchParams.get("category") || ""

  const [under30Only, setUnder30Only] = useState(false)
  const [offersOnly, setOffersOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none")

  function handleRecentSearch(searchTerm: string) {
    setSearchParams({ q: searchTerm })
  }

  const resultProducts = useMemo(() => {
    let prods = allProducts.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )

    if (offersOnly) {
      prods = prods.filter((p) => p.mrp > p.price)
    }

    if (under30Only) {
      prods = prods.filter((p) => {
        const shop = allShops.find((s) => s.id === p.shop)
        return shop && !shop.eta.includes("35") && !shop.eta.includes("40")
      })
    }

    if (sortOrder === "asc") {
      prods = [...prods].sort((a, b) => a.price - b.price)
    } else if (sortOrder === "desc") {
      prods = [...prods].sort((a, b) => b.price - a.price)
    }

    return prods
  }, [allProducts, allShops, query, offersOnly, under30Only, sortOrder])

  const resultShops = useMemo(() => {
    let sList = allShops.filter((shop) =>
      `${shop.name} ${shop.type}`.toLowerCase().includes(query.toLowerCase()),
    )

    if (under30Only) {
      sList = sList.filter((s) => !s.eta.includes("35") && !s.eta.includes("40"))
    }

    if (offersOnly) {
      sList = sList.filter((s) => s.offer.length > 0)
    }

    return sList
  }, [allShops, query, under30Only, offersOnly])

  const hasResults = resultProducts.length > 0 || resultShops.length > 0
  const hasAnyFilter = under30Only || offersOnly || sortOrder !== "none"

  return (
    <>
      <div className="filter-chips">
        <Chip
          active={hasAnyFilter}
          onClick={() => {
            setUnder30Only(false)
            setOffersOnly(false)
            setSortOrder("none")
          }}
          icon={<Icon name="filter" size={16} />}
          aria-label="Toggle all filters"
        >
          Filters
        </Chip>
        <Chip
          active={sortOrder !== "none"}
          onClick={() =>
            setSortOrder((prev) => (prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"))
          }
          icon={<Icon name="sort" size={16} />}
          aria-label="Toggle sort order"
        >
          {sortOrder === "asc"
            ? "Price: Low to High"
            : sortOrder === "desc"
              ? "Price: High to Low"
              : "Sort"}
        </Chip>
        <Chip
          active={under30Only}
          onClick={() => setUnder30Only((prev) => !prev)}
          aria-label="Filter results under 30 minutes"
        >
          Under 30 min
        </Chip>
        <Chip
          active={offersOnly}
          onClick={() => setOffersOnly((prev) => !prev)}
          aria-label="Filter results with offers"
        >
          Offers
        </Chip>
      </div>

      {!query && (
        <div className="recent-searches">
          <SectionTitle title="Recent searches" />
          <button type="button" onClick={() => handleRecentSearch("Milk")}>
            <span>Milk</span> <Icon name="chevron" size={14} />
          </button>
          <button type="button" onClick={() => handleRecentSearch("Fresh Basket")}>
            <span>Fresh Basket</span> <Icon name="chevron" size={14} />
          </button>
          <button type="button" onClick={() => handleRecentSearch("Atta 5 kg")}>
            <span>Atta 5 kg</span> <Icon name="chevron" size={14} />
          </button>
        </div>
      )}

      {query && hasResults ? (
        <>
          {resultShops.length > 0 && (
            <section className="screen-section">
              <SectionTitle title={`Shops for “${query}”`} />
              <div className="stacked-shops">
                {resultShops.map((shop) => (
                  <ShopCard
                    key={shop.id}
                    shop={shop}
                    onOpen={() => navigate(`/shops/${shop.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {resultProducts.length > 0 && (
            <section className="screen-section">
              <SectionTitle title={`Products for “${query}”`} />
              <div className="product-grid">
                {resultProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id] || 0}
                    onAdd={() => addItem(product.id)}
                    onRemove={() => removeItem(product.id)}
                    onOpen={() => navigate(`/product/${product.id}`)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        query && (
          <EmptyState
            icon={<Icon name="search" size={32} />}
            title="No matches nearby"
            body="Try a product, category, or shop name."
          />
        )
      )}
    </>
  )
}

export default SearchScreen
