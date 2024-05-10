import { v4 as uuid } from "uuid";
import {INotification, INotificationPayload} from "@/models/notification";

export const createNotification = (payload: INotificationPayload): INotification => ({
    ...payload,
    id: uuid()
});