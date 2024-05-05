import {FC, useEffect} from "react";
import {$authUserStore, authenticateUser} from "@/state-management/auth";
import {useUnit} from "effector-react";
import {Container} from "@/components/Container/Container";
import {NavBar} from "@/components/NavBar/NavBar";

export const App: FC = () => {
    const authData = useUnit($authUserStore);

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <div>
            <Container>
                <NavBar />
            </Container>
            <Container>

            </Container>
        </div>
    );
};
