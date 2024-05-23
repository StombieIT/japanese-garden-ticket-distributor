import {createEffect} from "effector";

import {PassageStatusId} from "@/models/passage";
import {api} from "@/utils/api";

export interface ICreatePassageParams {
    date: string;
    timeId: PassageStatusId;
}

export const createPassage = createEffect((params: ICreatePassageParams) =>
    api.postForm<ICreatePassageParams>("/create-passage.php", params)
);