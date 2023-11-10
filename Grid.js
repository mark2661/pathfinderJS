class Grid {
    constructor(mapText) {
        let temp = mapText.split("\n");

        // remove trailing white space from input map array
        for (let r=0; r < temp.length; r++){
            let row = temp[r];
            temp[r] = row.trim();
        }
        temp.pop();

        this.height = temp.length;
        this.width = temp[0].length;
        this.maxSize = 3;

        // create grid object -> key = (y,x) coord (string), value = number from mapText (number type)
        this.grid = {};
        for (let y=0; y<temp.length; y++) {
            for (let x=0; x<temp[0].length; x++) {
               let key = `${y},${x}`; 
               this.grid[key] = parseInt(temp[y][x], 10);
            }
        }
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