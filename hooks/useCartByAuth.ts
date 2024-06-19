import { $cartFromLs } from './../context/cart';
import { $isAuth } from '@/context/auth';
import { $cart } from "@/context/cart"
import { useUnit } from "effector-react"

export const useCartByAuth = () => {
    const cart = useUnit($cart)
    const isAuth = useUnit($isAuth)
    const cartFromLs = useUnit($cartFromLs)
    const currentCartByAuth = isAuth ? cart : cartFromLs

    return currentCartByAuth
}