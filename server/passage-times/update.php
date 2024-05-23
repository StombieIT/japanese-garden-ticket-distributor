<?php
    include('../pdo.php');
    include('../cors.php');
    session_start();

    // Аутентификация и проверка пермиссии
    if (!isset($_SESSION["authUser"])) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized"]);
        exit;
    }

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        http_response_code(400);
        exit;
    }

    $permissions = $_SESSION["authUser"]["role"]["permissions"] ?? [];
    $canEditTime = in_array("EDIT", array_column($permissions, "name"));

    if (!$canEditTime) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden: No permission to edit time"]);
        exit;
    }

    // Получение данных из POST запроса
    $updatedTimes = $_POST["updatedTimes"];

    try {
        $pdo->beginTransaction();

        foreach ($updatedTimes as $time) {
            if (isset($time['id']) && isset($time['entryTime'])) {
                $updateStmt = $pdo->prepare("UPDATE passage_time SET entry_time = ? WHERE passage_time_id = ?");
                $updateStmt->execute([$time['entryTime'], $time['id']]);
            }
        }

        $pdo->commit();
    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>
