import { getTopFilms } from '../queries';
import { TopFilm } from './topFilm';
var TopFilms = /** @class */ (function () {
    function TopFilms(container) {
        getTopFilms().then(function (res) {
            res.films.forEach(function (film) {
                var filmComponent = new TopFilm(film);
                filmComponent.renderTopFilm(container);
            });
        });
    }
    return TopFilms;
}());
export { TopFilms };
//# sourceMappingURL=topFilms.js.map