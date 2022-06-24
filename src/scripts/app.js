const PLATAFORM_CHOICE = document.querySelector("#platform");
const GENRE_CHOICE = document.querySelector("#genre");
const GAMES_CONTAINER = document.querySelector(".games-container");
const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api"

window.addEventListener('load', e => {
    getGames("/games");

    PLATAFORM_CHOICE.addEventListener('change',e => {
        clearAll();
        const choice = PLATAFORM_CHOICE.value
        const genre = GENRE_CHOICE.value
        if (genre === "all") {
            getGames("/games?platform=" + choice)
            return
        }
        getGames("/games?platform=" + choice + "&category=" + genre)
    })

    GENRE_CHOICE.addEventListener('change',e => {
        clearAll();
        const choice = PLATAFORM_CHOICE.value
        const genre = GENRE_CHOICE.value
        if (genre === "all") {
            getGames("/games?platform=" + choice)
            return
        }
        getGames("/games?platform=" + choice + "&category=" + genre)
    })
})

function getGames(filters) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '66256bad32msh8d3cf70e19e0d4fp159833jsn293c9b7bdb26',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    fetch(`${BASE_URL}${filters}`, options)
        .then(response => response.json())
        .then(games => {
            games.forEach(game => {
                renderGames(game);
            });
        })
        .catch(err => console.error('Erro:', err));
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
    const gameLink = document.createElement('a');
    const gamePlataform = document.createElement('p');

    gameDivDescription.classList.add('description');
    gameDivTitle.classList.add('tooltip');
    gameTitle.classList.add('tooltiptext');

    gameDivTitle.innerHTML = title;
    gameTitle.innerHTML = title;
    gameImg.src = thumbnail;
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