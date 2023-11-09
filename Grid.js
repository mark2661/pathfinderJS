class Grid {
    constructor(mapText) {
        let temp = mapText.split("\n");

        // remove trailing white space from input map array
        for (let r=0; r < temp.length; r++){
            let row = temp[r];
            temp[r] = row.trim();
        }
        temp.pop();

        this.grid = [];
        // convert strings data to numbers
        for (let row of temp) {
            this.grid.push(row.split("").map((c) => {
                return parseInt(c, 10);
            }))
        }

        this.height = this.grid.length;
        this.width = this.grid[0].length;
        this.maxSize = 3;
    }

    get(x, y) {
        return this.grid[y][x];
    }

    set(x, y, val) {
        let gridX = Math.floor(x / settings.grid_cell_width);
        let gridY = Math.floor(y / settings.grid_cell_height);
        // console.log(`mX: ${x}, mY: ${y}, X: ${gridX}, Y: ${gridY}`)
        this.grid[gridY][gridX] = val
    }

    isOOB(x, y, size=1) {
        return x < 0 || y < 0 || (x + size) > this.width || (y + size) > this.height;
    }
}