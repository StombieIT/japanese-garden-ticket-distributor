<?php
    include('pdo.php');  // Подключение к базе данных
    include('cors.php');
    include('json.php');

    session_start();

    // Проверка аутентификации пользователя
    if (!isset($_SESSION['authUser'])) {
        http_response_code(401); // Unauthorized
        echo json_encode(["error" => "User not authenticated"]);
        exit;
    }

    // Получение данных из POST запроса
    $date = $_POST['date'] ?? null;
    $timeId = $_POST['timeId'] ?? null; // Получаем timeId напрямую из POST данных

    if (!$date || !$timeId) {
        http_response_code(400); // Bad request
        echo json_encode(["error" => "Date and timeId are required"]);
        exit;
    }

    $userId = $_SESSION["authUser"]["id"]; // Идентификатор пользователя из сессии

    try {
        // Проверка существования timeId в базе данных
        $checkTimeStmt = $pdo->prepare("CALL CheckPassageTimeExists(?)");
        $checkTimeStmt->execute([$timeId]);
        $timeExists = $checkTimeStmt->fetchColumn();

        if (!$timeExists) {
            http_response_code(404); // Not found
            echo json_encode(["error" => "Specified timeId does not exist"]);
            exit;
        }

        $checkTimeStmt->closeCursor();

        // Создание записи passage
        $insertStmt = $pdo->prepare("INSERT INTO passage (user_id, passage_date, passage_time_id) VALUES (?, ?, ?)");
        $insertStmt->execute([$userId, $date, $timeId]);

        http_response_code(201); // Created
        echo json_encode(["message" => "Passage created successfully"]);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>
