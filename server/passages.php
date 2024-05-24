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

    try {
        $passagesQuery = $pdo->prepare("
            SELECT p.passage_id, pt.passage_time_id, pt.entry_time, p.passage_date, ps.passage_status_id,
                   ps.passage_status_name, ps.color
            FROM passage p
            JOIN passage_time pt ON p.passage_time_id = pt.passage_time_id
            JOIN passage_status ps ON p.passage_status_id = ps.passage_status_id
            WHERE p.user_id = :user_id
        ");

        $passagesQuery->execute([':user_id' => $authUserId]);

        $passages = $passagesQuery->fetchAll(PDO::FETCH_ASSOC);
        $camelCasePassages = [];

        foreach ($passages as $passage) {
            $camelCasePassages[] = [
                'id' => $passage['passage_id'],
                'time' => [
                    'id' => $passage['passage_time_id'],
                    'entryTime' => $passage['entry_time']
                ],
                'date' => $passage['passage_date'],
                'status' => [
                    'id' => $passage['passage_status_id'],
                    'name' => $passage['passage_status_name'],
                    'color' => $passage['color']
                ]
            ];
        }

        echo json_encode($camelCasePassages);

    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        exit;
    }
?>