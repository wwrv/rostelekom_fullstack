import { useUnit } from "effector-react"
import { useState } from "react"
import { useCartByAuth } from "./useCartByAuth"
import { isItemInList, isUserAuth } from "@/lib/utils/common"
import { addCartItemToLS, addItemToCart, addProductToCartBySizeTable } from "@/lib/utils/cart"
import { $currentProduct } from "@/context/goods"

export const useCartAction = (isSizeTable = false) => {
    const product = useUnit($currentProduct)
    const [ selectedSize, setSelectedSize ] = useState('')
    const currentCartByAuth = useCartByAuth()
    const currentCartItems = currentCartByAuth.filter(
      (item) => item.productId === product._id
    )
    const cartItemBySize = currentCartItems.find(
      (item) => item.size === selectedSize
    )
    const isProductInCart = isItemInList(currentCartByAuth, product._id)
    const [ addToCartSpinner, setAddToCartSpinner ] = useState(false)
    const handleAddToCart = (countFromCounter?: number ) => {
        if (isProductInCart) {
            if (!isUserAuth()) {
                addCartItemToLS(product, selectedSize, countFromCounter || 1)
                return
            }
            if(cartItemBySize){
                const auth = JSON.parse(localStorage.getItem('auth') as string)
                const count = !!countFromCounter 
                    ? +cartItemBySize.count !== countFromCounter
                        ?countFromCounter
                        : +cartItemBySize.count + 1
                    : +cartItemBySize.count + 1

                addCartItemToLS(product, selectedSize, count)
                return
            }
        }
        if(isSizeTable){
            addItemToCart(
                product,
                setAddToCartSpinner,
                countFromCounter || 1,
                selectedSize,
            )
            return
        }

        addProductToCartBySizeTable(
            product,
            setAddToCartSpinner,
            countFromCounter || 1, 
            selectedSize
        )
    }
    return { 
        product, 
        selectedSize, 
        cartItemBySize, 
        isProductInCart, 
        addToCartSpinner, 
        currentCartItems, 
        currentCartByAuth, 
        setSelectedSize, 
        handleAddToCart, 
        setAddToCartSpinner,
    }
}