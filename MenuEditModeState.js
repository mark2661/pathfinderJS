class MenuEditModeState extends MenuState{
    constructor(stateManager, gridObject){
        super(stateManager, gridObject);
    }

    createSelectMenus() {
        let self = this;
        function createEnvironmentMapSelectList(options) {
            let environmentMapSelectElementData = {
                "name": "map",
                "id": "map-select",
                "label": "Environment Map"
            }
            MenuState.createSelectListElement(self, environmentMapSelectElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak(self);
        }

        function createSearchAlgorithmSelectList(options) {
            let searchAlgorirhmElementData = {
                "name": "searchAlgorithm",
                "id": "search-algorithm-select",
                "label": "Search Algorithm"
            }
            MenuState.createSelectListElement(self,searchAlgorirhmElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak(self);
        }

        function createGridCellSizeSelectList(options) {
            let gridCellSizeElementData = {
                "name": "gridCellSize",
                "id": "grid-cell-size-select",
                "label": "Grid Cell Size"
            }

            let onChangeFunction = function(){
                const selectedOption = this.options[this.selectedIndex].value.toLowerCase().split(" ")[0]; 
                // settings.grid_cell_height = GRID_CELL_SIZE_SELECT_MENU_OPTIONS_MAPPINGS[selectedOption];
                // settings.grid_cell_width = GRID_CELL_SIZE_SELECT_MENU_OPTIONS_MAPPINGS[selectedOption];
                // self.stateManager.currentState.canvas.resetCanvas();
            }
            MenuState.createSelectListElement(self, gridCellSizeElementData, options, onChangeFunction);

            // add line break to end of select menu
            MenuState.addLineBreak(self);

        }

        function createLegalActionsSelectList(options) {
            let legalActionsElementData = {
                "name": "legalActions",
                "id": "legal-actions-select",
                "label": "Legal Actions"
            }
            MenuState.createSelectListElement(self,legalActionsElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak(self);

        }

        function createVisualisationSelectList(options) {
            let visualisationElementData = {
                "name": "visualisation",
                "id": "visualisation-select",
                "label": "Visualisation"
            }

            MenuState.createSelectListElement(self,visualisationElementData, options);

            // add line break to end of select menu
            MenuState.addLineBreak(self);

        }

        createEnvironmentMapSelectList(["Default (20 x 24)", "Big (100 X 100)"]);
        createSearchAlgorithmSelectList(["bfs", "dfs"]);
        createGridCellSizeSelectList(["Default (20 x 20)", "Small (10 x 10)"]);
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

            MenuState.createButton(self, toggleGridButtonData);
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

                    // store current select menu values in an object for reference
                    let menuState = {};
                    let selectMenuNodes = Array.prototype.slice.call(document.getElementById("select-menu-container").children).filter((node) =>{
                        return node.tagName === "SELECT";
                    });

                    for(let node of selectMenuNodes){
                        let nodeID = node.id;
                        menuState[nodeID] = node.value;
                    }

                    // store  grid information in an object for reference
                    let gridState = {
                        "startCell": this.stateManager.currentState.canvas.startCell,
                        "goalCell": this.stateManager.currentState.canvas.goalCell
                    }

                    let context = {
                        "config": config,
                        "menuState": menuState,
                        "gridState": gridState,
                    }
                    this.stateManager.switchState("search", context);
                }
            }

            // need to bind the "this" context to the function arguement to ensure when the 
            // function is called "this" refers to this class object.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
            MenuState.createButton(self, runButtonData, runOnClickFunction.bind(self));
        }

        function createRunTestButton() {
            const runTestButtonData = {
                "id": "run-test-button",
                "text": "Run Test"
            }

            MenuState.createButton(self, runTestButtonData);
        }

        createToggleGridButton();
        createRunButton();
        createRunTestButton();
    }



}