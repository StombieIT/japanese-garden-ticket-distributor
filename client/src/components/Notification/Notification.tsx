import {FC} from "react";
import cn from "classnames";

import {INotificationPayload} from "@/models/notification";

import CloseIcon from "./close.svg?react";
import classes from "./Notification.module.styl";

export const enum NotificationView {
    LIST_ITEM = "li"
}

export interface INotificationProps {
    view?: NotificationView;
    notification: INotificationPayload;
    onClose?: () => void;
}

export const Notification: FC<INotificationProps> = ({
    notification,
    view: View = NotificationView.LIST_ITEM,
    onClose
}) => {
    const notificationClasses = cn(
        classes["notification"],
        classes[`__type-${notification.type}`]
    );

    return (
        <View className={notificationClasses}>
            {notification.text}
            <span className={classes["close-wrapper"]} onClick={onClose}>
                <CloseIcon />
            </span>
        </View>
    );
};
