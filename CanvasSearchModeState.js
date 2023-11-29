class CanvasSearchModeState extends CanvasState {
    constructor(container, map) {
        super(container, map);
        this.currentHoverCellKey = null;
        this.startCell = null;
        this.goalCell = null;
    }

    startSearch(currentContext){
        this.searchSolution = new Search_Solution(this.stateManager.gridObject, currentContext.config);
        // let sRow = parseInt(startCell.split(",")[0]);
        // let sCol = parseInt(startCell.split(",")[1]);
        // let gRow = parseInt(goalCell.split(",")[0]);
        // let gCol = parseInt(goalCell.split(",")[1]);
        let sRow = parseInt(currentContext.currentGridState.startCell.split(",")[0]);
        let sCol = parseInt(currentContext.currentGridState.startCell.split(",")[1]);
        let gRow = parseInt(currentContext.currentGridState.goalCell.split(",")[0]);
        let gCol = parseInt(currentContext.currentGridState.goalCell.split(",")[1]);

        this.searchSolution.startSearch(sRow, sCol, gRow, gCol);
    }
    stopSearch() {
        this.searchSolution = null;
    }

    isSearchInProgress() {
        return this.searchSolution !== null;
    }

    init(currentContext){
        this.previousContext = currentContext;
        this.startSearch(currentContext);
    }
    
}