class CanvasEditModeState extends CanvasState {
    constructor(stateManager, container, map) {
        super(stateManager, container, map);
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

    setStartCell(mouseX, mouseY) {
        if (this.startCell === null) {
            let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
            this.startCell = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col);
            if (this.currentHoverCellKey === this.startCell){
                this.deselectCurrentHoverCellKey();
            }
            this.stateManager.gridObject.setColor(Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col), WHITE_COLOUR);
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
        }
    }

    init(){
        super.init();
        this.currentHoverCellKey = null;
        this.stateManager.gridObject.reset();
    }
}