import { useUnit } from "effector-react"
import { $currentProduct } from "@/context/goods"
import { useState } from "react"

export const useCartAction = () => {
    const product = useUnit($currentProduct)
    const [ selectedSize, setSelectedSize ] = useState('')
    return { product, setSelectedSize, selectedSize }
}