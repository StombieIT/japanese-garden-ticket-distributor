import {createEvent, createStore, sample, createEffect} from "effector";
import {AxiosResponse} from "axios";
import {IUserExtended} from "@/models/user";
import {api} from "@/utils/api";
import {IPassageTime, PassageTimeId} from "@/models/passage";

interface IAddedPassageTime extends Omit<IPassageTime, "id"> {}

export const getTimes = createEffect(async () => {
    const { data } = await api.get<IPassageTime[]>("/passage-times.php");
    return data;
});

export interface IAddTimesParams {
    times: IAddedPassageTime[];
}

export const addTimes = createEffect(async (params: IAddTimesParams) => {
    const { data } = await api.postForm<IAddTimesParams, AxiosResponse<IPassageTime[]>>("/passage-times/add.php", params);
    return data;
});

export const deleteTimes = createEffect((timeIds: PassageTimeId[]) =>
    api.postForm("/passage-times/delete.php", { timeIds })
);

export const toggleEditingByTimeId = createEvent<PassageTimeId>();

export interface IChangeEditingTimeProperty {
    timeId: PassageTimeId;
    property: keyof IPassageTime;
    value: IPassageTime[keyof IPassageTime]
}

export const changeEditingTimeProperty = createEvent<IChangeEditingTimeProperty>();

export const updateTimes = createEffect(async (editedTimes: Record<PassageTimeId, IPassageTime>) => {
    const timesList = Object.values(editedTimes);
    const { data } = await api.postForm<IUserExtended[], AxiosResponse<IUserExtended[]>>("/passage-times/update.php", {
        updatedTimes: timesList
    });
    return data;
});

export const $isLoading = createStore<boolean>(false)
    .on(getTimes.pending, (isLoading, isPending) => isPending);

export const $times = createStore<IPassageTime[]>([])
    .on(getTimes.doneData, (currentTimes, times) => times)
    .on(updateTimes.done, (currentTimes, { params: editedTimes }) => currentTimes.map(time => editedTimes[time.id] ? editedTimes[time.id] : time))
    .on(addTimes.doneData, (currentTimes, addedTimes) => [...currentTimes, ...addedTimes])
    .on(deleteTimes.done, (currentTimes, { params: timeIds }) =>
        currentTimes.filter(time => !timeIds.includes(time.id))
    );

const toggleEditing = sample({
    source: {
        times: $times,
    },
    clock: toggleEditingByTimeId,
    fn: (source, timeId) => ({ ...source, timeId })
});

export const $editingTimes = createStore<Record<PassageTimeId, IPassageTime>>({})
    .on(toggleEditing, (editingTimes, { times, timeId }) => {
        if (editingTimes[timeId]) {
            delete editingTimes[timeId];
        } else {
            const timeToEdit = times.find(time => time.id === timeId)!;
            editingTimes[timeId] = {
                ...timeToEdit
            };
        }
        return {...editingTimes};
    })
    .on(changeEditingTimeProperty, (editingUsers, { timeId, property, value }) => {
        // @ts-ignore
        editingUsers[timeId]![property] = value;
        return {...editingUsers};
    })

sample({
    clock: [updateTimes.done, deleteTimes.done],
    fn: () => ({}),
    target: $editingTimes
});

export const addTime = createEvent();

export const clearAddingTimes = createEvent();

export interface IChangeAddingTimeProperty {
    idx: number;
    property: keyof IAddedPassageTime;
    value: IPassageTime[keyof IAddedPassageTime]
}

export const changeAddingTimeProperty = createEvent<IChangeAddingTimeProperty>();

export const $addingTimes = createStore<IAddedPassageTime[]>([])
    .on(addTime, (addingTimes) => [...addingTimes, { entryTime: "00:00:00" }])
    .on(changeAddingTimeProperty, (addingTimes, { idx, property, value }) => {
        addingTimes[idx][property] = value;
        return [...addingTimes];
    });

sample({
    clock: [addTimes.done, clearAddingTimes],
    fn: () => [],
    target: $addingTimes
});

