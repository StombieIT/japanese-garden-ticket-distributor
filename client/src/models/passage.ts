import {IUser} from "@/models/user";

export type PassageId = number;

export const enum PassageStatus {
    VALIDATED = "validated",
    ACTIVATED = "activated",
    FULLY_ACTIVATED = "fully-activated"
}

export type PassageTimeId = number;
export type EntryTime = `${number}:${number}:${number}`;

export interface IPassageTime {
    id: PassageTimeId;
    entryTime: EntryTime;
}

export interface IPassage {
    id: PassageId;
    date: string;
    time: IPassageTime;
    status: PassageStatus | null;
}

export interface IPassageExtended extends IPassage {
    user: IUser;
}

export const isPassageExtended = (passage: IPassage): passage is IPassageExtended =>
    "user" in passage;
