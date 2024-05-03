import {Email} from "./email";
import {IRole} from "./role";
import {IPermission} from "./permission";

export type UserId = number;

export interface IUser {
    id: UserId;
    email: Email;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
}

export interface IAuthUser extends IUser {
    role: IRole;
    permissions: IPermission[];
}
