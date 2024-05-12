<?php
    include('cors.php');
    include('pdo.php');
    include('json.php');

    session_start();  // Начало сессии

    if (!isset($_SESSION["authUser"])) {
        http_response_code(401);  // Ошибка 401, если пользователь не авторизован
        echo json_encode(["error" => "Unauthorized"]);  // Вывод сообщения об ошибке
        exit;
    }

    // Проверка метода запроса
    if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["passageId"])) {
        $passageId = $_POST["passageId"];

        try {
            // Подготовка SQL запроса для удаления прохода, который принадлежит пользователю
            $deleteQuery = $pdo->prepare("DELETE FROM passage WHERE passage_id = :passage_id AND user_id = :user_id");
            $deleteQuery->execute([':passage_id' => $passageId, ':user_id' => $_SESSION["authUser"]["id"]]);

            // Проверка, была ли удалена запись
            if ($deleteQuery->rowCount() > 0) {
                echo json_encode(["success" => "Passage deleted successfully"]);  // Вывод сообщения об успешном удалении
            } else {
                http_response_code(404);  // Ошибка 404, если запись не найдена или не принадлежит пользователю
                echo json_encode(["error" => "Passage not found or you do not have the right to delete this passage"]);
            }

        } catch (PDOException $e) {
            http_response_code(500);  // Ошибка 500 при проблемах с базой данных
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);  // Вывод сообщения об ошибке базы данных
        }
    } else {
        http_response_code(400);  // Ошибка 400 при некорректном запросе
        echo json_encode(["error" => "Bad Request"]);  // Вывод сообщения о неправильном запросе
    }
?>