import {Email} from "./email";
import {IAuthRole, RoleId} from "./role";

export type UserId = number;

export interface IUser {
    id: UserId;
    email: Email;
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface IUserExtended extends IUser {
    roleId: RoleId | null;
}

export interface IAuthUser extends IUser {
    role: IAuthRole | null;
}
