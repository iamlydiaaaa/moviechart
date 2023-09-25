var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getFilms } from '../queries';
import { FilmRow } from './filmRow';
import { PaginationControl } from './paginationControl';
import { SortControl } from './sortControl';
var AllFilms = /** @class */ (function () {
    function AllFilms(controlsContainer, listContainer, paginationContainer, searchContainer) {
        var _this = this;
        this.sortMethod = "popularity";
        this.direction = "ASC";
        this.pageSize = 8;
        this.filmList = [];
        this.listContainer = listContainer;
        this.controlsContainer = controlsContainer;
        this.searchContainer = searchContainer;
        this.renderSearch();
        var handleControlClick = function (method) {
            if (_this.sortMethod === method) {
                _this.direction = _this.direction === "ASC" ? "DESC" : "ASC";
            }
            else {
                _this.direction = "ASC";
            }
            _this.sortMethod = method;
            _this.updateControls();
            _this.updateFilmList();
        };
        var sortControls = [
            { text: 'Popularity',
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
        ];
        this.sortControlList = sortControls.map(function (sortControl) {
            return new SortControl(sortControl, handleControlClick, controlsContainer);
        });
        this.updateControls();
        this.updateFilmList();
        this.pagination = new PaginationControl(function (currPage) {
            _this.updateFilmList(currPage);
        }, paginationContainer);
    }
    AllFilms.prototype.renderSearch = function () {
        var _this = this;
        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("search");
        var setSearchValue = function () {
            _this.searchValue = input.value;
            _this.updateFilmList();
        };
        input.onblur = setSearchValue;
        input.onkeyup = function (e) {
            e.keyCode == 13 && setSearchValue();
        };
        input.placeholder = "Title search";
        this.searchContainer.appendChild(input);
        var searchButton = document.createElement('div');
        searchButton.innerText = "Search";
        searchButton.classList.add('search-button');
        searchButton.onclick = setSearchValue;
        this.searchContainer.appendChild(searchButton);
    };
    AllFilms.prototype.setFilmList = function (newFilmList) {
        this.filmList = newFilmList;
        this.renderFilmList();
    };
    AllFilms.prototype.setPageCount = function (newCount) {
        this.pagination.pageCount = newCount;
    };
    AllFilms.prototype.updateControls = function () {
        var _this = this;
        this.sortControlList.forEach(function (sortControl) {
            sortControl.update(_this.sortMethod, _this.direction);
        });
    };
    AllFilms.prototype.renderFilmList = function () {
        var _this = this;
        // Clear container
        while (this.listContainer.lastChild) {
            this.listContainer.removeChild(this.listContainer.lastChild);
        }
        // Render new film list
        this.filmList.forEach(function (film) {
            var filmRow = new FilmRow(film);
            filmRow.render(_this.listContainer);
        });
    };
    AllFilms.prototype.updateFilmList = function (currPage) {
        if (currPage === void 0) { currPage = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getFilms({
                            sortBy: this.sortMethod,
                            direction: this.direction,
                            offset: (currPage - 1) * this.pageSize,
                            pageLength: this.pageSize,
                            searchTerm: this.searchValue
                        })];
                    case 1:
                        res = _a.sent();
                        this.setFilmList(res.films);
                        this.setPageCount(res.pageCount);
                        return [2 /*return*/];
                }
            });
        });
    };
    AllFilms.prototype.sortBy = function (method, direction) {
        this.sortMethod = method;
        this.direction = direction;
        this.updateFilmList();
        this.pagination.resetPage();
    };
    return AllFilms;
}());
export { AllFilms };
//# sourceMappingURL=allFilms.js.map