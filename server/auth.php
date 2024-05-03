<?php
    include('cors.php');

    if ($_SERVER["REQUEST_METHOD"] === "GET") {
    } else if ($_SERVER["REQUEST_METHOD"] === "POST") {
        include('json.php');
    }
?>