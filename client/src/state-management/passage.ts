import {createStore} from "effector";
import {IPassageExtended, IPassageTime, PassageId} from "@/models/passage";
import {createEffect} from "effector";
import {api} from "@/utils/api";
import {getPassages} from "@/state-management/passages";

export const getPassage = createEffect(async (passageId: PassageId) => {
    const [passage, times] = await Promise.all([
        api.get<IPassageExtended>(`/passage.php?id=${passageId}`).then(({ data }) => data),
        api.get<IPassageTime[]>(`/passage-times.php`).then(({ data }) => data)
    ]);

    return {
        passage,
        times
    };
});

export const $passage = createStore<IPassageExtended | null>(null)
    .on(getPassage.doneData, (currentPassage, { passage }) => passage);

export const $times = createStore<IPassageTime[]>([])
    .on(getPassage.doneData, (currentTimes, { times }) => times);
