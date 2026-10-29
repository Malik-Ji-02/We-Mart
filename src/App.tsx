import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation as useRouterLocation,
  useNavigate,
} from "react-router-dom"
import { Icon } from "./icons/Icon"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { LocationProvider, useLocation } from "./state/LocationContext"
import { CartProvider, useCart } from "./state/CartContext"
import { OrderProvider } from "./state/OrderContext"
import { UIProvider } from "./state/UIContext"

import { AppHeader } from "./components/AppHeader"
import { BottomNav } from "./components/BottomNav"
import { CartBar } from "./components/CartBar"
import { AssistantFab } from "./components/AssistantFab"
import { AssistantSheet } from "./components/AssistantSheet"
import { LocationGate } from "./components/LocationGate"
import { ComingSoonSheet } from "./components/ComingSoonSheet"

import { HomeScreen } from "./screens/HomeScreen"
import { CategoriesScreen } from "./screens/CategoriesScreen"
import { ShopsScreen } from "./screens/ShopsScreen"
import { ShopDetailsScreen } from "./screens/ShopDetailsScreen"
import { SearchScreen } from "./screens/SearchScreen"
import { ProductDetailsScreen } from "./screens/ProductDetailsScreen"
import { SmartBasketScreen } from "./screens/SmartBasketScreen"
import { CartScreen } from "./screens/CartScreen"
import { CheckoutScreen } from "./screens/CheckoutScreen"
import { TrackingScreen } from "./screens/TrackingScreen"
import { AccountScreen } from "./screens/AccountScreen"
import { UnavailableScreen } from "./screens/UnavailableScreen"

function ScrollToTop() {
  const { pathname } = useRouterLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

function AppShell() {
  const routerLocation = useRouterLocation()
  const navigate = useNavigate()
  const { serviceStatus } = useLocation()
  const { toast } = useCart()

  const [searchQuery, setSearchQuery] = useState("")

  const hiddenBottomNavRoutes = ["/checkout"]
  const hideBottomNav =
    hiddenBottomNavRoutes.includes(routerLocation.pathname) ||
    routerLocation.pathname.startsWith("/product/") ||
    routerLocation.pathname.startsWith("/shops/") ||
    routerLocation.pathname.startsWith("/tracking")

  if (serviceStatus === "unavailable") {
    return (
      <div className="app-shell">
        <UnavailableScreen />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <AppHeader
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q)
          navigate(`/search?q=${encodeURIComponent(q)}`)
        }}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/categories" element={<CategoriesScreen />} />
          <Route path="/shops" element={<ShopsScreen />} />
          <Route path="/shops/:shopId" element={<ShopDetailsScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/product/:productId" element={<ProductDetailsScreen />} />
          <Route path="/smart-basket" element={<SmartBasketScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/tracking" element={<TrackingScreen />} />
          <Route path="/tracking/:orderId" element={<TrackingScreen />} />
          <Route path="/account" element={<AccountScreen />} />
        </Routes>
      </main>

      <CartBar />
      {!hideBottomNav && <BottomNav />}
      <AssistantFab />

      <AssistantSheet />
      <LocationGate />
      <ComingSoonSheet />

      {toast && (
        <div className="toast">
          <Icon name="check" size={18} />
          {toast}
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <LocationProvider>
        <CartProvider>
          <OrderProvider>
            <UIProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppShell />
              </BrowserRouter>
            </UIProvider>
          </OrderProvider>
        </CartProvider>
      </LocationProvider>
    </ErrorBoundary>
  )
}
