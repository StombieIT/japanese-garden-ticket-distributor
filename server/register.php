<?php
    include("cors.php");
    include("pdo.php");
    include("utils.php");

    if ($_SERVER["REQUEST_METHOD"] === "POST" &&
        all_set($_POST, ["email", "password", "firstName", "lastName", "middleName"])) {
        $sth = $pdo->prepare("INSERT INTO `user`(email, password, first_name, last_name, middle_name)
                                        VALUES (:email, :password, :firstName, :lastName, :middleName)");

        $sth->execute([
            ":email" => $_POST["email"],
            ":password" => $_POST["password"],
            ":firstName" => $_POST["firstName"],
            ":lastName" => $_POST["lastName"],
            ":middleName" => $_POST["middleName"],
        ]);
        return;
    }

    var_dump(http_response_code(400));
?>