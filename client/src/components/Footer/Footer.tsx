import {FC} from "react";
import cn from "classnames";
import {Container} from "@/components/Container/Container";
import {Link} from "@tanstack/react-router";

import parkKrasnodarSrc from "./park-krasnodar.jpg";
import VkIcon from "./assets/vk.svg?react";
import TgIcon from "./assets/tg.svg?react";
import InstaIcon from "./assets/insta.svg?react";
import classes from "./Footer.module.styl";

export const Footer: FC = () => {
    return (
        <footer className={classes["footer"]}>
            <Container className={classes["content"]}>
                <div className={classes["column"]}>
                    <div className={classes["image-wrapper"]}>
                        <img
                            className={classes["image"]}
                            src={parkKrasnodarSrc}
                            alt="Парк Краснодар"
                        />
                    </div>
                    <h2 className={cn(classes["header"], classes["__mt"])}>
                        Парк Краснодар
                    </h2>
                </div>
                <div className={classes["column"]}>
                    <Link className={classes["link"]} to="/account">Личный кабинет</Link>
                    <Link className={classes["link"]} to="https://galitskypark.ru/">О нас</Link>
                </div>
                <div className={classes["column"]}>
                    <h2 className={cn(classes["header"], classes["__underline"])}>
                        Мы в соц. сетях
                    </h2>
                    <div className={classes["media-links"]}>
                        <Link className={classes["icon-link"]} to="https://vk.com/park_galitskogo">
                            <VkIcon />
                        </Link>
                        <Link className={classes["icon-link"]} to="https://t.me/s/parkkrd?before=938">
                            <TgIcon />
                        </Link>
                        <Link className={classes["icon-link"]} to="https://www.instagram.com/officialparkkrasnodar">
                            <InstaIcon />
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};