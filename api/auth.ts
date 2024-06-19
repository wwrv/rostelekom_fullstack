import { ISignUpFx } from "@/types/authPopup";
import { onAuthSuccess } from "@/lib/utils/auth";
import { createEffect } from "effector";
import toast from "react-hot-toast";
import api from './apiInstance'
import { setIsAuth } from '@/context/auth';
import { handleJWTError } from "@/lib/utils/errors";

const signUpPath   = 'api/users/signup';
const signInPath   = 'api/users/login'
const apiEmailPath = 'api/users/email'

export const oauthFx = createEffect(
    async({ name, password, email }: ISignUpFx) => {
        try{
            const { data } = await api.post('/api/users/oauth', {
                name,
                password,
                email,
            })

            await api.post(apiEmailPath, {
                password,
                email,
            })

            onAuthSuccess('Авторизация выполнена!', data)
            return data.user
        }catch(error) {
            toast.error((error as Error).message)
        }
    }
)


export const signUpFx = createEffect(
    async ({ name, password, email, isOAuth }: ISignUpFx) =>{
        if(isOAuth){
            await oauthFx({
                email,
                password,
                name
            })
            return
        }

        const { data } = await api.post(signUpPath, {
            name,
            password,
            email,
        })

        if(data.warningMessage){
            toast.error(data.warningMessage)
            return
        }

        onAuthSuccess('Регистрация прошла успешно!', data)
        return data
    }
)

export const signInFx = createEffect(async ({ email, password, isOAuth }: ISignUpFx) => {
    if(isOAuth){
        await oauthFx({
            email,
            password,
        })
        return
    }
    const { data } = await api.post(signInPath, { email, password })

    if (data.warningMessage) {
        toast.error(data.warningMessage)
        return
    }

    onAuthSuccess('Вход выполнен!', data)
    return data
})

export const loginCheckFx = createEffect(async ({ jwt }: { jwt:string }) => {
    try{
        const { data } = await api.get('api/users/login-check', {
            headers: { Authorization: `Bearer ${jwt}` },
        })

        if(data?.error){
            handleJWTError(data.error.name, {
                repeatRequestMethodName: 'loginCheckFx',
            })
            return
        }

        setIsAuth(true)
        return data.user
    } catch(error) {
        toast.error((error as Error).message)
    }
})

export const refreshTokenFX = createEffect(async ({ jwt }: { jwt: string }) => {
    const { data } = await api.post('/api/users/refresh', { jwt })

    localStorage.setItem('auth', JSON.stringify(data))

    return data
})