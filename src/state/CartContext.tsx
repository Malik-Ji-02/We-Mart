import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Product, Shop } from "../types"
import { getProducts } from "../data/products"
import { getShops } from "../data/shops"

export interface CartGroup {
  shop: Shop
  items: { product: Product; quantity: number }[]
  shopSubtotal: number
  deliveryFee: number
}

interface CartContextType {
  cart: Record<string, number>
  count: number
  subtotal: number
  deliveryFee: number
  total: number
  cartShopIds: string[]
  cartGroups: CartGroup[]
  toast: string
  changeQuantity: (id: string, change: number) => void
  addItem: (id: string) => void
  removeItem: (id: string) => void
  addMultipleItems: (productIds: string[]) => void
  clearCart: () => void
  notify: (message: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY_CART = "apnamarket_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CART)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (typeof parsed === "object" && parsed !== null) {
          return parsed
        }
      }
    } catch {
      // Fallback to empty cart on error
    }
    return {}
  })

  const [toast, setToast] = useState("")

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart))
    } catch {
      // Ignore storage errors
    }
  }, [cart])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(""), 2400)
  }

  function changeQuantity(id: string, change: number) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[id] || 0) + change)
      const next = { ...current }
      if (nextQuantity === 0) {
        delete next[id]
      } else {
        next[id] = nextQuantity
      }
      return next
    })
  }

  function addItem(id: string) {
    changeQuantity(id, 1)
  }

  function removeItem(id: string) {
    changeQuantity(id, -1)
  }

  function addMultipleItems(productIds: string[]) {
    setCart((current) => {
      const next = { ...current }
      productIds.forEach((id) => {
        next[id] = Math.max(1, next[id] || 0)
      })
      return next
    })
    notify("Recommended basket added to your cart")
  }

  function clearCart() {
    setCart({})
  }

  const allProducts = useMemo(() => getProducts(), [])
  const allShops = useMemo(() => getShops(), [])

  const count = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  }, [cart])

  const subtotal = useMemo(() => {
    return allProducts.reduce(
      (sum, product) => sum + product.price * (cart[product.id] || 0),
      0,
    )
  }, [cart, allProducts])

  const cartShopIds = useMemo(() => {
    return [
      ...new Set(
        allProducts
          .filter((product) => cart[product.id])
          .map((product) => product.shop),
      ),
    ]
  }, [cart, allProducts])

  const deliveryFee = useMemo(() => {
    return cartShopIds.reduce((sum, id) => {
      const foundShop = allShops.find((shop) => shop.id === id)
      return sum + (foundShop?.fee || 0)
    }, 0)
  }, [cartShopIds, allShops])

  const total = subtotal + deliveryFee

  const cartGroups: CartGroup[] = useMemo(() => {
    return allShops
      .filter((shop) =>
        allProducts.some(
          (product) => product.shop === shop.id && cart[product.id],
        ),
      )
      .map((shop) => {
        const shopProducts = allProducts.filter(
          (product) => product.shop === shop.id && cart[product.id],
        )
        const shopSubtotal = shopProducts.reduce(
          (sum, product) => sum + product.price * (cart[product.id] || 0),
          0,
        )
        return {
          shop,
          items: shopProducts.map((product) => ({
            product,
            quantity: cart[product.id],
          })),
          shopSubtotal,
          deliveryFee: shop.fee,
        }
      })
  }, [cart, allProducts, allShops])

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        subtotal,
        deliveryFee,
        total,
        cartShopIds,
        cartGroups,
        toast,
        changeQuantity,
        addItem,
        removeItem,
        addMultipleItems,
        clearCart,
        notify,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
