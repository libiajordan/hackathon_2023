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
        // No es necesario realizar una solicitud adicional para obtener detalles de la película

        const movieCard = createMovieCard(movie); // Modificado para usar la información directa de la lista de películas
        movieList.append(movieCard);
    });
}

function createMovieCard(movie) {
    // Crear un elemento HTML para la tarjeta de la película sin información detallada
    const movieCard = `
        <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            
        </div>
    `;

    return movieCard;
}
