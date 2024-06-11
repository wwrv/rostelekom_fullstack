import { ISignUpFx } from "@/types/authPopup"
import {sign_in, sign_up} from '@/api/auth'
import { createDomain, sample } from "effector";
import toast from "react-hot-toast";

const auth = createDomain()



export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()
export const handleSignUp = auth.createEvent<ISignUpFx>()
export const handleSignIn = auth.createEvent<ISignUpFx>()
export const setIsAuth = auth.createEvent<boolean>()

export const $openAuthPopup = auth
    .createStore<boolean>(false)
    .on(openAuthPopup, () => true)
    .on(closeAuthPopup, () => false)

export const $isAuth = auth
    .createStore(false)
    .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth
    .createStore(false)
    
    .on(sign_up.done, (_, { result }) => result)
    .on(sign_up.fail, (_, { error }) => {
        toast.error(error.message)
    })
    .on(sign_in.done, (_, { result }) => result)
    .on(sign_in.fail, (_, { error }) => {
        toast.error(error.message)
    })

sample({
    clock:handleSignUp,
    source: $auth,
    fn:(_, { name,email, password, isOAuth }) => ({
        name,
        password,
        email,
        isOAuth
    }),
    target: sign_up
})

sample({
    clock: handleSignIn,
    source:$auth,
    fn:(_, { name,email, password, isOAuth }) => ({
        name,
        password,
        email,
        isOAuth
    }),
    target: sign_in
})


