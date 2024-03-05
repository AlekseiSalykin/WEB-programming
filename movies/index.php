<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <?php
    session_start();
    // Вставляем значение переменной PHP в тег script
    echo '<script> const isLoggedIn = ' . json_encode($_SESSION['isLoggedIn']) . ';
        const userId = ' . json_encode($_SESSION['user_id']) . ';</script>';
    ?>
    <script src="js/script.js" defer></script>
    <meta name="description" content="Главная страница сайта, содержащая список фильмов и информацию о них. 
    На этой странице можно зарегистрироваться или авторизироваться, а так же перейти на страницу избранных фильмов.">
    <title>KINOPOTERYA</title>
</head>
<body>
    <?php include('php/alert.php');?>
    <header class="container">
        <div class="header__content">
            <a href="index.php">KINOPOTERYA</a>
            <nav>
                <ul>
                    <li><a href="favourite.php" onclick="showHome()">Favourites</a></li>
                </ul>
                <form class="search">
                    <input type="text" class="search_input" placeholder="Search for movies">
                </form>
                <?php include('php/user_status.php'); ?>
            </nav>
        </div>
    </header>

    <main class="container">
        <div class="movies"></div>
        <div class="pagination">
            <button class="prev-page">Назад</button>
            <span class="current_page">1</span>
            <button class="next-page">Дальше</button>
        </div>
        <div class="modal"></div>
    </main>

    <footer class="container">
        <p>&copy; 2024 KINOPOTERYA, Inc</p>
    </footer>
</body>
</html>