/* eslint-disable indent */
import { loginCheckFx } from "@/api/auth"
import { JWTError } from "@/constants/jwt"

export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    // const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })
    const newTokens = {accessToken: ''}

    if(repeatRequestAfterRefreshData) {
        const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData;

        switch (repeatRequestMethodName) {
            case 'loginCheckFx':
                await loginCheckFx({
                    jwt:newTokens.accessToken,
                })
                break
            
        }
        }
    }
}
