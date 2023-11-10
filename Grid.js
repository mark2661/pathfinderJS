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
    }

    static createGridObject(mapData) {
        // key = (y,x) coord (string), value = number from mapText (number type)
        let grid = {};
        for (let y=0; y<mapData.length; y++) {
            for (let x=0; x<mapData[0].length; x++) {
               let key = `${y},${x}`; 
               grid[key] = parseInt(mapData[y][x], 10);
            }
        }
        return grid;
    }

    get(x, y) {
        let key = `${y},${x}`; 
        return (key in this.grid) ? this.grid[key] : null;
    }

    set(x, y, val) {
        let gridX = Math.floor(x / settings.grid_cell_width);
        let gridY = Math.floor(y / settings.grid_cell_height);
        // console.log(`mX: ${x}, mY: ${y}, X: ${gridX}, Y: ${gridY}`)
        let key = `${gridY},${gridX}`; 
        if (key in this.grid)
        {
            this.grid[key] = val
        }
    }

    isOOB(x, y, size=1) {
        return x < 0 || y < 0 || (x + size) > this.width || (y + size) > this.height;
    }
}