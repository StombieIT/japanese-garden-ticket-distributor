import {FC} from "react";
import {Container} from "@/components/Container/Container";
import {useUnit} from "effector-react";
import {
    $editedStatusId,
    $editedTimeId,
    $passage,
    $statusById,
    $timeById,
    editStatusId, editTimeId, submitEdited
} from "@/state-management/passage";
import {Dropdown} from "@/components/Dropdown/Dropdown";
import {PassageTicketStatus} from "@/components/PassageTicketStatus/PassageTicketStatus";

import classes from "./Passage.module.styl";
import {Button} from "@/components/Button/Button";

export const Passage: FC = () => {
    const passage = useUnit($passage)!;
    const statuses = useUnit($statusById);
    const times = useUnit($timeById);
    const editedStatusId = useUnit($editedStatusId);
    const editedTimeId = useUnit($editedTimeId);

    return (
        <Container className={classes["passage-content"]}>
            <h1>Валидация и редактирование билета</h1>
            <div className={classes["editor"]}>
                <div className={classes["line"]}>
                    <span>
                        Фамилия:
                    </span>
                    <span>
                        {passage.user.lastName}
                    </span>
                </div>
                <div className={classes["line"]}>
                    <span>
                        Имя:
                    </span>
                    <span>
                        {passage.user.firstName}
                    </span>
                </div>
                <div className={classes["line"]}>
                    <span>
                        Отчество:
                    </span>
                    <span>
                        {passage.user.middleName}
                    </span>
                </div>
                <div className={classes["line"]}>
                    <span>
                        Email:
                    </span>
                    <span>
                        {passage.user.email}
                    </span>
                </div>
                <div className={classes["line"]}>
                    <span>
                        Статус:
                    </span>
                    <Dropdown
                        items={statuses}
                        selectedItemId={editedStatusId ?? passage.status.id}
                        renderItem={status => (
                            <PassageTicketStatus key={status.id} statusName={status.name} />
                        )}
                        onChange={itemId => editStatusId(itemId)}
                    />
                </div>
                <div className={classes["line"]}>
                    <span>
                        Время:
                    </span>
                    <Dropdown
                        items={times}
                        selectedItemId={editedTimeId ?? passage.time.id}
                        renderItem={time => (
                            <span key={time.id}>{time.entryTime}</span>
                        )}
                        onChange={itemId => editTimeId(itemId)}
                    />
                </div>
            </div>
            <Button
                className={classes["submit-button"]}
                disabled={editedStatusId === null && editedTimeId === null}
                onClick={() => submitEdited({ editedStatusId, editedTimeId, passageId: passage.id })}
            >
                Изменить
            </Button>
        </Container>
    );
};