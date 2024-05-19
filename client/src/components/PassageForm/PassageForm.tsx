import {FC, useEffect} from "react";
import {useUnit} from "effector-react";
import cn from "classnames";
import {Link} from "@tanstack/react-router";

import {$isAuth} from "@/state-management/auth";
import {
    $date,
    $selectedTimeId,
    $timeById,
    changeDate,
    changeSelectedTimeId,
    getTimes
} from "@/state-management/passage-form";
import {Input} from "@/components/Input/Input";
import {Dropdown} from "@/components/Dropdown/Dropdown";

import classes from "./PassageForm.module.styl";

export const PassageForm: FC = () => {
    const isAuth = useUnit($isAuth);
    const timeById = useUnit($timeById);
    const selectedTimeId = useUnit($selectedTimeId);
    const date = useUnit($date);

    useEffect(() => {
        getTimes()
    }, []);

    if (selectedTimeId === null) {
        return null;
    }

    let content = (
        <form className={classes["form"]}>
            <label>
                <h4 className={classes["header"]}>Дата</h4>
                <Input
                    type="date"
                    className={classes["text"]}
                    onChange={evt => changeDate(evt.target.value)}
                    value={date}
                />
            </label>
            <h4 className={cn(classes["header"], classes["__mt"])}>Время</h4>
            <Dropdown
                items={timeById}
                selectedItemId={selectedTimeId}
                renderItem={time => (
                    <span className={cn(classes["text"], classes["time"])}>
                        {time.entryTime}
                    </span>
                )}
                onChange={timeId => changeSelectedTimeId(timeId)}
            />
        </form>
    );

    if (!isAuth) {
        content = (
            <Link className={classes["link"]} to="/register">
                {content}
            </Link>
        );
    }

    return content;
};