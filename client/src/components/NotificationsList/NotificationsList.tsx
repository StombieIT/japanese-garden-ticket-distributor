import {FC} from "react";
import {useUnit} from "effector-react";
import {$notificationsStore, removeNotificationById} from "@/state-management/notifications";
import {Notification} from "@/components/Notification/Notification";

import classes from "./NotificationsList.module.styl";

export const NotificationsList: FC = () => {
    const notifications = useUnit($notificationsStore);

    if (!notifications.length) {
        return null;
    }

    return (
        <ul className={classes["notifications-list"]}>
            {
                notifications.map(notification => (
                    <Notification
                        key={notification.id}
                        notification={notification}
                        onClose={() => removeNotificationById(notification.id)}
                    />
                ))
            }
        </ul>
    );
};