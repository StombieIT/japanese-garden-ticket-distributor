<?php
    include('cors.php');
    session_start();

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Очистка сессии
        session_unset(); // Удалить все переменные сессии
        session_destroy(); // Уничтожить сессию

        // Очистка куки
        if (isset($_COOKIE["email"]) && isset($_COOKIE["password"])) {
            setcookie("email", "", time() - 3600, "/"); // Удалить куки email
            setcookie("password", "", time() - 3600, "/"); // Удалить куки password
        }

        // Отправить ответ клиенту
        http_response_code(200);
        echo json_encode(["message" => "Logged out successfully"]);
        exit;
    } else {
        // Возвратить ошибку если метод запроса не POST
        http_response_code(405); // Method Not Allowed
        echo json_encode(["error" => "Method Not Allowed"]);
        exit;
    }
?>
