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

    // Получаем идентификатор passage из GET-запроса
    $passageId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

    if ($passageId <= 0) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Invalid passage ID"]);
        exit;
    }

    try {
        // Расширяем запрос на включение информации о пользователе
        $passageQuery = $pdo->prepare("
            SELECT p.passage_id, pt.passage_time_id, pt.entry_time, p.passage_date, ps.passage_status_name,
                   u.user_id, u.email, u.first_name, u.last_name, u.middle_name
            FROM passage p
            JOIN passage_time pt ON p.passage_time_id = pt.passage_time_id
            LEFT JOIN passage_status ps ON p.passage_status_id = ps.passage_status_id
            JOIN user u ON p.user_id = u.user_id
            WHERE p.passage_id = :passage_id
        ");

        $passageQuery->execute([':passage_id' => $passageId]);

        $passage = $passageQuery->fetch(PDO::FETCH_ASSOC);

        if ($passage) {
            $formattedPassage = [
                'id' => $passage['passage_id'],
                'time' => [
                    'id' => $passage['passage_time_id'],
                    'entryTime' => $passage['entry_time']
                ],
                'date' => $passage['passage_date'],
                'status' => $passage['passage_status_name'],
                'user' => [
                    'id' => $passage['user_id'],
                    'email' => $passage['email'],
                    'firstName' => $passage['first_name'],
                    'lastName' => $passage['last_name'],
                    'middleName' => $passage['middle_name'] ? $passage['middle_name'] : null
                ]
            ];

            echo json_encode($formattedPassage);
        } else {
            http_response_code(404); // Not Found
            echo json_encode(["error" => "Passage not found"]);
        }

    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        exit;
}
?>
