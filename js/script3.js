// script3.js
$(document).ready(function () {
    // Cargar películas de muestra en cada categoría al cargar la página
    const categories = ['accion', 'comedia', 'drama', 'terror', 'ciencia-ficcion', 'romance'];

    // Crear contenedores para cada categoría y mostrar películas
    categories.forEach(category => {
        // Agregar un card-body para cada categoría
        $('#allMoviesContainer').append(`
            <div class="card">
                <div class="card-body category-container">
                    <h3>${capitalizeFirstLetter(category)}</h3>
                    <div id="${category}MoviesContainer" class="row"></div>
                </div>
            </div>
        `);

        const sampleMovies = getSampleMoviesForCategory(category, 5);
        sampleMovies.forEach(movie => {
            searchMovies(null, category, movie);
        });
    });
});

function getSampleMoviesForCategory(category, count) {
    // Retorna una lista de películas de muestra para la categoría dada
    // Puedes agregar más películas según sea necesario
    switch (category) {
        case 'accion':
            return ['Die Hard', 'Mad Max: Fury Road', 'John Wick', 'The Dark Knight', 'Terminator 2'];
        case 'comedia':
            return ['Superbad', 'Anchorman', 'Bridesmaids', 'Dumb and Dumber', 'The Hangover'];
        case 'drama':
            return ['Sueño de Fuga', 'Forrest Gump', 'El Padrino', 'La Lista de Schindler', 'El Pianista'];
        case 'terror':
            return ['El Resplandor', '¡Huye!', 'Pesadilla en Elm Street', 'El Conjuro', 'Psicosis'];
        case 'ciencia-ficcion':
            return ['Blade Runner', 'The Matrix', 'Interstellar', 'Star Wars: Una Nueva Esperanza', 'E.T. el Extraterrestre'];
        case 'romance':
            return ['Diario de una Pasión', 'Titanic', 'Orgullo y Prejuicio', 'La La Land', 'Antes del Amanecer'];
        default:
            return [];
    }
}

function searchMovies(searchTerm, category, movieTitle) {
    const apiKey = '7cd9897f';
    const searchInput = searchTerm || movieTitle || $('#searchInput').val();
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchInput}&type=movie&plot=full`;

    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            console.log(response);
            displayMovies(response.Search, category);
        },
        error: function (error) {
            console.error('Error al obtener datos de la API de OMBD:', error);
        }
    });
}

function displayMovies(movies, category) {
    const apiKey = '7cd9897f';
    const categoryContainer = $(`#${category}MoviesContainer`);
    categoryContainer.empty();

    if (!movies || movies.length === 0) {
        categoryContainer.append(`<p>No se encontraron películas para la categoría ${category}.</p>`);
        return;
    }

    movies.forEach(movie => {
        const detailsUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;

        $.ajax({
            url: detailsUrl,
            method: 'GET',
            success: function (detailsResponse) {
                console.log(detailsResponse);
                const movieCard = createMovieCard(detailsResponse);
                categoryContainer.append(movieCard);
            },
            error: function (error) {
                console.error('Error al obtener detalles de la película:', error);
            }
        });
    });
}

function createMovieCard(movieDetails) {
    const trailerLink = movieDetails.Trailer ? `<a href="${movieDetails.Trailer}" target="_blank">Ver Trailer</a>` : '';

    const movieCard = `
        <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="movie-card">
                <img src="${movieDetails.Poster}" alt="${movieDetails.Title}">
                <h3>${movieDetails.Title} (${movieDetails.Year})</h3>
                <p>${movieDetails.Plot}</p>
                <p><strong>Calificación IMDB:</strong> ${movieDetails.imdbRating}</p>
                <p><strong>Clasificación por edad:</strong> ${movieDetails.Rated}</p>
                ${trailerLink}
            </div>
        </div>
    `;

    return movieCard;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
