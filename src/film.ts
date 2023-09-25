import ReleaseDate from './releaseDate';
import { RawFilm, Score } from './types';
import { xpathArrayToArray } from './utils';

export class Film {
    id: string;
    popularity: number;
    title: string;
    poster: string;
    year: number;
    releaseDates: ReleaseDate[];
    genres: string[];
    description: string;
    rating?: string;
    warnings?: string[];
    runtime: number;
    language: string;
    distributor: string;
    scores: Score[];

    constructor(rawFilm: RawFilm) {
        this.id = rawFilm.id;
        this.popularity = Number(rawFilm.popularity);
        this.title = rawFilm.title;
        this.poster = rawFilm.poster;
        this.year = Number(rawFilm.year);
        this.releaseDates = xpathArrayToArray(rawFilm.releaseDates.release).map(release => new ReleaseDate(release));
        this.genres = xpathArrayToArray(rawFilm.genres.genre);
        this.description = rawFilm.description;
        this.rating = rawFilm.rating?.ageRestriction;
        this.warnings = rawFilm.rating?.warnings;
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
}