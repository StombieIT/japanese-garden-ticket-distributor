import {FC, useEffect} from "react";
import {useUnit} from "effector-react";
import {
    $editingUsersStore,
    $rolesStore,
    $usersStore,
    changeEditingUserProperty,
    toggleEditingByUserId,
    getUsers,
    updateUsers
} from "@/state-management/users";
import {Container} from "@/components/Container/Container";
import {Button} from "@/components/Button/Button";
import { RoleId } from "@/models/role";

import classes from "./Table.module.styl";

export const UsersTable: FC = () => {
    const users = useUnit($usersStore);
    const roles = useUnit($rolesStore);
    const editingUsers = useUnit($editingUsersStore);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container className={classes["content"]}>
            <table className={classes["table"]}>
                <thead className={classes["head"]}>
                    <tr className={classes["row"]}>
                        <th className={classes["cell"]}>Изменить</th>
                        <th className={classes["cell"]}>Id</th>
                        <th className={classes["cell"]}>Email</th>
                        <th className={classes["cell"]}>Фамилия</th>
                        <th className={classes["cell"]}>Имя</th>
                        <th className={classes["cell"]}>Отчество</th>
                        <th className={classes["cell"]}>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            const editingUser = editingUsers[user.id];

                            // @ts-ignore
                            return (
                                <tr className={classes["row"]} key={user.id}>
                                    <td className={classes["cell"]}>
                                        <input
                                            type="checkbox"
                                            checked={!!editingUser}
                                            onChange={() => toggleEditingByUserId(user.id)}
                                        />
                                    </td>
                                    <td className={classes["cell"]}>
                                        {user.id}
                                    </td>
                                    <td className={classes["cell"]}>
                                        {
                                            editingUser
                                                ? <input
                                                    type="email"
                                                    className={classes["editing-field"]}
                                                    onChange={evt => changeEditingUserProperty({
                                                        userId: user.id,
                                                        property: "email",
                                                        value: evt.target.value
                                                    })}
                                                    value={editingUser.email}
                                                />
                                                : user.email
                                        }
                                    </td>
                                    <td className={classes["cell"]}>
                                        {
                                            editingUser
                                                ? <input
                                                    className={classes["editing-field"]}
                                                    onChange={evt => changeEditingUserProperty({
                                                        userId: user.id,
                                                        property: "lastName",
                                                        value: evt.target.value
                                                    })}
                                                    value={editingUser.lastName}
                                                />
                                                : user.lastName
                                        }
                                    </td>
                                    <td className={classes["cell"]}>
                                        {
                                            editingUser
                                                ? <input
                                                    className={classes["editing-field"]}
                                                    onChange={evt => changeEditingUserProperty({
                                                        userId: user.id,
                                                        property: "firstName",
                                                        value: evt.target.value
                                                    })}
                                                    value={editingUser.firstName}
                                                />
                                                : user.firstName
                                        }
                                    </td>
                                    <td className={classes["cell"]}>
                                        {
                                            editingUser
                                                ? <input
                                                    type="email"
                                                    className={classes["editing-field"]}
                                                    onChange={evt => changeEditingUserProperty({
                                                        userId: user.id,
                                                        property: "middleName",
                                                        value: evt.target.value
                                                    })}
                                                    value={editingUser.middleName}
                                                />
                                                : user.middleName
                                        }
                                    </td>
                                    <td className={classes["cell"]}>
                                        {
                                            editingUser
                                                ? <>
                                                    {
                                                        editingUser.roleId !== null && (
                                                            <select
                                                                onChange={evt => changeEditingUserProperty({
                                                                    userId: user.id,
                                                                    property: "roleId",
                                                                    value: Number(evt.target.value)
                                                                })}
                                                                defaultValue={editingUser.roleId}
                                                            >
                                                                {
                                                                    Object.entries(roles).map(([roleId, role]) => (
                                                                        <option
                                                                            key={roleId}
                                                                            value={roleId}
                                                                        >
                                                                            {role.name}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        )
                                                    }
                                                    <Button
                                                        onClick={() => changeEditingUserProperty({
                                                            userId: user.id,
                                                            property: "roleId",
                                                            value: editingUser.roleId === null
                                                                ? Object.entries(roles)[0][0]
                                                                : null
                                                        })}
                                                    >
                                                        {editingUser.roleId === null ? "+" : "-"}
                                                    </Button>
                                                </>
                                                : roles[user.roleId as RoleId]?.name
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <Button
                className={classes["submit-button"]}
                disabled={!Object.entries(editingUsers).length}
                onClick={() => updateUsers(editingUsers)}
            >
                Изменить
            </Button>
        </Container>
    );
};