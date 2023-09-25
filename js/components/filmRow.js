import { FILM_POSTER_URI } from '../constants';
var FilmRow = /** @class */ (function () {
    function FilmRow(film) {
        this.film = film;
    }
    FilmRow.prototype.render = function (container) {
        var _a;
        var filmRowContainer = document.createElement("div");
        filmRowContainer.classList.add("list");
        var rank = document.createElement("p");
        rank.classList.add("popularity");
        rank.textContent = this.film.popularity.toString();
        var poster = document.createElement("div");
        poster.classList.add("poster");
        var posterImage = document.createElement("img");
        posterImage.src = FILM_POSTER_URI + this.film.poster;
        posterImage.onerror = function () {
            poster.removeChild(posterImage);
        };
        poster.appendChild(posterImage);
        var details = document.createElement("div");
        details.classList.add("movie_txt");
        var title = document.createElement("p");
        title.classList.add("title");
        title.textContent = this.film.title;
        var genre = document.createElement("p");
        genre.classList.add("genres");
        var genres = (_a = this.film.genres[0]).concat.apply(_a, this.film.genres.slice(1).map(function (genre) { return ", " + genre; }));
        genre.textContent = this.film.year + " - " + genres;
        var rating = document.createElement("p");
        if (this.film.scores[0]) {
            rating.classList.add("movie_rate");
            rating.textContent = this.film.scores[0].display + " (" + this.film.scores[0].type + ")";
        }
        var link = document.createElement("a");
        link.classList.add("movie_go");
        link.href = "./detail.php?id=" + this.film.id;
        link.textContent = "SEE DETAIL";
        details.appendChild(title);
        details.appendChild(genre);
        details.appendChild(rating);
        details.appendChild(link);
        filmRowContainer.appendChild(rank);
        filmRowContainer.appendChild(poster);
        filmRowContainer.appendChild(details);
        container.appendChild(filmRowContainer);
    };
    return FilmRow;
}());
export { FilmRow };
//# sourceMappingURL=filmRow.js.map