import {FC} from "react";
import {Container} from "@/components/Container/Container";

import classes from "./Content.module.styl";
import {Route} from "react-router-dom";

export const Content: FC = () => {
    return (
        <main className={classes["content"]}>
            <Route>

            </Route>
            <Container className={classes["container"]}>
            </Container>
        </main>
    );
};