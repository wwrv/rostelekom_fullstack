import { ISignUpFx } from "@/types/authPopup";
import { onAuthSuccess } from "@/lib/utils/auth";
import { createEffect } from "effector";
import toast from "react-hot-toast";
import api from './apiInstance'

const signUpPath = 'api/users/signup';
const signInPath = 'api/users/login'

export const oauthFx = createEffect(
    async({ name, password, email }: ISignUpFx) => {
        try{
            const { data } = await api.post('/api/users/oauth', {
                name,
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