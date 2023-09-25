import { AllFilms } from './components/allFilms';

document.addEventListener("DOMContentLoaded", () => {
    const sortControlsContainer = document.getElementById("sort_controls");
    const allFilmsContainer = document.getElementById("movie_list");
    const paginationContainer = document.getElementById("pagination_container");
    const searchContainer = document.getElementById("search_Bar");

    if(sortControlsContainer && allFilmsContainer && paginationContainer && searchContainer) {
        const allFilms = new AllFilms(sortControlsContainer, allFilmsContainer, paginationContainer, searchContainer);
    }
});