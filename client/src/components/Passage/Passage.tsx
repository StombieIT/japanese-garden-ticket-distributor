import {FC} from "react";
import {Container} from "@/components/Container/Container";
import {useUnit} from "effector-react";
import {$passage} from "@/state-management/passage";

export const Passage: FC = () => {
    const passage = useUnit($passage)!;

    return (
        <Container>
            {passage.id}
        </Container>
    );
};