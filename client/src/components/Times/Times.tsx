import {FC} from "react";
import {Auth} from "@/components/Auth/Auth";
import {StatusContent} from "@/components/StatusContent/StatusContent";
import {TimesTable} from "@/components/Table/TimesTable";

export const Times: FC = () => {
    return (
        <Auth
            requiredPermission="EDIT"
            fallback={<StatusContent status={403} />}
        >
            <TimesTable />
        </Auth>
    );
};