class CanvasSearchModeState extends CanvasState {
    constructor(container, map) {
        super(container, map);
        this.currentHoverCellKey = null;
        this.startCell = null;
        this.goalCell = null;
    }

    startSearch(currentContext){
        this.searchSolution = new Search_Solution(this.stateManager.gridObject, currentContext.config);
        let sRow = parseInt(currentContext.gridState.startCell.split(",")[0]);
        let sCol = parseInt(currentContext.gridState.startCell.split(",")[1]);
        let gRow = parseInt(currentContext.gridState.goalCell.split(",")[0]);
        let gCol = parseInt(currentContext.gridState.goalCell.split(",")[1]);

        this.searchSolution.startSearch(sRow, sCol, gRow, gCol);
    }
    stopSearch() {
        this.searchSolution = null;
    }

    init(currentContext){
        this.createCanvas();
        this.previousContext = currentContext;
        this.startSearch(currentContext);
    }
    
}