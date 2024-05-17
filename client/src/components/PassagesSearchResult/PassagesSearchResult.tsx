import {FC} from "react";
import {useUnit} from "effector-react";
import {$isPassagesLoading, $passages} from "@/state-management/passages-search";
import {Link} from "@tanstack/react-router";
import {PassageTicket} from "@/components/PassageTicket/PassageTicket";

import classes from "./PassagesSearchResult.module.styl";

export const PassagesSearchResult: FC = () => {
    const passages = useUnit($passages);
    const isLoading = useUnit($isPassagesLoading);

    if (isLoading) {
        return <h3 className={classes["content"]}>Идёт загрузка...</h3>
    }

    if (!passages.length) {
        return <h3 className={classes["content"]}>Ни одного билета не найдено</h3>
    }

    return (
        <ul className={classes["content"]}>
            {
                passages.map(passage => (
                    <li key={passage.id} className={classes["search-item"]}>
                        <Link
                            className={classes["link"]}
                            to="/passage"
                            search={{ id: passage.id }}
                        >
                            <PassageTicket passage={passage} />
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}