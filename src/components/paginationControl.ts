import { range } from '../utils';

export class PaginationControl {
    _pageCount: number = 0;
    _currPage: number = 1;
    onPageChange: (newPage: number) => void;
    container: HTMLElement;
    pageButtonPadding: number = 1;

    constructor(onPageChange: (newPage: number) => void, container: HTMLElement) {
        this.onPageChange = onPageChange;
        this.container = container;
    }

    get currPage() {
        return this._currPage;
    }

    set pageCount(newCount: number) {
        if(this._pageCount != newCount) {
            this._pageCount = newCount;
            this.render();
        }
    }

    resetPage() {
        this._currPage = 1;
        this.render();
    }

    hasNext() {
        return this._currPage < this._pageCount;
    }

    toNextPage() {
        this.toPage(this._currPage + 1);
    }

    hasPrev() {
        return this._currPage > 1;
    }

    toPrevPage() {
        this.toPage(this._currPage - 1);
    }

    toPage(newPage: number) {
        this._currPage = newPage;
        this.onPageChange(this._currPage);
        this.render();
    }

    render() {
        // Clear container
        while (this.container.lastChild) {
            this.container.removeChild(this.container.lastChild);
        }

        const paginationControlContainer = document.createElement('div');
        paginationControlContainer.classList.add('pagination');

            if(this.hasPrev()) {
                const prevButton = document.createElement('div');
                prevButton.classList.add('prev-button');
                prevButton.textContent = "PREV";
                prevButton.onclick = this.toPrevPage.bind(this);

                paginationControlContainer.appendChild(prevButton);
            }

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('page-buttons');

                const boundedMin = Math.max(1, this._currPage - this.pageButtonPadding);
                const boundedMax = Math.min(this._pageCount, this._currPage + this.pageButtonPadding);

                const pageButtonNumbers = range(boundedMin, boundedMax + 1); // range max is exclusive

                if(boundedMin > 1) {
                    const dots = document.createElement('div');
                    dots.classList.add('page-number-button');
                    dots.textContent = "...";
                    buttonContainer.appendChild(dots);
                }

                const pageButtons = pageButtonNumbers.map(pageNumber => {
                    const button = document.createElement('button');
                    button.classList.add('page-number-button');
                    button.innerText = pageNumber.toString();
                    button.onclick = () => this.toPage(pageNumber);

                    if(pageNumber === this._currPage) {
                        button.classList.add('selected');
                    };

                    return button;
                });
                pageButtons.forEach(button => buttonContainer.appendChild(button));

                if(boundedMax < this._pageCount) {
                    const dots = document.createElement('div');
                    dots.classList.add('page-number-button');
                    dots.textContent = "...";
                    buttonContainer.appendChild(dots);
                }

            paginationControlContainer.appendChild(buttonContainer);

            if(this.hasNext()) {
                const nextButton = document.createElement('div');
                nextButton.classList.add('next-button');
                nextButton.textContent = "NEXT";
                nextButton.onclick = this.toNextPage.bind(this);

                paginationControlContainer.appendChild(nextButton);
            }

        this.container.appendChild(paginationControlContainer);
    }
}