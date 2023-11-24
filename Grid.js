class Grid {
    constructor(mapText) {
        // remove trailing whitespace from mapText
        let formattedMapDataArray = mapText.split("\n").map((row) => {
            return row.trim();
        }).filter((row) => {
            return row !== "";
        });

        this.height = formattedMapDataArray.length;
        this.width = formattedMapDataArray[0].length;
        this.maxSize = 3;
        this.grid = Grid.createGridObject(formattedMapDataArray);
        this.searchSolution = null;
        this.currentHoverCellKey = null;
        this.startCell = null;
        this.goalCell = null;
    }

    static createGridObject(mapData) {
        // key = (y,x) coord (string), value = number from mapText (number type)
        let grid = {};
        for (let row=0; row<mapData.length; row++) {
            for (let col=0; col<mapData[0].length; col++) {
               let key = Grid.getGridCellKey(row, col); 
               grid[key] = {
                "value" : parseInt(mapData[row][col], 10),
                "hover" : false,
                "baseValue" : parseInt(mapData[row][col], 10)
               };
            }
        }
        return grid;
    }

    static getGridCellKey(row, col) {
        return `${row},${col}`;
    }

    static getGlobalMouseToGridReferenceCoords(mouseX, mouseY) {
        let gridCol = Math.floor(mouseX / settings.grid_cell_width);
        let gridRow = Math.floor(mouseY / settings.grid_cell_height);

        return {"row": gridRow, "col": gridCol};
    }

    getWithMouseCoords(mouseX, mouseY) {
        let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
        let key = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col); 
        return (key in this.grid) ? this.grid[key] : null;
    }

    get(row ,col){
        let key = Grid.getGridCellKey(row, col); 
        return (key in this.grid) ? this.grid[key] : null;
    }

    setValue(mouseX, mouseY, val) {
        let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
        let key = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col); 
        if (key in this.grid)
        {
            this.grid[key] = {...this.grid[key],
               "value" : val
            }
        }
    }

    setHover(mouseX, mouseY , hoverVal) {
        let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
        let key = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col); 
        if (key in this.grid && key !== this.startCell && key !== this.goalCell)
        {
            // deselect current active hover cell
            if (this.currentHoverCellKey !== null){
                this.deselectCurrentHoverCellKey();
            }

            // assign new active hover cell
            this.currentHoverCellKey = key;
            this.grid[key] = {...this.grid[key],
               "hover" : hoverVal
            }
            this.grid[key].value = WHITE_COLOUR;
        }
    }

    deselectCurrentHoverCellKey() {
        if (this.currentHoverCellKey !== null && this.currentHoverCellKey in this.grid){
            this.grid[this.currentHoverCellKey].hover = false;
            this.grid[this.currentHoverCellKey].value = this.grid[this.currentHoverCellKey].baseValue
            this.currentHoverCellKey = null;
        }
    }

    setColor(key, colour) {
        if  (key in this.grid) {
            this.grid[key].value = colour;
        }
    }

    isOOB(row, col, size=0) {
        return row < 0 || col < 0 || (col + size) >= this.width || (row + size) >= this.height;
    }

    startSearch(config) {
        this.searchSolution = new Search_Solution(this, config);
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
            this.setColor(Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col), WHITE_COLOUR);
            console.log(`Start cell: ${this.startCell}`);
        }
    }

    setGoalCell(mouseX, mouseY) {
        if (this.goalCell === null) {
            let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(mouseX, mouseY);
            this.goalCell = Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col);
            if (this.currentHoverCellKey === this.goalCell){
                this.deselectCurrentHoverCellKey();
            }
            this.setColor(Grid.getGridCellKey(gridReferenceCoords.row, gridReferenceCoords.col), PURPLE_COLOUR);
            console.log(`Goal cell: ${this.goalCell}`);
        }
    }
    
    updatePath() {
        if (this.isSearchInProgress()){
            for (let key of this.searchSolution.path) {
                this.setColor(key, WHITE_COLOUR);
            }
        }
    }

    updateOpenList() {
        if (this.isSearchInProgress()){
            for (let node of this.searchSolution.getOpen()){
                let key = Grid.getGridCellKey(node.row, node.col);
                this.setColor(key, OPEN_LIST_COLOUR);
            }
        }
    }

    updateClosedList() {
        if (this.isSearchInProgress()){
            for (let node of this.searchSolution.getClosed()){
                let key = Grid.getGridCellKey(node.row, node.col);
                this.setColor(key, CLOSED_LIST_COLOUR);
            }
        }
    }
}