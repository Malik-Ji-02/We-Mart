import { useState, useMemo, useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Icon } from "../icons/Icon"
import {
  SearchBar,
  Chip,
  SectionHeader,
  ProductCard,
  ShopCard,
  EmptyState,
} from "../components/ui"
import { useCart } from "../state/CartContext"
import { getProducts } from "../data/products"
import { getShops } from "../data/shops"
import { getCategories } from "../data/categories"

const RECENT_SEARCHES = ["Milk", "Fresh Basket", "Atta 5 kg", "Bread"]
const SUGGESTED_TERMS = ["Milk", "Bread", "Sharma General Store"]

export function SearchScreen() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { cart, addItem, removeItem } = useCart()

  const allProducts = useMemo(() => getProducts(), [])
  const allShops = useMemo(() => getShops(), [])
  const categories = useMemo(() => getCategories(), [])

  const query = searchParams.get("q") || searchParams.get("category") || ""
  const [searchTerm, setSearchTerm] = useState(query)
  const [prevQuery, setPrevQuery] = useState(query)

  if (query !== prevQuery) {
    setPrevQuery(query)
    setSearchTerm(query)
  }

  const [under30Only, setUnder30Only] = useState(false)
  const [offersOnly, setOffersOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none")

  // Debounced search input handler
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearchChange = (newVal: string) => {
    setSearchTerm(newVal)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      const trimmed = newVal.trim()
      if (trimmed) {
        setSearchParams({ q: trimmed })
      } else {
        setSearchParams({})
      }
    }, 250)
  }

  const handleClearSearch = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    setSearchTerm("")
    setSearchParams({})
  }

  const handleSelectSearch = (term: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    setSearchTerm(term)
    setSearchParams({ q: term })
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const resetFilters = () => {
    setUnder30Only(false)
    setOffersOnly(false)
    setSortOrder("none")
  }

  const hasAnyFilter = under30Only || offersOnly || sortOrder !== "none"

  const resultProducts = useMemo(() => {
    if (!query.trim()) return []

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
    if (!query.trim()) return []

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

  return (
    <div className="search-screen-content">
      {/* Autofocused search bar */}
      <section className="search-bar-section">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          placeholder="Search items, categories or local shops"
          autoFocus
          aria-label="Search input"
        />
      </section>

      {/* When results are present, show Filter and Sort chips */}
      {query.trim().length > 0 && hasResults && (
        <div className="filter-chips">
          <Chip
            active={hasAnyFilter}
            onClick={resetFilters}
            icon={<Icon name="filter" size={16} />}
            aria-label="Toggle or reset all filters"
          >
            {hasAnyFilter ? "Clear filters" : "Filters"}
          </Chip>
          <Chip
            active={sortOrder !== "none"}
            onClick={() =>
              setSortOrder((prev) =>
                prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
              )
            }
            icon={<Icon name="sort" size={16} />}
            aria-label="Toggle price sort order"
          >
            {sortOrder === "asc"
              ? "Price: Low to high"
              : sortOrder === "desc"
              ? "Price: High to low"
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
      )}

      {/* Initial state: recent searches as chips + category shortcuts */}
      {!query.trim() && (
        <div className="search-initial-view">
          <section className="screen-section">
            <SectionHeader title="Recent searches" />
            <div className="recent-search-chips">
              {RECENT_SEARCHES.map((term) => (
                <Chip
                  key={term}
                  onClick={() => handleSelectSearch(term)}
                  icon={<Icon name="clock" size={14} />}
                  aria-label={`Search again for ${term}`}
                >
                  {term}
                </Chip>
              ))}
            </div>
          </section>

          <section className="screen-section">
            <SectionHeader title="Category shortcuts" />
            <div className="search-category-grid">
              {categories.map(([name, image]) => (
                <button
                  key={name}
                  className="search-category-tile"
                  onClick={() => handleSelectSearch(name)}
                  aria-label={`Explore category ${name}`}
                >
                  <span className="search-category-img">
                    <img src={image} alt="" loading="lazy" />
                  </span>
                  <span className="search-category-name">{name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Results view: grouped into Shops and Products */}
      {query.trim().length > 0 && hasResults && (
        <div className="search-results-view">
          {resultShops.length > 0 && (
            <section className="screen-section">
              <SectionHeader title={`Shops matching “${query}” (${resultShops.length})`} />
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
              <SectionHeader title={`Products matching “${query}” (${resultProducts.length})`} />
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
        </div>
      )}

      {/* Empty state: EmptyState with short message and 3 suggestions */}
      {query.trim().length > 0 && !hasResults && (
        <div className="search-empty-view">
          <EmptyState
            icon={<Icon name="search" size={32} />}
            title="No matches found"
            body={`We couldn't find items or shops matching “${query}”.`}
          />
          <div className="search-suggestions-card">
            <strong>Suggestions:</strong>
            <ul>
              <li>Check your spelling for any typos</li>
              <li>Try broader terms like milk, bread, or fruits</li>
              <li>Search for local shop names like Sharma General Store</li>
            </ul>
            <div className="search-suggestion-chips">
              {SUGGESTED_TERMS.map((term) => (
                <Chip
                  key={term}
                  onClick={() => handleSelectSearch(term)}
                  aria-label={`Try searching for ${term}`}
                >
                  {term}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchScreen
