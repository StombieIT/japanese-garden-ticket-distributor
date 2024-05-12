import {FC, useState} from "react";
import cn from "classnames";

import classes from "./ImageSlider.module.styl";

export interface IImageSliderProps {
    imagesSrc: string[];
}

export const ImageSlider: FC<IImageSliderProps> = ({imagesSrc}) => {
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    return (
        <div className={classes["slider"]}>
            <div className={classes["images-wrapper"]}>
                {
                    imagesSrc.map((imageSrc, idx) => (
                        <div
                            className={cn(
                                classes["image-wrapper"],
                                {
                                    [classes["__active"]]: idx === currentImageIdx
                                }
                            )}
                        >
                            <img
                                key={idx}
                                className={classes["__active"]}
                                src={imageSrc}
                                alt="Изображение"
                            />
                        </div>
                    ))
                }
            </div>
            <div className={classes["controls"]}>
                {
                    imagesSrc.map((_, idx) => (
                        <span
                            key={idx}
                            className={cn(
                                classes["control"],
                                {
                                    [classes["__active"]]: currentImageIdx === idx
                                }
                            )}
                            onMouseEnter={() => setCurrentImageIdx(idx)}
                        ></span>
                    ))
                }
            </div>
        </div>
    );
};