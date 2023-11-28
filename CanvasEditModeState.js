class CanvasEditModeState extends CanvasState {
    constructor(container, map) {
        super(container, map);
        this.currentHoverCellKey = null;
        this.startCell = null;
        this.goalCell = null;
    }

    setHover(mouseX, mouseY, hoverVal) {
        let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
        let key = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col); 
        if (key in this.stateManager.gridObject.grid && key !== this.startCell && key !== this.goalCell)
        {
            // deselect current active hover cell
            if (this.currentHoverCellKey !== null){
                this.deselectCurrentHoverCellKey();
            }

            // assign new active hover cell
            this.currentHoverCellKey = key;
            this.stateManager.gridObject.grid[key] = {...this.stateManager.gridObject.grid[key],
               "hover" : hoverVal
            }
            this.stateManager.gridObject.grid[key].value = WHITE_COLOUR;
        }
    }

    deselectCurrentHoverCellKey() {
        if (this.currentHoverCellKey !== null && this.currentHoverCellKey in this.stateManager.gridObject.grid){
            this.stateManager.gridObject.grid[this.currentHoverCellKey].hover = false;
            this.stateManager.gridObject.grid[this.currentHoverCellKey].value = this.stateManager.gridObject.grid[this.currentHoverCellKey].baseValue
            this.currentHoverCellKey = null;
        }
    }

    startSearch(config) {
        this.searchSolution = new Search_Solution(this.stateManager.gridObject, config);
        let sRow = parseInt(this.startCell.split(",")[0]);
        let sCol = parseInt(this.startCell.split(",")[1]);
        let gRow = parseInt(this.goalCell.split(",")[0]);
        let gCol = parseInt(this.goalCell.split(",")[1]);
        this.searchSolution.startSearch(sRow, sCol, gRow, gCol);
    }

    stopSearch() {
        this.searchSolution = null;
    }

    isSearchInProgress() {
        return this.searchSolution !== null;
    }

    setStartCell(mouseX, mouseY) {
        if (this.startCell === null) {
            let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
            this.startCell = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col);
            if (this.currentHoverCellKey === this.startCell){
                this.deselectCurrentHoverCellKey();
            }
            this.stateManager.gridObject.setColor(Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col), WHITE_COLOUR);
            // console.log(`Start cell: ${this.startCell}`);
        }
    }

    setGoalCell(mouseX, mouseY) {
        if (this.goalCell === null) {
            let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
            this.goalCell = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col);
            if (this.currentHoverCellKey === this.goalCell){
                this.deselectCurrentHoverCellKey();
            }
            this.stateManager.gridObject.setColor(Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col), PURPLE_COLOUR);
            // console.log(`Goal cell: ${this.goalCell}`);
        }
    }
}