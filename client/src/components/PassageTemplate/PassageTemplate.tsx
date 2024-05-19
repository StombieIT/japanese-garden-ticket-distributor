import {FC, useEffect, useRef} from "react";
import {useUnit} from "effector-react";

import {PassageTicket} from "@/components/PassageTicket/PassageTicket";
import {$date, $selectedTime} from "@/state-management/passage-form";
import {IPassageExtended, PassageStatusName} from "@/models/passage";
import {$authUserStore} from "@/state-management/auth";
import {createPassage} from "@/state-management";

import classes from "./PassageTemplate.module.styl";
import {Button} from "@/components/Button/Button";

export const PassageTemplate: FC = () => {
    const date = useUnit($date);
    const time = useUnit($selectedTime);
    const authUser = useUnit($authUserStore);

    const passageTicketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        passageTicketRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [date, time?.id]);

    if (!date || !time || !authUser) {
        return null;
    }

    const passage: IPassageExtended = {
        id: 0,
        date,
        time,
        status: {
            id: 0,
            name: PassageStatusName.UNCHECKED
        },
        user: authUser
    };

    return (
        <div className={classes["passage-wrapper"]}>
            <PassageTicket ref={passageTicketRef} className={classes["passage"]} passage={passage} />

            <Button
                type="submit"
                className={classes["submit-button"]}
                onClick={() => createPassage()}
            >
                Создать заявку
            </Button>
        </div>
    );
};