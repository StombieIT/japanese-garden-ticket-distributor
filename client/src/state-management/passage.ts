import {createEvent, createStore, sample} from "effector";
import {
    IPassageExtended,
    IPassageTime,
    PassageId,
    IPassageStatus,
    PassageStatusId,
    PassageTimeId,
    IPassage
} from "@/models/passage";
import {createEffect} from "effector";
import {api} from "@/utils/api";

export const getPassage = createEffect(async (passageId: PassageId) => {
    const [passage, times, statuses] = await Promise.all([
            api.get<IPassageExtended>(`/passage.php?id=${passageId}`).then(({ data }) => data),
            api.get<IPassageTime[]>(`/passage-times.php`).then(({ data }) => data),
            api.get<IPassageStatus[]>(`/passage-statuses.php`).then(({ data }) => data)
    ]);

    return {
        passage,
        times,
        statuses
    };
});

export const $passage = createStore<IPassageExtended | null>(null)
    .on(getPassage.doneData, (currentPassage, { passage }) => passage);

export const $times = createStore<IPassageTime[]>([])
    .on(getPassage.doneData, (currentTimes, { times }) => times);

export const $timeById = $times.map(times => times.reduce((acc, time) => {
    acc[time.id] = time;
    return acc;
}, {} as Record<PassageTimeId, IPassageTime>));

export const $statuses = createStore<IPassageStatus[]>([])
    .on(getPassage.doneData, (currentStatuses, { statuses }) => statuses);

export const $statusById = $statuses.map(statuses => statuses.reduce((acc, status) => {
    acc[status.id] = status;
    return acc;
}, {} as Record<PassageStatusId, IPassageStatus>));

export const editStatusId = createEvent<PassageStatusId>();

const imperativeEditStatusId = sample({
    clock: editStatusId,
    source: $passage,
    fn: (passage, statusId) => ({ passage, statusId })
});

interface ISubmitEditedParams {
    passageId: PassageId;
    editedTimeId: PassageTimeId | null;
    editedStatusId: PassageTimeId | null;
}

export const submitEdited = createEffect((params: ISubmitEditedParams) =>
    api.postForm(`/passage-edit.php`, params)
);

export const $editedStatusId = createStore<PassageStatusId | null>(null)
    .on(imperativeEditStatusId, (editedStatusId, { passage, statusId }) => {
        if (passage!.status.id === statusId) {
            return null;
        }
        return statusId;
    });

export const editTimeId = createEvent<PassageTimeId>();

const imperativeEditTimeId = sample({
    clock: editTimeId,
    source: $passage,
    fn: (passage, timeId) => ({ passage, timeId })
});

export const $editedTimeId = createStore<PassageTimeId | null>(null)
    .on(imperativeEditTimeId, (editedStatusId, { passage, timeId }) => {
        if (passage!.time.id === timeId) {
            return null;
        }
        return timeId;
    });
