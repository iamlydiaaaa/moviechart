import { Film } from '../film';
import { FILM_POSTER_URI } from '../constants';

export class FilmRow {
    film: Film;

    constructor(film: Film) {
        this.film = film;
    }

    render(container: HTMLElement) {
        const filmRowContainer = document.createElement("div");
        filmRowContainer.classList.add("list");

            const rank = document.createElement("p");
            rank.classList.add("popularity");
            rank.textContent = this.film.popularity.toString();

            const poster = document.createElement("div");
            poster.classList.add("poster");
                const posterImage = document.createElement("img")
                posterImage.src = FILM_POSTER_URI + this.film.poster;
                posterImage.onerror = () => {
                    poster.removeChild(posterImage);
                }
            poster.appendChild(posterImage);

            const details = document.createElement("div");
            details.classList.add("movie_txt");

                const title = document.createElement("p");
                title.classList.add("title");
                title.textContent = this.film.title;

                const genre = document.createElement("p");
                genre.classList.add("genres");
                const genres = this.film.genres[0].concat(...this.film.genres.slice(1).map(genre => `, ${genre}`));
                genre.textContent = `${this.film.year} - ${genres}`;

                const rating = document.createElement("p");
                if(this.film.scores[0]) {
                    rating.classList.add("movie_rate");
                    rating.textContent = `${this.film.scores[0].display} (${this.film.scores[0].type})`;
                }

                const link = document.createElement("a");
                link.classList.add("movie_go");
                link.href = `./detail.php?id=${this.film.id}`;
                link.textContent = "SEE DETAIL";

            details.appendChild(title);
            details.appendChild(genre);
            details.appendChild(rating);
            details.appendChild(link);

        filmRowContainer.appendChild(rank);
        filmRowContainer.appendChild(poster);
        filmRowContainer.appendChild(details);

        container.appendChild(filmRowContainer);
    } 
}