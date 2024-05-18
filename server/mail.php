<?php

    use PHPMailer\PHPMailer\PHPMailer;

    include('vendor/autoload.php');

    $mail = new PHPMailer();

    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->Host       = 'ssl://smtp.yandex.ru';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'stombie@yandex.ru';
    $mail->Password   = 'lvgioowcjhxxowvk';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    //Recipients
    $mail->setFrom('stombie@yandex.ru', 'Park Krasnodar');


    //Content
    $mail->isHTML(true);

?>