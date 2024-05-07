import {FC} from "react";

import {Link, Outlet} from "@tanstack/react-router";
import {Container, ContainerView} from "@/components/Container/Container";

import classes from "./AuthForm.module.styl";
import cn from "classnames";

const activeLinkProps = {
    className: cn(classes["tab"], classes["__active"])
};

const inactiveLinkProps = {
    className: classes["tab"]
};

export const AuthForm: FC = () => {
    return (
        <Container view={ContainerView.MAIN} className={classes["auth-form-container"]}>
            <div className={classes["auth-form-wrapper"]}>
                <div className={classes["tabs"]}>
                    <Link to="/register" activeProps={activeLinkProps} inactiveProps={inactiveLinkProps}>
                        Регистрация
                    </Link>
                    <Link to="/sign-in" activeProps={activeLinkProps} inactiveProps={inactiveLinkProps}>
                        Вход
                    </Link>
                </div>
                <div className={classes["form-wrapper"]}>
                    {/* actual form in dependence of route */}
                    <Outlet />
                </div>
            </div>
        </Container>
    );
};