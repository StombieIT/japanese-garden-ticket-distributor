import {FC, useEffect} from "react";
import {$authUserStore, authenticateUser} from "@/state-management/auth";
import {useUnit} from "effector-react";
import {Auth} from "@/components/Auth/Auth";

export const App: FC = () => {
    const authData = useUnit($authUserStore);

    useEffect(() => {
        const timer = setTimeout(authenticateUser, 1_000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Auth
            requiredPermission="EDITING"
            fallback={<div>testing</div>}
        >
            <div>THIS IS PROTECTED PART OF THE PAGE</div>
        </Auth>
    );
};
