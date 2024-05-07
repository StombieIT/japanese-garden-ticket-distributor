import {ChangeEvent, FC, HTMLAttributes, HTMLProps, useMemo} from "react";

import classes from "./Input.module.styl";
import cn from "classnames";

export interface IInputProps extends HTMLProps<HTMLInputElement> {
    onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<IInputProps> = ({className, ...props}) => {
    const inputClasses = useMemo(() => cn(classes["input"], className), [className]);

    return <input className={inputClasses} {...props} />
}