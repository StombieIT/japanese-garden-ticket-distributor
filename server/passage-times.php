<?php
    include('cors.php');
    include('pdo.php');
    include('json.php');

    session_start();

    if (!isset($_SESSION["authUser"])) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized"]);
        exit;
    }

    $authUserId = $_SESSION["authUser"]["id"];

    // Проверка разрешений пользователя на просмотр времён прохода
    if (!in_array("VIEW_PASSAGE_TIMES", $_SESSION["authUser"]["permissions"])) {
        http_response_code(403);
        echo json_encode(["error" => "Forbidden: No permission to view passage times"]);
        exit;
    }

    try {
        $query = $pdo->prepare("
            SELECT passage_time_id, entry_time
            FROM passage_time
            ORDER BY entry_time
        ");

        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);

        // Форматирование результатов в соответствии с требованиями
        $passageTimes = array_map(function ($row) {
            return [
                'id' => (int)$row['passage_time_id'],
                'entryTime' => $row['entry_time']
            ];
        }, $results);

        echo json_encode($passageTimes);
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        exit;
    }
?>
