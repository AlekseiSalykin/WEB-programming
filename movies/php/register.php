<?php
require_once('db.php');

session_start();

$login = $_POST['login'];
$password = $_POST['pass'];
$repeatpassword = $_POST['repeatpass'];
$email = $_POST['email'];



$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (login, password, email) VALUES ('$login', '$password', '$email')";

$result = pg_query($connection, $sql);


if(empty($login) || empty($password) || empty($repeatpassword) || empty($email)){
    $_SESSION['message'] = "Заполните все поля";
    header("Location: ../index.php");
    exit();
} else {
    if ($password !== $repeatpassword) {
        $_SESSION['message'] = "Пароли не совпадают.";
        header("Location: ../index.php");
        exit;
    } else {
        if ($result) {
            $row = pg_fetch_assoc($result);
            $_SESSION['message'] = "Добро пожаловать, " . $row['login'] . ". Теперь вы можете авторизироваться у нас!";
            $_SESSION['user_login'] = $row['login'];
            header("Location: ../index.php");
            exit();
        } else {
            $_SESSION['message'] = "Ошибка запроса: " . pg_last_error($connection);
            header("Location: ../index.php");
            exit();
        }
    }
}
?>
