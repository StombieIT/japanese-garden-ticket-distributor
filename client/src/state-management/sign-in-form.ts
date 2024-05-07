import {createEvent, createStore} from "effector";

export const changeEmail = createEvent<string>();

export const $emailStore = createStore<string>("")
    .on(changeEmail, (state, email) => email);


export const changePassword = createEvent<string>();

export const $passwordStore = createStore<string>("")
    .on(changePassword, (state, password) => password);

