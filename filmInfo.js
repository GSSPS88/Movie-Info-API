const apiKey = TMDB_API_KEY; // defined in config.js
let years = "2024";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&page=1&year=${years}`;

const content = document.getElementById('content');
const urlPoster = `http://image.tmdb.org/t/p/w500/`

const dropdown = document.getElementById("years")
async function displayMovies (url) {
    const response = await fetch(url);
    const movies = await response.json();
    
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    movies.results.forEach(data => {
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        const title = document.createElement('h2');
        const poster = document.createElement('img');
            title.innerHTML = `${data.title.substring(0,20)}`;
            poster.src = `${urlPoster}${data.poster_path}`;

            movieEL.appendChild(title);
            movieEL.appendChild(poster);
            content.appendChild(movieEL);
        });
        console.log(movies);
    
}

dropdown.addEventListener('change', () => {
    years = dropdown.value;
    const updateUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&page=1&year=${years}`;
    displayMovies(updateUrl);
});
displayMovies(url);


