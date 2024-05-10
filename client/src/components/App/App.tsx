import React, {FC, useEffect} from "react";
import {authenticateUser} from "@/state-management/auth";
import {NavBar} from "@/components/NavBar/NavBar";
import {Footer} from "@/components/Footer/Footer";
import {Outlet} from "@tanstack/react-router"
import {Notifications} from "@/components/Notifications/Notifications";

export const App: FC = () => {
    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <>
            <NavBar />
            <Outlet />
            <Notifications />
            <Footer />
        </>
    );
};
