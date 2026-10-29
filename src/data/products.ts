import { Product } from "../types"

export const products: Product[] = [
  {
    id: "prod_milk_amul_500ml",
    name: "Amul Taaza Toned Milk",
    unit: "500 ml",
    price: 28,
    mrp: 30,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80",
    shop: "shop_sharma",
    category: "Dairy",
    inStock: true,
    stockCount: 45,
  },
  {
    id: "prod_atta_aashirvaad_5kg",
    name: "Aashirvaad Shudh Chakki Atta",
    unit: "5 kg",
    price: 245,
    mrp: 285,
    image:
      "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=500&q=80",
    shop: "shop_sharma",
    category: "Staples",
    inStock: true,
    stockCount: 18,
  },
  {
    id: "prod_banana_robusta_6pcs",
    name: "Robusta Banana",
    unit: "6 pcs",
    price: 45,
    mrp: 50,
    image:
      "https://images.unsplash.com/photo-1635013973792-2d1595bfa0b2?auto=format&fit=crop&w=500&q=80",
    shop: "shop_fresh",
    category: "Fruits",
    inStock: true,
    stockCount: 30,
  },
  {
    id: "prod_rice_indiagate_1kg",
    name: "India Gate Basmati Rice",
    unit: "1 kg",
    price: 132,
    mrp: 160,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
    shop: "shop_sharma",
    category: "Staples",
    inStock: true,
    stockCount: 22,
  },
  {
    id: "prod_bread_fresh_400g",
    name: "Fresh Milk Bread",
    unit: "400 g",
    price: 42,
    mrp: 45,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
    shop: "shop_bakery",
    category: "Bakery",
    inStock: true,
    stockCount: 15,
  },
  {
    id: "prod_tomato_farmfresh_500g",
    name: "Farm Fresh Tomato",
    unit: "500 g",
    price: 34,
    mrp: 40,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=80",
    shop: "shop_fresh",
    category: "Vegetables",
    inStock: true,
    stockCount: 25,
  },
  {
    id: "prod_apple_himachal_4pcs",
    name: "Himachal Royal Apple",
    unit: "4 pcs",
    price: 120,
    mrp: 140,
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=500&q=80",
    shop: "shop_fresh",
    category: "Fruits",
    inStock: true,
    stockCount: 20,
  },
]

export function getProducts(): Product[] {
  return [...products]
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByShop(shopId: string): Product[] {
  return products.filter((p) => p.shop === shopId)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  )
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  )
}
