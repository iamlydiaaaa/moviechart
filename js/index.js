import { AllFilms } from './components/allFilms';
document.addEventListener("DOMContentLoaded", function () {
    var sortControlsContainer = document.getElementById("sort_controls");
    var allFilmsContainer = document.getElementById("movie_list");
    var paginationContainer = document.getElementById("pagination_container");
    var searchContainer = document.getElementById("search_Bar");
    if (sortControlsContainer && allFilmsContainer && paginationContainer && searchContainer) {
        var allFilms = new AllFilms(sortControlsContainer, allFilmsContainer, paginationContainer, searchContainer);
    }
});
//# sourceMappingURL=index.js.map