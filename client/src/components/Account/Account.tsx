import {FC} from "react";
import {useUnit} from "effector-react";
import {Container} from "@/components/Container/Container";
import {Auth} from "@/components/Auth/Auth";
import {StatusContent} from "@/components/StatusContent/StatusContent";

import classes from "./Account.module.styl";
import {ProfileCard} from "@/components/ProfileCard/ProfileCard";
import {$authUserStore} from "@/state-management/auth";
import {Button} from "@/components/Button/Button";
import {PassageTicket} from "@/components/PassageTicket/PassageTicket";
import {IPassage} from "@/models/passage";
import {PassageTickets} from "@/components/PassageTickets/PassageTickets";

const passage: IPassage = {
    id: 1,
    date: "30.10.2003",
    entryTime: "17:00",
    status: null
};

export const Account: FC = () => {
    const authUser = useUnit($authUserStore);

    return (
        <Auth fallback={<StatusContent status={401} />}>
            <Container className={classes["account-content"]}>
                <div className={classes["left-column"]}>
                    <ProfileCard user={authUser!} />
                    <Button type="button" className={classes["quit-button"]}>
                        Выйти
                    </Button>
                </div>
                <div className={classes["right-column"]}>
                    <PassageTickets />
                </div>
            </Container>
        </Auth>
    );
};