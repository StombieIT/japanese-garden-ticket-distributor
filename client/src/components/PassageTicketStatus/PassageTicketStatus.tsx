import {FC} from "react";

import {IPassageStatusPayload} from "@/models/passage";

import classes from "./PassageTicketStatus.module.styl";

export interface IPassageStatusProps {
    status: IPassageStatusPayload;
}

export const PassageTicketStatus: FC<IPassageStatusProps> = ({status}) => {
    return (
        <span
            style={{ backgroundColor: status.color }}
            className={classes["status"]}
        >
            {status.name}
        </span>
    );
};