class MenuSearchModeState extends MenuState{
    constructor(stateManager, gridObject) {
        super(stateManager, gridObject);
    }

    createButtons(){
        let self = this;
        function createResetGridButton(){
            const resetGridButtonData = {
                "id": "reset-grid-button",
                "text": "Reset Grid"
            }

            let runOnClickFunction = function(){
                self.stateManager.switchState("edit");
            }

            MenuState.createButton(self, resetGridButtonData, runOnClickFunction);
        }

        createResetGridButton();
    }

    createTables(){
        let self = this;
        function createSearchResultsTable(){
            const searchStrategy = self.stateManager.currentState.canvas.previousContext.config.strategy;
            const startCell = self.stateManager.currentState.canvas.searchSolution.getStartCell();
            const goalCell = self.stateManager.currentState.canvas.searchSolution.getGoalCell();
            let cost = self.stateManager.currentState.canvas.searchSolution.getCost();
            let closedListSize = self.stateManager.currentState.canvas.searchSolution.getClosed().length;
            const searchResultsTableData = {
                "headings": [
                    "Search", "Start", "Goal",
                    "Cost", "Processed"
                ], 
                "rows": [
                    [searchStrategy.toUpperCase(), `(${startCell})`, `(${goalCell})`, cost, closedListSize],
                ]
            };

            MenuState.createTable(self, searchResultsTableData);
        }

        createSearchResultsTable();
    }

    update(){
        let self = this;
        function updateSearchResultsTable(){
            // TODO: refactor this function
            for (let element of self.menuElements) {
                if (element.element.tagName === "TABLE") {
                    const startCell = self.stateManager.currentState.canvas.searchSolution.getStartCell();
                    const goalCell = self.stateManager.currentState.canvas.searchSolution.getGoalCell();
                    let cost = self.stateManager.currentState.canvas.searchSolution.getCost();
                    let closedListSize = self.stateManager.currentState.canvas.searchSolution.getClosed().length;
                    element.element.rows[1].cells.item(2).innerHTML = `(${startCell})`;
                    element.element.rows[1].cells.item(2).innerHTML = `(${goalCell})`;
                    element.element.rows[1].cells.item(3).innerHTML = cost;
                    element.element.rows[1].cells.item(4).innerHTML = closedListSize;
                }
            }
        }

        updateSearchResultsTable();

    }


}
