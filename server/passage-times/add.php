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
    $canAddTime = in_array("EDIT", array_column($permissions, "name"));

    if (!$canAddTime) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden: No permission to add time"]);
        exit;
    }

    // Получение данных из POST запроса
    $newTimes = $_POST["times"];

    try {
        $pdo->beginTransaction();

        $response = [];
        foreach ($newTimes as $time) {
            if (isset($time['entryTime'])) {
                $insertStmt = $pdo->prepare("INSERT INTO passage_time (entry_time) VALUES (?)");
                $insertStmt->execute([$time['entryTime']]);
                $response[] = [
                    'id' => $pdo->lastInsertId(),
                    'entryTime' => $time['entryTime']
                ];
            }
        }

        $pdo->commit();
        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>
