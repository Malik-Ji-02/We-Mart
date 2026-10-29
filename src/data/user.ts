import { Address, User } from "../types"

export const currentUser: User = {
  name: "Ananya Sharma",
  email: "ananya@example.com",
  avatar: "AS",
  orderCount: 54,
}

export const savedAddresses: Address[] = [
  {
    label: "Home",
    address: "Sector 43, Gurugram, Haryana",
    available: true,
  },
  {
    label: "Parents’ home",
    address: "Sector 15, Faridabad, Haryana",
    available: true,
  },
  {
    label: "Work",
    address: "Connaught Place, New Delhi",
    available: false,
  },
]

export function getCurrentUser(): User {
  return { ...currentUser }
}

export function getSavedAddresses(): Address[] {
  return [...savedAddresses]
}
