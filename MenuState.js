class MenuState{
    constructor(stateManager, grid){
        this.stateManager = stateManager;
        this.grid = grid;
    }

    static addToMenuElementsList(callingElement, containerElement, childElement){
        let containerElementID = containerElement.id;
        callingElement.menuElements.push({
            "element": childElement,
            "containerID": containerElementID
        });
    }
    static addLineBreak(callingElement) {
        let lineBreakElement = document.createElement("br");
        let selectMenuContainer = document.getElementById("select-menu-container");
        selectMenuContainer.appendChild(lineBreakElement);
        MenuState.addToMenuElementsList(callingElement, selectMenuContainer, lineBreakElement);
    }

    static createSelectListElement(callingElement, elementData, options) {
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

        MenuState.addToMenuElementsList(callingElement, selectMenuContainer, selectElementLabel);
        MenuState.addToMenuElementsList(callingElement, selectMenuContainer, selectElement);
    }

    static createButton(callingElement, buttonData, onClickFunction = null) {
        let buttonMenuContainer = document.getElementById("button-menu-container");
        let buttonElement = document.createElement("button");
        buttonElement.id = buttonData.id;
        buttonElement.innerText = buttonData.text;
        buttonElement.style.fontWeight = "bold";

        if (onClickFunction !== null) {
            buttonElement.addEventListener("click", onClickFunction);
        }

        buttonMenuContainer.appendChild(buttonElement);
        MenuState.addToMenuElementsList(callingElement, buttonMenuContainer, buttonElement);
    }

    // Override
    createSelectMenus() {

    }

    // Override
    createButtons() {

    }

    init() {
        this.menuElements = [];
        this.createSelectMenus();
        this.createButtons();
    }
}