import { Shop } from "../types"

export const shops: Shop[] = [
  {
    id: "shop_sharma",
    name: "Sharma General Store",
    type: "Kirana & daily essentials",
    rating: 4.8,
    distance: "0.4 km",
    eta: "18–25 min",
    fee: 0,
    min: 199,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=82",
    offer: "₹50 OFF above ₹399",
    phone: "+91 98765 43210",
    lat: 12.9346, // MOCK approximate coordinates
    lng: 77.6195, // MOCK approximate coordinates
    address: "5th Block, Koramangala, Bengaluru",
    opensAt: "07:00",
    closesAt: "22:30",
  },
  {
    id: "shop_fresh",
    name: "Fresh Basket",
    type: "Fruits & vegetables",
    rating: 4.7,
    distance: "0.7 km",
    eta: "20–30 min",
    fee: 15,
    min: 149,
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=82",
    offer: "15% OFF on fresh produce",
    phone: "+91 98765 43211",
    lat: 12.9381, // MOCK approximate coordinates
    lng: 77.6243, // MOCK approximate coordinates
    address: "6th Block, Koramangala, Bengaluru",
    opensAt: "06:30",
    closesAt: "21:30",
  },
  {
    id: "shop_bakery",
    name: "Iyengar's Bakery",
    type: "Bakery & snacks",
    rating: 4.6,
    distance: "1.1 km",
    eta: "25–35 min",
    fee: 20,
    min: 129,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=82",
    offer: "Free delivery above ₹299",
    phone: "+91 98765 43212",
    lat: 12.9298, // MOCK approximate coordinates
    lng: 77.6268, // MOCK approximate coordinates
    address: "4th Block, Koramangala, Bengaluru",
    opensAt: "08:00",
    closesAt: "22:00",
  },
]

export function getShops(): Shop[] {
  return [...shops]
}

export function getShopById(id: string): Shop | undefined {
  return shops.find((s) => s.id === id)
}

export function getShopByName(name: string): Shop | undefined {
  return shops.find((s) => s.name.toLowerCase() === name.toLowerCase())
}
