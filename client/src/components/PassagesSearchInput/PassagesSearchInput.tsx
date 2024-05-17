import {FC} from "react";
import {useUnit} from "effector-react";
import {$query, queryChange} from "@/state-management/passages-search";

import classes from "./PassagesSearchInput.module.styl";

export const PassagesSearchInput: FC = () => {
    const query = useUnit($query);

    return (
        <input
            className={classes["input"]}
            placeholder="Фамилия, Имя или Отчество..."
            value={query}
            onChange={evt => queryChange(evt.target.value)}
        />
    );
};