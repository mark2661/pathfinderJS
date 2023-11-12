class GUI {
    constructor(map) {
        this.createSelectMenus();
        this.createButtons();
        // TODO: add canvas to this class instead of index.html file
        this.grid = new GridGUI(document.getElementById("grid-container"), map);
    }

    createSelectMenus() {
        function addLineBreak() {
            let lineBreakElement = document.createElement("br");
            let menuContainer = document.getElementById("menu-container");
            menuContainer.appendChild(lineBreakElement);
        }

        function createSelectListElement(elementData, options) {
            // create environment select element and label
            let selectElementLabel = document.createElement("label");
            let menuContainer = document.getElementById("menu-container");
            let selectElement = document.createElement("select");

            selectElement.name = elementData.name;
            selectElement.id = elementData.id;
            selectElementLabel.innerHTML = `${elementData.label}:`;
            selectElementLabel.htmlFor = elementData.id;
            menuContainer.appendChild(selectElementLabel);
            menuContainer.appendChild(selectElement);

            // add options to the select element
            for (let option of options) {
                let selectOption = document.createElement("option");
                selectOption.value = option;
                selectOption.text = option;
                selectElement.appendChild(selectOption);
            }
        }

        // TODO: Refactor these helper functions
        function createEnvironmentMapSelectList(options) {
            let environmentMapSelectElementData = {
                "name": "map",
                "id": "map-select",
                "label": "Environment Map"
            }
            createSelectListElement(environmentMapSelectElementData, options);

            // add line break to end of select menu
            addLineBreak();
        }

        function createSearchAlgorithmSelectList(options) {
            let searchAlgorirhmElementData = {
                "name": "searchAlgorithm",
                "id": "search-algorithm-select",
                "label": "Search Algorithm"
            }
            createSelectListElement(searchAlgorirhmElementData, options);

            // add line break to end of select menu
            addLineBreak();
        }

        function createGridCellSizeSelectList(options) {
            let gridCellSizeElementData = {
                "name": "gridCellSize",
                "id": "grid-cell-size-select",
                "label": "Grid Cell Size"
            }
            createSelectListElement(gridCellSizeElementData, options);

            // add line break to end of select menu
            addLineBreak();
 
        }

        function createLegalActionsSelectList(options) {
            let legalActionsElementData = {
                "name": "legalActions",
                "id": "legal-actions-select",
                "label": "Legal Actions"
            }
            createSelectListElement(legalActionsElementData, options);

            // add line break to end of select menu
            addLineBreak();
 
        }

        function createVisualisationSelectList(options) {
            let visualisationElementData = {
                "name": "visualisation",
                "id": "visualisation-select",
                "label": "Visualisation"
            }
            createSelectListElement(visualisationElementData, options);

            // add line break to end of select menu
            addLineBreak();
 
        }

        createEnvironmentMapSelectList(["Default (20 x 24)", "Big (100 X 100)"]);
        createSearchAlgorithmSelectList(["BFS", "DFS"]);
        createGridCellSizeSelectList(["Default (20 x 20)"]);
        createLegalActionsSelectList(["4 Cardinal (Up, Down, Left, Right)"])
        createVisualisationSelectList(["Instant Path + Open/Closed"])
    }

    createButtons() {
        function createButton(buttonData) {
            let menuContainer = document.getElementById("menu-container");
            let buttonElement = document.createElement("button");
            buttonElement.id = buttonData.id;
            buttonElement.innerText = buttonData.text;
            menuContainer.appendChild(buttonElement);
        }

        function createToggleGridButton() {
            const toggleGridButtonData = {
                "id": "toggle-grid-button",
                "text": "Toggle Grid"
            }

            createButton(toggleGridButtonData);
        }

        function createRunButton() {
            const runButtonData = {
                "id": "run-button",
                "text": "Run"
            } 

            createButton(runButtonData);
        }

        function createRunTestButton() {
            const runTestButtonData = {
                "id": "run-test-button",
                "text": "Run Test"
            } 

            createButton(runTestButtonData);
        }

        createToggleGridButton();
        createRunButton();
        createRunTestButton();
    }

    drawGrid() {
        this.grid.draw();
    }

    getGrid() {
        return this.grid.grid;
    }

    getCanvas() {
        return this.grid.canvas;
    }
}