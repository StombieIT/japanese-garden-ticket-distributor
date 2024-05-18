<?php
    include('cors.php');
    include('pdo.php');
    include('json.php');
    include('mail-passage.php');

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
                // Извлекаем обновленные данные
                $passageDetailsQuery = $pdo->prepare("
                    SELECT p.*, pt.entry_time, ps.passage_status_name,
                           u.user_id, u.email, u.first_name, u.last_name, u.middle_name
                    FROM passage p
                    JOIN passage_time pt ON p.passage_time_id = pt.passage_time_id
                    LEFT JOIN passage_status ps ON p.passage_status_id = ps.passage_status_id
                    JOIN user u ON p.user_id = u.user_id
                    WHERE p.passage_id = :passage_id
                ");
                $passageDetailsQuery->execute([':passage_id' => $passageId]);
                $passageDetails = $passageDetailsQuery->fetch(PDO::FETCH_ASSOC);

                if ($passageDetails) {
                    $passage = [
                        'id' => $passageDetails['passage_id'],
                        'timeId' => $passageDetails['passage_time_id'],
                        'entryTime' => $passageDetails['entry_time'],
                        'date' => $passageDetails['passage_date'],
                        'statusName' => $passageDetails['passage_status_name']
                    ];

                    $user = [
                        'id' => $passageDetails['user_id'],
                        'email' => $passageDetails['email'],
                        'firstName' => $passageDetails['first_name'],
                        'lastName' => $passageDetails['last_name'],
                        'middleName' => $passageDetails['middle_name']
                    ];

                    // Отправка письма
                    sendPassage($user, $passage);
                    echo json_encode(["success" => "Passage updated successfully"]);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Passage not found"]);
                }
            } else {
                http_response_code(404);
                echo json_encode(["error" => "No changes made"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "No valid data provided for update"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        exit;
    }
?>
