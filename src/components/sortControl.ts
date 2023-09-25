import { SortDirection, SortMethod } from '../types';

export interface SortControlData {
    text: string;
    method: SortMethod;
}

export class SortControl {
    text: string;
    method: SortMethod;
    controlContainer!: HTMLDivElement;

    constructor(controlData: SortControlData, onClick: (method: SortMethod) => void, container: HTMLElement) {
        this.text = controlData.text;
        this.method = controlData.method;
        this.controlContainer = document.createElement("div");
        container.appendChild(this.controlContainer);
        this.render(onClick);
    }

    render(onClick: (method: SortMethod) => void) {
        this.controlContainer.classList.add("control");
        this.controlContainer.onclick = () => onClick(this.method);
            const control = document.createElement("div");
            control.textContent = this.text;
            this.controlContainer.appendChild(control);

            const direction = document.createElement("div");
            direction.classList.add("direction");
            this.controlContainer.appendChild(direction);
    }

    update(method: SortMethod, direction: SortDirection) {
        this.controlContainer.classList.remove('ASC');
        this.controlContainer.classList.remove('DESC');
        if(method !== this.method) {
        } else {
            this.controlContainer.classList.remove('ASC');
            this.controlContainer.classList.remove('DESC');
            this.controlContainer.classList.add(direction);
        }
    }
}