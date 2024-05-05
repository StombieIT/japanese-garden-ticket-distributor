<?php
    include("variables.php");

    $pdo = new PDO("mysql:host={$db_host};dbname={$db_db}", $db_user, $db_password);
    $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
?>