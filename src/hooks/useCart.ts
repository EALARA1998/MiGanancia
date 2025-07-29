import { useEffect, useState } from "react"
import type { CartItemType } from "../types"

export default function useCart() {
  function InitialCart() {
      const localStorageCart = localStorage.getItem("cart")
      return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [cart, setCart] = useState<CartItemType[]>(InitialCart())
    useEffect(()=>{
      localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])
  return {
    cart,
    setCart
  }
}