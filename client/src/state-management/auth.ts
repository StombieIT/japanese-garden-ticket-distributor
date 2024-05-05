import {createEffect, createStore} from "effector";
import {IAuthUser} from "@/models/user";
import {Email} from "@/models/email";
import {AxiosResponse} from "axios";
import {api} from "@/utils/api";

interface IAuthenticateUserParameters {
    email: Email;
    password: string;
}

const AUTH_URL = "/auth.php";

export const authenticateUser = createEffect(async (authParameters?: IAuthenticateUserParameters) => {
    const request = authParameters
        ? api.postForm<IAuthenticateUserParameters, AxiosResponse<IAuthUser>>(AUTH_URL, authParameters)
        : api.get<IAuthUser>(AUTH_URL);
    const result = await request;
    return result.data;
});

export const $authUserStore = createStore<IAuthUser | null>(null)
    .on(authenticateUser.done, (state, { result: authUser }) => authUser);