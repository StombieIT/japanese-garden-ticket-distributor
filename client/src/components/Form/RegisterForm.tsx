import {FC, FormEvent} from "react";
import {useUnit} from "effector-react";
import {Input} from "@/components/Input/Input";
import {$emailStore, $passwordStore, changeEmail, changePassword} from "@/state-management/sign-in-form";
import {
    $lastName,
    $middleName,
    $firstName,
    changeLastName,
    changeMiddleName,
    changeFirstName
} from "@/state-management/register-form";
import {register} from "@/state-management/effects/register";
import {Button} from "@/components/Button/Button";

import classes from "./Form.module.styl"

export const RegisterForm: FC = () => {
    const email = useUnit($emailStore);
    const firstName = useUnit($firstName);
    const lastName = useUnit($lastName);
    const middleName = useUnit($middleName);
    const password = useUnit($passwordStore);

    const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        register({
            email,
            firstName,
            lastName,
            middleName,
            password
        });
    };

    return (
        <form className={classes["form"]} onSubmit={onFormSubmit}>
            <label className={classes["field-label"]}>
                <h4 className={"field-header"}>Email</h4>
                <Input
                    type="email"
                    className={classes["field"]}
                    value={email}
                    onChange={evt => changeEmail(evt.target.value)}
                />
            </label>
            <label className={classes["field-label"]}>
                <h4 className={"field-header"}>Пароль</h4>
                <Input
                    type="password"
                    className={classes["field"]}
                    value={password}
                    onChange={evt => changePassword(evt.target.value)}
                />
            </label>
            <label className={classes["field-label"]}>
                <h4 className={"field-header"}>Фамилия</h4>
                <Input
                    className={classes["field"]}
                    value={lastName}
                    onChange={evt => changeLastName(evt.target.value)}
                />
            </label>
            <label className={classes["field-label"]}>
                <h4 className={"field-header"}>Имя</h4>
                <Input
                    className={classes["field"]}
                    value={firstName}
                    onChange={evt => changeFirstName(evt.target.value)}
                />
            </label>
            <label className={classes["field-label"]}>
                <h4 className={"field-header"}>Отчество</h4>
                <Input
                    className={classes["field"]}
                    value={middleName}
                    onChange={evt => changeMiddleName(evt.target.value)}
                />
            </label>
            <Button className={classes["submit-button"]}>
                Отправить
            </Button>
        </form>
    );
};