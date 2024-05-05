import {Email} from "./email";
import {IRole} from "./role";

export type UserId = number;

export interface IUser {
    id: UserId;
    email: Email;
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface IAuthUser extends IUser {
    role: IRole | null;
}
