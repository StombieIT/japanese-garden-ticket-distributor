<?php
    include('cors.php');
    include('pdo.php');
    include('json.php');

    session_start();  // Начало сессии

    if (!isset($_SESSION["authUser"])) {
        http_response_code(401);  // Ошибка 401, если пользователь не авторизован
        echo json_encode(["error" => "Unauthorized"]);  // Вывод сообщения об ошибке
        exit;
    }

    // Проверка наличия разрешения на просмотр ролей
    $hasViewRolesPermission = false;
    foreach ($_SESSION["authUser"]["role"]["permissions"] as $permission) {
        if ($permission["name"] === "EDIT") {
            $hasViewRolesPermission = true;
            break;
        }
    }

    try {
        // SQL запрос для получения данных о пользователях и их ролях
        $query = $pdo->prepare("
            SELECT u.user_id, u.email, u.first_name, u.last_name, u.middle_name, r.role_id, r.role_name
            FROM `user` u
            LEFT JOIN `role` r ON u.role_id = r.role_id
            ORDER BY u.user_id
        ");

        $query->execute();

        $users = [];
        // Собираем информацию о пользователях в массив
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $userId = $row['user_id'];
            if (!isset($users[$userId])) {
                $users[$userId] = [
                    'id' => $userId,
                    'email' => $row['email'],
                    'firstName' => $row['first_name'],
                    'lastName' => $row['last_name'],
                    'middleName' => $row['middle_name'],
                    'roleId' => $row['role_id']
                ];
            }
//            if ($row['role_id'] !== null) {
//                $users[$userId]['role'] = [
//                    'id' => $row['role_id'],
//                    'name' => $row['role_name']
//                ];
//            }
        }

        // Возвращаем данные о пользователях в JSON формате
        echo json_encode(array_values($users));

    } catch (PDOException $e) {
        http_response_code(500);  // Ошибка 500 при проблемах с базой данных
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);  // Вывод сообщения об ошибке базы данных
    }
?>