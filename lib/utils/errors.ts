/* eslint-disable indent */
import { loginCheckFx } from "@/api/auth"
import { JWTError } from "@/constants/jwt"
import { refreshTokenFX } from "@/api/auth"
import { addProductToCartFx, deleteCartItemFx, getCartItemsFx } from "@/api/cart"
import { IAddProductToCartFx, IAddProductsFromLSToCartFx, IDeleteCartItemsFx } from "@/types/cart"
import { addProductsFromLSToCartFx } from "@/context/cart"
export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const newTokens = await refreshTokenFX({ jwt: auth.refreshToken })

    if(repeatRequestAfterRefreshData) {
        const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData;

        switch (repeatRequestMethodName) {

          case 'getCartItemsFx':
            return getCartItemsFx({
              jwt: newTokens.accessToken
            })

          case 'addProductToCaseFx':
            return addProductToCartFx({
              ...(payload as IAddProductToCartFx),
              jwt: newTokens.accessToken,
            })
            case 'addProductsFromLSToCartFx':
              return addProductsFromLSToCartFx({
                ...(payload as IAddProductsFromLSToCartFx),
                jwt: newTokens.accessToken,
              })
            case 'deleteCartItemFx':
              return deleteCartItemFx({
                ...(payload as IDeleteCartItemsFx),
                jwt: newTokens.accessToken,
              })
            case 'loginCheckFx':
              await loginCheckFx({
                jwt: newTokens.accessToken,
              }) 
              break
          
        }
        }
    }
}

