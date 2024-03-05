<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <?php
    session_start();
    // Вставляем значение переменной PHP в тег script
    echo '<script> const idFav = ' . json_encode($_SESSION['kinopoiskId']) . ';
    const isLoggedIn = ' . json_encode($_SESSION['isLoggedIn']) . ';
    const userId = ' . json_encode($_SESSION['user_id']) . ';</script>';
    ?>
    <script src="js/script.js" defer></script>
    <meta name="description" content="Страница, содержащая список избранных фильмов.">
    <title>KINOPOTERYA</title>
</head>
<body>
    <?php include('php/alert.php');?>
    <header class="container">
        <div class="header__content">
            <a href="index.php">KINOPOTERYA</a>
        </div>
    </header>

    <main class="container">
        <div class="movies__fav"></div>
        <div class="modal"></div>
    </main>

    <footer class="container">
        <p>&copy; 2024 KINOPOTERY, Inc</p>
    </footer>
</body>
</html>