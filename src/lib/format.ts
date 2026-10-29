import { CURRENCY_SYMBOL } from "../config/pricing"
import { Shop } from "../types"

export function formatPrice(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount}`
}

export function calculateDiscount(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0
  return Math.round((1 - price / mrp) * 100)
}

/**
 * Computes whether a shop is currently open based on current time and shop hours.
 */
export function isShopOpen(shop: Shop, date: Date = new Date()): boolean {
  if (!shop.opensAt || !shop.closesAt) return true
  const currentMinutes = date.getHours() * 60 + date.getMinutes()
  const [openH, openM] = shop.opensAt.split(":").map(Number)
  const [closeH, closeM] = shop.closesAt.split(":").map(Number)
  const openMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM
  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes
}
