/* eslint-disable indent */
import { loginCheckFx } from "@/api/auth"
import { JWTError } from "@/constants/jwt"
import { refreshTokenFX } from "@/api/auth"
import { getCartItemFx } from "@/api/cart"
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
            return getCartItemFx({
              jwt: newTokens.accessToken
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

