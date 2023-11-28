class MenuEditModeState extends MenuState{
    constructor(stateManager, gridObject){
        super(stateManager, gridObject);
    }

    createSelectMenus() {
        function createEnvironmentMapSelectList(options) {
            let environmentMapSelectElementData = {
                "name": "map",
                "id": "map-select",
                "label": "Environment Map"
            }
            MenuState.createSelectListElement(environmentMapSelectElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak();
        }

        function createSearchAlgorithmSelectList(options) {
            let searchAlgorirhmElementData = {
                "name": "searchAlgorithm",
                "id": "search-algorithm-select",
                "label": "Search Algorithm"
            }
            MenuState.createSelectListElement(searchAlgorirhmElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak();
        }

        function createGridCellSizeSelectList(options) {
            let gridCellSizeElementData = {
                "name": "gridCellSize",
                "id": "grid-cell-size-select",
                "label": "Grid Cell Size"
            }
            MenuState.createSelectListElement(gridCellSizeElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak();

        }

        function createLegalActionsSelectList(options) {
            let legalActionsElementData = {
                "name": "legalActions",
                "id": "legal-actions-select",
                "label": "Legal Actions"
            }
            MenuState.createSelectListElement(legalActionsElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak();

        }

        function createVisualisationSelectList(options) {
            let visualisationElementData = {
                "name": "visualisation",
                "id": "visualisation-select",
                "label": "Visualisation"
            }

            MenuState.createSelectListElement(visualisationElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak();

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

        function createToggleGridButton() {
            const toggleGridButtonData = {
                "id": "toggle-grid-button",
                "text": "Toggle Grid"
            }

            MenuState.createButton(toggleGridButtonData);
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
            MenuState.createButton(runButtonData, runOnClickFunction.bind(self));
        }

        function createRunTestButton() {
            const runTestButtonData = {
                "id": "run-test-button",
                "text": "Run Test"
            }

            MenuState.createButton(runTestButtonData);
        }

        createToggleGridButton();
        createRunButton();
        createRunTestButton();
    }



}