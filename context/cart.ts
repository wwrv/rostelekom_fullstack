import { IAddProductToCartFx, 
    IAddProductsFromLSToCartFx, 
    ICartItem, 
    IDeleteCartItemsFx, 
    IUpdateCartItemCountFx 
}                                                                                             from "@/types/cart";
import { addProductToCartFx, deleteCartItemFx, updateCartItemCountFx }                        from "@/api/cart";
import { handleJWTError }                                                                     from "@/lib/utils/errors";
import { createDomain, createEffect, createStore, sample }                                    from "effector";
import toast                                                                                  from "react-hot-toast";
import api                                                                                    from '../api/apiInstance'


const cart = createDomain()

export const addProductsFromLSToCartFx = createEffect(
    async ({ jwt, cartItems }: IAddProductsFromLSToCartFx) => {
        try{
            const { data } = await api.post(
                '/api/cart/add-many',
                { items:cartItems },
                {
                    headers: { Authorization: `Bearer ${jwt}` },
                }
            )
            if(data?.error){
                const newData: { cartItems: ICartItem[] } = await handleJWTError(
                    data.error.name,
                    {
                        repeatRequestMethodName: 'addProductsFromLSToCartFx',
                        payload: { items: cartItems }
                    }
                )
                return newData
            }
            loadCartItems({ jwt })
            return data
        }catch(error){
            toast.error((error as Error).message)
        }
    }
)


export const loadCartItems             = cart.createEvent<{ jwt: string }>()
export const setCartFromLS             = cart.createEvent<ICartItem[]>()
export const addProductToCart          = cart.createEvent<IAddProductToCartFx>()
export const addProductsFromLSToCart   = cart.createEvent<IAddProductsFromLSToCartFx>()
export const updateCartItemCount       = cart.createEvent<IUpdateCartItemCountFx>()
export const setTotalPrice             = cart.createEvent<number>()
export const deleteProductFromCart     = cart.createEvent<IDeleteCartItemsFx>()
export const setShouldShowEmpty           = cart.createEvent<boolean>()


export const $cart = cart
    .createStore<ICartItem[]>([])
    .on(addProductsFromLSToCartFx.done,(_, { result }) => result.items)
    .on(addProductToCartFx.done,(cart, { result }) => [
        ...new Map(
            [...cart, result.newCartItem].map((item) => [item.clientId, item])
            
        ).values(),
    ])
    .on(updateCartItemCountFx.done, (cart, { result }) => 
        cart.map((item) =>
            item._id === result.id ? { ...item, count: result.count } : item
        )
    )
    .on(deleteCartItemFx.done, (cart, { result }) =>
        cart.filter((item) => item._id !== result.id)
    )

export const $cartFromLs = cart 
    .createStore<ICartItem[]>([])
    .on(setCartFromLS, (_, cart) => cart)
   
    
export const $totalPrice = cart
    .createStore<number>(0)
    .on(setTotalPrice,(_,value) => value)

export const $shouldShowEmpty = cart
    .createStore(false)
    .on(setShouldShowEmpty,(_, value) => value)


sample({
    clock: addProductToCart,
    source: $cart,
    fn:(_, data) => data,
    target: addProductToCartFx,
})

sample({
    clock: addProductsFromLSToCart,
    source: $cart,
    fn:(_, data) => data,
    target: addProductsFromLSToCartFx,
})

sample({
    clock: updateCartItemCount,
    source: $cart,
    fn:(_, data) => data,
    target: updateCartItemCountFx,
})
sample({
    clock: deleteProductFromCart,
    source: $cart,
    fn:(_, data) => data,
    target: deleteCartItemFx,
})