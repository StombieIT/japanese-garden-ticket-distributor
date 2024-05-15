import {IPermission} from "./permission";

export type RoleId = number;

export interface IRole {
    id: RoleId;
    name: string;
}

export interface IRoleExtended {
    permissions: IPermission[];
}

export interface IAuthRole extends IRoleExtended {}
