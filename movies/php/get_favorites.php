<?php
session_start();
require_once('db.php');

$userId = $_SESSION['user_id'];

$sql = "SELECT kinopoisk_id FROM favorite WHERE user_id = '$userId'";
$result = pg_query($connection, $sql);

if ($result) {
    $kinopoiskIds = array();
    while ($row = pg_fetch_assoc($result)) {
        $kinopoiskIds[] = $row['kinopoisk_id'];
    }

    // Возвращаем данные в формате JSON
    echo json_encode($kinopoiskIds);
} else {
    echo "Error";
}
?> 