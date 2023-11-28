class CanvasState{
    constructor(stateManager, container, grid) {
        this.stateManager = stateManager
        this.container = container;
        this.createCanvas();
        this.searchSolution = null;
    }

    createCanvas(){
        this.canvas = document.createElement("canvas");
        this.canvas_ctx = this.canvas.getContext("2d");
        this.canvas.setAttribute("id", "canvasID");
        // this.canvas.setAttribute("width", `${this.gridObject.width * settings.grid_cell_width}`);
        // this.canvas.setAttribute("height", `${this.gridObject.height * settings.grid_cell_height}`);
        this.canvas.setAttribute("width", `${this.stateManager.gridObject.width * settings.grid_cell_width}`);
        this.canvas.setAttribute("height", `${this.stateManager.gridObject.height * settings.grid_cell_height}`);
        this.container.appendChild(this.canvas);
    }

    draw(){
        let self = this;
        function updatePath() {
            if (self.isSearchInProgress()) {
                for (let key of self.searchSolution.path) {
                    self.stateManager.gridObject.setColor(key, WHITE_COLOUR);
                }
            }
        }

        function updateOpenList() {
            if (self.isSearchInProgress()) {
                for (let node of self.searchSolution.getOpen()) {
                    let key = Grid.getGridCellKey(node.row, node.col);
                    self.stateManager.gridObject.setColor(key, OPEN_LIST_COLOUR);
                }
            }
        }

        function updateClosedList() {
            if (self.isSearchInProgress()) {
                for (let node of self.searchSolution.getClosed()) {
                    let key = Grid.getGridCellKey(node.row, node.col);
                    self.stateManager.gridObject.setColor(key, CLOSED_LIST_COLOUR);
                }
            }
        }

        let updateOpenAndClosedList = true;
        if (this.isSearchInProgress()){
            let visualisationMode = document.getElementById("visualisation-select").value.toLowerCase();
            switch (visualisationMode){
               case VISUALISATION_MODE_INSTANT_PATH_PLUS_OPEN_CLOSED_LIST:
                    this.searchSolution.search();
                    break;

                case VISUALISATION_MODE_ANIMATED_SEARCH:
                    this.searchSolution.searchIteration();
                    break;

                case VISUALISATION_MODE_INSTANT_PATH_ONLY:
                    this.searchSolution.search();
                    updateOpenAndClosedList = false;
                    break;
                
                // TODO: implement functionality
                case VISUALISATION_MODE_SINGLE_STEP:
                    break;
            }
        }

        if (updateOpenAndClosedList){
            updateOpenList();
            updateClosedList();
        }
        updatePath();

        for (let key in this.stateManager.gridObject.grid) {
            let cell = this.stateManager.gridObject.grid[key].value;
            let gridCellY = parseInt(key.split(",")[0], 10);
            let gridCellX = parseInt(key.split(",")[1], 10);
            // set grid cell colour
            switch (cell) {
                case BLUE_COLOUR:
                    this.canvas_ctx.fillStyle = "blue";
                    break;
                case GREEN_COLOUR:
                    this.canvas_ctx.fillStyle = "green";
                    break;
                case RED_COLOUR:
                    this.canvas_ctx.fillStyle = "red";
                    break;
                case WHITE_COLOUR:
                    this.canvas_ctx.fillStyle = "white";
                    break;
                case PURPLE_COLOUR:
                    this.canvas_ctx.fillStyle = "purple";
                    break;
                case ORANGE_COLOUR:
                    this.canvas_ctx.fillStyle = "orange";
                    break;
                case YELLOW_COLOUR:
                    this.canvas_ctx.fillStyle = "yellow";
                    break;
                default:
                    this.canvas_ctx.fillStyle = "black"
            }
            
            let globalCellTopLeftCoordX = gridCellX * settings.grid_cell_width;
            let globalCellTopLeftCoordY = gridCellY * settings.grid_cell_height;
            this.canvas_ctx.fillRect(globalCellTopLeftCoordX, globalCellTopLeftCoordY, settings.grid_cell_width, settings.grid_cell_height);
        }

        this.drawGridLines();

        // only draw display text when cursor is hovering over a grid cell
        if (this.currentHoverCellKey !== null) {
            this.drawText();
        }

    }

    drawGridLines() {
        // set grid line colour
        this.canvas_ctx.fillStyle = "black"

        // draw horizontal lines
        for (let y=0; y<this.stateManager.gridObject.height; y++){
            let globalCellTopLeftCoordY = y * settings.grid_cell_height;
            this.canvas_ctx.beginPath();
            this.canvas_ctx.moveTo(0, globalCellTopLeftCoordY);
            this.canvas_ctx.lineTo(this.canvas.width, globalCellTopLeftCoordY);
            this.canvas_ctx.stroke();
        }

        // draw vertical lines
        for (let x = 0; x < this.stateManager.gridObject.width; x++) {
            let globalCellTopLeftCoordX = x * settings.grid_cell_width;
               this.canvas_ctx.beginPath();
               this.canvas_ctx.moveTo(globalCellTopLeftCoordX, 0);
               this.canvas_ctx.lineTo(globalCellTopLeftCoordX, this.canvas.height);
               this.canvas_ctx.stroke();
        }
    }

    drawText() {
        let canvasLeftEdgeOffset = 10;
        let canvasBottomEdgeOffset = this.canvas.height - 20;
        this.canvas_ctx.font = "bold 24px serif";
        this.canvas_ctx.fillText(`Mouse Pos: (${this.currentHoverCellKey})`, canvasLeftEdgeOffset, canvasBottomEdgeOffset);
    }

    // Override
    setHover(){ return; }

    // Override
    deselectCurrentHoverCellKey(){ return; }

    // Overrride
    startSearch(){ return; }

    // Override
    stopSearch(){ return; }

    // Override
    isSearchInProgress(){ return false; }

    // Override
    setStartCell(){ return; }

    // Override
    setGoalCell(){ return; }

    // Override
    setStartCell() { return; }

    // Override
    setGoalCell() { return; }

}