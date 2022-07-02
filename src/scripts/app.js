const PLATAFORM_CHOICE = document.querySelector("#platform");
const GENRE_CHOICE = document.querySelector("#genre");
const GAMES_CONTAINER = document.querySelector(".games-container");
const LOADER = document.querySelector(".loader");
const MAIN = document.querySelector("main");
const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api"

window.addEventListener('load', () => {
    getGames("/games");

    PLATAFORM_CHOICE.addEventListener('change', () => {
        const choice = PLATAFORM_CHOICE.value
        const genre = GENRE_CHOICE.value

        clearAll();

        if (genre === "all") {
            getGames("/games?platform=" + choice)
            return
        }
        
        getGames("/games?platform=" + choice + "&category=" + genre)
    })
    
    GENRE_CHOICE.addEventListener('change', () => {
        const choice = PLATAFORM_CHOICE.value
        const genre = GENRE_CHOICE.value
        
        clearAll();
        
        if (genre === "all") {
            getGames("/games?platform=" + choice)
            return
        }
        
        getGames("/games?platform=" + choice + "&category=" + genre)
    })
})

async function getGames(filters) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '66256bad32msh8d3cf70e19e0d4fp159833jsn293c9b7bdb26',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    showLoader();

    const response = await fetch(`${BASE_URL}${filters}`,options)
    const games = await response.json()
    games.forEach(game => {
        renderGames(game);
    });

    hideLoader();
}

function renderGames(game) {
    const { id,
        title,
        thumbnail,
        short_description: shortDescription,
        game_url: gameUrl,
        genre,
        platform,
        publisher,
        developer,
        release_date: realeaseDate,
        freetogame_profile_url: freeToGameProfileURL } = game;

    const gameDiv = document.createElement('div');
    const gameDivImage = document.createElement('div');
    const gameDivTitle = document.createElement('div');
    const gameDivDescription = document.createElement('div');
    const gameDivFooter = document.createElement('div');

    const gameImg = document.createElement('img');
    const gameTitle = document.createElement('span');
    const gameTextDescription = document.createElement('p');
    const gameButtonGenre = document.createElement('button');
    const gamePlataform = document.createElement('p');

    gameDiv.classList.add('card');
    gameDivDescription.classList.add('description');
    gameDivTitle.classList.add('tooltip');
    gameTitle.classList.add('tooltiptext');
    gameDivFooter.classList.add('card-footer')

    gameDivTitle.innerHTML = title;
    gameTitle.innerHTML = title;
    gameImg.src = thumbnail;
    gameImg.loading = "lazy"
    gameTextDescription.innerHTML = shortDescription;
    gameButtonGenre.innerHTML = genre;
    gamePlataform.innerHTML = platform;

    gameDivImage.appendChild(gameImg);
    gameDivTitle.appendChild(gameTitle);
    gameDivDescription.appendChild(gameTextDescription);
    gameDivFooter.appendChild(gameButtonGenre);
    gameDivFooter.appendChild(gamePlataform);

    gameDiv.appendChild(gameDivImage);
    gameDiv.appendChild(gameDivTitle);
    gameDiv.appendChild(gameDivDescription);
    gameDiv.appendChild(gameDivFooter);


    gameDiv.addEventListener('click', e => {
         window.open(gameUrl)
    })

    GAMES_CONTAINER.appendChild(gameDiv);
}

function clearAll(){
    while (GAMES_CONTAINER.firstChild) {
        GAMES_CONTAINER.removeChild(GAMES_CONTAINER.lastChild);
    }
}

function hideLoader() {
    MAIN.removeChild(LOADER);
    GAMES_CONTAINER.style.display = 'grid';
}

function showLoader() {
    MAIN.appendChild(LOADER);
    GAMES_CONTAINER.style.display = 'none';
}