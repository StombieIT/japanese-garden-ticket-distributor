import {FC} from "react";
import {IPassage, PassageStatus} from "@/models/passage";
import {QrCode} from "@/components/QrCode/QrCode";

import classes from "./PassageTicket.module.styl";
import TrashIcon from "./trash.svg?react";
import {PassageTicketStatus} from "@/components/PassageTicketStatus/PassageTicketStatus";

export interface IPassageTicketProps {
    passage: IPassage;
    onDelete?: () => void;
}

export const PassageTicket: FC<IPassageTicketProps> = ({passage, onDelete}) => {
    const { id, date, entryTime, status } = passage;

    return (
        <div className={classes["ticket"]}>
            <div className={classes["code-wrapper"]}>
                <QrCode value="https://dl.spbstu.ru/grade/report/user/index.php?id=476" />
            </div>
            <div className={classes["main-part"]}>
                <h4 className={classes["header"]}>
                    Билет в Японский Сад
                </h4>
                <div className={classes["payload"]}>
                    <div className={classes["data-wrapper"]}>
                        <div className={classes["data"]}>
                            <div className={classes["info"]}>
                                <span className={classes["info-header"]}>Номер</span>
                                <span>{id}</span>
                            </div>
                            <div className={classes["info"]}>
                                <span className={classes["info-header"]}>Дата</span>
                                <span>{date}</span>
                            </div>
                            <div className={classes["info"]}>
                                <span className={classes["info-header"]}>Время</span>
                                <span>{entryTime}</span>
                            </div>
                            <div className={classes["info"]}>
                                <span className={classes["info-header"]}>Статус</span>
                                <PassageTicketStatus status={status} />
                            </div>
                        </div>
                        <div className={classes["meta-info"]}>
                            Для ускорения процесса прохождения подтверждения и активации предъявите QR-код сотруднику парка
                        </div>
                    </div>
                    <button type="button" className={classes["delete-button"]} onClick={onDelete}>
                        <TrashIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};