import {createStore} from "effector";
import {IPassage, PassageId} from "@/models/passage";
import {createEffect} from "effector";
import {api} from "@/utils/api";

export const removePassageById = createEffect((passageId: PassageId) =>
    api.postForm("/remove-passage.php", { passageId })
);

export const getPassages = createEffect(async () => {
    const response = await api.get<IPassage[]>("/passages.php");
    return response.data;
});

export const $isLoadingStore = createStore<boolean>(false)
    .on(getPassages.pending, (isLoading, isPending) => isPending);

export const $passagesStore = createStore<IPassage[]>([])
    .on(getPassages.doneData, (passages, requestedPassages) => requestedPassages)
    .on(removePassageById.done, (passages, { params: passageId }) =>
        passages.filter(passage => passage.id !== passageId)
    );
