import {IUser} from "@/models/user";
import {Color} from "@/models/color";

export type PassageStatusId = number;

export interface IPassageStatusPayload {
    name: string;
    color: Color;
}

export interface IPassageStatus extends IPassageStatusPayload {
    id: PassageStatusId;
}

export type PassageTimeId = number;
export type EntryTime = `${number}:${number}:${number}`;

export interface IPassageTime {
    id: PassageTimeId;
    entryTime: EntryTime;
}

export type PassageId = number;

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
