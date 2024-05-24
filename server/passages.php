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
        $passagesQuery = $pdo->prepare("CALL GetPassagesByUserId(:user_id);");

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