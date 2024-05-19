import {createStore} from "effector";
import {createEffect} from "effector";
import {api} from "@/utils/api";

export interface ICommonStatistics {
    validatedTicketsCount: number;
    totalTicketsCount: number;
}

export const updateStatistics = createEffect(() =>
    api.get<ICommonStatistics>("/common-passage-statistics.php").then(({ data }) => data)
);

export const $commonStatistics = createStore<ICommonStatistics | null>(null)
    .on(updateStatistics.doneData, (currentStatistics, statistics) => statistics);
