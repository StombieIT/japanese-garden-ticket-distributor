export type NotificationId = string;

export const enum NotificationType {
    INFO = "info",
    SUCCESS = "success",
    ERROR = "error"
}

export interface INotificationPayload {
    text: string;
    type: NotificationType
}

export interface INotification extends INotificationPayload {
    id: string;
}
