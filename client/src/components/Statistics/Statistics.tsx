import {FC, useEffect} from "react";
import {useUnit} from "effector-react";

import {$commonStatistics, updateStatistics} from "@/state-management/statistics";

import classes from "./Statistics.module.styl";

export const Statistics: FC = () => {
    const commonStatistics = useUnit($commonStatistics);

    useEffect(() => {
        updateStatistics();
    }, []);

    if (!commonStatistics) {
        return null;
    }

    return (
        <div className={classes["statistics"]}>
            <h3 className={classes["header"]}>На текущий момент</h3>
            <div className={classes["line"]}>
                <span>Общее количество билетов</span>
                <span>{commonStatistics.totalTicketsCount}</span>
            </div>
            <div className={classes["line"]}>
                <span>Зарегистрировано билетов:</span>
                <span>{commonStatistics.validatedTicketsCount}</span>
            </div>
        </div>
    );
};