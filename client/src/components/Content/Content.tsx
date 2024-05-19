import {FC} from "react";
import {Container} from "@/components/Container/Container";
import {ImageSlider} from "@/components/ImageSlider/ImageSlider";
import {PassageForm} from "@/components/PassageForm/PassageForm";
import {Statistics} from "@/components/Statistics/Statistics";

import classes from "./Content.module.styl";
import cn from "classnames";
import {Button} from "@/components/Button/Button";
import {Auth} from "@/components/Auth/Auth";
import {PassageTemplate} from "@/components/PassageTemplate/PassageTemplate";

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
                <h2 className={classes["suggest-header"]}>
                    Подайте заявку на экскурсию в Японский сад прямо сейчас!
                </h2>
                <div className={classes["passage-form-container"]}>
                    <div className={cn(classes["info-wrapper"], classes["__form"])}>
                        <PassageForm />
                    </div>
                    <div className={classes["info-wrapper"]}>
                        <Statistics />
                    </div>
                </div>
                <PassageTemplate />
            </Container>
        </main>
    );
};