import { getFilms } from '../queries';
import { FilmRow } from './filmRow';
import { PaginationControl } from './paginationControl';
import { SortControl, SortControlData } from './sortControl';
import { SortMethod, SortDirection } from '../types';
import { Film } from '../film';

export class AllFilms {
    sortMethod: SortMethod;
    direction: SortDirection;
    pageSize: number;
    filmList: Film[];
    listContainer: HTMLElement;
    controlsContainer: HTMLElement;
    pagination: PaginationControl;
    sortControlList: SortControl[];
    searchContainer: HTMLElement;
    searchValue?: string;

    constructor(controlsContainer: HTMLElement, listContainer: HTMLElement, paginationContainer: HTMLElement, searchContainer: HTMLElement) {
        this.sortMethod = "popularity";
        this.direction = "ASC";
        this.pageSize = 8;
        this.filmList = [];
        this.listContainer = listContainer;
        this.controlsContainer = controlsContainer;
        this.searchContainer = searchContainer;

        this.renderSearch();

        const handleControlClick = (method: SortMethod) => {
            if(this.sortMethod === method) {
                this.direction = this.direction === "ASC" ? "DESC" : "ASC";
            } else {
                this.direction = "ASC";
            }
            this.sortMethod = method;
            this.updateControls();
            this.updateFilmList();
        };

        const sortControls = [
            {   text: 'Popularity',
                method: 'popularity'
            },
            {
                text: 'Title',
                method: 'title'
            },
            {
                text: 'Runtime',
                method: 'runtime'
            },
            {
                text: 'release',
                method: 'release'
            }
        ] as SortControlData[];

        this.sortControlList = sortControls.map(sortControl => 
            new SortControl(sortControl, handleControlClick, controlsContainer)
        );

        this.updateControls();

        this.updateFilmList();

        this.pagination = new PaginationControl((currPage: number) => {
            this.updateFilmList(currPage);
        }, paginationContainer);
    }

    renderSearch() {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("search");

        const setSearchValue = () => {
            this.searchValue = input.value;
            this.updateFilmList();
        };

        input.onblur = setSearchValue;
        input.onkeyup = e => {
            e.keyCode == 13 && setSearchValue();
        }
        input.placeholder = "Title search";

        this.searchContainer.appendChild(input);
        
        const searchButton = document.createElement('div');
        searchButton.innerText = "Search";
        searchButton.classList.add('search-button');
        searchButton.onclick = setSearchValue;

        this.searchContainer.appendChild(searchButton);
    }

    setFilmList(newFilmList: Film[]) {
        this.filmList = newFilmList;
        this.renderFilmList();
    }

    setPageCount(newCount: number) {
        this.pagination.pageCount = newCount;
    }

    updateControls() {
        this.sortControlList.forEach(sortControl => {
            sortControl.update(this.sortMethod, this.direction);
        });
    }

    renderFilmList() {
        // Clear container
        while (this.listContainer.lastChild) {
            this.listContainer.removeChild(this.listContainer.lastChild);
        }

        // Render new film list
        this.filmList.forEach(film => {
            const filmRow = new FilmRow(film);
            filmRow.render(this.listContainer);
        });
    }

    async updateFilmList(currPage: number = 1) {
        const res = await getFilms({
            sortBy: this.sortMethod,
            direction: this.direction,
            offset: (currPage - 1) * this.pageSize,
            pageLength: this.pageSize,
            searchTerm: this.searchValue
        })
        this.setFilmList(res.films);
        this.setPageCount(res.pageCount);
    }

    sortBy(method: SortMethod, direction: SortDirection) {
        this.sortMethod = method;
        this.direction = direction;

        this.updateFilmList();
        this.pagination.resetPage();
    }
}