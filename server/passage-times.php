<?php
    include('cors.php');
    include('pdo.php');
    include('json.php');

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
