import { addProductToCartFx } from "@/api/cart";
import { IAddProductToCartFx, ICartItem } from "@/types/cart";
import { createDomain, sample } from "effector";

const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()

export const $cart = cart.createStore<ICartItem[]>([])

export const $cartFromLs = cart 
    .createStore<ICartItem[]>([])
    .on(setCartFromLS, (_, cart) => cart)
    
sample({
    clock: addProductToCart,
    source: $cart,
    fn:(_, data) => data,
    target: addProductToCartFx,
})