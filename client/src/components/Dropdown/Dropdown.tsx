import {FC, useState} from "react";

import classes from "./Dropdown.module.styl";

export interface IDropdownProps<T, I extends number = number> {
    items: Record<I, T>;
    selectedItemId: I;
    renderItem: FC<T>;
    onChange: (itemId: I) => void;
}

export const Dropdown = <T, I extends string | number = number>({ items, selectedItemId, renderItem, onChange }: IDropdownProps<T>) => {
    const [areOtherItemsShown, setAreOtherItemsShown] = useState<boolean>(false);

    return (
        <div
            className={classes["wrapper"]}
            onMouseEnter={() => setAreOtherItemsShown(true)}
            onMouseLeave={() => setAreOtherItemsShown(false)}
        >
            <div className={classes["option"]}>
                {
                    (selectedItemId && items[selectedItemId]) && renderItem(items[selectedItemId])
                }
            </div>
            {
                areOtherItemsShown && (
                    <div className={classes["options"]}>
                        {
                            Object.entries(items).map(([itemId, item]) => (
                                    <div
                                        key={itemId}
                                        className={classes["option"]}
                                        onClick={() => onChange(Number(itemId))}
                                    >
                                        {renderItem(item)}
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};