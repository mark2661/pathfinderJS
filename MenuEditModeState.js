class MenuEditModeState extends MenuState{
    constructor(stateManager, gridObject){
        super(stateManager, gridObject);
    }

    createSelectMenus() {
        function addLineBreak() {
            let lineBreakElement = document.createElement("br");
            let selectMenuContainer = document.getElementById("select-menu-container");
            selectMenuContainer.appendChild(lineBreakElement);
        }

        function createSelectListElement(elementData, options) {
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
        createSearchAlgorithmSelectList(["bfs", "dfs"]);
        createGridCellSizeSelectList(["Default (20 x 20)"]);
        createLegalActionsSelectList(["4 Cardinal (Up, Down, Left, Right)"])
        createVisualisationSelectList(["Instant Path + Open/Closed", "Instant Path Only", "Animated Search", "Single Step"])
    }

    createButtons() {
        // hack to allow nested functions to refer to the class object
        // https://stackoverflow.com/questions/20725360/using-this-for-parent-function-inside-a-nested-function
        let self = this;

        function createButton(buttonData, onClickFunction = null) {
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
            let runOnClickFunction = function () {
                if (this.stateManager.currentState.canvas.searchSolution === null) {
                    if (this.stateManager.currentState.canvas.startCell === null || this.stateManager.currentState.canvas.goalCell === null) {
                        if (this.stateManager.currentState.canvas.startCell === null && this.stateManager.currentState.canvas.goalCell === null) {
                            let message = "Set Start and Goal Cells First";
                            alert(message);
                        }
                        else if (this.stateManager.currentState.canvas.startCell === null) {
                            let message = "Set Start Cell First";
                            alert(message);
                        }
                        else {
                            let message = "Set Goal Cell First";
                            alert(message);
                        }
                        return;
                    }

                    let searchAlgorithmSelectElement = document.getElementById("search-algorithm-select");
                    let config = {
                        "actions": [[-1, 0], [0, 1], [1, 0], [0, -1]],
                        "actionCost": [1, 1, 1, 1],
                        "strategy": searchAlgorithmSelectElement.value
                    }

                    this.stateManager.currentState.canvas.startSearch(config);
                }
            }

            // need to bind the "this" context to the function arguement to ensure when the 
            // function is called "this" refers to this class object.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
            createButton(runButtonData, runOnClickFunction.bind(self));
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



}