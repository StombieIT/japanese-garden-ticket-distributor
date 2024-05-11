import {ButtonHTMLAttributes, FC} from "react";
import cn from "classnames";

import classes from "./Button.module.styl";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({className, ...props}) => {
    return (
        <button className={cn(classes["button"], className)} {...props} />
    );
}