import {sample} from "effector";
import {register} from "@/state-management/effects/register";
import {appendNotification} from "@/state-management/notifications";
import {createNotification} from "@/utils/notification";
import {NotificationType} from "@/models/notification";

sample({
    source: register.done,
    fn: () => createNotification({
        type: NotificationType.SUCCESS,
        text: "Регистрация прошла успешно! Войдите в аккаунт для продолжения"
    }),
    target: appendNotification
});

sample({
    source: register.fail,
    fn: () => createNotification({
        type: NotificationType.ERROR,
        text: "Регистрация прошла успешно! Войдите в аккаунт для продолжения"
    }),
    target: appendNotification
});
