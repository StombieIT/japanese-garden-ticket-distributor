import {FC} from "react";
import cn from "classnames";

import { PassageStatus } from "@/models/passage";

import classes from "./PassageTicketStatus.module.styl";

export interface IPassageStatusProps {
    status: PassageStatus | null;
}

const TEXT_BY_STATUS_MAP = {
    [PassageStatus.VALIDATED]: "Подтвержден",
    [PassageStatus.ACTIVATED]: "Полуактивирован",
    [PassageStatus.FULLY_ACTIVATED]: "Активирован"
} as const;

export const PassageTicketStatus: FC<IPassageStatusProps> = ({status}) => {
    const statusClasses = cn(
        classes["status"],
        classes[`__${status}`]
    );

    return (
        <span className={statusClasses}>
            {
                status
                    ? TEXT_BY_STATUS_MAP[status]
                    : "На подтверждении"
            }
        </span>
    );
};