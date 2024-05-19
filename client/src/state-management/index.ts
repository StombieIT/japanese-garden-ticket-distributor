import {createEvent, sample} from "effector";
import {register} from "@/state-management/effects/register";
import {appendNotification} from "@/state-management/notifications";
import {createPassage as createPassageRequest, ICreatePassageParams} from "@/state-management/effects/passage";
import {createNotification} from "@/utils/notification";
import {NotificationType} from "@/models/notification";
import {$date, $selectedTimeId} from "@/state-management/passage-form";

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

export const createPassage = createEvent();

sample({
    clock: createPassage,
    source: {
        timeId: $selectedTimeId,
        date: $date
    },
    fn: (params) => (params as ICreatePassageParams),
    target: createPassageRequest
});

sample({
    source: createPassageRequest.done,
    fn: () => createNotification({
        type: NotificationType.SUCCESS,
        text: "Вы успешно создали заявку!"
    }),
    target: appendNotification,
})

sample({
    source: createPassageRequest.fail,
    fn: () => createNotification({
        type: NotificationType.ERROR,
        text: "Не удалось создать заявку :("
    }),
    target: appendNotification,
})
