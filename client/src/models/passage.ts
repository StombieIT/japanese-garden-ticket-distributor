import {IUser} from "@/models/user";

export type PassageId = number;

export const enum PassageStatus {
    VALIDATED = "validated",
    ACTIVATED = "activated",
    FULLY_ACTIVATED = "fully-activated"
}

export interface IPassage {
    id: PassageId;
    date: string;
    entryTime: string;
    status: PassageStatus | null;
}

export interface IPassageExtended {
    user: IUser;
}
