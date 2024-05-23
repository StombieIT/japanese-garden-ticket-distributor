import {createEvent, createStore, sample, createEffect} from "effector";
import {AxiosResponse} from "axios";

import {api} from "@/utils/api";
import {IPassageStatus, PassageStatusId} from "@/models/passage";

interface IAddedPassageStatus extends Omit<IPassageStatus, "id"> {}

export const getStatuses = createEffect(async () => {
    const { data } = await api.get<IPassageStatus[]>("/passage-statuses.php");
    return data;
});

export interface IAddStatusesParams {
    statuses: IAddedPassageStatus[];
}

export const addStatuses = createEffect(async (params: IAddStatusesParams) => {
    const { data } = await api.postForm<IAddStatusesParams, AxiosResponse<IPassageStatus[]>>("/passage-statuses/add.php", params);
    return data;
});

export const deleteStatuses = createEffect((statusIds: PassageStatusId[]) =>
    api.postForm("/passage-statuses/delete.php", { statusIds })
);

export const toggleEditingByStatusId = createEvent<PassageStatusId>();

export interface IChangeEditingStatusProperty {
    statusId: PassageStatusId;
    property: keyof IPassageStatus;
    value: IPassageStatus[keyof IPassageStatus]
}

export const changeEditingStatusProperty = createEvent<IChangeEditingStatusProperty>();

export const updateStatuses = createEffect(async (editedStatuses: Record<PassageStatusId, IPassageStatus>) => {
    const statusesList = Object.values(editedStatuses);
    await api.postForm<IPassageStatus[]>("/passage-statuses/update.php", { updatedStatuses: editedStatuses });
});

export const $isLoading = createStore<boolean>(false)
    .on(getStatuses.pending, (isLoading, isPending) => isPending);

export const $statuses = createStore<IPassageStatus[]>([])
    .on(getStatuses.doneData, (currentStatuses, statuses) => statuses)
    .on(updateStatuses.done, (currentStatuses, { params: editedStatuses }) => currentStatuses.map(status => editedStatuses[status.id] ? editedStatuses[status.id] : status))
    .on(addStatuses.doneData, (currentStatuses, addedStatuses) => [...currentStatuses, ...addedStatuses])
    .on(deleteStatuses.done, (currentStatuses, { params: statusIds }) =>
        currentStatuses.filter(status => !statusIds.includes(status.id))
    );

const toggleEditing = sample({
    source: {
        statuses: $statuses,
    },
    clock: toggleEditingByStatusId,
    fn: (source, statusId) => ({ ...source, statusId })
});

export const $editingStatuses = createStore<Record<PassageStatusId, IPassageStatus>>({})
    .on(toggleEditing, (editingStatuses, { statuses, statusId }) => {
        if (editingStatuses[statusId]) {
            delete editingStatuses[statusId];
        } else {
            const statusToEdit = statuses.find(status => status.id === statusId)!;
            editingStatuses[statusId] = {
                ...statusToEdit
            };
        }
        return {...editingStatuses};
    })
    .on(changeEditingStatusProperty, (editingStatuses, { statusId, property, value }) => {
        // @ts-ignore
        editingStatuses[statusId]![property] = value;
        return {...editingStatuses};
    });

updateStatuses.done.watch(console.log)

sample({
    clock: [updateStatuses.finally, deleteStatuses.done],
    fn: () => ({}),
    target: $editingStatuses
});

export const addStatus = createEvent();

export const clearAddingStatuses = createEvent();

export interface IChangeAddingStatusProperty {
    idx: number;
    property: keyof IAddedPassageStatus;
    value: IPassageStatus[keyof IAddedPassageStatus]
}

export const changeAddingStatusProperty = createEvent<IChangeAddingStatusProperty>();

export const $addingStatuses = createStore<IAddedPassageStatus[]>([])
    .on(addStatus, addingStatuses => [...addingStatuses, {
        name: "",
        color: "#000000"
    }])
    .on(changeAddingStatusProperty, (addingStatuses, { idx, property, value }) => {
        // @ts-ignore
        addingStatuses[idx][property] = value;
        return [...addingStatuses];
    });

sample({
    clock: [addStatuses.done, clearAddingStatuses],
    fn: () => [],
    target: $addingStatuses
});
