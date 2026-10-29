export type Page =
  | "home"
  | "categories"
  | "shops"
  | "shop"
  | "search"
  | "product"
  | "smart"
  | "cart"
  | "checkout"
  | "tracking"
  | "account"

export type IconName =
  | "home"
  | "grid"
  | "store"
  | "bag"
  | "user"
  | "pin"
  | "chevron"
  | "search"
  | "mic"
  | "clock"
  | "star"
  | "shield"
  | "heart"
  | "plus"
  | "minus"
  | "arrow"
  | "filter"
  | "sort"
  | "back"
  | "phone"
  | "help"
  | "check"
  | "card"
  | "cash"
  | "upi"
  | "bell"
  | "list"
  | "spark"
  | "close"

export type ServiceStatus = "prompt" | "checking" | "available" | "unavailable"

export interface Shop {
  id: string
  name: string
  type: string
  rating: number
  distance: string
  eta: string
  fee: number
  min: number
  image: string
  offer: string
  phone: string
  lat: number
  lng: number
  address: string
  opensAt: string
  closesAt: string
}

export interface Product {
  id: string
  name: string
  unit: string
  price: number
  mrp: number
  image: string
  shop: string
  category: string
  inStock: boolean
  stockCount: number
}

export type Category = [string, string]

export interface CartItem {
  product: Product
  quantity: number
}

export interface Address {
  label: string
  address: string
  available: boolean
}

export interface User {
  name: string
  email: string
  avatar: string
  orderCount: number
}

export type OrderStatus = "confirmed" | "packing" | "out_for_delivery" | "delivered"

export interface OrderItem {
  productId: string
  productName: string
  unit: string
  price: number
  quantity: number
  shopId: string
  shopName: string
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  shops: { id: string; name: string; phone: string; address: string }[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  placedAt: string
  estimatedArrival: string
  deliveryAddress: string
  paymentMethod: string
}
