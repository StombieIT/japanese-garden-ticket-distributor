import {FC, HTMLAttributes, PropsWithChildren} from "react";

import classes from "./Container.module.styl";
import cn from "classnames";

export interface IContainerProps extends PropsWithChildren, Pick<HTMLAttributes<HTMLDivElement>, "className"> {}

export const Container: FC<IContainerProps> = ({children, className}) => {
    return (
        <div className={cn(classes["container"], className)}>
            {children}
        </div>
    )
};