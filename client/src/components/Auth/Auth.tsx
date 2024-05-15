import {FC, ReactNode} from "react";
import {$authUserStore} from "@/state-management/auth";
import {useUnit} from "effector-react";
import {PermissionName} from "@/models/permission";

export interface IAuthProps {
    children: ReactNode;
    fallback?: ReactNode;
    requiredPermission?: PermissionName | PermissionName[];
}

export const Auth: FC<IAuthProps> = ({ children, fallback, requiredPermission }) => {
    const authUser = useUnit($authUserStore);

    const authUserPermissionNames = authUser?.role?.permissions?.map(permission => permission.name);

    if (authUser &&
        (!requiredPermission ||
        (!!authUserPermissionNames && Array.isArray(requiredPermission) && requiredPermission.every(permission => authUserPermissionNames!.includes(permission))) ||
        (!!authUserPermissionNames && typeof requiredPermission === "string" && authUserPermissionNames!.includes(requiredPermission)))) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};