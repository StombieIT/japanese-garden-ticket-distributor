import {FC} from "react";
import cn from "classnames";

import { PassageStatusName } from "@/models/passage";

import classes from "./PassageTicketStatus.module.styl";

export interface IPassageStatusProps {
    statusName: PassageStatusName;
}

const TEXT_BY_STATUS_MAP = {
    [PassageStatusName.UNCHECKED]: "На подтверждении",
    [PassageStatusName.VALIDATED]: "Подтвержден",
    [PassageStatusName.ACTIVATED]: "Полуактивирован",
    [PassageStatusName.FULLY_ACTIVATED]: "Активирован",
    [PassageStatusName.REJECTED]: "Отменён"
} as const;

export const PassageTicketStatus: FC<IPassageStatusProps> = ({statusName}) => {
    const statusClasses = cn(
        classes["status"],
        classes[`__${statusName}`]
    );

    return (
        <span className={statusClasses}>
            {
                TEXT_BY_STATUS_MAP[statusName]
            }
        </span>
    );
};