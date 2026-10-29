import React, { createContext, useContext, useEffect, useState } from "react"
import { Order, OrderItem } from "../types"
import { CartGroup } from "./CartContext"

interface PlaceOrderParams {
  cartGroups: CartGroup[]
  subtotal: number
  deliveryFee: number
  total: number
  deliveryAddress: string
  paymentMethod: string
}

interface OrderContextType {
  orders: Order[]
  activeOrder: Order | null
  placeOrder: (params: PlaceOrderParams) => Order
  getOrderById: (orderId: string) => Order | undefined
  setActiveOrderId: (orderId: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const STORAGE_KEY_ORDERS = "apnamarket_orders"

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ORDERS)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Fallback
    }
    return []
  })

  const [activeOrderId, setActiveOrderId] = useState<string>(() => {
    return orders[0]?.id || ""
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders))
    } catch {
      // Ignore
    }
  }, [orders])

  function placeOrder(params: PlaceOrderParams): Order {
    const orderId = `AM${Math.floor(1000 + Math.random() * 9000)}`

    const items: OrderItem[] = []
    const shopsMap = new Map<string, { id: string; name: string; phone: string; address: string }>()

    params.cartGroups.forEach((group) => {
      shopsMap.set(group.shop.id, {
        id: group.shop.id,
        name: group.shop.name,
        phone: group.shop.phone,
        address: group.shop.address,
      })

      group.items.forEach((item) => {
        items.push({
          productId: item.product.id,
          productName: item.product.name,
          unit: item.product.unit,
          price: item.product.price,
          quantity: item.quantity,
          shopId: group.shop.id,
          shopName: group.shop.name,
          image: item.product.image,
        })
      })
    })

    const newOrder: Order = {
      id: orderId,
      items,
      shops: Array.from(shopsMap.values()),
      subtotal: params.subtotal,
      deliveryFee: params.deliveryFee,
      total: params.total,
      status: "confirmed",
      placedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      estimatedArrival: "18–24 min",
      deliveryAddress: params.deliveryAddress,
      paymentMethod: params.paymentMethod,
    }

    setOrders((current) => [newOrder, ...current])
    setActiveOrderId(orderId)
    return newOrder
  }

  function getOrderById(orderId: string): Order | undefined {
    return orders.find((o) => o.id === orderId)
  }

  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        placeOrder,
        getOrderById,
        setActiveOrderId,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
