import {IUser} from "@/models/user";

export type PassageId = number;

export type PassageStatusId = number;

export const enum PassageStatusName {
    UNCHECKED = "unchecked",
    VALIDATED = "validated",
    ACTIVATED = "activated",
    FULLY_ACTIVATED = "fully-activated",
    REJECTED = "rejected"
}

export interface IPassageStatus {
    id: PassageStatusId;
    name: PassageStatusName;
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
    status: IPassageStatus;
}

export interface IPassageExtended extends IPassage {
    user: IUser;
}

export const isPassageExtended = (passage: IPassage): passage is IPassageExtended =>
    "user" in passage;
