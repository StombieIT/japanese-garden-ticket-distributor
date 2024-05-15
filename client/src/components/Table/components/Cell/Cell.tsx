import {FC} from "react";
import {changeEditingUserProperty} from "@/state-management/users";
import {Button} from "@/components/Button/Button";

import classes from "@/components/Table/Table.module.styl";

export interface ICellProps {
    className?: string;
    inputClassName?: string;
    value: string | null;
    onChange?: (value: string | null) => void;
    nullable?: boolean;
    editing?: boolean;
}

export const Cell: FC<ICellProps> = ({
    value,
    nullable = false,
    editing = false,
    onChange
}) => {
    return (
        <td className={classes["cell"]}>
            {
                editing
                ? <>
                    {
                        value !== null && (
                            <input
                                className={classes["editing-field"]}
                                onChange={evt => onChange?.(evt.target.value)}
                                value={value}
                            />
                        )
                    }
                    {
                        nullable && (
                            <Button onClick={() => onChange?.(value === null ? "" : null)}>
                                {value === null ? "+" : "-"}
                            </Button>
                        )
                    }
                </>
                : value
            }
        </td>
    );
}