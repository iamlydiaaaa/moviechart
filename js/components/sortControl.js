var SortControl = /** @class */ (function () {
    function SortControl(controlData, onClick, container) {
        this.text = controlData.text;
        this.method = controlData.method;
        this.controlContainer = document.createElement("div");
        container.appendChild(this.controlContainer);
        this.render(onClick);
    }
    SortControl.prototype.render = function (onClick) {
        var _this = this;
        this.controlContainer.classList.add("control");
        this.controlContainer.onclick = function () { return onClick(_this.method); };
        var control = document.createElement("div");
        control.textContent = this.text;
        this.controlContainer.appendChild(control);
        var direction = document.createElement("div");
        direction.classList.add("direction");
        this.controlContainer.appendChild(direction);
    };
    SortControl.prototype.update = function (method, direction) {
        this.controlContainer.classList.remove('ASC');
        this.controlContainer.classList.remove('DESC');
        if (method !== this.method) {
        }
        else {
            this.controlContainer.classList.remove('ASC');
            this.controlContainer.classList.remove('DESC');
            this.controlContainer.classList.add(direction);
        }
    };
    return SortControl;
}());
export { SortControl };
//# sourceMappingURL=sortControl.js.map