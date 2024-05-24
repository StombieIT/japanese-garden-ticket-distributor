import {Email} from "./email";
import {IAuthRole, RoleId} from "./role";
import {NumberedString} from "@/models/common";

export type UserId = number;

export interface IUser {
    id: UserId;
    email: Email;
    firstName: string;
    lastName: string;
    middleName: string;
    passportSeries: NumberedString | null;
    passportNumber: NumberedString | null;
}

export interface IUserExtended extends IUser {
    roleId: RoleId | null;
}

export interface IAuthUser extends IUser {
    role: IAuthRole | null;
}
