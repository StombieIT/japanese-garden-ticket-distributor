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

    try {
        // Выполнение запроса к базе данных для получения всех статусов прохода
        $statusQuery = $pdo->prepare("SELECT passage_status_id id, passage_status_name name FROM passage_status ORDER BY passage_status_id");
        $statusQuery->execute();

        $statuses = $statusQuery->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($statuses);

    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        exit;
    }
?>
