import {FC} from "react";
import {Link, Outlet} from "@tanstack/react-router";

export const Account: FC = () => {
    return (
        <div>
            <div>
                <Link to="/account/sign-in">Вход</Link>
                <Link to="/account-register">Регистрация</Link>
            </div>
            <Outlet />
        </div>
    );
};