import {FC} from "react";
import {Auth} from "@/components/Auth/Auth";
import {StatusContent} from "@/components/StatusContent/StatusContent";
import {StatusesTable} from "@/components/Table/StatusesTable";

export const Statuses: FC = () => {
    return (
        <Auth
            requiredPermission="EDIT"
            fallback={<StatusContent status={403} />}
        >
            <StatusesTable />
        </Auth>
    );
};