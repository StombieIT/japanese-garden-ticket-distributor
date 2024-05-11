import {FC} from "react";
import {IUser} from "@/models/user";

import UserIcon from "./user.svg?react";
import classes from "./ProfileCard.module.styl";

export interface IProfileCardProps {
    user: IUser;
}

export const ProfileCard: FC<IProfileCardProps> = ({ user }) => {
    return (
        <section className={classes["card"]}>
            <div className={classes["avatar-wrapper"]}>
                <UserIcon className={classes["avatar-icon"]} />
            </div>
            <div className={classes["info-part"]}>
                <div className={classes["profile-info"]}>
                    <h3>Профиль</h3>
                    <ul className={classes["facts"]}>
                        <li className={classes["fact"]}>
                            <span>Email:</span>
                            <span>{user.email}</span>
                        </li>
                        <li className={classes["fact"]}>
                            <span>Фамилия:</span>
                            <span>{user.lastName}</span>
                        </li>
                        <li className={classes["fact"]}>
                            <span>Имя:</span>
                            <span>{user.firstName}</span>
                        </li>
                        <li className={classes["fact"]}>
                            <span>Отчество:</span>
                            <span>{user.middleName}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};