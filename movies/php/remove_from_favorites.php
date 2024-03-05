<?php
session_start();
require_once('db.php');

if (isset($_POST['kinopoiskId'])) {
    // Получаем kinopoiskId из POST-запроса
    $kinopoiskId = $_POST['kinopoiskId'];

    // Дополнительная проверка, например, проверка авторизации пользователя

    // Удаляем kinopoiskId из базы данных
    $userId = $_SESSION['user_id']; // предположим, что у вас есть user_id в сессии

    $sql = "DELETE FROM favorite WHERE user_id = '$userId' AND kinopoisk_id = '$kinopoiskId'";
    $result = pg_query($connection, $sql);

    // Отправляем ответ клиенту
    if ($result) {
        echo "Success";
    } else {
        echo "Error";
    }
} else {
    echo "Invalid request";
}
?>