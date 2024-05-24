<?php
    include('cors.php'); // Подключение CORS для доступа к API
    include('pdo.php');  // Подключение к PDO для работы с базой данных

    session_start();

    // Проверка на авторизацию пользователя
    if (!isset($_SESSION["authUser"])) {
        http_response_code(401); // Unauthorized
        echo json_encode(["error" => "Unauthorized"]);
        exit;
    }

    // Проверка наличия пермиссии "EDIT"
    $hasEditPermission = false;
    foreach ($_SESSION["authUser"]["role"]["permissions"] as $permission) {
        if ($permission["name"] === "EDIT") {
            $hasEditPermission = true;
            break;
        }
    }

    if (!$hasEditPermission) {
        http_response_code(403); // Forbidden
        echo json_encode(["error" => "Forbidden: No edit permission"]);
        exit;
    }

    // Только для метода POST
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $users = $_POST["usersList"];

        // Проверка наличия списка пользователей
        if (empty($users)) {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "No users data provided"]);
            exit;
        }

        // Начало транзакции
        $pdo->beginTransaction();

        try {
            $updatedUsers = [];
            foreach ($users as $user) {
                if (empty($user['id']) || empty($user['email']) || empty($user['firstName']) || empty($user['lastName'])) {
                    continue; // Пропуск пользователей с недостаточными данными
                }
                $stmt = $pdo->prepare("UPDATE `user`
                                            SET
                                                email = :email,
                                                first_name = :firstName,
                                                last_name = :lastName,
                                                middle_name = :middleName,
                                                role_id = :roleId,
                                                passport_series = :passport_series,
                                                passport_number = :passport_number
                                            WHERE user_id = :userId");
                $stmt->execute([
                    ':email' => $user['email'],
                    ':firstName' => $user['firstName'],
                    ':lastName' => $user['lastName'],
                    ':middleName' => $user['middleName'] ?? null, // Учитывая, что middleName может быть не предоставлен
                    ':roleId' => $user['roleId'] ?? null, // Учитывая, что roleId может быть не предоставлен
                    ':userId' => $user['id'],
                    ':passport_series' => $user['passportSeries'],
                    ':passport_number' => $user['passportNumber']
                ]);
                if ($stmt->rowCount() > 0) {
                    $updatedUsers[] = $user['id'];
                }
            }

            // Подтверждение транзакции
            $pdo->commit();

            if (!empty($updatedUsers)) {
                echo json_encode(["success" => "Users updated successfully", "updatedUsers" => $updatedUsers]);
            } else {
                http_response_code(400); // Internal Server Error
                echo json_encode(["error" => "No users were updated"]);
            }
        } catch (PDOException $e) {
            $pdo->rollBack(); // Откат изменений в случае ошибки
            http_response_code(500); // Internal Server Error
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode(["error" => "Method not allowed"]);
    }
?>