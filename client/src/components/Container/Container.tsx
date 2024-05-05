import {FC, PropsWithChildren} from "react";

import classes from "./Container.module.styl";

export const Container: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={classes["container"]}>
            {children}
        </div>
    )
};