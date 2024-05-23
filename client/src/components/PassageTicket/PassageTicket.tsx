import {forwardRef} from "react";
import {IPassage, IPassageExtended, isPassageExtended} from "@/models/passage";
import {QrCode} from "@/components/QrCode/QrCode";
import {PassageTicketStatus} from "@/components/PassageTicketStatus/PassageTicketStatus";

import classes from "./PassageTicket.module.styl";
import TrashIcon from "./trash.svg?react";
import cn from "classnames";

export interface IPassageTicketProps {
    passage: IPassage | IPassageExtended;
    withMeta?: boolean;
    className?: string;
    onDelete?: () => void;
}

const PROTOCOL = window.location.protocol;
const HOST = window.location.host;

const FULL_BASE_URL = `${PROTOCOL}//${HOST}${import.meta.env.BASE_URL}`;

export const PassageTicket = forwardRef<HTMLDivElement, IPassageTicketProps>(
    ({passage, withMeta = false, className, onDelete},
     ref
) => {
    const { id, date, time, status } = passage;

    const ticketClasses = cn(
        classes["ticket"],
        className
    );

    return (
        <div ref={ref} className={ticketClasses}>
            <div className={classes["code-wrapper"]}>
                <QrCode value={`${FULL_BASE_URL}passage/${id}`} />
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
                                <span>{time.entryTime}</span>
                            </div>
                            <div className={classes["info"]}>
                                <span className={classes["info-header"]}>Статус</span>
                                <PassageTicketStatus status={status} />
                            </div>
                        </div>
                        {
                            isPassageExtended(passage) && (
                                <div className={classes["data"]}>
                                    <div className={classes["info"]}>
                                        <span className={classes["info-header"]}>Email</span>
                                        <span>{passage.user.email}</span>
                                    </div>
                                    <div className={classes["info"]}>
                                        <span className={classes["info-header"]}>Фамилия</span>
                                        <span>{passage.user.lastName}</span>
                                    </div>
                                    <div className={classes["info"]}>
                                        <span className={classes["info-header"]}>Имя</span>
                                        <span>{passage.user.firstName}</span>
                                    </div>
                                    <div className={classes["info"]}>
                                        <span className={classes["info-header"]}>Отчество</span>
                                        <span>{passage.user.middleName}</span>
                                    </div>
                                </div>
                            )
                        }
                        {
                            withMeta && (
                                <div className={classes["meta-info"]}>
                                    Для ускорения процесса прохождения подтверждения и активации предъявите QR-код сотруднику парка
                                </div>
                            )
                        }
                    </div>
                    {
                        onDelete && (
                            <button type="button" className={classes["delete-button"]} onClick={onDelete}>
                                <TrashIcon />
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
});