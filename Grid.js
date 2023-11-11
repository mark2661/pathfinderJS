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
        this.currentHoverCellKey = null;
    }

    static createGridObject(mapData) {
        // key = (y,x) coord (string), value = number from mapText (number type)
        let grid = {};
        for (let y=0; y<mapData.length; y++) {
            for (let x=0; x<mapData[0].length; x++) {
               let key = `${y},${x}`; 
               grid[key] = {
                "value" : parseInt(mapData[y][x], 10),
                "hover" : false,
                "baseValue" : parseInt(mapData[y][x], 10)
               };
            }
        }
        return grid;
    }

    static getGlobalMouseToGridReferenceCoords(mouseX, mouseY) {
        let gridX = Math.floor(mouseX / settings.grid_cell_width);
        let gridY = Math.floor(mouseY / settings.grid_cell_height);

        return {"x": gridX, "y": gridY};
    }

    get(x, y) {
        let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(x, y);
        let key = `${gridReferenceCoords.y},${gridReferenceCoords.x}`; 
        return (key in this.grid) ? this.grid[key] : null;
    }

    setValue(x, y, val) {
        let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(x, y);
        let key = `${gridReferenceCoords.y},${gridReferenceCoords.x}`; 
        if (key in this.grid)
        {
            this.grid[key] = {...this.grid[key],
               "value" : val
            }
        }
    }

    setHover(x, y , hoverVal) {
        let gridReferenceCoords = Grid.getGlobalMouseToGridReferenceCoords(x, y);
        let key = `${gridReferenceCoords.y},${gridReferenceCoords.x}`; 
        if (key in this.grid)
        {
            // deselect current active hover cell
            if (this.currentHoverCellKey !== null){
                this.grid[this.currentHoverCellKey].hover = false;
                this.grid[this.currentHoverCellKey].value = this.grid[this.currentHoverCellKey].baseValue
            }

            // assign new active hover cell
            this.currentHoverCellKey = key;
            this.grid[key] = {...this.grid[key],
               "hover" : hoverVal
            }
            this.grid[key].value = WHITE_COLOUR;
        }
    }

    isOOB(x, y, size=1) {
        return x < 0 || y < 0 || (x + size) > this.width || (y + size) > this.height;
    }
}