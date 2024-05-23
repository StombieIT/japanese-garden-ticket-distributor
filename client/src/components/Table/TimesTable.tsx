import {FC, useEffect} from "react";
import {useUnit} from "effector-react";

import {Container} from "@/components/Container/Container";
import {Button} from "@/components/Button/Button";
import {
    $addingTimes,
    $editingTimes,
    $isLoading,
    $times, addTime, addTimes, changeAddingTimeProperty,
    changeEditingTimeProperty, clearAddingTimes, deleteTimes,
    getTimes, toggleEditingByTimeId, updateTimes
} from "@/state-management/times";

import classes from "./Table.module.styl";

export const TimesTable: FC = () => {
    const times = useUnit($times);
    const isLoading = useUnit($isLoading);
    const editingTimes = useUnit($editingTimes);
    const addingTimes = useUnit($addingTimes);

    useEffect(() => {
        getTimes();
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
                    <th className={classes["cell"]}>Время</th>
                </tr>
                </thead>
                <tbody>
                {
                    times.map(time => {
                        const editingTime = editingTimes[time.id];

                        // @ts-ignore
                        return (
                            <tr className={classes["row"]} key={time.id}>
                                <td className={classes["cell"]}>
                                    <input
                                        type="checkbox"
                                        checked={!!editingTime}
                                        onChange={() => toggleEditingByTimeId(time.id)}
                                    />
                                </td>
                                <td className={classes["cell"]}>
                                    {time.id}
                                </td>
                                <td className={classes["cell"]}>
                                    {
                                        editingTime
                                            ? <input
                                                type="email"
                                                className={classes["editing-field"]}
                                                // @ts-ignore
                                                onChange={evt => changeEditingTimeProperty({
                                                    timeId: time.id,
                                                    property: "entryTime",
                                                    value: evt.target.value
                                                })}
                                                value={editingTime.entryTime}
                                            />
                                            : time.entryTime
                                    }
                                </td>
                            </tr>
                        );
                    })
                }
                {
                    addingTimes.map((addingTime, idx) => (
                        <tr className={classes["row"]} key={idx}>
                            <td className={classes["cell"]}></td>
                            <td className={classes["cell"]}></td>
                            <td className={classes["cell"]}>
                                <input
                                    className={classes["editing-field"]}
                                    value={addingTime.entryTime}
                                    // @ts-ignore
                                    onChange={evt => changeAddingTimeProperty({
                                        idx,
                                        property: "entryTime",
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
                    !!addingTimes.length && (
                        <>
                            <Button
                                className={classes["submit-button"]}
                                onClick={() => addTimes({ times: addingTimes })}
                            >
                                Сохранить добавленные
                            </Button>
                            <Button
                                className={classes["submit-button"]}
                                onClick={() => clearAddingTimes()}
                            >
                                Удалить добавленные
                            </Button>
                        </>
                    )
                }
                <Button
                    className={classes["submit-button"]}
                    onClick={() => addTime()}
                >
                    Добавить новое время
                </Button>
                <Button
                    className={classes["submit-button"]}
                    disabled={!Object.entries(editingTimes).length}
                    onClick={() => deleteTimes(Object.values(editingTimes).map(time => time.id))}
                >
                    Удалить
                </Button>
                <Button
                    className={classes["submit-button"]}
                    disabled={!Object.entries(editingTimes).length}
                    onClick={() => updateTimes(editingTimes)}
                >
                    Изменить
                </Button>
            </div>
        </Container>
    );
};