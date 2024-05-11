import {FC} from "react";
import {Container} from "@/components/Container/Container";

import SvgIcon from "./error.svg?react";
import classes from "./StatusContent.module.styl";

const TEXT_BY_STATUS_CODE_MAP = {
    401: "Вы не авторизованы",
    404: "Страница не найдена",
    403: "Недостаточно прав для просмотра"
} as const;

export type Status = keyof typeof TEXT_BY_STATUS_CODE_MAP;

export interface IStatusBannerProps {
    status: Status;
}

export const StatusContent: FC<IStatusBannerProps> = ({ status }) => {
    return (
        <Container className={classes["status-content"]}>
            <div className={classes["banner"]}>
                <SvgIcon className={classes["icon"]} />
                <h1>
                    {status}, {TEXT_BY_STATUS_CODE_MAP[status]}
                </h1>
            </div>
        </Container>
    );
};