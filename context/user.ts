import { createDomain, sample } from "effector";
import { IUser } from "@/types/user";
import { loginCheckFx, signInFx } from "@/api/auth";
import { $auth } from "./auth";

const user = createDomain()

export const loginCheck = user.createEvent<{ jwt:string }>()

export const $user = user.createStore<IUser>({} as IUser).on(loginCheckFx.done, (_, { result }) => result)

sample({
    clock: loginCheck,
    source: $auth,
    fn:(_, { jwt }) => ({
        jwt
    }),
    target: loginCheckFx,
})