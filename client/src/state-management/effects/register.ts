import {createEffect} from "effector";
import {api} from "@/utils/api";

export interface IRegisterParameters {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    password: string;
}

export const register = createEffect((registerOptions: IRegisterParameters) =>
    api.postForm("/register.php", registerOptions)
);
