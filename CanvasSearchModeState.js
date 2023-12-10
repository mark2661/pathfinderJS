class CanvasSearchModeState extends CanvasState {
    constructor(container, map) {
        super(container, map);
        this.currentHoverCellKey = null;
        this.startCell = null;
        this.goalCell = null;
    }

    startSearch(startCell, goalCell, config){
        this.searchSolution = new Search_Solution(this.stateManager.gridObject, config);
        let sRow = parseInt(startCell.split(",")[0]);
        let sCol = parseInt(startCell.split(",")[1]);
        let gRow = parseInt(goalCell.split(",")[0]);
        let gCol = parseInt(goalCell.split(",")[1]);

        this.searchSolution.startSearch(sRow, sCol, gRow, gCol);
    }
    stopSearch() {
        this.searchSolution = null;
    }

    resetSearch(newGoalCell){
        let newGRow = parseInt(newGoalCell.split(",")[0]);
        let newGCol = parseInt(newGoalCell.split(",")[1]);
        this.stateManager.gridObject.reset();
        this.searchSolution.startSearch(this.searchSolution.sRow, this.searchSolution.sCol, newGRow, newGCol);
    }

    init(currentContext){
        this.createCanvas();
        this.previousContext = currentContext;
        this.startCell = currentContext.gridState.startCell;
        this.goalCell = currentContext.gridState.goalCell;
        this.startSearch(this.startCell, this.goalCell, currentContext.config);
    }
    
}