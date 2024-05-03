import {FC, useEffect} from "react";
import {$authUserStore, authenticateUser} from "../../state-management/auth";
import {useUnit} from "effector-react";

export const App: FC = () => {
    const authData = useUnit($authUserStore);

    useEffect(() => {
        authenticateUser({
            email: "stombie@yandex.ru",
            password: "12345678"
        });
    }, []);

    return (
        <>
            <div>hello world</div>
            {authData}
        </>
    );
};
