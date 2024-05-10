import {createEvent, createStore} from "effector";

export const changeFirstName = createEvent<string>();

export const $firstName = createStore("")
    .on(changeFirstName, (state, name) => name);

export const changeLastName = createEvent<string>();

export const $lastName = createStore("")
    .on(changeLastName, (state, lastName) => lastName);

export const changeMiddleName = createEvent<string>();

export const $middleName = createStore("")
    .on(changeMiddleName, (state, middleName) => middleName);
