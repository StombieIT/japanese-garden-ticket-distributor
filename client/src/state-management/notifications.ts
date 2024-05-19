import {createEvent, createStore} from "effector";
import {INotification, NotificationId, NotificationType} from "@/models/notification";

export const removeNotificationById = createEvent<NotificationId>();

export const appendNotification = createEvent<INotification>();

export const $notificationsStore = createStore<INotification[]>([])
    .on(removeNotificationById, (notifications, notificationId) =>
        notifications.filter(notification => notification.id !== notificationId)
    )
    .on(appendNotification, (notifications, notification) => [...notifications, notification]);