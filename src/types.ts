export interface rawReleaseDate {
    date: string;
    location: string;
}

export interface RawRating {
    ageRestriction: string;
    warnings: string[];
}

export interface Score {
    score: number;
    display: string;
    type: string;
}

export type XPathArray<Type extends any> = Type | Type[];

export interface RawFilm {
    id: string;
    popularity: string;
    title: string;
    poster: string;
    year: string;
    description: string;
    genres: {
        genre: XPathArray<string>;
    };
    releaseDates: {
        release: XPathArray<rawReleaseDate>;
    };
    runtime: string;
    language: string;
    distributor: string;
    rating?: RawRating;
    scores: {
        imdb: string;
        rottenTomatoes: {
            audienceScore: string;
            tomatoeMeter: String;
        };
    }
}

export type SortMethod = 'popularity' | 'title' | 'runtime' | 'release';

export type SortDirection = 'ASC' | 'DESC';