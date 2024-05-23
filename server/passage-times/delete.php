<?php
    include('../pdo.php');  // Подключение к базе данных
    include('../cors.php');  // Подключение к базе данных
    session_start();

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit;
    }

    $permissions = $_SESSION["authUser"]["role"]["permissions"] ?? [];
    $canAddTime = in_array("EDIT", array_column($permissions, "name"));

    // Получение списка ID времён для удаления из POST запроса
    $timeIds = $_POST['timeIds'] ?? [];

    if (empty($timeIds)) {
        http_response_code(400); // Bad request
        echo json_encode(["error" => "No time IDs provided for deletion"]);
        exit;
    }

    try {
        $pdo->beginTransaction(); // Начало транзакции

        $deleteStmt = $pdo->prepare("DELETE FROM passage_time WHERE passage_time_id = ?");
        foreach ($timeIds as $timeId) {
            $deleteStmt->execute([$timeId]);
        }

        $pdo->commit(); // Подтверждение транзакции

        // Отправка подтверждения успешного удаления
        echo json_encode(["message" => "Times successfully deleted"]);
    } catch (PDOException $e) {
        $pdo->rollBack(); // Откат транзакции в случае ошибки
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>
