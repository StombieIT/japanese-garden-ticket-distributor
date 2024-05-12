import {FC, useMemo} from "react";
import QRious from "qrious";

interface QrOptions {
    size: number;
    background: string;
    foreground: string;
    padding: number;
}

export interface IQrCodeProps extends Partial<QrOptions> {
    value: string;
}

export const QrCode: FC<IQrCodeProps> = ({
    value,
    size = 175,
    background = "transparent",
    foreground = "black",
    padding = 0
}) => {
    const qrSrc = useMemo(
        () => new QRious({
            value,
            size,
            background,
            foreground,
            padding
        }).toDataURL(),
        [value, size, background, foreground, padding]
    );

    return (
        <img
            width={size}
            height={size}
            src={qrSrc}
            alt={`QR ${value}`}
        />
    );
};