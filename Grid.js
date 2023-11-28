// TODO: Implement either a state or strategy design pattern
// to allow for an "edit" mode and a "search" mode with different behaviours
// e.g. changing the UI, disabling buttons, turning off hover effect.
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

    setColor(key, colour) {
        if  (key in this.grid) {
            this.grid[key].value = colour;
        }
    }

    isOOB(row, col, size=0) {
        return row < 0 || col < 0 || (col + size) >= this.width || (row + size) >= this.height;
    }

}