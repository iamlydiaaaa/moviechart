import { Film } from "./film";
import { RawFilm } from "./types";
import { SortDirection, SortMethod } from "./types";

export interface Options {
    [name: string]: any;
    sortBy: SortMethod;
    direction: SortDirection;
    offset: number;
    pageLength: number;
    searchTerm?: string;
}

interface GetFilmsResponse {
    pageCount: number;
    films: RawFilm[];
}

export const getFilms = async ({searchTerm = "", ...rest}: Options) => {
    const options = {searchTerm, ...rest} as Options;
    const url = new URL("./films.php", window.location.href);
    Object.keys(options).forEach(key => url.searchParams.append(key, options[key]))
    return fetch(url as any, {
        method: "GET"
    }).then(rawRes => {
        return rawRes.json().then((jsonRes: GetFilmsResponse) => {
            return {
                pageCount: jsonRes.pageCount,
                films: jsonRes.films.map(rawFilm => new Film(rawFilm))
             };
        });
    });
}