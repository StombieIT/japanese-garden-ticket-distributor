import {FC, useEffect} from "react";
import {$authUserStore, authenticateUser} from "../../state-management/auth";
import {useUnit} from "effector-react";

export const App: FC = () => {
    const authData = useUnit($authUserStore);

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <>
            <div>hello world</div>
        </>
    );
};
