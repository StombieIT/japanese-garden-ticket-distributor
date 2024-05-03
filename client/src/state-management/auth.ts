import {createEffect, createStore} from "effector";
import {IAuthUser} from "../models/user";
import {Email} from "../models/email";
import {AxiosResponse} from "axios";
import {api} from "../utils/api";

interface IAuthenticateUserParameters {
    email: Email;
    password: string;
}

export const authenticateUser = createEffect(async (authParameters: IAuthenticateUserParameters) => {
    const result = await api.get<IAuthenticateUserParameters, AxiosResponse<IAuthUser>>("/auth.php");
    return result.data;
});

export const $authUserStore = createStore<IAuthUser | null>(null)
    .on(authenticateUser.done, (state, { result: authUser }) => authUser);
