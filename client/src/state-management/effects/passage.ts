import {createEffect} from "effector";

import {PassageTimeId} from "@/models/passage";
import {api} from "@/utils/api";

export interface ICreatePassageParams {
    date: string;
    timeId: PassageTimeId;
}

export const createPassage = createEffect((params: ICreatePassageParams) =>
    api.postForm<ICreatePassageParams>("/create-passage.php", params)
);