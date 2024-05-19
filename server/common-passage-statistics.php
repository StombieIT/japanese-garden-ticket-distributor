<?php
    include('pdo.php');
    include('cors.php');

    $statusName = 'VALIDATED';

    try {
        $stmt = $pdo->prepare("SELECT GetTicketsCountByStatus(?) AS ticketsCount");
        $stmt->bindParam(1, $statusName);
        $stmt->execute();
        $validatedTicketCountResult = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt->closeCursor();

        $stmt = $pdo->query("CALL GetTotalTicketsCount()");
        $totalTicketCountResult = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            "validatedTicketsCount" => $validatedTicketCountResult["ticketsCount"],
            "totalTicketsCount" => $totalTicketCountResult["totalTickets"]
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
?>
