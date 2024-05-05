import {IPermission} from "./permission";

export type RoleId = number;

export interface IRole {
    id: RoleId;
    name: string;
}

export interface IAuthRole extends IRole {
    permissions: IPermission[];
}
