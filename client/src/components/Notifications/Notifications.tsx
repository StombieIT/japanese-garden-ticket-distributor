import {FC} from "react";
import {createPortal} from "react-dom";
import {NotificationsList} from "@/components/NotificationsList/NotificationsList";

const notifications = document.getElementById("notifications") as HTMLElement;

export const Notifications: FC = () => {
    return createPortal(
        <NotificationsList />,
        notifications
    );
};