const API_KEY = "d4d84c08-fa5b-4e91-bb4a-5ce8bdccced5";
const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=";
const API_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

let currenPage = 1;
getMovies(currenPage);
// Вызываем функцию для получения и отображения избранных фильмов при загрузке страницы
getFavorites();
async function getMovies(currenPage) {
    const response = await fetch(API_URL + currenPage, {
        headers: {
            "Content-Type": 'application/json',
            'X-API-KEY': API_KEY
        },

    });
    const resData = await response.json();
    const moviesContainer = document.querySelector(".movies");

    if (moviesContainer) {
        showMovies(resData);
    }
}
async function getSearchMovies(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": 'application/json',
            'X-API-KEY': API_KEY
        },

    });
    const resData = await response.json();
    const moviesContainer = document.querySelector(".movies");

    if (moviesContainer) {
        showMovies(resData);
    }
}


const prevBtn = document.querySelector(".prev-page");
const nextBtn = document.querySelector(".next-page"); 

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (currenPage > 1) {
            currenPage--;
            updatePage();
            getMovies(currenPage);
        }
    });
}
if(nextBtn){
    nextBtn.addEventListener("click", () => {
        currenPage ++;
        updatePage();
        getMovies(currenPage);
    })
}


function updatePage(){
    document.querySelector(".current_page").textContent = currenPage;
}

function getClassByRate(vote) {
    if (vote >= 7) {
      return "green";
    } else if (vote > 5) {
      return "orange";
    } else {
      return "red";
    }
}

const moviesEl = document.querySelector(".movies");
function showMovies(data) {
    // Очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";

    data.items.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        const isFavorited = localStorage.getItem(`favorited_${movie.kinopoiskId}_${userId}`) === 'true';
        const favoritedClass = isFavorited ? 'favorited' : '';

        movieEl.innerHTML = `
        <div class="movie___cover-inner">
            <img 
            src="${movie.posterUrl}" 
            class="movie___cover"
            alt="${movie.nameRu}"/>
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie_obj">
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie_category">${movie.genres.map(
                    (genre) => ` ${genre.genre}`
                )}</div>
                ${
                    movie.ratingImdb &&
                    `
                    <div class="movie__averange movie__averange--${getClassByRate(movie.ratingImdb)}">${movie.ratingImdb}</div>
                    `
                }
            </div>
            ${isLoggedIn ? `<button class="movie__favourite ${favoritedClass}" onclick="toggleFavoriteButton(this, ${movie.kinopoiskId})"><image src="image/free-icon.png" class="icon" alt="star"/></button>` : ``}
        </div>
    `;
    const coverInner = movieEl.querySelector(".movie___cover-inner");
    coverInner.addEventListener("click", () => openModal(movie.kinopoiskId));
    moviesEl.appendChild(movieEl);
    });
}

function toggleFavoriteButton(button, kinopoiskId) {
    console.log("Нажата кнопка для фильма с kinopoiskId: ", kinopoiskId);

    if (isLoggedIn) {
        button.classList.toggle("favorited");
        const isFavorited = button.classList.contains("favorited");
        if (isFavorited) {
            console.log("Кнопка нажата");
            
            localStorage.setItem(`favorited_${kinopoiskId}_${userId}`, 'true');
            saveToFavorites(kinopoiskId);
        } else {
            console.log("Кнопка повторно нажата");
            
            localStorage.removeItem(`favorited_${kinopoiskId}_${userId}`);
            removeFromFavorites(kinopoiskId);
        }
    } else {
        console.log("Пользователь не авторизован");
    }
}

function saveToFavorites(kinopoiskId) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "php/save_to_favorites.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
            } else {
                console.error("Ошибка при отправке запроса:", xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error("Произошла ошибка сети при отправке запроса");
    };

    xhr.send(`kinopoiskId=${kinopoiskId}`);
}
function removeFromFavorites(kinopoiskId) {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "php/remove_from_favorites.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.send(`kinopoiskId=${kinopoiskId}`);
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        };
}

const search = document.querySelector(".search");
const searchInput = document.querySelector(".search_input");

if(search){
    search.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const apiSearchUrl = `${API_SEARCH}${searchInput.value}`;
        if (searchInput.value) {
          getSearchMovies(apiSearchUrl);
      
          searchInput.value = "";
        }
    });
}

//Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
    const response = await fetch(API_URL_MOVIE_DETAILS + id, {
        headers: {
            "Content-Type": 'application/json',
            'X-API-KEY': API_KEY
        },

    });
    const resData = await response.json();
    document.body.classList.add("stop-scrolling");

    modalEl.classList.add("modal--show");

    modalEl.innerHTML = `
    <div class="modal__card">
        <img class="modal__movie-backdrop" src="${resData.posterUrl}" alt="">
        <h2>
            <span class="modal__movie-title">${resData.nameRu}</span>
            <span class="modal__movie-release-year">${resData.year}</span>
        </h2>
        <ul class="modal__movie-info">
            <div class="loader"></div>
            <li class="modal__movie-genre">Жанр - ${resData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
            ${resData.filmLength ? `<li class="modal__movie-runtime">Время - ${resData.filmLength} минут</li>` : ""}
            <li>Сайт: <a class="modal__movie-site" href="${resData.webUrl}" target="_blank">${resData.webUrl}</a></li>
            <li class="modal__movie-overview">Описание - ${resData.description}</li>
        </ul>
        <button type="button" class="modal_button-close">Закрыть</button>
    </div>
    `;

    const btnClose = document.querySelector(".modal_button-close");
    btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
    modalEl.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
    if(e.target == modalEl){
        closeModal();
    }
})

window.addEventListener("keydown", (e) => {
    if(e.keyCode === 27){
       closeModal();
    }
})

//Auth
async function openFormAuth(){
    document.body.classList.add("stop-scrolling");

    modalEl.classList.add("modal--show");

    modalEl.innerHTML = `
        <div class="auth__content">
            <h2 style="color: white;">Авторизация</h2>
            <form action="php/login.php" method="post" class="login">
                <input type="text" placeholder="login" name="login">
                <input type="password" placeholder="password" name="pass">
                <button type="submit" class="notification">Войти</button>
            </form>
            <form action="php/register.php" method="post" class="register">
                <input type="text" placeholder="login" name="login">
                <input type="password" placeholder="password" name="pass">
                <input type="password" placeholder="repeat password" name="repeatpass">
                <input type="text" placeholder="email" name="email">
                <button type="submit" class="notification">Зарегистрироваться</button>
            </form>
            <button type="button" class="modal_button-close">Закрыть</button>
        </div>
    `;

    const btnClose = document.querySelector(".modal_button-close");
    btnClose.addEventListener("click", () => closeModal());
}

const auth = document.getElementById("authentication");
if(auth){
    auth.addEventListener("click", () => openFormAuth());
}



//favourite
async function getFavorites() {
    try {
        const response = await fetch('php/get_favorites.php');
        const kinopoiskIds = await response.json();
        showFavoriteMovies(kinopoiskIds);
        console.log(kinopoiskIds);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
}

function showFavoriteMovies(kinopoiskIds) {
    const moviesFavEl = document.querySelector('.movies__fav');
    
    kinopoiskIds.forEach(async (kinopoiskId) => {
        const response = await fetch(API_URL_MOVIE_DETAILS + kinopoiskId, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY
            },
        });

        const resData = await response.json();

        const movieFavEl = document.createElement('div');
        movieFavEl.classList.add('movie');

        const isFavorited = localStorage.getItem(`favorited_${kinopoiskId}_${userId}`) === 'true';
        const favoritedClass = isFavorited ? 'favorited' : '';

        movieFavEl.innerHTML = `
            <!-- Ваш HTML-код для отображения фильма, например: -->
            <div class="movie___cover-inner">
                <img src="${resData.posterUrl}" class="movie___cover" alt="${resData.nameRu}" />
                <div class="movie__cover--darkened"></div>
            </div>
            <div class="movie_obj">
                <div class="movie__info">
                    <div class="movie__title">${resData.nameRu}</div>
                    <div class="movie_category">${resData.genres.map((genre) => ` ${genre.genre}`)}</div>
                    ${resData.ratingImdb ? `<div class="movie__averange movie__averange--${getClassByRate(resData.ratingImdb)}">${resData.ratingImdb}</div>` : ''}
                </div>
                ${isLoggedIn ? `<button class="movie__favourite ${favoritedClass}" onclick="toggleFavoriteButton(this, ${kinopoiskId})"><image src="image/free-icon.png" class="icon" alt="star"/></button>` : ``}
            </div>
        `;
        const coverInner = movieFavEl.querySelector(".movie___cover-inner");
        coverInner.addEventListener("click", () => openModal(kinopoiskId));
        if(moviesFavEl){
            moviesFavEl.appendChild(movieFavEl);
        }
    });
}

