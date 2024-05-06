import {FC} from "react";
import cn from "classnames";

import {NavLink} from "react-router-dom";
import {Auth} from "@/components/Auth/Auth";
import {INavLinkRenderProps} from "@/models/react-router-dom";

import classes from "./NavBar.module.styl";
import {Container} from "@/components/Container/Container";

const linkClassName = ({ isActive }: INavLinkRenderProps) => cn(classes["link"], {
    [classes["__current"]]: isActive
});

export const NavBar: FC = () => {

    return (
        <Container>
            <nav className={classes["navbar"]}>
                <NavLink className={classes["main-link"]} to="/">
                    Парк Краснодар
                </NavLink>
                <div className={classes["links"]}>
                    <Auth requiredPermission="VALIDATE">
                        <NavLink className={linkClassName} to="/requests">
                            Заявки
                        </NavLink>
                    </Auth>
                    <Auth
                        fallback={<NavLink to="/sign-in" className={linkClassName}>Войти</NavLink>}
                    >
                        <NavLink className={linkClassName} to="/account">
                            Личный кабинет
                        </NavLink>
                    </Auth>
                </div>
            </nav>
        </Container>
    );
}