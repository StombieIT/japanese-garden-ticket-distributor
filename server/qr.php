<?php
    require_once 'vendor/autoload.php';

    use chillerlan\QRCode\QRCode;
    use chillerlan\QRCode\QROptions;

    function generateQRCode($data, $filePath = null) {
        // Настройки для генерации QR-кода
        $options = new QROptions([
            'version'    => 5,
            'outputType' => QRCode::OUTPUT_IMAGE_PNG,
            'eccLevel'   => QRCode::ECC_L,
        ]);

        // Создаем QR-код
        $qrcode = new QRCode($options);

        // Проверяем, нужно ли сохранять QR-код в файл
        if ($filePath) {
            // Сохраняем QR-код в файл
            $qrcode->render($data, $filePath);
        } else {
            // Возвращаем QR-код как строку base64 для отображения в браузере
            $base64 = base64_encode($qrcode->render($data));
            return '<img src="data:image/png;base64,' . $base64 . '" alt="QR Code" />';
        }
    }
?>