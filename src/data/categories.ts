import { Category } from "../types"

export const categories: Category[] = [
  [
    "Fruits",
    "https://images.unsplash.com/photo-1635013973792-2d1595bfa0b2?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Vegetables",
    "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Dairy",
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Staples",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Bakery",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Snacks",
    "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=500&q=80",
  ],
]

export function getCategories(): Category[] {
  return [...categories]
}
