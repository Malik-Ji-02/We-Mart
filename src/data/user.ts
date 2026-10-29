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
    address: "5th Block, Koramangala, Bengaluru",
    available: true,
  },
  {
    label: "Parents’ home",
    address: "3rd Block, Koramangala, Bengaluru",
    available: true,
  },
  {
    label: "Work",
    address: "Whitefield, Bengaluru",
    available: false,
  },
]

export function getCurrentUser(): User {
  return { ...currentUser }
}

export function getSavedAddresses(): Address[] {
  return [...savedAddresses]
}
