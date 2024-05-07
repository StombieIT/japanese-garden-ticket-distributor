import {FC, HTMLAttributes, PropsWithChildren} from "react";

import classes from "./Container.module.styl";
import cn from "classnames";

export const enum ContainerView {
    BASE = "div",
    MAIN = "main"
}

export interface IContainerProps extends PropsWithChildren, Pick<HTMLAttributes<HTMLDivElement>, "className"> {
    view?: ContainerView
}

export const Container: FC<IContainerProps> = ({
    view: View = ContainerView.BASE,
    children,
    className
}) => {
    return (
        <View className={cn(classes["container"], className)}>
            {children}
        </View>
    )
};