import {FC, useEffect} from "react";
import {useUnit} from "effector-react";
import {$isLoadingStore, $passagesStore, getPassages, removePassageById} from "@/state-management/passages";
import {PassageTicket} from "@/components/PassageTicket/PassageTicket";

import classes from "./PassageTickets.module.styl";

export const PassageTickets: FC = () => {
    const isLoading = useUnit($isLoadingStore);
    const passages = useUnit($passagesStore);

    useEffect(() => {
        getPassages()
    }, []);

    if (isLoading) {
        return <h3>Идёт загрузка билетов...</h3>
    }

    if (!passages.length) {
        return <h3>Нет ни одного билета :/</h3>
    }

    return (
        <>
            <h3 className={classes["header"]}>Билеты</h3>
            {
                passages.map(passage => (
                    <PassageTicket
                        key={passage.id}
                        className={classes["ticket"]}
                        passage={passage}
                        onDelete={() => removePassageById(passage.id)}
                        withMeta
                    />
                ))
            }
        </>
    );
};