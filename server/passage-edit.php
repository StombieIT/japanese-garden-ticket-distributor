<?php
    include('cors.php');
    include('pdo.php');
    include('json.php');

    session_start();

    // Аутентификация пользователя
    if (!isset($_SESSION["authUser"])) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized"]);
        exit;
    }

    $authUser = $_SESSION["authUser"];
    $role = $authUser["role"] ?? null;
    $permissions = $role["permissions"] ?? [];
    $permissionNames = array_column($permissions, "name");

    // Проверка наличия разрешения VIEW_PASSAGES
    $hasViewPassagesPermission = in_array("VALIDATE", $permissionNames);

    // Проверка разрешений пользователя
    if (!$hasViewPassagesPermission) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden: No permission to edit passage"]);
        exit;
    }

    $editedTimeId = $_POST['editedTimeId'] ?? 'no_change';
    $editedStatusId = $_POST['editedStatusId'] ?? 'no_change';
    $passageId = $_POST['passageId'] ?? null;

    if (!$passageId) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid or missing passage ID"]);
        exit;
    }

    try {
        $updateParts = [];
        $params = [':passage_id' => $passageId];

        if ($editedTimeId !== 'no_change') {
            $updateParts[] = "passage_time_id = :passage_time_id";
            $params[':passage_time_id'] = $editedTimeId;
        }

        if ($editedStatusId !== 'no_change') {
            $updateParts[] = "passage_status_id = :passage_status_id";
            $params[':passage_status_id'] = $editedStatusId;
        }

        if (!empty($updateParts)) {
            $sql = "UPDATE passage SET " . implode(", ", $updateParts) . " WHERE passage_id = :passage_id";
            $updateQuery = $pdo->prepare($sql);
            $updateQuery->execute($params);

            if ($updateQuery->rowCount() > 0) {
                echo json_encode(["success" => "Passage updated successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Passage not found or no changes made"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "No valid data provided for update"]);
        }
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        exit;
    }
?>
