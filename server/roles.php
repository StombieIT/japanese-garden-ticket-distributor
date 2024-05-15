<?php
    include('cors.php');
    include('pdo.php');
    include('json.php');

    session_start();

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

    if (!$hasViewRolesPermission) {
        http_response_code(403);  // Ошибка 403, если у пользователя нет разрешения на просмотр ролей
        echo json_encode(["error" => "Forbidden"]);  // Вывод сообщения о запрете
        exit;
    }

    try {
        // SQL запрос для получения данных о ролях и связанных с ними пользователях
        $query = $pdo->prepare("
            SELECT r.role_id, r.role_name, u.user_id, u.email, u.first_name, u.last_name, u.middle_name
            FROM `role` r
            LEFT JOIN `user` u ON r.role_id = u.role_id
            ORDER BY r.role_id, u.user_id
        ");

        $query->execute();

        $roles = [];
        // Собираем информацию о ролях и пользователях в массив
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $roleId = $row['role_id'];
            if (!isset($roles[$roleId])) {
                $roles[$roleId] = [
                    'id' => $roleId,
                    'name' => $row['role_name'],
//                    'users' => []
                ];
            }
//            if ($row['user_id'] !== null) {
//                $roles[$roleId]['users'][] = [
//                    'userId' => $row['user_id'],
//                    'email' => $row['email'],
//                    'firstName' => $row['first_name'],
//                    'lastName' => $row['last_name'],
//                    'middleName' => $row['middle_name']
//                ];
//            }
        }

        // Возвращаем данные о ролях и пользователях в JSON формате
        echo json_encode(array_values($roles));

    } catch (PDOException $e) {
        http_response_code(500);  // Ошибка 500 при проблемах с базой данных
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);  // Вывод сообщения об ошибке базы данных
    }
?>