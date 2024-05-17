import {createEvent, createEffect, createStore, sample} from "effector";
import {IPassageExtended} from "@/models/passage";
import {api} from "@/utils/api";
import {debounce} from "patronum";

const DEBOUNCE_TIME = 700;

export const queryChange = createEvent<string>();

export const $query = createStore<string>("")
    .on(queryChange, (currentQuery, query) => query);

const $debouncedQuery = debounce({
    source: $query,
    timeout: DEBOUNCE_TIME
});

const getPassages = createEffect( (query: string) => new Promise<IPassageExtended[]>((resolve, reject) =>
    api.get<IPassageExtended[]>(`/passages-search.php?query=${query}`)
        .then(({ data }) => resolve(data))
        .catch(reject)
));

sample({
    source: $debouncedQuery,
    target: getPassages
});

export const $passages = createStore<IPassageExtended[]>([])
    .on(getPassages.doneData, (currentPassages, passages) => passages)
    .on(getPassages.pending, (currentPassages, isPending) => isPending ? [] : currentPassages);

export const $isPassagesLoading = createStore<boolean>(false)
    .on(getPassages.pending, ($isPassagesLoading, isPending) => isPending);
