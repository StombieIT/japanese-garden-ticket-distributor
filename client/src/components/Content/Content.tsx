import {FC} from "react";
import {Container} from "@/components/Container/Container";

import classes from "./Content.module.styl";

export const Content: FC = () => {
    return (
        <main className={classes["content"]}>
            <Container className={classes["container"]}>
                Ficko
            </Container>
        </main>
    );
};