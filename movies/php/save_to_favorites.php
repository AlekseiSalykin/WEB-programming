<?php
session_start();
require_once('db.php');

if (isset($_POST['kinopoiskId'])) {
    // Получаем kinopoiskId из POST-запроса
    $kinopoiskId = $_POST['kinopoiskId'];
    $_SESSION['kinopoiskId'] = $kinopoiskId;
    // Дополнительная проверка, например, проверка авторизации пользователя

    // Добавляем/удаляем kinopoiskId в/из базу данных
    $userId = $_SESSION['user_id']; // предположим, что у вас есть user_id в сессии
    echo $userId;

    $sql = "INSERT INTO favorite (user_id, kinopoisk_id) VALUES ('$userId', '$kinopoiskId')";
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