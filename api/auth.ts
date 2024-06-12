import { ISignUpFx } from "@/types/authPopup";
import { onAuthSuccess } from "@/lib/utils/auth";
import { createEffect } from "effector";
import toast from "react-hot-toast";
import api from './apiInstance'

const signUpPath = 'api/users/signup';
const signInPath = 'api/users/login'

export const signUpFx = createEffect(
    async ({ name, password, email }: ISignUpFx) =>{
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

export const signInFx = createEffect(async ({ email, password }: ISignUpFx) => {
    const { data } = await api.post(signInPath, { email, password })

    if (data.warningMessage) {
        toast.error(data.warningMessage)
        return
    }

    onAuthSuccess('Вход выполнен!', data)
    return data
})