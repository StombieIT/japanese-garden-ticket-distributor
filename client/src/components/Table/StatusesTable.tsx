import {FC, useEffect} from "react";
import {useUnit} from "effector-react";

import {Container} from "@/components/Container/Container";
import {Button} from "@/components/Button/Button";
import {
    $statuses,
    $addingStatuses,
    $editingStatuses,
    $isLoading, addStatus, addStatuses, changeEditingStatusProperty, clearAddingStatuses, deleteStatuses,
    getStatuses,
    toggleEditingByStatusId, updateStatuses, changeAddingStatusProperty
} from "@/state-management/statuses";

import classes from "./Table.module.styl";

export const StatusesTable: FC = () => {
    const statuses = useUnit($statuses);
    const isLoading = useUnit($isLoading);
    const editingStatuses = useUnit($editingStatuses);
    const addingStatuses = useUnit($addingStatuses);

    useEffect(() => {
        getStatuses();
    }, []);

    if (isLoading) {
        return <h3>Идёт загрузка...</h3>;
    }

    return (
        <Container className={classes["content"]}>
            <table className={classes["table"]}>
                <thead className={classes["head"]}>
                    <tr className={classes["row"]}>
                        <th className={classes["cell"]}>Выделить</th>
                        <th className={classes["cell"]}>Id</th>
                        <th className={classes["cell"]}>Статус</th>
                        <th className={classes["cell"]}>Цвет</th>
                    </tr>
                </thead>
                <tbody>
                {
                    statuses.map(status => {
                        const editingStatus = editingStatuses[status.id];

                        // @ts-ignore
                        return (
                            <tr className={classes["row"]} key={status.id}>
                                <td className={classes["cell"]}>
                                    <input
                                        type="checkbox"
                                        checked={!!editingStatus}
                                        onChange={() => toggleEditingByStatusId(status.id)}
                                    />
                                </td>
                                <td className={classes["cell"]}>
                                    {status.id}
                                </td>
                                <td className={classes["cell"]}>
                                    {
                                        editingStatus
                                            ? <input
                                                className={classes["editing-field"]}
                                                // @ts-ignore
                                                onChange={evt => changeEditingStatusProperty({
                                                    statusId: status.id,
                                                    property: "name",
                                                    value: evt.target.value
                                                })}
                                                value={editingStatus.name}
                                            />
                                            : status.name
                                    }
                                </td>
                                <td className={classes["cell"]}>
                                    {
                                        editingStatus
                                            ? <input
                                                type="color"
                                                className={classes["editing-field"]}
                                                // @ts-ignore
                                                onChange={evt => changeEditingStatusProperty({
                                                    statusId: status.id,
                                                    property: "color",
                                                    value: evt.target.value
                                                })}
                                                value={editingStatus.color}
                                            />
                                            : <span style={{ backgroundColor: status.color }}>{status.color}</span>
                                    }
                                </td>
                            </tr>
                        );
                    })
                }
                {
                    addingStatuses.map((addingStatus, idx) => (
                        <tr className={classes["row"]} key={idx}>
                            <td className={classes["cell"]}></td>
                            <td className={classes["cell"]}></td>
                            <td className={classes["cell"]}>
                                <input
                                    className={classes["editing-field"]}
                                    value={addingStatus.name}
                                    // @ts-ignore
                                    onChange={evt => changeAddingStatusProperty({
                                        idx,
                                        property: "name",
                                        value: evt.target.value
                                    })}
                                />
                            </td>
                            <td className={classes["cell"]}>
                                <input
                                    type="color"
                                    className={classes["editing-field"]}
                                    value={addingStatus.color}
                                    // @ts-ignore
                                    onChange={evt => changeAddingStatusProperty({
                                        idx,
                                        property: "color",
                                        value: evt.target.value
                                    })}
                                />
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div className={classes["controls"]}>
                {
                    !!addingStatuses.length && (
                        <>
                            <Button
                                className={classes["submit-button"]}
                                onClick={() => addStatuses({ statuses: addingStatuses })}
                            >
                                Сохранить добавленные
                            </Button>
                            <Button
                                className={classes["submit-button"]}
                                onClick={() => clearAddingStatuses()}
                            >
                                Удалить добавленные
                            </Button>
                        </>
                    )
                }
                <Button
                    className={classes["submit-button"]}
                    onClick={() => addStatus()}
                >
                    Добавить новый статус
                </Button>
                <Button
                    className={classes["submit-button"]}
                    disabled={!Object.entries(editingStatuses).length}
                    onClick={() => deleteStatuses(Object.values(editingStatuses).map(status => status.id))}
                >
                    Удалить
                </Button>
                <Button
                    className={classes["submit-button"]}
                    disabled={!Object.entries(editingStatuses).length}
                    onClick={() => updateStatuses(editingStatuses)}
                >
                    Изменить
                </Button>
            </div>
        </Container>
    );
};