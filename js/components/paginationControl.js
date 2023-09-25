import { range } from '../utils';
var PaginationControl = /** @class */ (function () {
    function PaginationControl(onPageChange, container) {
        this._pageCount = 0;
        this._currPage = 1;
        this.pageButtonPadding = 1;
        this.onPageChange = onPageChange;
        this.container = container;
    }
    Object.defineProperty(PaginationControl.prototype, "currPage", {
        get: function () {
            return this._currPage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PaginationControl.prototype, "pageCount", {
        set: function (newCount) {
            if (this._pageCount != newCount) {
                this._pageCount = newCount;
                this.render();
            }
        },
        enumerable: false,
        configurable: true
    });
    PaginationControl.prototype.resetPage = function () {
        this._currPage = 1;
        this.render();
    };
    PaginationControl.prototype.hasNext = function () {
        return this._currPage < this._pageCount;
    };
    PaginationControl.prototype.toNextPage = function () {
        this.toPage(this._currPage + 1);
    };
    PaginationControl.prototype.hasPrev = function () {
        return this._currPage > 1;
    };
    PaginationControl.prototype.toPrevPage = function () {
        this.toPage(this._currPage - 1);
    };
    PaginationControl.prototype.toPage = function (newPage) {
        this._currPage = newPage;
        this.onPageChange(this._currPage);
        this.render();
    };
    PaginationControl.prototype.render = function () {
        var _this = this;
        // Clear container
        while (this.container.lastChild) {
            this.container.removeChild(this.container.lastChild);
        }
        var paginationControlContainer = document.createElement('div');
        paginationControlContainer.classList.add('pagination');
        if (this.hasPrev()) {
            var prevButton = document.createElement('div');
            prevButton.classList.add('prev-button');
            prevButton.textContent = "PREV";
            prevButton.onclick = this.toPrevPage.bind(this);
            paginationControlContainer.appendChild(prevButton);
        }
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('page-buttons');
        var boundedMin = Math.max(1, this._currPage - this.pageButtonPadding);
        var boundedMax = Math.min(this._pageCount, this._currPage + this.pageButtonPadding);
        var pageButtonNumbers = range(boundedMin, boundedMax + 1); // range max is exclusive
        if (boundedMin > 1) {
            var dots = document.createElement('div');
            dots.classList.add('page-number-button');
            dots.textContent = "...";
            buttonContainer.appendChild(dots);
        }
        var pageButtons = pageButtonNumbers.map(function (pageNumber) {
            var button = document.createElement('button');
            button.classList.add('page-number-button');
            button.innerText = pageNumber.toString();
            button.onclick = function () { return _this.toPage(pageNumber); };
            if (pageNumber === _this._currPage) {
                button.classList.add('selected');
            }
            ;
            return button;
        });
        pageButtons.forEach(function (button) { return buttonContainer.appendChild(button); });
        if (boundedMax < this._pageCount) {
            var dots = document.createElement('div');
            dots.classList.add('page-number-button');
            dots.textContent = "...";
            buttonContainer.appendChild(dots);
        }
        paginationControlContainer.appendChild(buttonContainer);
        if (this.hasNext()) {
            var nextButton = document.createElement('div');
            nextButton.classList.add('next-button');
            nextButton.textContent = "NEXT";
            nextButton.onclick = this.toNextPage.bind(this);
            paginationControlContainer.appendChild(nextButton);
        }
        this.container.appendChild(paginationControlContainer);
    };
    return PaginationControl;
}());
export { PaginationControl };
//# sourceMappingURL=paginationControl.js.map