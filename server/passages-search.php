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
        $query = $pdo->prepare("CALL SearchPassages(:search_query)");
        $query->execute([':search_query' => $searchQuery]);
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
                "status" => [
                    "id" => $row["passage_status_id"],
                    "name" => $row["passage_status_name"],
                    "color" => $row["color"]
                ],
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