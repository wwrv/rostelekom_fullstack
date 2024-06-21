import { IAddProductToCartFx } from './../types/cart';
import { handleJWTError } from "@/lib/utils/errors";
import { ICartItem } from "@/types/cart";
import { createEffect } from "effector";
import toast from "react-hot-toast";
import api from './apiInstance'

export const getCartItemFx = createEffect(async ({ jwt }: { jwt:string }) => {
    try{
        const { data } = await api.get('/api/cart/all', {
            headers: {authorization: `Bearer ${jwt}`},
        })

        if(data?.error){
            const newData: ICartItem[] = await handleJWTError(data.error.name, {
                repeatRequestMethodName: 'getCartItemsFx',
            })
            return newData
        }

        return data

    } catch(error){
        toast.error((error as Error).message)
    }
})

export const addProductToCartFx = createEffect(
    async({ jwt,setSpinner, ...dataFields }: IAddProductToCartFx) => {
        try{
            setSpinner(true)
            const { data } = await api.post('/api/cart/add', dataFields, {
                headers: { Authorization: `Bearer ${jwt}` },
            })
            if(data?.error){
                const newData: { newCartItem: ICartItem } = await handleJWTError(
                    data.error.name,
                    {
                        repeatRequestMethodName: 'addProductToCartFx',
                        payload: { ...dataFields , setSpinner },

                    }
                )
                return newData
            }
            toast.success('Добавлено в корзину!')
            return data
        }catch(error){
            toast.error((error as Error).message)
        }finally{
            setSpinner(false)
        }
    }
) 