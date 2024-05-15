import {FC} from "react";
import {Container} from "@/components/Container/Container";
import {ImageSlider} from "@/components/ImageSlider/ImageSlider";

import classes from "./Content.module.styl";

const parkImagesModules = import.meta.glob("./assets/*.(jpg|png)", { eager: true });

// @ts-ignore
const parkImagesSrc = Object.entries(parkImagesModules).map(([_, parkImagesModule]) => parkImagesModule.default);

export const Content: FC = () => {
    return (
        <main className={classes["content"]}>
            <Container className={classes["container"]}>
                <div className={classes["common-content"]}>
                    <div className={classes["common-info"]}>
                        <h1 className={classes["header"]}>Парк «Краснодар»</h1>
                        <p className={classes["common-description"]}>Или, как его еще называют, Парк Галицкого, был построен и открыт местным предпринимателем, владельцем ФК «Краснодар» Сергеем Галицким.</p>
                        <div className={classes["common-meta"]}>Парк «Краснодар» знаменит своей архитектурой и ландшафтным дизайном по всей России и за ее пределами. Успешные проекты в сфере паблик-арта здесь столь же удивительны и разнообразны, как и сам парк.</div>
                    </div>
                    <ImageSlider imagesSrc={parkImagesSrc} />
                </div>
            </Container>
        </main>
    );
};