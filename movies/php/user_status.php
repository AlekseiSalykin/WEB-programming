<?php
session_start();
if (isset($_SESSION['user_login'])) {
    echo '<div class="user_field">
            <span class="user_login">' . $_SESSION['user_login'] . '</span>
            <form method="post" style="display:inline;" action="php/login.php">
                <button type="submit" class="authentication" name="logout">Выход</button>
            </form>
        </div>';
} else {
    echo '<button type="button" class="authentication" id="authentication">Авторизация</button>';
}
?> 