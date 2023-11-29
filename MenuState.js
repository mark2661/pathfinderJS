class MenuState{
    constructor(stateManager, grid){
        this.stateManager = stateManager;
        this.grid = grid;
        this.createSelectMenus();
        this.createButtons();
        this.menuElements =  document.getElementById("select-menu-container").children;
    }

    static addLineBreak() {
        let lineBreakElement = document.createElement("br");
        let selectMenuContainer = document.getElementById("select-menu-container");
        selectMenuContainer.appendChild(lineBreakElement);
    }

    static createSelectListElement(elementData, options) {
        // create environment select element and label
        let selectElementLabel = document.createElement("label");
        let selectMenuContainer = document.getElementById("select-menu-container");
        let selectElement = document.createElement("select");

        selectElement.name = elementData.name;
        selectElement.id = elementData.id;
        selectElementLabel.innerHTML = `${elementData.label}:`;
        selectElementLabel.style.fontWeight = "bold";
        selectElementLabel.htmlFor = elementData.id;
        selectMenuContainer.appendChild(selectElementLabel);
        selectMenuContainer.appendChild(selectElement);

        // add options to the select element
        for (let option of options) {
            let selectOption = document.createElement("option");
            selectOption.value = option;
            selectOption.text = option.toUpperCase();
            selectElement.appendChild(selectOption);
        }
    }

    static createButton(buttonData, onClickFunction = null) {
        let buttonMenuContainer = document.getElementById("button-menu-container");
        let buttonElement = document.createElement("button");
        buttonElement.id = buttonData.id;
        buttonElement.innerText = buttonData.text;
        buttonElement.style.fontWeight = "bold";

        if (onClickFunction !== null) {
            buttonElement.addEventListener("click", onClickFunction);
        }

        buttonMenuContainer.appendChild(buttonElement);
    }

    // Override
    createSelectMenus() {

    }

    // Override
    createButtons() {

    }
}