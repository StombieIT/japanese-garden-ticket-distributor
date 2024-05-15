import {createEvent, createStore, sample} from "effector";
import {createEffect} from "effector";
import {IUser, IUserExtended, UserId} from "@/models/user";
import {IRole, RoleId} from "@/models/role";
import {api} from "@/utils/api";
import {AxiosResponse} from "axios";

export const getUsers = createEffect(async () => {
    const [usersResponse, rolesResponse] = await Promise.all([
        api.get<IUserExtended[]>("/users.php"),
        api.get<IRole[]>("/roles.php")
    ]);

    return {
        users: usersResponse.data,
        roles: rolesResponse.data
    };
});

export const toggleEditingByUserId = createEvent<UserId>();

export interface IChangeEditingUserProperty {
    userId: UserId;
    property: keyof IUserExtended;
    value: IUserExtended[keyof IUserExtended]
}

export const changeEditingUserProperty = createEvent<IChangeEditingUserProperty>();

export const updateUsers = createEffect(async (users: Record<UserId, IUserExtended>) => {
    const usersList = Object.entries(users).map(([userId, user]) => user);
    await api.postForm<IUserExtended[], AxiosResponse<IUserExtended[]>>("/update-users.php", { usersList });
    return users;
});

export const $isLoadingStore = createStore<boolean>(false)
    .on(getUsers.pending, (isLoading, isPending) => isPending);

export const $rolesStore = createStore<Record<RoleId, IRole>>([])
    .on(getUsers.doneData, (currentRoles, { roles }) => roles.reduce((acc, role) => {
        acc[role.id] = role;
        return acc;
    }, {} as Record<RoleId, IRole>));

export const $usersStore = createStore<IUserExtended[]>([])
    .on(getUsers.doneData, (currentUsers, { users }) => users)
    .on(updateUsers.doneData, (currentUsers, users) => currentUsers.map(user => users[user.id] ? users[user.id] : user));

const toggleEditing = sample({
    source: {
        users: $usersStore,
    },
    clock: toggleEditingByUserId,
    fn: (source, userId) => ({ ...source, userId }),
});

export const $editingUsersStore = createStore<Record<UserId, IUserExtended>>({})
    .on(toggleEditing, (editingUsers, { users, userId }) => {
        if (editingUsers[userId]) {
            delete editingUsers[userId];
        } else {
            const userToEdit = users.find(user => user.id === userId)!;
            editingUsers[userId] = {
                ...userToEdit
            };
        }
        return {...editingUsers};
    })
    .on(changeEditingUserProperty, (editingUsers, { userId, property, value }) => {
        // @ts-ignore
        editingUsers[userId]![property] = value;
        return {...editingUsers};
    })
    .on(updateUsers.done, (editingUsers) => ({}));

