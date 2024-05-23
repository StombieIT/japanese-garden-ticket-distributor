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
    $canDeleteStatus = in_array("EDIT", array_column($permissions, "name"));

    if (!$canDeleteStatus) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden: No permission to delete status"]);
        exit;
    }

    $statusIds = $_POST['statusIds'] ?? [];

    if (empty($statusIds)) {
        http_response_code(400);
        echo json_encode(["error" => "No status IDs provided for deletion"]);
        exit;
    }

    try {
        $pdo->beginTransaction();

        $deleteStmt = $pdo->prepare("DELETE FROM passage_status WHERE passage_status_id = ?");
        foreach ($statusIds as $statusId) {
            $deleteStmt->execute([$statusId]);
        }

        $pdo->commit();
        echo json_encode(["message" => "Statuses successfully deleted"]);
    } catch (PDOException $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>
