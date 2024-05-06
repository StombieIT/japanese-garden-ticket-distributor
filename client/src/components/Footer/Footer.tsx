import {FC} from "react";
import {Container} from "@/components/Container/Container";

import classes from "./Footer.module.styl";

export const Footer: FC = () => {
    return (
        <footer className={classes["footer"]}>
            <Container>
                Ficko
            </Container>
        </footer>
    );
};