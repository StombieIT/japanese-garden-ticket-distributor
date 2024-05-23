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

    $permissions = $_SESSION["authUser"]["role"]["permissions"] ?? [];
    $canAddStatus = in_array("EDIT", array_column($permissions, "name"));

    if (!$canAddStatus) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden: No permission to add status"]);
        exit;
    }

    // Получение данных из POST запроса
    $newStatuses = $_POST["statuses"];

    try {
        $pdo->beginTransaction();

        $response = [];
        foreach ($newStatuses as $status) {
            $insertStmt = $pdo->prepare("INSERT INTO passage_status (passage_status_name, color) VALUES (?, ?)");
            $insertStmt->execute([$status['name'], $status['color']]);
            $response[] = [
                'id' => $pdo->lastInsertId(),
                'name' => $status['name'],
                'color' => $status['color']
            ];
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
