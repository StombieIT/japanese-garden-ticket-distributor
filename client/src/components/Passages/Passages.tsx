import {FC} from "react";
import {PassagesSearchInput} from "@/components/PassagesSearchInput/PassagesSearchInput";
import {PassagesSearchResult} from "@/components/PassagesSearchResult/PassagesSearchResult";
import {Container} from "@/components/Container/Container";

import classes from "./Passages.module.styl";

export const Passages: FC = () => {
    return (
        <Container className={classes["passages-content"]}>
            <PassagesSearchInput />
            <PassagesSearchResult />
        </Container>
    );
};
