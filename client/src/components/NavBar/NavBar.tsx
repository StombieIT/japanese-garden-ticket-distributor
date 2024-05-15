import {FC} from "react";

import {Auth} from "@/components/Auth/Auth";

import {Link} from "@tanstack/react-router";
import {Container} from "@/components/Container/Container";

import classes from "./NavBar.module.styl";
import cn from "classnames";

const activeLinkProps = {
    className: cn(classes["link"], classes["__current"])
};

const inactiveLinkProps = {
    className: classes["link"]
};

export const NavBar: FC = () => {
    return (
        <Container>
            <nav className={classes["navbar"]}>
                <Link to="/" className={classes["main-link"]}>
                    Парк Краснодар
                </Link>
                <div className={classes["links"]}>
                    <Auth requiredPermission="EDIT">
                        <Link
                            to="/users"
                            inactiveProps={inactiveLinkProps}
                            activeProps={activeLinkProps}
                        >
                            Пользователи
                        </Link>
                    </Auth>
                    <Auth
                        fallback={
                            <Link to="/sign-in" inactiveProps={inactiveLinkProps} activeProps={activeLinkProps}>
                                Войти
                            </Link>
                        }
                    >
                        <Link
                            to="/account"
                            inactiveProps={inactiveLinkProps}
                            activeProps={activeLinkProps}
                        >
                            Личный кабинет
                        </Link>
                    </Auth>
                </div>
            </nav>
        </Container>
    );
}