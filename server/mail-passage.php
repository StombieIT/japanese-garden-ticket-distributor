<?php
    function sendPassage($user, $passage) {
        require_once("mail.php");
        require_once("qr.php");
        require_once("variables.php");

        $mail->addAddress($user["email"]);

        $mail->Subject = "Парк Краснодар / Билет № " . $passage["id"];

        $html = '<p>Данные по Вашему билету изменились, предъявите указанный ниже QR-код сотруднику для изменения времени или статуса билета</p>';

        // HTML content with inline styles
        $html .= '<div style="height: 100%; display: flex; flex-direction: column; align-items: center;">';
        $html .= '<div style="min-width: 60vw; margin-top: 50px; padding: 50px; border: 3px solid #fff21b; border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);">';

        generateQRCode("{$client_host}/passage?id=" . $passage['id'], "./qr.png");

        $qrCodeImage = '<img src="cid:qrImage" style="width: 250px" />';

        $html .= '<div style="display: flex; align-self: center; justify-content: center">' . $qrCodeImage .'</div>';


        $html .= formatLine('Фамилия:', $user['lastName']);
        $html .= formatLine('Имя:', $user['firstName']);
        $html .= formatLine('Отчество:', $user['middleName']);
        $html .= formatLine('Email:', $user['email']);
        $html .= formatLine('Статус:', generateStatus($passage['statusName']));
        $html .= formatLine('Время:', $passage['entryTime']);

        $mail->addEmbeddedImage('./qr.png', 'qrImage', 'image/png');

        $mail->Body = $html;

        $html .= '</div></div>';

        $mail->send();
    }

    function formatLine($label, $value) {
        return '<div style="display: flex; justify-content: space-between; margin-top: 40px;"><span>' . $label . '</span><span>' . $value . '</span></div>';
    }

    function generateStatus($statusName) {
        $textByStatusMap = [
            'unchecked' => 'На подтверждении',
            'validated' => 'Подтвержден',
            'activated' => 'Полуактивирован',
            'fully-activated' => 'Активирован',
            'rejected' => 'Отменён'
        ];

        $stylesByStatusMap = [
            'unchecked' => 'background-color: #eaeaea;',
            'validated' => 'background-color: #abd5fc;',
            'activated' => 'background-color: #f39cf2;',
            'fully-activated' => 'background-color: #72f572;',
            'rejected' => 'background-color: #ff3535;'
        ];

        // Получение текста и стилей для текущего статуса
        $statusText = $textByStatusMap[$statusName] ?? 'Статус не определён';
        $statusStyle = $stylesByStatusMap[$statusName] ?? '';

        // Создание строки со статусом и инлайн стилями
        return "<span style='display: block; text-transform: uppercase; text-align: center; padding: 5px; border-radius: 10px; $statusStyle'>$statusText</span>";
    }
?>