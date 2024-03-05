<?php
require_once('db.php');

session_start();



// Обработка выхода
if (isset($_POST['logout'])) {
    unset($_SESSION['user_login']);
    unset($_SESSION['user_id']);
    $_SESSION['isLoggedIn'] = false;
    header("Location: ../index.php");
    exit();
}

// Обработка входа
if (isset($_POST['login'])) {
$login = $_POST['login'];
$password = $_POST['pass'];

    if(empty($login) || empty($password)){
        $_SESSION['message'] = "Заполните все поля";
        header("Location: ../index.php");
        exit();
    } else {

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "SELECT * FROM users WHERE login = '$login'";
        $result = pg_query($connection, $sql);

        if ($result) {
            $row = pg_fetch_assoc($result);

            if ($row && $password === $row['password']) {
                $_SESSION['message'] = "Добро пожаловать, " . $row['login'] . $_SESSION['user_id'];
                $_SESSION['user_login'] = $row['login'];
                $_SESSION['user_id'] = $row['id'];
                $_SESSION['isLoggedIn'] = true;
                header("Location: ../index.php");
                exit();
            } else {
                $_SESSION['message'] = "Неверный логин или пароль";
                header("Location: ../index.php");
                exit();
            }
            } else {
                $_SESSION['message'] = "Ошибка запроса: " . pg_last_error($connection);
                header("Location: ../index.php");
                exit();
            }
    }
}
