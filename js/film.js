import ReleaseDate from './releaseDate';
import { xpathArrayToArray } from './utils';
var Film = /** @class */ (function () {
    function Film(rawFilm) {
        var _a, _b;
        this.id = rawFilm.id;
        this.popularity = Number(rawFilm.popularity);
        this.title = rawFilm.title;
        this.poster = rawFilm.poster;
        this.year = Number(rawFilm.year);
        this.releaseDates = xpathArrayToArray(rawFilm.releaseDates.release).map(function (release) { return new ReleaseDate(release); });
        this.genres = xpathArrayToArray(rawFilm.genres.genre);
        this.description = rawFilm.description;
        this.rating = (_a = rawFilm.rating) === null || _a === void 0 ? void 0 : _a.ageRestriction;
        this.warnings = (_b = rawFilm.rating) === null || _b === void 0 ? void 0 : _b.warnings;
        this.runtime = Number(rawFilm.runtime);
        this.language = rawFilm.language;
        this.distributor = rawFilm.distributor;
        this.scores = [];
        rawFilm.scores.imdb && this.scores.push({
            type: "IMDB",
            score: Number(rawFilm.scores.imdb),
            display: (Number(rawFilm.scores.imdb) / 10).toString()
        });
        rawFilm.scores.rottenTomatoes.audienceScore && this.scores.push({
            type: "Rotten Tomatoes - Audience Score",
            score: Number(rawFilm.scores.rottenTomatoes.audienceScore),
            display: (Number(rawFilm.scores.rottenTomatoes.audienceScore) / 10).toString()
        });
        rawFilm.scores.rottenTomatoes.tomatoeMeter && this.scores.push({
            type: "Rotten Tomatoes - Tomatoe Meter",
            score: Number(rawFilm.scores.rottenTomatoes.tomatoeMeter),
            display: (Number(rawFilm.scores.rottenTomatoes.tomatoeMeter) / 10).toString()
        });
    }
    return Film;
}());
export { Film };
//# sourceMappingURL=film.js.map