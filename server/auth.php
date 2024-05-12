<?php
    include('cors.php');
    include('pdo.php');

    function getAuthUser($email, $password) {
        global $pdo;
        $user = null;

        $userSth = $pdo->prepare("SELECT * FROM `user` WHERE email = :email");

        $userSth->execute([':email' => $email]);
        if (($userRow = $userSth->fetch(PDO::FETCH_ASSOC)) && $userRow["password"] == $_POST["password"]) {
            $userSth->closeCursor();

            $user = [
                "id" => $userRow["user_id"],
                "email" => $userRow["email"],
                "firstName" => $userRow["first_name"],
                "lastName" => $userRow["last_name"],
                "middleName" => $userRow["middle_name"],
                "role" => null
            ];

            if (isset($userRow["role_id"])) {
                $rolePermissionsSth = $pdo->prepare("SELECT *
                                                        FROM `role`
                                                            JOIN role_permission USING(role_id)
                                                            JOIN permission USING(permission_id)
                                                        WHERE role_id = :role_id");

                $rolePermissionsSth->execute([':role_id' => $userRow["role_id"]]);

                while ($rolePermissionRow = $rolePermissionsSth->fetch(PDO::FETCH_ASSOC)) {
                    if (is_null($user["role"])) {
                        $user["role"] = [
                            "id" => $rolePermissionRow["role_id"],
                            "name" => $rolePermissionRow["role_name"],
                            "permissions" => []
                        ];
                    }

                    $user["role"]["permissions"][] = [
                        "id" => $rolePermissionRow["permission_id"],
                        "name" => $rolePermissionRow["permission_name"]
                    ];
                }
            }
        }

        return $user;
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        session_start();
        $authUser = null;
        if (isset($_SESSION["authUser"])) {
            $authUser = $_SESSION["authUser"];
        } else if (isset($_COOKIE["email"]) && isset($_COOKIE["password"])) {
            $authUser = getAuthUser($_COOKIE["email"], $_COOKIE["password"]);
            $_SESSION["authUser"] = $authUser;
        }

        if (!is_null($authUser)) {
            include('json.php');
            echo json_encode($authUser);
            return;
        }
    } else if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["email"]) && isset($_POST["password"])) {
        $cookieLifetime = pow(2, 31) - 1;
        $email = $_POST["email"];
        $password = $_POST["password"];
        $authUser = getAuthUser($email, $password);

        if (!is_null($authUser)) {
            ini_set('session.gc_maxlifetime', $cookieLifetime);
            ini_set('session.cookie_lifetime', $cookieLifetime);
            setcookie("email", $email, $cookieLifetime);
            setcookie("password", $password, $cookieLifetime);
            session_start();

            $_SESSION["authUser"] = $authUser;

            include('json.php');
            echo json_encode($authUser);
            return;
        }
    }

    var_dump(http_response_code(403));
?>