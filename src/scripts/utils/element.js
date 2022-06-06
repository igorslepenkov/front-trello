function Element(tag, classString, appendPlace, text = "") {
    this.create = () => {
        const element = document.createElement(tag);
        element.className = classString;
        element.textContent = text;
        return element;
    };

    this.append = () => {
        if (appendPlace) {
            if (typeof appendPlace === "object") {
                appendPlace.append(this.element);
            } else {
                const parentElement = document.querySelector(appendPlace);
                parentElement.append(this.element);
            }
        }
    };

    this.element = this.create();
    this.append();
}

export { Element };