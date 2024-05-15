import {FC} from "react";
import {Auth} from "@/components/Auth/Auth";
import {UsersTable} from "@/components/Table/UsersTable";
import {StatusContent} from "@/components/StatusContent/StatusContent";

export const Users: FC = () => {
    return (
        <Auth
            requiredPermission="EDIT"
            fallback={<StatusContent status={403} />}
        >
            <UsersTable />
        </Auth>
    );
};