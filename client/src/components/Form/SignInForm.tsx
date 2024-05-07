import {FC, FormEvent} from "react";
import {Button} from "@/components/Button/Button";
import {Input} from "@/components/Input/Input";
import {useUnit} from "effector-react/effector-react.umd";
import {$emailStore, $passwordStore, changeEmail, changePassword} from "@/state-management/sign-in-form";

import classes from "./Form.module.styl";
import {authenticateUser, IAuthenticateUserParameters} from "@/state-management/auth";

export const SignInForm: FC = () => {
    const email = useUnit($emailStore);
    const password = useUnit($passwordStore);

    const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        authenticateUser({
            email,
            password
        } as IAuthenticateUserParameters);
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
            <Button className={classes["submit-button"]}>
                Отправить
            </Button>
        </form>
    );
};