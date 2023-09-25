var TopFilm = /** @class */ (function () {
    function TopFilm(film) {
        this.film = film;
    }
    TopFilm.prototype.renderTopFilm = function (container) {
        var listItem = document.createElement("li");
        var poster = document.createElement("img");
        poster.src = this.film.poster;
        poster.alt = this.film.title + " poster";
        var link = document.createElement("a");
        link.innerText = "more";
        link.href = "#";
        var overlay = document.createElement("div");
        overlay.classList.add('top_wrap');
        var overlayDescription = document.createElement("p");
        overlayDescription.classList.add("top_desc");
        overlayDescription.textContent = this.film.description;
        var overlayRating = document.createElement("p");
        overlayRating.classList.add("top_rate");
        overlayRating.innerHTML = "Rate: <em>8.5</em>";
        var overlayButton = document.createElement("div");
        overlayButton.classList.add("top_go");
        overlayButton.textContent = "See detail";
        overlay.appendChild(overlayDescription);
        overlay.appendChild(overlayRating);
        overlay.appendChild(overlayButton);
        var subtitle = document.createElement("div");
        subtitle.classList.add("top_subtit");
        var title = document.createElement("p");
        title.classList.add("top_tit");
        title.textContent = this.film.title;
        var genre = document.createElement("p");
        genre.classList.add("top_genre");
        genre.textContent = this.film.genres[0];
        subtitle.appendChild(title);
        subtitle.appendChild(genre);
        listItem.appendChild(poster);
        listItem.appendChild(link);
        listItem.appendChild(overlayButton);
        listItem.appendChild(subtitle);
        container.appendChild(listItem);
    };
    return TopFilm;
}());
export { TopFilm };
//# sourceMappingURL=topFilm.js.map