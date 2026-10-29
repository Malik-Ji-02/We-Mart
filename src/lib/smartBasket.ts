import { Product } from "../types"

export interface SmartBasketComparisonResult {
  selectedTotal: number
  splitTotal: number
  oneShopTotal: number
  savings: number
}

/**
 * Calculates synthetic smart basket comparison totals.
 *
 * TODO: replace with real price comparison algorithm across multiple shops.
 * Currently, this is a simulated calculation that derives synthetic split and single-shop
 * totals rather than evaluating true store inventories.
 */
export function calculateSmartBasketComparison(
  selectedProducts: Product[],
): SmartBasketComparisonResult {
  const selectedTotal = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  )

  const splitTotal = Math.max(
    selectedTotal,
    Math.round(selectedTotal + 15 - Math.min(20, selectedTotal * 0.05)),
  )

  const oneShopTotal = splitTotal + 37
  const savings = oneShopTotal - splitTotal

  return {
    selectedTotal,
    splitTotal,
    oneShopTotal,
    savings,
  }
}
