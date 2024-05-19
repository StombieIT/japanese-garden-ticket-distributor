import {createEvent, createStore, sample, combine} from "effector";
import {createEffect} from "effector";

import {IPassageTime, PassageTimeId} from "@/models/passage";
import {api} from "@/utils/api";

export const getTimes = createEffect(() =>
    api.get("/passage-times.php").then(({ data }) => data)
);

export const $times = createStore<IPassageTime[]>([])
    .on(getTimes.doneData, (currentTimes, times) => times);

export const $timeById = $times.map(times => times.reduce((acc, time) => {
    acc[time.id] = time;
    return acc;
}, {} as Record<PassageTimeId, IPassageTime>));

export const changeSelectedTimeId = createEvent<PassageTimeId | null>();

export const $selectedTimeId = createStore<PassageTimeId | null>(null)
    .on(changeSelectedTimeId, (currentSelectedTimeId, selectedTimeId) => selectedTimeId);

export const $selectedTime = combine(
    $timeById,
    $selectedTimeId,
    (timeById, selectedTimeId) => {
        console.log('STORES', timeById, selectedTimeId, selectedTimeId ? timeById[selectedTimeId] : null);
        return selectedTimeId ? timeById[selectedTimeId] : null
    }
);

sample({
    clock: $times,
    fn: (times) => times.at(0)?.id ?? null,
    target: changeSelectedTimeId
});

export const changeDate = createEvent<string>();

export const $date = createStore<string>("")
    .on(changeDate, (currentDate, date) => date);
