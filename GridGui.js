class GridGUI {
    constructor(container, map) {
        this.container = container
        this.grid = new Grid(map);
        this.createCanvas();
    }

    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas_ctx = this.canvas.getContext("2d");
        this.canvas.setAttribute("id", "canvasID");
        this.canvas.setAttribute("width",`${this.grid.width * settings.grid_cell_width}`);
        this.canvas.setAttribute("height", `${this.grid.height * settings.grid_cell_height}`);
        this.container.appendChild(this.canvas);
    }

    draw() {
        for (let y=0; y<this.grid.height; y++){
           for (let x=0; x<this.grid.width; x++) {
            let cell = this.grid.grid[y][x];
            // set grid cell colour
            switch (cell) {
                case 0:
                    this.canvas_ctx.fillStyle = "blue";
                    break;
                case 1:
                    this.canvas_ctx.fillStyle = "green";
                    break;
                case 2:
                    this.canvas_ctx.fillStyle = "red";
                    break;
                case 3:
                    this.canvas_ctx.fillStyle = "white";
                    break;
                default:
                    this.canvas_ctx.fillStyle = "black"
            }
               this.canvas_ctx.fillRect(x * settings.grid_cell_width, y * settings.grid_cell_height, settings.grid_cell_width, settings.grid_cell_height);
            } 
        }

        this.drawGridLines();
    }

    drawGridLines() {
        // set grid line colour
        this.canvas_ctx.fillStyle = "black"

        // draw horizontal lines
        for (let y=0; y<this.grid.height; y++){
            this.canvas_ctx.beginPath();
            this.canvas_ctx.moveTo(0, y*settings.grid_cell_height);
            this.canvas_ctx.lineTo(this.canvas.width, y*settings.grid_cell_height);
            this.canvas_ctx.stroke();
        }

        // draw vertical lines
        for (let x = 0; x < this.grid.width; x++) {
               this.canvas_ctx.beginPath();
               this.canvas_ctx.moveTo(x * settings.grid_cell_width, 0);
               this.canvas_ctx.lineTo(x * settings.grid_cell_width, this.canvas.height);
               this.canvas_ctx.stroke();
        }
    }

}