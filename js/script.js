$(document).ready(function() {
    // Mostrar películas de muestra al cargar la página
    const sampleMovies = ['Batman', 'The Matrix', 'Inception', 'Titanic', 'The Shawshank Redemption'];
    sampleMovies.forEach(movie => {
        searchMovies(movie);
    });
});

function searchMovies(searchTerm) {
    const apiKey = '7cd9897f';
    const searchInput = searchTerm || $('#searchInput').val();
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchInput}`;

    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            console.log(response); // Imprimir la respuesta en la consola para verificar
            displayMovies(response.Search);
        },
        error: function (error) {
            console.error('Error al obtener datos de la API de OMBD:', error);
        }
    });
}

function displayMovies(movies) {
    const apiKey = '7cd9897f';
    const movieList = $('#movieList');
    movieList.empty();

    if (!movies || movies.length === 0) {
        movieList.append('<p>No se encontraron películas.</p>');
        return;
    }

    movies.forEach(movie => {
        // Realizar una solicitud adicional para obtener detalles de la película
        const detailsUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;

        $.ajax({
            url: detailsUrl,
            method: 'GET',
            success: function (detailsResponse) {
                console.log(detailsResponse); // Imprimir la respuesta en la consola para verificar
                const movieCard = createMovieCard(detailsResponse);
                movieList.append(movieCard);
            },
            error: function (error) {
                console.error('Error al obtener detalles de la película:', error);
            }
        });
    });
}

function createMovieCard(movieDetails) {
    // Crear un elemento HTML para la tarjeta de la película con información detallada
    const movieCard = `
        <div class="movie-card">
            <img src="${movieDetails.Poster}" alt="${movieDetails.Title}">
            <h5>${movieDetails.Title} (${movieDetails.Year})</h5>
            <p>${movieDetails.Plot}</p>
            <p><strong>Elenco:</strong> ${movieDetails.Actors}</p>
            <p><strong>Director:</strong> ${movieDetails.Director}</p>
            <p><strong>Calificación IMDB:</strong> ${movieDetails.imdbRating}</p>
            <p><strong>Clasificación por edad:</strong> ${movieDetails.Rated}</p>
        </div>
    `;

    return movieCard;
}
