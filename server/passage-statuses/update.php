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
    $canEditStatus = in_array("EDIT", array_column($permissions, "name"));

    if (!$canEditStatus) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden: No permission to edit status"]);
        exit;
    }

    // Получение данных из POST запроса
    $updatedStatuses = $_POST["updatedStatuses"];

    try {
        $pdo->beginTransaction();

        foreach ($updatedStatuses as $status) {
            $updateStmt = $pdo->prepare("UPDATE passage_status SET passage_status_name = ?, color = ? WHERE passage_status_id = ?");
            $updateStmt->execute([$status['name'], $status['color'], $status['id']]);
        }

        $pdo->commit();
    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
    }
?>
