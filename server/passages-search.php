<?php
    include('cors.php');
    include('pdo.php');

    session_start();

    // Authenticate and authorize
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
        echo json_encode(["error" => "Forbidden: No permission to view passages"]);
        exit;
    }

    $searchQuery = $_GET['query'] ?? '';

    try {
        // SQL запрос с условием фильтрации для поиска по email, last name, first name и middle name
        $query = $pdo->prepare("
            SELECT p.passage_id AS id, p.passage_date AS date, pt.passage_time_id AS passageTimeId, pt.entry_time AS entryTime,
                   ps.passage_status_name AS status, u.user_id AS userId, u.email, u.first_name AS firstName,
                   u.last_name AS lastName, u.middle_name AS middleName
            FROM passage p
            JOIN user u ON p.user_id = u.user_id
            JOIN passage_time pt ON p.passage_time_id = pt.passage_time_id
            LEFT JOIN passage_status ps ON p.passage_status_id = ps.passage_status_id
            WHERE u.email LIKE :searchQuery 
            OR u.last_name LIKE :searchQuery
            OR u.first_name LIKE :searchQuery
            OR u.middle_name LIKE :searchQuery
            ORDER BY p.passage_date DESC
        ");
        $query->execute(['searchQuery' => '%' . $searchQuery . '%']);
        $results = $query->fetchAll(PDO::FETCH_ASSOC);

        // Преобразование результатов для соответствия TypeScript интерфейсу IPassageExtended
        $passages = array_map(function ($row) {
            return [
                "id" => (int)$row["id"],
                "date" => $row["date"],
                "time" => [
                    "id" => $row["passageTimeId"],
                    "entryTime" => $row["entryTime"]
                ],
                "status" => $row["status"],
                "user" => [
                    "id" => (int)$row["userId"],
                    "email" => $row["email"],
                    "firstName" => $row["firstName"],
                    "lastName" => $row["lastName"],
                    "middleName" => $row["middleName"] ? $row["middleName"] : null,
                ]
            ];
        }, $results);

        echo json_encode($passages);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>